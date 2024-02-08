import {useEffect , useState } from 'react';
import './App.css'
import {FaPlus, FaPencilAlt, FaTrash} from 'react-icons/fa';
import {db} from './firebase';
import {addDoc, doc, collection, onSnapshot, updateDoc, deleteDoc} from 'firebase/firestore';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'),(snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo})));
    });

    return () => unsubscribe();
  },[]);

  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  const addTodo = async() => {
    try{
      if(input.trim() !== ''){

        await addDoc(collection(db,'todos'),{todo:input});
        setInput('');
      }
    }catch(error){
      console.error(error);
    }
  }

  const updateTodo = async() => {
    try{
      if(input.trim() !== ''){
        const todoDocRef = doc(db, 'todos', todos[editIndex].id);
        await updateDoc(todoDocRef, {todo:input});
        setEditIndex(-1);
        setInput('');
      }
    }catch(error){
      console.error(error);
    }
  }

  const removeTodo = async(id) => {
    try{
      await deleteDoc(doc(db, 'todos', id));
    }
    catch(error){
      console.error(error);
    }
  }
  
  return (
    
    <div className='min-h-screen flex flex-col gap-4 items-center justify-center p-4 bg-custom-background bg-center bg-cover'>
        
        <div className='bg-gray-200 p-6 rounded-lg shadow-md w-full max-w-lg lg:w-1/4 '>

          <h1 className='text-2xl font-bold text-center mb-4'>Get organized, get productive.</h1>


          <div className='flex'>
            <input 
            type="text"
            placeholder='Enter your next triumph here..'
            className='py-2 px-4 bordor rounded w-full focus:outline-none mr-2'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={editIndex === -1 ? addTodo : updateTodo} className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded'>
              {editIndex === -1 ? <FaPlus /> : <FaPencilAlt />}
            </button>
          </div>

        </div>

        {
          todos.length > 0 && (
            <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4'>
          
          <ul>
            
            {todos.map((todo,index) =>(
              <li key={index} className='flex items-center justify-between bg-white p-3 rounded shadow-md mb-3'>
              <span className='text-lg'>{todo.todo}</span>
              <div>

                <button onClick={() => setEdit(index)} className='mr-2 p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:to-gray-700 '>
                  <FaPencilAlt />
                </button>
              
                <button onClick={() => removeTodo(todo.id)} className='mr-2 p-2 bg-gradient-to-r from-red-400 to-red-600 text-white hover:to-red-700 '>
                  <FaTrash />
                </button>
              </div>
            </li>
            ))}

          </ul>

        </div>
          )
        }

    </div>

  )
}

export default App

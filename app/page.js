'use client';
import React, { useEffect, useState } from "react";
import {  collection, addDoc,getDoc,QuerySnapshot, onSnapshot ,query,doc,deleteDoc} from 'firebase/firestore';
import {db} from './firebase'

export default function Home() {
  const [items, setItems] = useState([
    // { name: 'run', sets: 5, reps: 5, duration: 50 },
    // { name: 'run', sets: 5, reps: 5, duration: 50 },
    // { name: 'run', sets: 5, reps: 5, duration: 50 },
  ]);
  const [newItem, setNewItem] = useState({name: '', sets: '', reps:  '', duration: ''});

  const [total, setTotal] = useState(0);

  //Add
  const additem= async (e)=>{
    e.preventDefault();
    if(newItem.name!==''  && newItem.sets!=='' && newItem.reps!=='' && newItem.duration!==''){
      //setItems([...items,newItem]);
      
      await addDoc(collection(db,'items'),{
        name:newItem.name.trim(),
        sets:newItem.sets.trim(),
        reps:newItem.reps.trim(),
        duration:newItem.duration
      });
      setNewItem({ name:'', sets:'', reps:'', duration: '' });

    }
  }
  
  //Read
  useEffect(() => {
    const q = query(collection(db, 'items')); 
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let itemArr = [];
      let total2 = 0;
  
      QuerySnapshot.forEach((doc) => {
        const data = doc.data();
        itemArr.push({ ...data, id: doc.id });
        total2 += Number(data.duration); // Calculate total duration
      });
  
      setItems(itemArr);
      setTotal(total2); 
    });
    return () => unsub();
  }, []); 
  
  //Delete
const deleteItem = async (id)=>{
  await deleteDoc(doc(db,'items',id) )
}


  return (
    <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 bg-blue-50'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm'>
      <h1 className='text-5xl p-4 text-center text-blue-800 font-bold uppercase'
    style={{
      textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3), 4px 4px 0 rgba(0, 0, 0, 0.2)',
    }}
      >Workout Log</h1>

        <div className='bg-blue-200 p-6 rounded-lg shadow-lg'>
          <p className='text-xl font-semibold mb-4 text-blue-900'>Create a Workout</p>
          <form className='grid grid-row-6 items-center text-black'>
            <div className='flex items-center mb-4'>
              <label  className="w-40 text-left pr-4 text-blue-800">Exercise Name</label>
              <input 
              value={newItem.name}
              onChange={(e)=>setNewItem({...newItem,name:e.target.value})}
              className="flex-grow p-2 border border-blue-500 rounded" type="text" placeholder="exercise" />
            </div>
            <div className='flex items-center mb-4'>
              <label className="w-40 text-left pr-4 text-blue-800">Number of sets</label>
              <input  
              value={newItem.sets}
              onChange={(e)=>setNewItem({...newItem,sets:e.target.value})}
              className="flex-grow p-2 border border-blue-500 rounded" type="text" placeholder="sets" />
            </div>
            <div className='flex items-center mb-4'>
              <label  className="w-40 text-left pr-4 text-blue-800">Number of reps</label>
              <input
              value={newItem.reps}
              onChange={(e)=>setNewItem({...newItem,reps:e.target.value})}
              className="flex-grow p-2 border border-blue-500 rounded" type="text" placeholder="reps" />
            </div>
            <div className='flex items-center mb-4'>
              <label  className="w-40 text-left pr-4 text-blue-800">Time of the Exercise</label>
              <input 
              value={newItem.duration}
              onChange={(e)=>setNewItem({...newItem,duration:e.target.value})}
               className="flex-grow p-2 border border-blue-500 rounded" type="text" placeholder="duration" />
            </div>
            <div className='flex items-center p-3'>
              <div className='w-40'></div> 
              <button 
              onClick={additem}
              className="flex-grow p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">Submit</button>

            </div>
          </form>
          <ul >
          {items.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg p-4 mb-4  justify-between transition-all duration-100 transform hover:scale-105 hover:shadow-lg ">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-700">X</button>
            </div>
            <p>Sets: {item.sets}</p>
            <p>Reps: {item.reps}</p>
            <p>Duration: {item.duration} minutes</p>
          </div>
        ))}

          </ul>
          {items.length < 1 ? (' '):(
            <div className="flex justify-between p-3">
              <span >Total Duration</span>
              <span>{total} minutes</span>
              </div>
          )}
        </div>
      </div>
    </main>
  );
}

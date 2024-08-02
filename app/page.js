"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDoc,
  QuerySnapshot,
  onSnapshot,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import "font-awesome/css/font-awesome.min.css";
import { Home as HomeIcon, Search } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";

export default function Home() {
  const [items, setItems] = useState([
    // { name: 'run', sets: 5, reps: 5, duration: 50 },
    // { name: 'run', sets: 5, reps: 5,  duration: 50 },
    // { name: 'run', sets: 5, reps: 5, duration: 50 },
  ]);
  const [newItem, setNewItem] = useState({
    name: "",
    sets: "",
    reps: "",
    duration: "",
  });

  const [total, setTotal] = useState(0);

  //Add
  const additem = async (e) => {
    e.preventDefault();
    if (
      newItem.name !== "" &&
      newItem.sets !== "" &&
      newItem.reps !== "" &&
      newItem.duration !== ""
    ) {
      //setItems([...items,newItem]);

      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        sets: newItem.sets.trim(),
        reps: newItem.reps.trim(),
        duration: newItem.duration,
      });
      setNewItem({ name: "", sets: "", reps: "", duration: "" });
    }
  };

  //Read
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let itemArr = [];
      let total2 = 0;

      QuerySnapshot.forEach((doc) => {
        const data = doc.data();
        itemArr.push({ ...data, id: doc.id });
        total2 += Number(data.duration);
      });

      setItems(itemArr);
      setTotal(total2);
    });
    return () => unsub();
  }, []);

  //Delete
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  //home page

  return (
    <main className="flex ">
      <div
        className="bg-blue-200 p-6 rounded-lg shadow-lg my-44 z-10 ml-20 flex flex-col justify-between"
        style={{
          height: "50rem",
          width: "8rem",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "rgba(255, 255, 255, 0.1)",
          marginTop: "5.5rem", 
        }}
      >
        <div className="flex-grow">
          <a href="/" className="flex items-center justify-center p-5">
            <HomeIcon fontSize="large" sx={{ color: "white" }} />
          </a>
          <a href="/template" className="flex items-center justify-center p-5">
            <Search fontSize="large" sx={{ color: "white" }} />
          </a>
        </div>

        <a href="/about" className="flex items-center justify-center p-5">
          <Logout className="flip" fontSize="large" sx={{ color: "white" }} />
        </a>
      </div>

      <div className="flex-grow flex flex-col items-center sm:p-24 p-4">
        <div
          className="z-10 max-w-5xl w-full rounded items-center justify-between font-mono text-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <h1
            className="text-5xl p-4 text-center text-white font-bold uppercase"
            style={{
              textShadow:
                "2px 2px 0 rgba(0, 0, 0, 0.3), 4px 4px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            Workout Log
          </h1>

          <div className=" p-6 rounded-lg shadow-lg">
            <p className="text-xl font-bold mb-4 text-white">
              Create a Workout
            </p>
            <form className="grid grid-row-6 items-center text-black">
              <div className="flex items-center mb-4">
                <label className="w-40 text-left pr-4  text-white font-semibold">
                  Exercise Name
                </label>
                <input
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="flex-grow p-2 border border-blue-500 rounded"
                  type="text"
                  placeholder="exercise"
                />
              </div>
              <div className="flex items-center mb-4">
                <label className="w-40 text-left pr-4 text-white font-semibold">
                  Number of sets
                </label>
                <input
                  value={newItem.sets}
                  onChange={(e) =>
                    setNewItem({ ...newItem, sets: e.target.value })
                  }
                  className="flex-grow p-2 border border-blue-500 rounded"
                  type="text"
                  placeholder="sets"
                />
              </div>
              <div className="flex items-center mb-4">
                <label className="w-40 text-left pr-4 text-white font-semibold">
                  Number of reps
                </label>
                <input
                  value={newItem.reps}
                  onChange={(e) =>
                    setNewItem({ ...newItem, reps: e.target.value })
                  }
                  className="flex-grow p-2 border border-blue-500 rounded"
                  type="text"
                  placeholder="reps"
                />
              </div>
              <div className="flex items-center mb-4">
                <label className="w-40 text-left pr-4 text-white  font-semibold">
                  Time of the Exercise
                </label>
                <input
                  value={newItem.duration}
                  onChange={(e) =>
                    setNewItem({ ...newItem, duration: e.target.value })
                  }
                  className="flex-grow p-2 border border-blue-500 rounded"
                  type="text"
                  placeholder="duration"
                />
              </div>
              <div className="flex items-center p-3">
                <div className="w-40" 
                 
                ></div>
               <button
              onClick={additem}
              className="flex-grow p-2 font-semibold text-black rounded transition duration-200"
              style={{
                backgroundColor: "rgba(138, 43, 226, 0.1)",
                border: "rgba(255, 255, 255, 0.1)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#7C3AED"; // Equivalent to violet-600
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(138, 43, 226, 0.6)";
              }}
            >
              Submit
            </button>
              </div>
            </form>
            <ul className="h-60 overflow-y-auto overflow-x-hidden">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="  bg-white shadow-lg rounded-lg p-4 mb-4  justify-between transition-all duration-100 transform hover:scale-95 hover:shadow-lg "
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      X
                    </button>
                  </div>
                  <p>Sets: {item.sets}</p>
                  <p>Reps: {item.reps}</p>
                  <p>Duration: {item.duration} minutes</p>
                </li>
              ))}
            </ul>
            {items.length < 1 ? (
              " "
            ) : (
              <div className="flex justify-between p-3">
                <span>Total Duration</span>
                <span>{total} minutes</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Home as HomeIcon, Search } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";

export default function Template() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      const itemArr = [];
      QuerySnapshot.forEach((doc) => {
        const data = doc.data();
        itemArr.push({ ...data, id: doc.id });
      });
      setItems(itemArr);
    });
    return () => unsub();
  }, []);

  //invoke items
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //delete
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };
  return (
    <main className="flex items-center justify-center min-h-screen ">
      <div
        className="bg-blue-200 p-6 ml rounded-lg shadow-lg my-44 z-10 ml-20 flex flex-col justify-between"
        style={{
          height: "41rem",
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
          className="flex flex-col items-center justify-center rounded-xl w-full max-w-2xl p-6 shadow-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "rgba(255, 255, 255, 0.1)"
          }}
        >
          <h1 className="text-2xl font-bold text-center text-white mb-4">
            Workout Search
          </h1>
          <Box
            sx={{
              position: "relative",
              borderRadius: 1,
              backgroundColor: "#f0f8ff",
              border: "1px solid #007bff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: 600,
              marginBottom: 4,
            }}
          >
            <InputBase
              placeholder="Search a Workout..."
              inputProps={{ "aria-label": "search" }}
              sx={{
                padding: "10px",
                width: "100%",
                borderRadius: "4px",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton
              type="submit"
              sx={{
                p: "10px",
                position: "absolute",
                right: 0,
                color: "#007bff",
              }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Box>

          <ul className="w-full h-60 overflow-y-auto overflow-x-hidden rounded-lg border border-blue-300 bg-white shadow-inner">
            {filteredItems.map((item) => (
              <li
                key={item.id}
                className="bg-blue-50 shadow-lg rounded-lg p-4 mb-4 justify-between transition-all duration-100 transform hover:scale-95 hover:shadow-xl"
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
            {filteredItems.length === 0 && (
              <li className="text-center text-gray-500 p-4">
                No workouts found.
              </li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

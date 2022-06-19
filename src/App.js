import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import TranslationScreen from "./components/translationscreen/TranslationScreen";

function App() {
  console.log("login screen: ");
  localStorage.setItem("users", JSON.stringify(users))
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/translation" element={<TranslationScreen/>} />
      </Routes>
    </div>
  );
}

export default App;




var users=[
	{"email" : "abc@gmail.com", "password" : "123"},
	{"email" : "xyz@gmail.com", "password" : "456"},
]
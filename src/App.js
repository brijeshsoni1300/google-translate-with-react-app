import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import TranslationScreen from "./components/translationscreen/TranslationScreen";

function App() {
  
  // We are setting users in localstorage as they are the registered users already in our system
  localStorage.setItem("users", JSON.stringify(users))
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/translation" element = {<TranslationScreen/>} />
      </Routes>
    </div>
  );
}

export default App;





var users=[
	{"email" : "abc@gmail.com", "password" : "123"},
	{"email" : "xyz@gmail.com", "password" : "456"},
]
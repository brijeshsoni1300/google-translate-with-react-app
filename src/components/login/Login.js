import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var navigate = useNavigate();
  const [counter, setCounter] = useState(0);

  function doesUserExist(email) {
    var users = JSON.parse(localStorage.getItem("users"));
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return true;
      }
    }
    return false;
  }
  function passwordCorrect(email, password) {
    var users = JSON.parse(localStorage.getItem("users"));
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        return true;
      }
    }
    return false;
  }
  function handlesubmit(e) {
    e.preventDefault();
    if (doesUserExist(email)) {
      if (passwordCorrect(email, password)) {
		localStorage.setItem("isUserLoggedIn", true);
        navigate("/");
        setCounter(0);
      } else {
        setCounter(counter + 1);
        alert("Password is incorrect for "+ counter+ " time");
      }
    } else {
      alert("User does not exist");
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          handlesubmit(e);
        }}
      >
        Enter Email: <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" />
        <br />
        Enter Password: <input onChange={(e)=>setPassword(e.target.value)} type="text" name="password" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;

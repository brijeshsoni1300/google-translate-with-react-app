import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Login component
 * If user is not logged in then he will be redirected to login page every time till he dint
 * @returns {JSX.Element}
 * @method handlesubmit
 * @method doesUserExist
 * @method passwordCorrect
 */

function Login() {
  var navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(0);

  // checks if user exists or not
  function doesUserExist(email) {
    var users = JSON.parse(localStorage.getItem("users"));
    // done by checking if the email is present in the registered users list
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) return true;
    }
    return false;
  }

  // checks if entered password is correct or not
  function passwordCorrect(email, password) {
    var users = JSON.parse(localStorage.getItem("users"));
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password)
        return true;
    }
    return false;
  }

  function handlesubmit(e) {
    e.preventDefault();
    if (doesUserExist(email)) {
      if (passwordCorrect(email, password)) {
        // if user is logged in then we will set the flag to true
        localStorage.setItem("isUserLoggedIn", true);
        navigate("/");
        setCounter(0);
      } else {
        // if password is incorrect then we will increment the counter
        // and display the error message with the counter
        setCounter(counter + 1);
        alert("Password is incorrect for " + counter + " time");
      }
    } else {
      // in case user dosent exist
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
        Enter Email:
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
        />
        <br />
        Enter Password:
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          name="password"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;

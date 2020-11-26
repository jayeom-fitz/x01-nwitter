import React, { useState } from "react";
import { authService } from "../fbase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {target: {name, value}} = event;

    if(name === "email") {
      setEmail(value);
    }else if(name === "password") {
      setPassword(value);
    }
  }

  const onSubmit = async(event) => {
    event.preventDefault();

    try {
      let data;
      if(newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password);
      }else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  }

  const toggleAccount = () => setNewAccount((prev) => !prev);
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" required onChange={onChange}/>
        <input name="password" type="password" placeholder="Password" required onChange={onChange}/>
        <input type="submit" value={newAccount ? "Create Account" : "Login"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Create Account" : "Login"}</span>
    </div>
  );
};

export default AuthForm;
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import loginimage from "./image/login.png";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <div
      className="login"
      style={{
        backgroundImage: `url(${loginimage})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="login__container">
        <div>
          <h1
            style={{
              fontSize: 50,
              color: "white",
              backgroundColor: "#783F04",
              borderRadius: 20,
              width: "100%",
              padding: "5px 5px",
            }}
          >
            {" "}
            Cafe Gamal{" "}
          </h1>
          <br />
          <span
            style={{
              fontSize: 13,
              color: "white",
              backgroundColor: "#783F04",
              borderRadius: 20,
              padding: "10px 10px",
            }}
          >
            
            Developed By Omar Abdallah
          </span>
        </div>
        <br />
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
          style={{
            fontSize: 30,
            color: "white",
            backgroundColor: "#783F04",
            borderRadius: 20,
            cursor:"pointer"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

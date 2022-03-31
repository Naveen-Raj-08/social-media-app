import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../config/firebase";

export const Signup = () => {
  const [Show, setShow] = useState(true);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleUserName = (e) => {
    let name = e.target.value;
    setName(name.trim());
  };
  const handleUserMail = (e) => {
    let email = e.target.value;
    setEmail(email.trim());
  };
  const handleUserPassword = (e) => {
    let password = e.target.value;
    setPassword(password.trim());
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!Name && !Email && !Password) {
      alert("Don't leave it as blank!!!");
    } else {
      registerWithEmailAndPassword(Name, Email, Password);
      navigate("/login");
    }
  };
  useEffect(() => {
    if (loading) return;
  }, [user, loading]);

  return (
    <>
      <div className="form">
        <h2 className="display-5 text-capitalize">Sign up</h2>
        <form className="pt-2" onSubmit={handleRegister} autoComplete="off">
          <div className="fieldset">
            <input
              className="input"
              type="text"
              placeholder="Enter your name.."
              onChange={handleUserName}
            />
            <input
              className="input"
              type="email"
              placeholder="Enter your Email.."
              onChange={handleUserMail}
            />
            <input
              className="input"
              type="password"
              placeholder="Enter the pasword.."
              onChange={handleUserPassword}
            />
          </div>

          <div className="d-flex">
            <button className="btn btn-primary" type="submit">
              Signup
            </button>
            or
            <button
              className="btn btn-secondary o-auth"
              type="button"
              onClick={signInWithGoogle}
            >
              Login with google
            </button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

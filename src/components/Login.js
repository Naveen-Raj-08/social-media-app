import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../config/firebase";

export const Login = () => {
  const [UserMail, setUserMail] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const handleuseremail = (e) => {
    setUserMail(e.target.value);
  };
  const handleuserpassword = (e) => {
    setUserPassword(e.target.value);
  };
  const handlelogin = (e) => {
    logInWithEmailAndPassword(UserMail, UserPassword);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
  }, [user, loading, error]);

  return (
    <div className="form">
      <h2 className="display-5 text-capitalize">Login</h2>
      <form className="pt-2" onSubmit={handlelogin} autoComplete="off">
        <div className="fieldset">
          <input
            className="input"
            type="email"
            placeholder="Enter your email"
            onChange={handleuseremail}
          />
          <input
            className="input"
            type="password"
            placeholder="Enter the pasword.."
            onChange={handleuserpassword}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link> now.
        </p>
      </form>
    </div>
  );
};

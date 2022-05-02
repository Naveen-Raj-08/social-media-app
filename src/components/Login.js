import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { DB } from "../config/firebase";
import { validateUser } from "./Validation";

export const Login = () => {
  const [UserMail, setUserMail] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [Users, setUsers] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    
    fetchPost();
  }, [Users]);

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(DB, "users"));
    const users = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      users.push({ id: doc.id, data: doc.data() });
    });
    setUsers(users);
  };
  const handleuseremail = (e) => {
    setUserMail(e.target.value);
  };
  const handleuserpassword = (e) => {
    setUserPassword(e.target.value);
  };
  const handlelogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const userAvailable = validateUser(Users, UserMail, UserPassword);
    if (userAvailable) {
      setTimeout(() => {
        setUserMail("");
        setUserPassword("");
        setLoading(false);
        localStorage.setItem("isAuth", true);
        navigate("/home");
      }, 1500);
    } else {
      setError("Man check your credentials.");
      setLoading(false);
    }
  };
  return (
    <>
      <title>Login Page</title>
      <div className="form">
        <h2 className="display-5 text-capitalize">Login</h2>
        {!Error ? (
          <p className="form-error"></p>
        ) : (
          <p className="form-error">{Error}</p>
        )}
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
          <button
            className={
              Loading === true ? "btn btn-primary disabled" : "btn btn-primary"
            }
            type="submit"
          >
            {Loading === true ? (
              <span>
                <span className="spinner-border spinner-border-sm "></span>
                Checking
              </span>
            ) : (
              <span>Login</span>
            )}
          </button>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link> now.
          </p>
        </form>
      </div>
    </>
  );
};

import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DB } from "../config/firebase";
import { validateEmail, validatePassword, validatePhone } from "./Validation";
export const Signup = () => {
  const [Loading, setLoading] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(null);

  const navigate = useNavigate();

  const handleUserName = (e) => {
    let name = e.target.value;
    setName(name.trim());
  };
  const handleUserMail = (e) => {
    let email = e.target.value;
    setEmail(email.trim());
  };
  const handlePhone = (e) => {
    let phone = e.target.value;
    let num = phone.replace(/[^0-9]/g, "");
    setPhone(num);
  };
  const handleUserPassword = (e) => {
    let password = e.target.value;
    setPassword(password.trim());
  };

  const resetFields = () => {
    setEmail("");
    setPhone("");
    setPassword("");
    setName("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let userData = {
      Username: Name,
      Userphone: Phone,
      Usermail: Email,
      Userpassword: Password,
    };
    if (!Phone && !Email && !Password && !Name) {
      setError("Please fill the form and get the user access");
    } else {
      if (!Phone || !Email || !Password) {
        setError("Please fill the rest of the fileds");
      } else {
        if (validatePhone(Phone)) {
          console.log(validatePhone(Phone));
          if (validateEmail(Email)) {
            console.log(validateEmail(Email));
            if (validatePassword(Password)) {
              console.log(validatePassword(Password));
              console.log("Valid User");
              setLoading(true);
              setTimeout(() => {
                addUser(userData);
                resetFields();
                setLoading(false);
                e.target.reset();
                navigate("/login");
              }, 1500);
              setError(null);
            } else {
              setError("Please enter the strong password");
            }
          } else {
            setError("Please enter the correct formate of Email");
          }
        } else {
          setError("Please enter the correct phone number");
        }
      }
    }
  };

  const addUser = async (data) => {
    const docRef = await addDoc(collection(DB, "users"), data);
    console.log("Document written with ID: ", docRef.id);
    localStorage.setItem("userID", JSON.stringify(docRef.id));
  };

  return (
    <>
      <title>Signup Page</title>
      <div className="form">
        <h2 className="display-5 text-capitalize">Sign up</h2>
        {!Error ? (
          <p className="form-error"></p>
        ) : (
          <p className="form-error">{Error}</p>
        )}
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
              type="tel"
              value={Phone}
              placeholder="Enter your Phone.."
              onChange={handlePhone}
              maxLength="10"
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

          <div className="d-flex justify-content-center">
            <button
              className={
                Loading === true
                  ? "btn btn-primary disabled"
                  : "btn btn-primary"
              }
              type="submit"
            >
              {Loading === true ? (
                <span>
                  <span className="spinner-border spinner-border-sm "></span>{" "}
                  Creating User
                </span>
              ) : (
                <span>Signup</span>
              )}
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

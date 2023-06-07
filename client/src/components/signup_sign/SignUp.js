// import { Divider } from '@mui/material';
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signup.css";

const Signup = () => {
  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  // console.log(udata);

  const adddata = (e) => {
    const { name, value } = e.target;
    // console.log(name,value);

    setUdata((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = udata;
    const res = await fetch("register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        email,
        mobile,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      // alert("no data");
      toast.warn("invalid details!",{
        position:"top-center"
      })
    } else {
      toast.success("data Successfully added!",{
        position:"top-center"
      })
      setUdata({...udata,fname:"",email:"",mobile:"",password:"",cpassword:""})
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./af.png" alt="signupimg" />
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Create account</h1>
            <div className="form_data">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                name="fname"
                onChange={adddata}
                value={udata.fname}
                id="name"
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                onChange={adddata}
                value={udata.email}
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="mobile">Mobile number</label>
              <input
                type="number"
                name="mobile"
                onChange={adddata}
                value={udata.mobile}
                id="mobile"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={adddata}
                value={udata.password}
                id="password"
                placeholder="At least 6 characters"
              />
            </div>
            <div className="form_data">
              <label htmlFor="passwordg">Password again</label>
              <input
                type="password"
                name="cpassword"
                onChange={adddata}
                value={udata.cpassword}
                id="passwordg"
              />
            </div>
            <button type="submit" className="signin_btn" onClick={senddata}>
              Continue
            </button>

            <div className="signin_info">
              <p>Already have an account?</p>
              <NavLink to="/login">Sign in</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Signup;

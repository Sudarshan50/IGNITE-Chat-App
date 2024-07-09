import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`http://localhost:3000/api/v1/user/register`, user,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if(res.data.sucess)
      {
        navigate("/login");
        toast.success("User registered successfully");
      }

    }catch(err)
    {
      toast.error(err.response.data.message);
      console.log(err)
    }
    setUser({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  const handleCheckBox = (gender) => {
    setUser({ ...user, gender });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6  rounded-lg shadow-md h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-black">Sign Up</h1>
        <form onSubmit={submitHandler} action="submit">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="John Doe"
            ></input>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="John Doe"
            ></input>
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter the password"
            ></input>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter the confirm password"
            ></input>
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                value={user.gender}
                checked={user.gender === "male"}
                onChange={() => handleCheckBox("male")}
                type="checkbox"
                className="checkbox checkbox-primary mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                value={user.gender}
                checked={user.gender === "female"}
                onChange={() => handleCheckBox("female")}
                type="checkbox"
                className="checkbox checkbox-primary mx-2"
              />
            </div>
          </div>
          <Link to="/login" className="text-black my-2">
            Already have an account?
          </Link>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full mt-2  border-slate-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

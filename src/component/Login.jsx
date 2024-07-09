import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:3000/api/v1/user/login", user,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      navigate("/");
      dispatch(setAuthUser(res.data));
      toast.success("User logged in successfully");

    }catch(err)
    {
      toast.error(err.response.data.message);
      console.log(err)
    }
    setUser({
      userName: "",
      password: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6  rounded-lg shadow-md h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-black">Sign Up</h1>
        <form onSubmit= {submitHandler}action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter your username"
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
          <Link to="/register" className="text-black p-2 my-2">Don't have an account?</Link>
          <div>
            <button type="submit" className="btn btn-primary w-full mt-2 my-2 border-slate-700">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

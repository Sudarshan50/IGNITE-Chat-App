import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./component/SignUp";
import HomePage from "./component/HomePage";
import Login from "./component/Login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUser } from "./redux/userSlice";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
function App() {
  const { authUser } = useSelector((store) => store.user);  
  const {socket} = useSelector((store) => store.socket); 
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socket = io(`http://localhost:3000`, {
        query:{
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));
      socket.on('getOnlineUsers', (users) => {
        dispatch(setOnlineUser(users));
      });
      return ()=>socket.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;

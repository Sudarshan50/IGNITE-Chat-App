import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useOtherUser = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    const otherUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:3000/api/v1/user/`);
        // console.log(res);
        dispatch(setOtherUsers(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    otherUser();
  }, []);
};

export default useOtherUser;

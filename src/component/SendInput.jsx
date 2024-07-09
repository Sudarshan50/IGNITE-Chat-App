import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {setMessages} from "../redux/messageSlice";
const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  console.log(messages);
  const onSubmitHadler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/message/send/${selectedUser._id}`,
        { message: message},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data.newMessage.message);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (err) {
      console.log(err);
    }
    setMessage("");
  };

  return (
    <form onSubmit={onSubmitHadler} className="px-4 my-3">
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className=" py-3 border border-zinc-500 text-sm rounded-lg w-full bg-gray-600 text-white"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="btn absolute flex inset-y-0 end-0 items-center"
        >
          <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
            <path d="M15.964.686a.5.5 0 00-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 00-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 015.026-4.47L15.964.686zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 00-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178z" />
            <path d="M16 12.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-3.5-2a.5.5 0 00-.5.5v1h-1a.5.5 0 000 1h1v1a.5.5 0 001 0v-1h1a.5.5 0 000-1h-1v-1a.5.5 0 00-.5-.5z" />
          </svg>
          Send
        </button>
      </div>
    </form>
  );
};

export default SendInput;

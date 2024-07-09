import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({message}) => {
  const scroll = useRef();
  const {authUser,selectedUser} = useSelector(store => store.user)
  // console.log(authUser);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div ref = {scroll} className={`${authUser?._id === message?.senderId ? 'chat-end':'chat-start'} chat `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={message?.senderId === authUser?._id ? authUser?.profilePhoto :selectedUser?.profilePhoto} 
          />
        </div>
      </div>
      <div className="chat-header text-white">
        {message?.senderId === authUser?._id ? authUser?.fullName :selectedUser?.fullName}
        <time className="text-xs opacity-50 mx-2 text-white ">
          {new Date(message?.createdAt).toLocaleTimeString()}{" "}
        </time>
      </div>
      <div className="chat-bubble">{message?.message}</div>
    </div>
  );
};

export default Message;

import React from "react";
import Message from "./Message";
import useRealTimeMessage from "../hooks/useRealTimeMessage";
import { useSelector } from "react-redux";
import usegetMessages from "../hooks/usegetMessages";

const Messages = () => {
  // useRealTimeMessage();
  usegetMessages();
  const { messages } = useSelector((store) => store.message);
  console.log(messages);
  return (
    <div className=" px-4 flex-1 overflow-auto">
      {messages?.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

export default Messages;

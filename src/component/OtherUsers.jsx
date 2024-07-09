import React from "react";
import OtherUser from "./OtherUser";
import useOtherUser from "../hooks/useOtherUser";
import { useSelector } from "react-redux";
const OtherUsers = () => {
  useOtherUser(); //hook call..
  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) return; // early return if no data
  return (
    <div className="overflow-auto flex-1">
      {otherUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;

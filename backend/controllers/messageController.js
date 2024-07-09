import { Conversation } from "../models/coversationModel.js";
import { Message } from "../models/messageModel.js";
import { io,getRecieverSocketId } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
    try{
        const senderId = req.id;
        const reciverId = req.params.id;
        const message = req.body.message;
        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] },
        })
        if(!gotConversation)
        {
            gotConversation = await Conversation.create({
                participants: [senderId, reciverId],
            })
        }
        const newMessage = await Message.create({
            senderId,
            reciverId,
            message,
        });
        if(newMessage){
            gotConversation.message.push(newMessage._id);
        }
        await gotConversation.save();
        //Socket.io
        const recieverSocketId = getRecieverSocketId(reciverId);
        if(recieverSocketId)
        {
            io.to(recieverSocketId).emit('newMessage', newMessage);
        }
        return res.status(200).json({ newMessage });
    }catch(err)
    {
        console.log(err);
    }
}
export const getMessage = async (req, res) => {
    try{
        const reciverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] },
        }).populate("message");
        return res.status(200).json(conversation?.message);
    }catch(err)
    {
        console.log(err);
    }
}
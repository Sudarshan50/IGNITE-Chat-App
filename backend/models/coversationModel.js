import mongoose from "mongoose";

const conversationModel = mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    message:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    }]
},{timestamps:true});
export const Conversation = mongoose.model("Conversation",conversationModel);
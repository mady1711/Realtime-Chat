const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = expressAsyncHandler(async (req,res) => {
    const {  content, chatID } = req.body;
    if(!content || !chatID){
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatID,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIDAndUpdate(req.body.chatID,{
            latestMessage: message,
        })

        res.json(message);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});

const allMessages=expressAsyncHandler(async (req,res)=> {
    try {
        const messages = await Message.find({chat: req.params.chatID}).populate("sender","name pic email").populate("chat");
        
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = { sendMessage , allMessages};
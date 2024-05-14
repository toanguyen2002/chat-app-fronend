import React from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io("http://localhost:5678")
function ChatBox({ props }) {
    const nav = useNavigate()
    const connectRoom = () => {
        nav("chat/" + props._id + "&" + props.chatName)
        socket.emit("join chat", props._id);
    }
    return (
        <div className='chat-box' onClick={connectRoom}>
            <p className='chat-icon'>{props.chatName[0]}</p>
            <p className='chat-name'>{props.chatName}</p>
            {props.lastMessage ? props.lastMessage.typeMess == 'text' ? <p className='chat-title'>{props.lastMessage.content}</p> : <p className='chat-title'>hình ảnh</p> : <p></p>}
            <p className='chat-time'>{props.timeSend}</p>
            {console.log()}
        </div>
    )
}

export default ChatBox
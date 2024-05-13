import React from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
const IP = "http://54.174.184.179:5678"
// const socket = io("http://localhost:5678")
function ChatBox({ props }) {
    const nav = useNavigate()
    const renderBoxChat = () => {
        // console.log(socket);
        if (!props.lastMessage) {
            return (
                <></>
            )
        } else {
            if (props.lastMessage.typeMess == 'text') {
                return (
                    <p className='chat-title'>{props.lastMessage.content}</p>
                )

            } else if (props.lastMessage.typeMess == 'videoCall') {
                return (
                    <p className='chat-title' style={{ fontWeight: "bold" }}>Cuộc Gọi</p>
                )

            }
            else {
                return (
                    <p className='chat-title' style={{ fontWeight: "bold" }}>Tệp Phương Tiện</p>
                )
            }
        }

        socket.emit("join chat", props._id);
    }
    return (
        <div className='chat-box' onClick={() => nav("chat/" + props._id + "&" + props.chatName)}>
            <p className='chat-icon'>{props.chatName[0]}</p>
            <p className='chat-name'>{props.chatName}</p>
            {renderBoxChat()}
            <p className='chat-time'>{props.timeSend}</p>
            {/* {console.log()} */}
        </div>
    )
}

export default ChatBox
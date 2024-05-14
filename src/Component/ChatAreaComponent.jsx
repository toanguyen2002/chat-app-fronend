import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageComponent from '../ComponentItem/MessageComponent';
import MyMessageConponent from '../ComponentItem/MessageConponentuser';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { myContext } from './MainComponent';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VideocamIcon from '@mui/icons-material/Videocam';
import { io } from 'socket.io-client';
const ENDPOINT = "http://localhost:5678"
var socket = io(ENDPOINT)
export default function ChatAreaComponent() {
    const [contentMess, setContentMess] = useState('')
    const [mess, setMess] = useState([])
    // const { refresh, setRefresh } = useContext(myContext)
    const params = useParams()
    // const messageEndRef = useRef(null)
    const userData = JSON.parse(localStorage.getItem("userData"));
    // const [loading, setLoading] = useState(false)
    // const [renderMess, setRenderMess] = useState(false)
    // const fileRef = useRef()
    // const [imageData, setImageData] = useState([])
    // const textRef = useRef()
    const [chat_id, chat_user] = params.id.split("&");
    //ket noi socket
    useEffect(() => {
        socket.emit("setup", userData)
        socket.on("connect")
    }, [])

    useEffect(() => {
        socket.on("message_recieved", (data) => {
            mess.push(data)
            // setMess(prevMess => [...prevMess, data]);
        })
    }, [socket])
    //send mess img -- 
    // lấy file send về be theo bằng formData để tạo 1 file có tên là fileImage
    // const uploadmultiImage = async () => {
    //     const arrayListImage = Array.from(fileRef.current.files)
    //     const dataImge = []

    //     await Promise.all(arrayListImage.map(async (item) => {
    //         const dataRender = await sendMessImg(item)
    //         dataImge.push(dataRender)
    //     }))
    //     // console.log(dataImge);
    //     const dataSend = await axios.post(
    //         "http://localhost:5678/message/", {
    //         chatId: objectChat,
    //         ImageUrl: dataImge,
    //         typeMess: "Multimedia"
    //     },
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${userData.data.token}`,
    //             }
    //         }
    //     )
    //     socket.emit("new message", dataSend.data)
    //     // socket.emit("render-box-chat", true)
    //     setContentMess("")
    //     setRenderMess(!renderMess)
    //     setMess([...mess, dataSend.data])

    //     // messageEndRef.current.scrollIntoView({ behavior: 'smooth' })

    // }
    // const sendMessImg = async (items) => {
    //     const formData = new FormData();
    //     formData.append('fileImage', items);
    //     try {

    //         const respone = await axios.post("http://localhost:5678/message/messImage",
    //             formData,
    //             {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data"
    //                 }
    //             }

    //         );

    //         return respone.data
    //     } catch (error) {
    //         console.error("Error uploading image:", error);
    //     }

    // };
    const enterMess = async (e) => {
        if (e.key == "Enter" && contentMess) {
            try {
                const dataSend = await axios.post(
                    "http://localhost:5678/message/", {
                    chatId: chat_id,
                    content: contentMess,
                    typeMess: "text"
                },
                    {
                        headers: {
                            // "Content-type": "application/json",
                            Authorization: `Bearer ${userData.data.token}`,
                        }
                    }
                )

                setMess([...mess, dataSend.data])
                socket.emit("new message", dataSend.data)
                // setRenderMess(!renderMess)
                // console.log(dataSend.data);
                messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
                setContentMess("")
            } catch (error) {
                console.log(error);
            }
        }


    }
    const sendMess = async () => {
        if (contentMess) {
            // console.log(true);
            try {
                const dataSend = await axios.post(
                    "http://localhost:5678/message/", {
                    chatId: chat_id,
                    content: contentMess,
                    typeMess: "text"
                },
                    {
                        headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${userData.data.token}`,
                        }
                    }
                )

                setMess([...mess, dataSend.data])
                socket.emit("new message", dataSend.data)
                // setRenderMess(!renderMess)
                // console.log(dataSend.data);
                // setContentMess("")
                messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
            } catch (error) {
                console.log(error);
            }
        }


    }


    return (
        <>
            <div className='chat-area'>
                <div className="chat-area-body" >
                    {mess.map((item, index) => {
                        console.log(item.sender);
                        console.log(userData.data);
                        if (item.sender._id != userData.data._id) {
                            return <MessageComponent props={item} key={index} />

                        }
                        else
                            return <MyMessageConponent props={item} key={index} />

                    })}
                </div>
                {/* <div className="" ref={messageEndRef}></div> */}
                <div className="chat-area-footer">
                    <input onFocus={() => { messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }); }} onKeyDown={enterMess} placeholder='Enter Message....' className='box-input' onChange={(e) => setContentMess(e.target.value)} value={contentMess} />
                    <div className="">

                        <IconButton onClick={sendMess}>
                            <SendIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    )
}

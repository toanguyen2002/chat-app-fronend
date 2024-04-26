import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageComponent from '../ComponentItem/MessageComponent';
import MyMessageConponent from '../ComponentItem/MessageConponentuser';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { myContext } from './MainComponent';
import { io } from 'socket.io-client';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VideocamIcon from '@mui/icons-material/Videocam';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Picker from 'emoji-picker-react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import DeleteAndAddMemberModal from './DeleteAndAddMemberModal'
import ModalAddMember from './ModalAddMember'
import LogoutIcon from '@mui/icons-material/Logout';
const IP = "http://localhost:5678"
var socket = io(IP)


export default function ChatAreaComponent() {
    // const navigate = useNA
    const [contentMess, setContentMess] = useState('')
    const [mess, setMess] = useState([])
    const { refresh, setRefresh } = useContext(myContext)
    const params = useParams()
    const messageEndRef = useRef(null)
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [loading, setLoading] = useState(false)
    const [renderMess, setRenderMess] = useState(false)
    const [showFormEmoji, setShowFormEmoji] = useState(false)
    const fileRef = useRef()
    const [imageData, setImageData] = useState([])
    const textRef = useRef()
    const [scrollExecuted, setScrollExecuted] = useState(false);
    const [chat_id, chat_user] = params.id.split("&");
    const [objectChat, setObjectChat] = useState()
    const [chatView, setChatView] = useState(false)

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const [ownGroup, setOwnGroup] = useState('')

    const [showListMem, setShowListMem] = useState(false)
    const [showAddMem, setShowAddMem] = useState(false)

    const nav = useNavigate()

    //call video
    // const [stream, setStream] = useState();
    // const [reciverCall, setReciverCall] = useState();
    // const [name, setName] = useState();
    // const [callAccepted, setCallAccepted] = useState(false)
    // const [callEnd, setCallEnd] = useState(false)
    // const [callerSignal, setCallerSignal] = useState();
    // const [caller, setCaller] = useState();
    // const myVideo = useRef()
    // const userVideo = useRef()
    // const connectionRef = useRef()



    const selectEmojiIcon = (emojiObject) => {
        const emoji = emojiObject.emoji
        setContentMess(contentMess + emoji)
    }

    //chạy xuống bottom mỗi khi có tin nhắn mới
    useEffect(() => {
        setObjectChat(chat_id)
    }, [chat_id])

    //ket noi socket
    useEffect(() => {
        socket.emit("setup", userData)
        socket.on("connect", () => {
            // socket.on("disconnect", () => {
            //     console.log("mess", socket);
            //     console.log(`Socket disconnected: ${socket.id}`);
            // });
        })
    }, [])
    const renderChat = async () => {
        try {
            // setLoading(true)
            const dataMessage = await axios.get(`${IP}/message/${objectChat}`, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                }
            })
            setTimeout(() => {
                setMess(dataMessage.data)
            }, 1500)
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        renderChat()

    }, [objectChat, mess, refresh, socket])

    // useEffect(() => {
    //     socket.on("message recieved", (data) => {
    //         // console.log(objectChat === data.chat._id);
    //         if (objectChat === data.chat._id) {
    //             // renderChat()
    //             setMess([...mess, data])
    //             // console.log(1);
    //         } else {
    //             console.log(data);
    //         }
    //     })
    // })



    //send mess img -- 
    // lấy file send về be theo bằng formData để tạo 1 file có tên là fileImage
    const uploadmultiImage = async () => {
        const arrayListImage = Array.from(fileRef.current.files)


        const dataImge = []

        await Promise.all(arrayListImage.map(async (item) => {
            const dataRender = await sendMessImg(item)
            dataImge.push(dataRender)
        }))
        // console.log(dataImge);
        const dataSend = await axios.post(
            `${IP}/message/`, {
            chatId: objectChat,
            ImageUrl: dataImge,
            typeMess: "Multimedia"
        },
            {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                }
            }
        )
        socket.emit("new message", dataSend.data)
        socket.emit("render-box-chat", true)
        // setContentMess("")
        // setRenderMess(!renderMess)
        // setMess([...mess, dataSend.data])
        // messageEndRef.current.scrollIntoView({ behavior: 'smooth' })

    }
    const sendMessImg = async (items) => {
        const formData = new FormData();
        formData.append('fileImage', items);
        try {

            const respone = await axios.post(`${IP}/message/messImage`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

            );

            return respone.data
        } catch (error) {
            console.error("Error uploading image:", error);
        }

    };
    const enterMess = async (e) => {
        if (e.key == "Enter" && contentMess) {
            try {
                const dataSend = await axios.post(
                    `${IP}/message/`, {
                    chatId: chat_id,
                    content: contentMess,
                    typeMess: "text"
                },
                    {
                        headers: {
                            Authorization: `Bearer ${userData.data.token}`,
                        }
                    }
                )
                socket.emit("new message", dataSend.data)
                socket.emit("render-box-chat", true)

                // setMess([...mess, dataSend.data])
                setContentMess("")
                // setRenderMess(!renderMess)
            } catch (error) {
                console.log(error);
            }
        }
        // console.log(e);


    }
    const sendMess = async () => {
        if (contentMess) {
            // console.log(true);
            try {
                const dataSend = await axios.post(
                    `${IP}/message/`, {
                    chatId: chat_id,
                    content: contentMess,
                    typeMess: "text"
                },
                    {
                        headers: {
                            Authorization: `Bearer ${userData.data.token}`,
                        }
                    }
                )
                socket.emit("new message", dataSend.data)
                socket.emit("render-box-chat", true)

                setMess([...mess, dataSend.data])
                // setRenderMess(!renderMess)
                setContentMess("")
                messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
            } catch (error) {
                console.log(error);
            }
        }


    }

    useEffect(() => {
        // ${IP}/chat/fetchChatsById
        const renderChatGroup = async () => {
            // console.log(chat_id);
            try {
                // setLoading(true)
                const dataMessage = await axios.post(`${IP}/chat/fetchChatsById`,
                    {
                        chatId: chat_id
                    }
                    , {
                        headers: {
                            Authorization: `Bearer ${userData.data.token}`,
                        }
                    })
                setChatView(dataMessage.data.isGroup)
                setOwnGroup(dataMessage.data.groupAdmin._id)
                // console.log(dataMessage.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        renderChatGroup()
    }, [chat_id])
    const handleRemoveMember = async () => {
        // notification

        try {
            await axios.post(
                `${IP}/message/`, {
                chatId: chat_id,
                content: `${userData.data.name} đã rời khỏi phòng`,
                typeMess: "notification"
            },
                {
                    headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                    }
                }
            )
            await axios.post(`${IP}/chat/removeUserFromGroup`, {
                chatId: chat_id,
                userId: userData.data._id
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })

            setRefresh(!refresh)
            // socket.emit("render-box-chat", true)
            nav("/app")
        } catch (error) {
            console.log(error);
        }
        console.log(userData.data._id);
    }
    const handleRemoveAll = async () => {
        try {
            const deleteAllUser = await axios.post(`${IP}/chat/removeAllUserFromGroup`, {
                chatId: chat_id,
                // userId: userData.data._id
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })
            setRefresh(!refresh)
            socket.emit("render-box-chat", true)
            nav("/app")
        } catch (error) {
            console.log(error);
        }
    }
    const callUser = async (id) => {
        window.open(`/room/${id}`)
        // console.log(window.location.href.split("/app/chat/")[0] + `/room/${id}`);
        // nav(`/room/${id}`)
        try {
            const dataSend = await axios.post(
                `${IP}/message/`, {
                chatId: chat_id,
                content: window.location.href.split("/app/chat/")[0] + `/room/${id}`,
                typeMess: "videoCall"
            },
                {
                    headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                    }
                }
            )
            socket.emit("new message", dataSend.data)
            socket.emit("render-box-chat", true)
        } catch (error) {
            console.log(error);
        }
        // const peer = new RTCPeerConnection()
        // console.log(peer);

        // const localStream = navigator.mediaDevices.getUserMedia({video:true,audio:false})
    }
    return (
        <><Backdrop open={loading}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
            {open ? <DeleteAndAddMemberModal closemodal={setOpen} prop={{ _id: chat_id}} /> : <></>}
            {showAddMem ? <ModalAddMember closemodal={setShowAddMem} prop={{ _id: chat_id }} /> : <div></div>}

            <div className='chat-area'>
                <div className="chat-area-header">
                    <p className='chat-icon'>{chat_user[0]}</p>

                    <div className="chat-area-text">
                        <p className='chat-name'>{chat_user}</p>
                        {/* <div className="online">online</div> */}
                        {/* <p className='chat-time'>{data.timeSend}</p> */}
                    </div>


                    {
                        chatView ? <>
                            <IconButton onClick={() => setShowAddMem(true)}>
                                <GroupAddIcon />
                            </IconButton>

                            {ownGroup === userData.data._id ? <IconButton onClick={handleOpen}>
                                <ReduceCapacityIcon />
                            </IconButton> : <></>}

                        </> : <></>

                    }
                    {/* <IconButton onClick={() => callUser(chat_id)}>

                             <IconButton onClick={() => setShowListMem(true)}>
                                 <ReduceCapacityIcon />
                            </IconButton>
                        </> : <></>

                    } */}

                    <IconButton onClick={() => callUser(chat_id)}>
                        <VideocamIcon />
                    </IconButton>


                    {chatView ?
                        ownGroup === userData.data._id ? <IconButton onClick={handleRemoveAll}>
                            <DeleteIcon />
                        </IconButton> :
                            <IconButton onClick={handleRemoveMember} >
                                <LogoutIcon />
                            </IconButton> : <></>
                    }

                </div>



                <div className="chat-area-body" >
                    {mess.map((item, index) => {
                        if (item.sender._id != userData.data._id) {
                            if (item.removeWitMe.includes(userData.data._id)) {
                                return <></>
                            }
                            return <MessageComponent props={item} key={index} />
                        }
                        else
                            if (item.removeWitMe.includes(userData.data._id)) {
                                return <></>
                            } else {
                                return <MyMessageConponent props={item} key={index} />
                            }

                    })}
                    {/* <div>a</div> */}
                    <div className="" ref={messageEndRef}></div>
                    <div className="" ref={messageEndRef}></div>
                </div>

                {/* <div className="" ref={messageEndRef}></div> */}

                <div className='emoji-form'>
                    <Picker open={showFormEmoji} onEmojiClick={selectEmojiIcon} />
                </div>
                <div className="chat-area-footer">
                    <input onFocus={() => { messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }); }} onKeyDown={enterMess} ref={textRef} placeholder='Enter Message....' className='box-input' onChange={(e) => setContentMess(e.target.value)} value={contentMess} />
                    <div className="">
                        <IconButton onClick={() => setShowFormEmoji(!showFormEmoji)}>
                            <EmojiEmotionsIcon />
                        </IconButton>
                        <IconButton>
                            <label htmlFor="">
                                <AttachFileIcon />
                                <input onClick={() => console.log(1)} multiple type="file" title='' content='' name='imageData' ref={fileRef} onChange={() => uploadmultiImage()} />
                            </label>
                        </IconButton>
                        <IconButton onClick={sendMess}>
                            <SendIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    )
}

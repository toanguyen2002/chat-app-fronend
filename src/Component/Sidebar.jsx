import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Box, Button, IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import ChatBox from '../ComponentItem/ChatBox';
import ModalComponent from './ModalComponent';
import { myContext } from './MainComponent';
import axios from 'axios';
// import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import ModalChatOne from './ModalChatOne';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuIcon from '@mui/icons-material/Menu';
import { io } from 'socket.io-client';



import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FindAndAddFriendComponent from './FindAndAddFriendComponent';
import FriendAccept from './FriendAccept';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import DeleteAndAddMemberModal from './DeleteAndAddMemberModal';

//${IP}
const IP = "http://44.210.92.52:5678"
const socket = io(IP)
function Sidebar() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openFNC, setOpenFNC] = useState(false)
    const handleOpenFNC = () => setOpenFNC(true);

    const params = useParams()
    // const [chat_id, chat_user] = params.id.split("&");
    const nav = useNavigate()
    const [users, setUsers] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { refresh, setRefresh } = useContext(myContext);
    const [showModal, setShowModal] = useState(false)
    const [showOne, setShowOne] = useState(false)
    const [showListFriend, setShowListFriend] = useState(false)
    const [showListAccept, setShowListAccept] = useState(false)
    const [chatView, setChatView] = useState(false)
    const currentTime = new Date();
    const formattedTime = currentTime.getHours() + ":" + currentTime.getMinutes();


    const [search, setSearch] = useState("")
    const renderChatBox = async () => {
        try {
            const dataRender = await axios.get(`${IP}/chat/`, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })
            setUsers(dataRender.data);
        } catch (error) {

        }
    }
    useEffect(() => {
        // console.log(socket);
        renderChatBox()
    }, [
        refresh, userData.data.token, socket
    ]);


    useEffect(() => {
        const getChat = async () => {
            try {
                const chatData = await axios.get(`${IP}/chat/findChatByName?chatName=${search}`, {
                    headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                    }
                })
                setUsers(chatData.data)
            } catch (error) {

            }

        }
        getChat()
    }, [search])



    const handClick = () => {
        setShowModal(true)

    }
    const handClickOne = () => {
        setShowOne(true)
    }
    const clickToLogout = () => {
        socket.emit("demo", { mes: "demo" })
        nav('/')
    }
    useEffect(() => {
        socket.on("group-rcv", (data) => {
            // console.log("render");
            renderChatBox()
            // setUsers([...users], data)
        })
        socket.on("render-box-chat-rcv", () => {
            renderChatBox()
        })
    }, [socket])
    // useEffect(() => {
    // socket.on("demo-rcv", () => {


    // })

    // }, [socket])

    return (

        <div className='side-bar'>
            <div className="side-header">
                <div>
                    <IconButton onClick={() => setOpen(true)}>
                        <Avatar alt={userData.data.name} src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/411522943_373985608348589_889785018101940738_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEamTt0rJAFTB6RfoXS4ngnxYyL2_YybPbFjIvb9jJs9pt9zhvp6TRX4bZZNJL476Ruij8pCjz8clb5RsQTbvLj&_nc_ohc=a4wxphwpC7cAX-Y_7Id&_nc_ht=scontent.fsgn5-3.fna&cb_e2o_trans=t&oh=00_AfDA9wMo0eBbIVcTT3TWosffHErD26nEGK5TDEw6AXV28g&oe=65ADAABD" sx={{ width: 48, height: 48, backgroundColor: '#1E90FF' }} />
                    </IconButton>

                </div>
                <div >
                    <IconButton onClick={handClickOne}>
                        <PersonAddIcon className='iconColor' />
                    </IconButton>
                    <IconButton onClick={handClick}>
                        <GroupAddIcon className='iconColor' />
                    </IconButton>
                    <IconButton>
                        <PeopleAltIcon onClick={() => setShowListAccept(true)} className='iconColor' />
                    </IconButton>
                    <IconButton>
                        <AddCircleIcon onClick={() => setShowListFriend(true)} className='iconColor' />
                    </IconButton>
                    <IconButton onClick={() => clickToLogout()}>
                        <LogoutIcon className='iconColor' />
                    </IconButton>
                </div>
            </div>
            <div className="side-body">
                <div className="side-search">
                    <SearchIcon />
                    <input placeholder='search' className='search-box' onChange={e => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="side-footer">
                {users.map((item, index) => {
                    if (item.isGroup == false) {
                        // console.log(userData);
                        // console.log(item);
                        if (userData.data._id == item.users[0]._id) {
                            item.chatName = item.users[1].name
                            // console.log(item.users[1].name);
                        }
                        else {
                            item.chatName = item.users[0].name
                        }
                    }
                    return (<div key={index} className="" onClick={() => { }}>
                        <ChatBox props={item} />
                        <div class="separator"></div>
                        {/* {
                            // console.log(chatView.isGroup)
                            item.isGroup ? <>
                                <IconButton>
                                    <GroupAddIcon />
                                </IconButton>
                                <IconButton onClick={() => handleOpenFNC(true)}>
                                    <ReduceCapacityIcon />
                                </IconButton></> : <></>

                        } */}
                    </div>)
                }
                )}
            </div>

            {showModal ? <ModalComponent clockModal={setShowModal} /> : <div></div>}
            {showOne ? <ModalChatOne clockModal={setShowOne} /> : <div></div>}
            {showListFriend ? <FindAndAddFriendComponent closemodal={setShowListFriend} /> : <div></div>}
            {showListAccept ? <FriendAccept closemodal={setShowListAccept} /> : <div></div>}
            {/* {openFNC ? <DeleteAndAddMemberModal closemodal={setOpenFNC} prop={{ _id: "66112bffd488b068ee661544" }} /> : <div></div>} */}

            {/* profile */}
            <Modal open={open} onClose={handleClose}>
                <div className="modal-style">
                    {/* upper */}
                    <div className='modal-upper'>
                        <IconButton>
                            <MenuIcon className='iconColor2' />
                        </IconButton>
                    </div>
                    {/* bottom */}
                    <div className='modal-bottom'>
                        <Avatar alt={userData.data.name} src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/411522943_373985608348589_889785018101940738_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEamTt0rJAFTB6RfoXS4ngnxYyL2_YybPbFjIvb9jJs9pt9zhvp6TRX4bZZNJL476Ruij8pCjz8clb5RsQTbvLj&_nc_ohc=a4wxphwpC7cAX-Y_7Id&_nc_ht=scontent.fsgn5-3.fna&cb_e2o_trans=t&oh=00_AfDA9wMo0eBbIVcTT3TWosffHErD26nEGK5TDEw6AXV28g&oe=65ADAABD" sx={{ width: 80, height: 80, backgroundColor: '#1E90FF', position: 'relative', left: 180, bottom: 50, fontSize: 40 }} />
                        <div className="modal-header">Thông Tin Cá Nhân</div>
                        <div className="modal-body">
                            <div className="modal-body-name">
                                <p>Tên Đăng Nhập: </p> <p>{userData.data.name}</p>
                            </div>
                            <div className="modal-body-email">
                                <p>Email: </p> <p>{userData.data.email}</p>
                            </div>
                            <div className="modal-body-email">
                                <p>Quê Quán: </p> <div><textarea className='input-area'></textarea></div>
                            </div>
                            <div className="modal-body-email">
                                <p>Sở Thích: </p> <div><textarea className='input-area'></textarea></div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <a href='/'>Chỉnh Sửa Thông Tin</a>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* profile */}
        </div >


    )
}

export default Sidebar
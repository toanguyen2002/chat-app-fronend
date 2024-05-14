import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { myContext } from './MainComponent';
import axios from 'axios';
import ChatBox from '../ComponentItem/ChatBox';

import { useNavigate } from 'react-router-dom';
function ModalChatOne({ clockModal }) {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { refresh, setRefresh } = useContext(myContext);
    const [nameUser, setNameUser] = useState("")

    const accessChatOneToOne = async (item) => {

        try {
            const respone = await axios.post(
                "http://localhost:5678/chat/", {
                userId: item._id,
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                }
            }
            )
            console.log(respone.data);
            navigate("chat/" + respone.data._id + "&" + respone.data.users[1].name)
            setRefresh(!refresh)
            console.log(respone.data);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const getUser = async () => {
            const dataUser = await axios.get(`http://localhost:5678/user/fetchUsers?search=${nameUser}`, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })
            setUsers(dataUser.data);
        }
        getUser()
    }, [
        refresh, nameUser
    ]);

    return (
        <div className='modal-container'>
            <div className="modal-title">
                <h3>Kết Nối</h3>
                <IconButton onClick={() => clockModal(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
            <div className="model-header">
                {/* <input placeholder='Nhập Tên Nhóm' onChange={(e) => setNameGroup(e.target.value)} /> */}
                <input name='search' placeholder='nhập tên người dùng' onChange={e => setNameUser(e.target.value)} />
            </div>
            <div className="model-body">
                {users.map((item, index) => (
                    <div
                        key={index} className='modal-chat-box'
                        onClick={() => accessChatOneToOne(item)}>
                        <p className='chat-icon'>{item.name[0]}</p>
                        <p className='chat-name'>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ModalChatOne
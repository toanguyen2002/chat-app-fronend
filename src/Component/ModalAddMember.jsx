import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { myContext } from './MainComponent';
import axios from 'axios';

const IP = "http://localhost:5678"
function ModalAddMember({ closemodal, prop }) {
    const { refresh, setRefresh } = useContext(myContext);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getUser = async () => {
            const dataUser = await axios.post(`${IP}/user/getUserOutCurrentGroupChat`, {
                chatId: prop._id,
                userId: userData.data._id,
                name: userData.data.name
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })

            // setUsers(dataUser.data);
            setUsers(dataUser.data);
        }
        getUser()
    }, [
        prop._id, refresh
    ]);
    const handleAddmem = async (idUser, name) => {
        try {
            await axios.post(
                `${IP}/message/`, {
                chatId: prop._id,
                content: `${userData.data.name} đã thêm ${name} vào phòng`,
                typeMess: "notification"
            },
                {
                    headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                    }
                }
            )
            await axios.post(`${IP}/chat/addUserToGroupChat`, {
                chatId: prop._id,
                userId: idUser
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })
            setRefresh(!refresh)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>

            <div className="get-users-modal2">
                <div className="modal-title">
                    <h3 className='fr-cap4'>Thêm Thành Viên</h3>
                    <IconButton onClick={() => closemodal(false)}>
                        <ClearIcon className='icon4' />
                    </IconButton>
                </div>
                <div className="list-body">
                    {users.map((item, index) => (
                        <>
                            <div className='user-box' >
                                <p className='chat-icon'>{item.name[0]}</p>
                                <p className='chat-name'>{item.name}</p>
                                <div className="btn-group">
                                    {item._id !== userData.data._id ? <button className='btn-style' onClick={() => handleAddmem(item._id, item.name)}>Thêm Vào Nhóm</button> : <></>}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default ModalAddMember
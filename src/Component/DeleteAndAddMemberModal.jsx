import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { myContext } from './MainComponent';
import axios from 'axios';
import UserChatGroupComponent from '../ComponentItem/UserChatGroupComponent';

//${IP}
const IP = "http://54.172.179.189:5678"
function DeleteAndAddMemberModal({ closemodal, prop }) {
    const { refresh, setRefresh } = useContext(myContext);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [users, setUsers] = useState([])
    const [data, setData] = useState([])
    useEffect(() => {
        const getUser = async () => {

            const dataUser = await axios.post(`${IP}/user/getUserFromGroupChat`, {
                chatId: prop._id,
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })

            setUsers(dataUser.data[0].userEntities);
            // console.log(prop);
            // console.log(dataUser.data[0].userEntities);
        }
        getUser()
    }, [
        prop._id, refresh
    ]);
    const handleRemoveMember = async (idUser, name) => {
        // console.log(idUser + name);
        try {
            await axios.post(
                `${IP}/message/`, {
                chatId: prop._id,
                content: `${userData.data.name} đã mời ${name} rời khỏi phòng`,
                typeMess: "notification"
            },
                {
                    headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                    }
                }
            )
            await axios.post(`${IP}/chat/removeUserFromGroup`, {
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
    const showbtnkickmember = (item) => {
        console.log(prop);
        if (item._id !== userData.data._id) {
            return (
                <button className='btn-style' onClick={() => handleRemoveMember(item._id, item.name)}>Xóa Khỏi Nhóm</button>
            )
        }
        // else{
        //     if (item.) {

        //     }
        // }

    }
    return (
        <div>
            <div className="get-users-modal2">
                <div className="modal-title">
                    <h3 className='fr-cap3'>Danh Sách Thành Viên</h3>
                    <IconButton onClick={() => closemodal(false)}>
                        <ClearIcon className='icon4' />
                    </IconButton>
                </div>
                <div className="list-body">
                    {/* {console.log(data)} */}
                    {users.map((item, index) => (
                        <>
                            <div className='user-box' >
                                <p className='chat-icon'>{item.name[0]}</p>
                                <p className='chat-name'>{item.name}</p>
                                <div className="btn-group">
                                    {

                                        showbtnkickmember(item)

                                    }
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default DeleteAndAddMemberModal
import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import UserComponent from '../ComponentItem/UserComponent';
import { myContext } from './MainComponent';

function FriendAccept({ closemodal }) {
    const [users, setUsers] = useState([])
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { refresh, setRefresh } = useContext(myContext);

    useEffect(() => {
        const getUser = async () => {

            const dataUser = await axios.post(`http://localhost:5678/user/getUserwaitAccept`, {
                name: userData.data.name,
                userId: userData.data._id
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })

            setUsers(dataUser.data);

        }
        getUser()
    }, [
        refresh
    ]);
    const handlaccept = async (idUser) => {
        console.log(idUser);
        try {
            await axios.post(`http://localhost:5678/user/acceptFriend`, {
                userid: userData.data._id,
                friendId: idUser
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })
            setRefresh(!refresh)
        } catch (error) {
            console.log(error);
        }
        console.log(idUser);
    }
    return (
        <div>
            {console.log(users)}
            <div className="get-users-modal">
                <div className="modal-title">
                    <h3 className='fr-cap2'>Lời Mời Kết Bạn</h3>
                    <IconButton onClick={() => closemodal(false)}>
                        <ClearIcon />
                    </IconButton>
                </div>
                <div className="list-body">
                    {users.map((item, index) => (
                        <UserComponent props={item} callBackFnc={handlaccept} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}


export default FriendAccept
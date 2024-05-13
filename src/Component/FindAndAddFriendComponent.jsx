import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import UserComponent from '../ComponentItem/UserComponent';
import { myContext } from './MainComponent';
//${IP}
const IP = "http://44.210.92.52:5678"
function FindAndAddFriendComponent({ closemodal }) {

    const [users, setUsers] = useState([])
    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log(userData.data.token);
    const [nameUser, setNameUser] = useState('')
    const { refresh, setRefresh } = useContext(myContext);
    useEffect(() => {
        const getUser = async () => {

            const dataUser = await axios.post(`${IP}/user/getUserNotFriend`, {
                userId: userData.data._id,
                name: userData.data.name
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })

            setUsers(dataUser.data);
            console.log(dataUser.data);
        }
        getUser()
    }, [
        refresh
    ]);
    const clickToaddFriend = async (userIdWantToAdd) => {
        // console.log(userIdWantToAdd);

        try {

            await axios.post(`${IP}/user/addfriend`, {
                userid: userData.data._id,
                friendId: userIdWantToAdd
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

            <div className="get-users-modal">
                <div className="modal-title">
                    <h3 className='fr-cap'>Những Người Bạn Có Thể Biết</h3>
                    <IconButton onClick={() => closemodal(false)}>
                        <ClearIcon />
                    </IconButton>
                </div>
                <div className="list-body">
                    {/* {console.log(users.)} */}
                    {users.map((item, index) => (
                        <div className="">
                            <UserComponent props={item} callBackFnc={() => clickToaddFriend(item._id)} truely={true} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default FindAndAddFriendComponent
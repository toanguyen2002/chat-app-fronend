import axios from 'axios'
import React, { useContext, useRef } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UndoIcon from '@mui/icons-material/Undo';
import { myContext } from '../Component/MainComponent';
import VideocamIcon from '@mui/icons-material/Videocam';
const IP = "http://54.174.184.179:5678"
function MessageComponent({ props }) {
    const refBox = useRef(null)
    const { refresh, setRefresh } = useContext(myContext)
    const userData = JSON.parse(localStorage.getItem("userData"));
    const handleGetidMessAndDelete = async (e) => {
        try {
            const rs = await axios.post(`${IP}/message/removeMess`, {
                messId: props._id,
                userId: userData.data._id
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })
            setRefresh(!refresh)
            console.log(rs);
        } catch (error) {
            console.log(error);
        }
    }
    const handlesendKey = async (idChat, idNewOwn) => {
        // console.log(props);
        try {
            const rs = await axios.post(`${IP}/chat/sendGoldkey`, {
                chatId: props.chat._id,
                newOwnGroup: props.sender._id
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })
            await axios.post(
                `${IP}/message/`, {
                chatId: props.chat._id,
                content: `${userData.data.name} đã bổ nhiệm ${props.sender.name} làm trưởng phòng mới`,
                typeMess: "notification"
            },
                {
                    headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                    }
                }
            )
            setRefresh(!refresh)
        } catch (error) {
            console.log(error);
        }
    }
    const renderContent = () => {
        if (props.content === '') {
            // console.log(props._id);
            return (
                <div className="hover-show-option">
                    <div className='text-content'>
                        <p className='chat-title'>Tin Nhắn Đã Được Thu Hồi</p>
                    </div>
                </div>
            )
        }
        else {
            if (props.typeMess === 'text') {
                return (
                    <div className='text-content'>
                        <p className='chat-title'>{props.content}</p>
                    </div>
                );
            }
            else if (props.typeMess === 'videoCall') {
                return (
                    <div className='text-content'>
                        <div className='cap-video'>
                            <VideocamIcon className='iconColor' />
                            <p className='call-cap'>Cuộc gọi video</p>
                        </div>
                        <div class="separator2"></div>
                        <div className='call-btn'>
                            <a href={props.content} className='chat-title2'>Gọi lại</a>
                        </div>
                    </div>
                );
            }
            else if (props.typeMess === 'notification') {
                return (
                    <div className='notification'>
                        <p className='notification-text'>{props.content}</p>
                    </div>
                )
            }
            else {
                return (
                    <div className='img-box' ref={refBox}>
                        {props.ImageUrl.map((item) => (
                            <div className="">
                                {item.url.endsWith('docx') &&
                                    <div className="">
                                        <img className='file-chat-icon2' style={{ maxWidth: '400px' }} src={"https://res.cloudinary.com/dhyt592i7/image/upload/v1712071261/e8zf6xlepys4jevrmf7q.png"} alt="" />
                                        <a className='link-file' href={item.url}>{item.url.split('/')[3]}</a>
                                        <br />
                                    </div>
                                }
                                {item.url.endsWith('xlsx') &&
                                    <div className="">
                                        <img className='file-chat-icon2' style={{ maxWidth: '400px' }} src={"https://res.cloudinary.com/dhyt592i7/image/upload/v1712071046/covmtdumtqntlsvx9jyi.png"} alt="" />
                                        <a className='link-file' href={item.url}>{item.url.split('/')[3]}</a> <br />
                                    </div>
                                }
                                {item.url.endsWith('pptx') &&
                                    <div className="">
                                        <img className='file-chat-icon' style={{ maxWidth: '400px' }} src={"https://res.cloudinary.com/dhyt592i7/image/upload/v1712070852/gocyslxocjixjrfzaszh.png"} alt="" />
                                        <a className='link-file' href={item.url}>{item.url.split('/')[3]}</a> <br />
                                    </div>
                                }
                                {item.url.endsWith('pdf') &&
                                    <div className="">
                                        <img className='file-chat-icon' style={{ maxWidth: '400px' }} src={"https://res.cloudinary.com/dhyt592i7/image/upload/v1712070523/s5o96ckawemcfztbomuw.png"} alt="" />
                                        <a href={item.url}>{item.url.split('/')[3]}</a> <br />
                                    </div>
                                }
                                {item.url.endsWith('png') &&
                                    // <h1 className="">png</h1>
                                    <img className='img-chat' style={{ maxWidth: `400px` }} src={item.url} alt="" />
                                }
                                {item.url.endsWith('jpg') &&
                                    // <h1 className="">png</h1>
                                    <img className='img-chat' style={{ maxWidth: `400px` }} src={item.url} alt="" />
                                }
                                {item.url.endsWith('jpeg') &&
                                    // <h1 className="">jpeg</h1>
                                    <img className='img-chat' style={{ width: `200px` }} src={item.url} alt="" />
                                }
                                {item.url.endsWith('mp4') &&
                                    // <h1 className="">jpeg</h1>
                                    <div className="">
                                        <video controls width={320} height={300}>
                                            <source src={item.url} />
                                        </video>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                );
            }
        }
    };
    return (
        props.typeMess !== 'notification' ? <div className='message-container'>

            <div className='chat-icon show-option'>{props.sender.name[0]}
            </div>
            <br />
            <div className='hidden-client'>
                {props.chat.groupAdmin ?
                    props.chat.groupAdmin === userData.data._id ?
                        <button className='hidden-button ' onClick={handlesendKey}> <DeleteOutlineIcon className='icon3'></DeleteOutlineIcon>send Key
                        </button> : <></> : <></>}

                <button className='hidden-button ' onClick={handleGetidMessAndDelete}>
                    <DeleteOutlineIcon className='icon3'></DeleteOutlineIcon>Xóa123
                </button>
            </div>
            <div className='text-content'>
                <p className='chat-name'>{props.sender.name}</p>
                {renderContent()}

            </div>

        </div > : <div className='notification'>
            <p className='notification-text'>{props.content}</p>
        </div>
    )
}

export default MessageComponent
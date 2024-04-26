import axios from 'axios'
import React, { useContext, useRef } from 'react'
import { myContext } from '../Component/MainComponent'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UndoIcon from '@mui/icons-material/Undo';
import VideocamIcon from '@mui/icons-material/Videocam';
const IP = "http://localhost:5678"
function MyMessageConponent({ props }) {
    const refBox = useRef(null)
    const { refresh, setRefresh } = useContext(myContext)
    const userData = JSON.parse(localStorage.getItem("userData"));

    const handleGetidMessAndReplaceToNone = async () => {
        try {
            await axios.post(`${IP}/message/blankMess`, {
                messId: props._id
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })
            setRefresh(!refresh)
        } catch (error) {
            console.log(error);
        }
        // console.log(idUser);
    }
    const handleGetidMessAndDelete = async (e) => {
        //${IP}/message/deleteMess
        try {
            await axios.post(`${IP}/message/removeMess`, {
                messId: props._id,
                userId: userData.data._id
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
                    <div className="hover-show-option">
                        <div className='text-content'>
                            <p className='chat-title'>{props.content}</p>
                        </div>
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
                                        <a className='link-file' href={item.url}>{item.url.split('/')[3]}</a> <br />
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
        props.typeMess !== 'notification' ? <div className='my-message'>
            <div className="my-message-row">
                <div className='hidden-form'>
                   
                    <button className='hidden-button' onClick={handleGetidMessAndReplaceToNone}>
                        <UndoIcon className='icon3'></UndoIcon>Thu Hồi
                    </button>
                    <br />
                    <button className='hidden-button' onClick={handleGetidMessAndDelete}>
                        <DeleteOutlineIcon className='icon3'></DeleteOutlineIcon>Xóa
                    </button>
                </div>
                {


                    renderContent()

                }
            </div>

        </div> : <div className='notification'>
            <p className='notification-text'>{props.content}</p>
        </div>
    )
}

export default MyMessageConponent
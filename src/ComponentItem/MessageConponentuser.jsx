import React, { useRef } from 'react'

function MyMessageConponent({ props }) {
    const refBox = useRef(null)
    // console.log(typ);
    const handleGetidMessAndReplaceToNon = async (e) => {
        console.log(props._id);
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
                            </div>
                        ))}
                    </div>
                );
            }
        }

    };

    return (
        <div className='my-message'>

            <div className="my-message-row">
                <div className='hidden-form'>
                    <button onClick={handleGetidMessAndReplaceToNon}>Thu Hồi</button>
                    <button>Xóa</button>
                </div>
                {


                    renderContent()

                }
            </div>

        </div>
    )
}

export default MyMessageConponent
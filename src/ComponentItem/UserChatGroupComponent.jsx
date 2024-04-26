import React from 'react'

function UserChatGroupComponent({ props, callBackFnc, truely }) {
    return (
        // <div>onClick={() => nav("chat/" + props._id + "&" + props.chatName)
        <div className='user-box' >
            <p className='chat-icon'>{props.name}</p>
            <p className='chat-name'>{props.name}</p>
            <div className="btn-group">
                <button className='btn-style' onClick={() => callBackFnc(props._id)}>{truely ? 'Thêm Vào Nhóm' : 'Xóa Khỏi Nhóm'}</button>
            </div>
        </div>
    )
}

export default UserChatGroupComponent
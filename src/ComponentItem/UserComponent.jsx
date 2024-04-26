import React from 'react'

function UserComponent({ props, callBackFnc, truely }) {
    return (
        // <div>onClick={() => nav("chat/" + props._id + "&" + props.chatName)
        <div className='user-box' >
            <p className='chat-icon'>{props.name[0]}</p>
            <p className='chat-name'>{props.name}</p>
            <div className="btn-group">
                <button className='btn-style' onClick={() => callBackFnc(props._id)}>{truely ? 'Thêm Bạn Bè' : 'Chấp Nhận Lời Mời Kết bạn'}</button>
            </div>
        </div>
    )
}
export default UserComponent
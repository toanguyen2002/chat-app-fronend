import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ResetPassWord() {
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const nav = useNavigate()
    const resetPassword = async () => {
        try {
            const dataRest = await axios.post(
                "http://localhost:5678/user/reset", {
                name: name
            }
            )
            nav("/")
        } catch (error) {
            nav("/resetPass")
            setError(true)
        }
    }
    return (
        <>
            <div className='reset-Container'>
                <div className="reset-form-container">
                    <div className="reset-form-header">
                        <p className='capreset'>Nhập Tài Khoản Đã Đăng Ký</p>
                    </div>
                    <div className="reset-form-body">
                        <input onChange={e => setName(e.target.value)} value={name} className='txtreset' name='name' placeholder='Tên đăng nhập' type='text' />
                        {error ? <p className='error-text'>Tài khoản Không hợp lệ vui lòng kiểm tra lại</p> : <p></p>}
                        <div className="reset-link">
                            <input className='btnreset' type="button" value='Tiếp Tục' onClick={() => resetPassword()} />
                        </div>
                    </div>
                    <div className="reset-form-footer">
                        <a className='backLink' href="/"> {"<< "}Quay lại</a>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ResetPassWord
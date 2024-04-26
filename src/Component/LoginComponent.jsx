
import { Backdrop, CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
//${IP}
const IP = "http://localhost:5678"
function LoginComponent() {
    const nav = useNavigate()
    const [data, setData] = useState({ name: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState("")
    const [falseMess, setFalseMess] = useState(true)
    const dataHandle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const loginUser = async () => {
        try {
            setLoading(true)
            const respone = await axios.post(
                `${IP}/user/login`,
                data,
                {
                    headers: { "Content-type": "application/json" }
                }
            )
            setLogin({ msg: " success", key: Math.random() })
            localStorage.setItem("userData", JSON.stringify(respone))
            setLoading(false)
            setFalseMess(true)
            nav('app/welcome')
        } catch (error) {
            setFalseMess(false)
            setLoading(false)
        }
    }

    return (
        <>
            <Backdrop open={loading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className='login-container'>
                <h1 className='zname'>ZALO</h1>
                <div className='tname'>Đăng nhập tài khoản Zalo</div>
                <div className='tname'>để kết nối với ứng dụng Zalo Web</div>

                <div className="login-form-container">
                    <div className="login-form-header">
                        <p className='dnname'>Đăng Nhập</p>
                    </div>
                    <div className="login-form-body">
                        {
                            falseMess ?
                                <p></p> : <b className='error-text'>Thông tin đăng nhập không hợp lệ vui lòng kiểm tra lại</b>
                        }

                        <div className='Txtbox'>
                            <PersonIcon className='icon'></PersonIcon>
                            <input className='txtLogin' name='name' placeholder='username' type='text' onChange={dataHandle} />

                        </div>

                        <div className='Txtbox'>
                            <LockIcon className='icon'></LockIcon>
                            <input className='txtLogin' name='password' placeholder='password' type='password' onChange={dataHandle} />

                        </div>
                        <button onClick={loginUser} className='btn-login'>Đăng nhập với mật khẩu</button>
                        <div className="login-link">
                            <a href='/resetPass' className='form-link'>Quên mật khẩu ?  </a>
                            <a href='/register' className='form-link'>Chưa có tài khoản</a>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default LoginComponent
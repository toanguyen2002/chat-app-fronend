import { Backdrop, CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//${IP}
const IP = "http://localhost:5678"
function RegisterComponent() {
    const [data, setData] = useState({ name: "", email: "", password: "", otp: "" })
    const [otpError, setOtpError] = useState('')
    const [validAccount, setValidAccount] = useState('')
    const [emailAccount, setEmailAccount] = useState('')
    const [signInText, setSignInText] = useState("")

    const [loading, setLoading] = useState(false)
    const nav = useNavigate()
    const dataHandle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log(data);
    }
    const handleGetOTP = async () => {
        var otpRender = ''
        for (let index = 0; index < 5; index++) {
            otpRender += Math.floor((Math.random() * (20 - 16)) + 5).toString();
        }
        localStorage.setItem('otp', otpRender)
        if (data.email == "" || !data.email.endsWith('@gmail.com')) {
            setEmailAccount("Email Rỗng hoặc không hợp Phải là Gmail");
        } else {
            try {
                await axios.post(`${IP}/user/getotp`,
                    {
                        email: data.email,
                        otp: otpRender
                    },
                    {
                        headers: { "Content-type": "application/json" }
                    }
                )
                localStorage.removeItem('otp')
                setEmailAccount("")
            } catch (error) {
                setEmailAccount("Email đã tồn tại trong hệ thống vui lòng đăng nhập");
            }
        }




    }


    const registerHandle = async () => {

        console.log(localStorage.getItem('otp'));
        console.log(data.otp);
        if (localStorage.getItem('otp') !== data.otp) {
            setOtpError('OTP Không Tồn Tại Hoặc Sai Vui Lòng Kiểm Tra Lại')
        } else {
            try {
                setLoading(true)
                const respone = await axios.post(
                    `${IP}/user/register`,
                    data,
                    {
                        headers: { "Content-type": "application/json" }
                    }
                )
                // console.log(respone);
                localStorage.setItem("userData", JSON.stringify(respone))
                setSignInText({ msg: " success", key: Math.random() })
                setLoading(false)
                nav('/app/welcome')
            } catch (error) {
                setLoading(false)
                setValidAccount('Account Không hợp lệ hoặc đã tồn tại vui lòng đăng nhập')
                console.log(error);
            }
        }
    }
    return (
        <>
            <Backdrop open={loading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            < div className='login-container' >
                <div className="login-container-right">
                    <div className="login-form-container">
                        <div className="login-form-header">
                            <p className='dnname'>Đăng Ký</p>
                        </div>
                        <div className="login-form-body">
                            {validAccount ? <h6 className='error-otp'>{validAccount}</h6> : <></>}
                            <input className='txtLogin' name='name' placeholder='username' type='text' onChange={dataHandle} />
                            <input className='txtLogin' name='password' placeholder='password' type='password' onChange={dataHandle} />
                            {emailAccount ? <h6 className='error-otp'>{emailAccount}</h6> : <></>}
                            <input className='txtLogin' name='email' placeholder='Email' type='email' onChange={dataHandle} />
                            {/* otp */}
                            <div>
                                {otpError ? <h6 className='error-otp'>{otpError}</h6> : <></>}
                                {/* <br /> */}
                                <input className='txtOtp' name='otp' placeholder='Enter OTP here' type='otp' onChange={dataHandle} />
                                <input className='btnOtp' type="button" onClick={() => handleGetOTP()} value='Lấy Mã OTP' />
                            </div>
                            {/* otp */}
                            <button onClick={registerHandle} className='btn-register'>Đăng Ký</button>
                            <div className="login-link">
                                <a href='/' className='form-link2'>Đã có tài khoản</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default RegisterComponent
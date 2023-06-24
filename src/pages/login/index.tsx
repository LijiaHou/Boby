import {Button, Input} from 'antd'
import React from 'react'
import imgLogo from './logo.png'
import {useNavigate} from 'react-router-dom'
import './index.scss'

const Login = () => {
  const navigate = useNavigate()

  return (
    <div className="P-login">
      <img src={imgLogo} alt="" className='logo' />
      <div className='ipt-con'>
        <Input placeholder='账号' />
      </div>
      <div className='ipt-con'>
        <Input.Password placeholder='账号' />
      </div>
      <div className='ipt-con'>
        <Button type="primary" block onClick={() => navigate('/home')}>
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login

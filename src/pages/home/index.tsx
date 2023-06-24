import React from "react";
import { Button } from "antd";
import {useNavigate} from 'react-router-dom'
import Bullet from '@/components/bullet'
import './index.scss'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="P-home">
      <h1>Home Page</h1>
      <div className="ipt-con">
        <Button type="primary" onClick={() => navigate('/login')}>返回登录</Button>
      </div>
      <div className="bullet">
        <Bullet />
      </div>
    </div>
  )
}

export default Home
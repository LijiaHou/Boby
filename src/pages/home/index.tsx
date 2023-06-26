import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import {useNavigate} from 'react-router-dom'
import Bullet from '@/components/bullet'
import './index.scss'

const {Search} = Input

const Home = () => {
  const navigate = useNavigate()
  const bulletInstance = useRef(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    const home = document.querySelector('.P-home')
    const h1 = document.querySelector('h1')
    home.addEventListener('click', () => console.log('click home'))
    h1.addEventListener('click', (e) => {
      e.stopPropagation()
      console.log('click h1')
    })
  }, [])

  return (
    <div className="P-home">
      <h1>Home Page</h1>
      <div className="ipt-con">
        <Button type="primary" onClick={() => navigate('/login')}>返回登录</Button>
      </div>
      <div className="bullet">
        <Bullet
          list={['法克鱿', '芜湖，起飞~~', 'Up主加油！', '15斤30块，你要不要把，这要熟我肯定要啊']}
          renderItem={(text) => (
            <div style={{color: 'white'}}>{text}</div>
          )}
          onInit={(v) => bulletInstance.current = v}
        />
        <Search
          value={input}
          placeholder="发送条弹幕吧~"
          allowClear
          enterButton="发送"
          size="large"
          onChange={e => setInput(e.target.value)}
          onSearch={(v) => {
            bulletInstance.current.sendBullet(v)
            setInput('')
          }}
          style={{marginTop: 10}}
        />
      </div>
    </div>
  )
}

export default Home
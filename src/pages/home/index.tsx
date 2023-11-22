import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Button, Input, message } from "antd";
import {useNavigate} from 'react-router-dom'
import Bullet from '@/components/bullet'
import ToastModal from '@/components/ToastModal'
import PullupRank from '@/components/PullupRank'
import {useRankList} from '@/components/PullupRank/useRankList'
import PopUp from '@/components/PopUp'
import TestMemoList from './list'
import toast, { Toaster } from 'react-hot-toast'
import './index.scss'

const {Search} = Input

const Home = () => {
  const navigate = useNavigate()
  const bulletInstance = useRef(null)
  const [input, setInput] = useState('')
  const {data, getNext} = useRankList()
  const [isShowPopup, setIsShowPopup] = useState(false)

  useEffect(() => {
    getNext()
  }, [])

  const renderListItem = (item, idx) => {
    return (
      <div className="ListItem" key={idx}>
        <div className="rank">{item.rank}</div>
        <img className="avatar" src={item.avatar} alt="" />
        <div className="name">{item.name}</div>
      </div>
    )
  }

  // 如果没有memo，TestMemoList 会多次重复渲染
  const list = 
    useMemo(() => 
      [
        {name: '杰洛特', id: 0}, 
        {name: '叶奈法', id: 1}, 
        {name: '翠斯', id: 2}, 
        {name: '兰伯特', id: 3}
      ]
    , [])

  // 参数是函数也得缓存一下，否则每次重新渲染，都会创建新的函数
  // const onListClick = 
  //   useMemo(() => {
  //     return (v) => {
  //       message.info(v.name)
  //     }
  //   }, [])

  // 虽然 useMemo 也可以缓存函数，但显然 useCallback 不需要嵌套
  const onListClick = 
    useCallback((v) => {
      message.info(v.name)
    }, [])

  return (
    <div className="P-home">
      <Toaster />
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
            toast("success~")
            bulletInstance.current.sendBullet(v)
            setInput('')
          }}
          style={{marginTop: 10}}
        />
      </div>
      <Button type="primary" onClick={() =>  {
        ToastModal({contentFunc: ({hideToast}) => {
          return (
            <div className="Modal">
              <div className="Modal-title">MODAL</div>
              <p>wow，我是弹窗啊</p>
              <Button onClick={hideToast} type="primary">关闭</Button>
            </div>
          )
        }})
      }}>弹窗</Button>

      <Button type="primary" onClick={() => setIsShowPopup(true)}>打开列表</Button>
      <PopUp active={isShowPopup} onClose={() => setIsShowPopup(false)}>
        <PullupRank
          data={data}
          pullupEle="body"
          getNext={getNext}
          renderList={(list) => {
            return (
            <>
              {list?.map((item, idx) => renderListItem(item, idx))}
              {data.loading && 'loading...'}
            </>)
          }}
        />
      </PopUp>
      

      <TestMemoList list={list} onClick={onListClick} />
      
    </div>
  )
}

export default Home
import { useEffect } from "react"
import { Button } from "antd"
import './index.scss'

/**
 * 水平无限滚动弹幕
 * @param {number} spacingTime    弹幕的间隔时间，默认1000ms
 * @param {number} transitionTime 弹幕飘过的总时间(速度)，默认2000ms
 * @param {string[]} list 弹幕列表 
*/
function Bullet({spacingTime = 1000, transitionTime = 4000, list = ['芜湖，起飞~~', 'Up主加油！', '15斤30块']}) {

  const createBullets = () => {
    // 获取根元素
    const root = document.querySelector('.BulletScreen')
    list.forEach(text => {
      // 创建弹幕，让弹幕处于一个初始的状态，隐藏在根元素左侧
      const div = document.createElement('div')
      div.className = 'BulletScreen-item'
      div.innerHTML = text
      div.style.position = 'absolute'
      div.style.top = '0'
      div.style.left = '-100px'
      root.appendChild(div)
    })
  }

  const letBulletMove = () => {
    const bullets = Array.from(document.getElementsByClassName('BulletScreen-item'))
    
    const sendBullet = () => {
      if (bullets.length <= 0) {
        return
      }
      const bullet = bullets.shift()
      bullet.style.transition = `all ${transitionTime/1000}s linear`
      bullet.style.transform = 'translateX(600px)'
      // 动画结束后移除
      setTimeout(() => {
        bullet.remove()
      }, transitionTime);
      // 间隔时间后发送下一条
      setTimeout(() => {
        sendBullet()
      }, spacingTime);
    }
    
    sendBullet()
  }

  useEffect(() => {
    createBullets()
    setTimeout(() => {
      letBulletMove()
    }, 1000);
  }, [])

  return (
    <>
    <div 
      className="BulletScreen"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '500px',
        height: '100px',
        border: 'solid 1px red'
      }}
    />
    {/* 测试用按钮 */}
    <Button
      onClick={() => {
        createBullets()
        setTimeout(() => {
          letBulletMove()
        }, 1000);
      }}>发送 </Button>
    </>
    
  )
}

export default Bullet

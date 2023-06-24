import React, { useEffect, useState, useRef } from "react"
import { Button } from "antd"
import './index.scss'

/**
 * 水平无限滚动弹幕
 * @param {number} spacingTime    弹幕的间隔时间，默认1000ms
 * @param {number} appearTimeTime 弹幕飘过的总时间(速度)，默认2000ms
 * @param {string[]} list 弹幕列表 
*/
function Bullet({spacingTime = 1000, appearTime = 4000, list = ['法克鱿', '芜湖，起飞~~', 'Up主加油！', '15斤30块，你要不要把，这要熟我肯定要啊']}) {

  /** 获取元素的宽度：
    * 1) element.style.width 
    *   只能获取内联样式，但是可以通过赋值修改属性
    * 2) window.getComputedStyle(element).width
    *   返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有 CSS 属性的值(mdn)
    *   不过这个对象是只读的，不可通过赋值来修改属性
    * 3) Element.getBoundingClientRect()
    *   返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置
    *    {
    *      "x": 0,
    *      "y": 0,
    *      "width": 0,
    *      "height": 0,
    *      "top": 0,
    *      "right": 0,
    *      "bottom": 0,
    *      "left": 0
    *    }
    *   除了width和height，所有属性都是相对视图窗口左上角来计算的
    * 
    * 不过需要注意的是，无论如何宽度也需要在DOM渲染后才能得到
  */

  let bulletList:Array<HTMLDivElement> = []
  const rootEle = useRef<HTMLDivElement>(null)
  const rootWidth = useRef(0)

  const createBullets = () => {
    bulletList = list.map(text => {
      // 创建弹幕，让弹幕处于一个初始的状态，隐藏在screen的右侧！
      const div = document.createElement('div')
      div.className = 'BulletScreen-item'
      div.innerHTML = text
      div.style.position = 'absolute'
      div.style.top = '0'
      div.style.left = `${rootWidth.current}px`
      div.style.whiteSpace = 'nowrap'
      rootEle.current?.appendChild(div)
      return div
    })
  }

  const letBulletMove = () => {
    // const bullets = Array.from(document.getElementsByClassName('BulletScreen-item'))
    const bullets = bulletList
    const sendBullet = () => {
      if (bullets.length <= 0) {
        return
      }
      const bullet = bullets.shift()
      // 动画结束后移除bullet
      // setTimeout(() => {
      //   bullet.remove()
      // }, appearTime);
      // bullet?.addEventListener('transitionend', () => {
      //   bullet.removeEventListener('transitionend', () => {})  //部分浏览器不移除的话会泄露内存
      //   bullet.remove()
      // })
      
      if (bullet) {
        bullet.style.transition = `all ${appearTime/1000}s linear`
        bullet.style.transform = `translateX(-${rootWidth.current + bullet.getBoundingClientRect().width}px)`
      }
      
      // 间隔时间后发送下一条
      setTimeout(() => {
        sendBullet()
      }, spacingTime);
    }
    
    sendBullet()
  }

  // 初始化滚动屏幕的宽度
  const init = () => {
    rootWidth.current = rootEle.current?.getBoundingClientRect().width || 0
  }

  useEffect(() => {
    init()
  }, [])

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
        ref={rootEle}
      />
      {/* 测试用按钮 */}
      <Button
        onClick={() => {
          createBullets()
          setTimeout(() => {
            letBulletMove()
          }, 1000);
        }}
      >发送 </Button>
    </>
    
  )
}

export default Bullet

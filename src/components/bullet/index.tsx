import React, { useEffect, useRef } from "react"
import {createRoot} from 'react-dom/client'
import './index.scss'

/**
 * 水平无限滚动弹幕
 * 
 * 思路1：
 *  把所有弹幕一次性创建，并初始化位置在screen的右边，然后间隔发送
 *  不过这样的缺点是，一次性创建大量弹幕可能导致页面性能下降
 * 
 */
function Bullet({
  onInit = () => {},
  row = 3,
  spacingTime = 1000, 
  appearTime = 4000,
  list = ['empty'],
  renderItem = null
}: {
  onInit?: ({sendBullet}) => void
  row?: number  // 轨道数
  spacingTime?: number  // 弹幕的间隔时间，默认1000ms
  appearTime?: number  // 弹幕飘过的总时间(速度)，默认2000ms
  list: Array<any>  // 弹幕数据列表
  renderItem?: (any) => any  // 渲染函数
}) {

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

  const dataList = useRef<Array<any>>(list)
  const rootEle = useRef<HTMLDivElement>(null)
  const rootWidth = useRef(0)
  const curIndex = useRef(0)
  const curRowIndex = useRef(0)

  const createBullet = async () => {
    const curList = dataList.current
    // 无限循环
    if(curIndex.current >= curList.length) {
      curIndex.current = 0
      // return
    }
    const div = document.createElement('div')
    // 支持自定义渲染弹幕
    if (renderItem) {
      await new Promise((resolve) => {
        function CompRender() {
          useEffect(() => {
            // 确保弹幕组件渲染完毕，否则后面获取不到真实的widt
            resolve(1)
          }, [])
          return renderItem(curList[curIndex.current])
        }
        createRoot(div).render(<CompRender />)
      })
      // ReactDom.render(renderItem(curList[curIndex.current]), div) // React18这样写报warning
    } else {
      div.innerHTML = curList[curIndex.current]
    }
    // 弹幕轨道循环
    const rowHeight = rootEle.current.getBoundingClientRect().height / row
    div.style.top = `${curRowIndex.current * rowHeight}px`
    div.className = 'BulletScreen-item'
    div.style.position = 'absolute'
    // 让弹幕处于一个初始的状态，隐藏在screen的右侧！
    div.style.left = `${rootWidth.current}px`
    div.style.whiteSpace = 'nowrap'
    rootEle.current?.appendChild(div)

    curIndex.current++
    curRowIndex.current = ++curRowIndex.current % row
    return div
  }

  const startBullet = async () => {
    while (1) {
      const bullet = await createBullet()
      if (bullet) {
        // 动画结束后移除bullet
        // setTimeout(() => {
        //   bullet.remove()
        // }, appearTime);
        bullet?.addEventListener('transitionend', () => {
          bullet.removeEventListener('transitionend', () => {})  //部分浏览器不移除的话会泄露内存
          bullet.remove()
        })
        bullet.style.transition = `all ${appearTime/1000}s linear`
        bullet.style.transform = `translateX(-${rootWidth.current + bullet.getBoundingClientRect().width}px)`
      } else {
        break
      }
      // 间隔时间后发送下一条
      await new Promise((resolve) => {
        setTimeout(() => {resolve(1)}, spacingTime)
      })
    }
  }

  // 发送一条弹幕
  // 思路就是将数据插入当前位置的后面，就可以自动发送了
  const sendBullet = (item) => {
    dataList.current.splice(curIndex.current, 0, item)
    console.log(dataList.current);
  }

  // 初始化滚动屏幕的宽度
  const init = () => {
    rootWidth.current = rootEle.current?.getBoundingClientRect().width || 0
    onInit({sendBullet})
  }

  useEffect(() => {
    init()
    startBullet()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
  )
}

export default Bullet

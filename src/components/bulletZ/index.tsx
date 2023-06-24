import React, {useCallback, useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'

interface OPT {
  speed: number
  spacing: number
}

/**
 * 水平无限循环弹幕
 */

function Bullet({
  data,
  row = 2,
  renderItem = () => null,
  opts = {
    speed: 90,
    spacing: 30,
  },
}: {
  data: Array<any>
  row?: number
  renderItem?: (any) => any
  opts?: OPT | Array<OPT>
}) {
  const [bulletList, setBulletList] = useState(data)
  const bulletListRef = useRef(bulletList)
  bulletListRef.current = bulletList
  const [launchedCount, setLaunchedCount] = useState(0) // 已经发射的弹幕数
  const launchedCountRef = useRef(launchedCount)
  launchedCountRef.current = launchedCount
  const [scrollWidth, setScrollWidth] = useState(null)
  const scrollWidthRef = useRef(scrollWidth)
  scrollWidthRef.current = scrollWidth
  const [timer, setTimer] = useState(null)
  const bulletRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setBulletList(data)
  }, [data])

  /**
   * 创建弹幕元素
   * @param {*} bullet
   * @param {*} rowIndex // 所在轨道
   */
  const createBulletEle = (bullet, rowIndex) => {
    const div = document.createElement('div')
    div.classList.add('bullet-item')
    div.style.left = `${scrollWidthRef.current}px`
    div.style.position = 'absolute'
    div.style.whiteSpace = 'nowrap'
    const handleTransitionEnd = () => {
      // 弹幕运动完成后移除监听，清除弹幕
      div.removeEventListener('transitionend', handleTransitionEnd)
      bulletRef.current.removeChild(div)
    }
    div.addEventListener('transitionend', handleTransitionEnd)

    ReactDOM.render(renderItem(bullet), div)
    return div
  }

  /**
   * 发射弹幕
   */
  const launchBarrge = (bullet, rowIndex) => {
    if (!bullet) return
    const bulletEle = createBulletEle(bullet, rowIndex)
    if (bulletRef.current) bulletRef.current.appendChild(bulletEle)
    const rowHeight = bulletRef.current.offsetHeight / row
    // 每一个轨道的弹幕item随机取top值
    // const maxTop = (rowIndex + 1) * this.rowHeight - bulletEle.offsetHeight - 10
    // const minTop = rowIndex * this.rowHeight
    // const currentItemTop = Math.random() * (maxTop - minTop) + minTop
    const currentItemTop = rowIndex * rowHeight
    bulletEle.style.top = `${currentItemTop}px`
    const curOpt = Array.isArray(opts) ? opts[rowIndex] : opts
    const {speed, spacing} = curOpt
    let bulletWidth = bulletEle.getBoundingClientRect().width
    // 拿不到宽度按一屏处理
    if (bulletWidth === 0) bulletWidth = scrollWidthRef.current
    // 全程滚动距离
    const distance = scrollWidthRef.current + bulletWidth + 20
    const duration = distance / speed
    // 弹幕滚动至spacing所需时间
    const time = (bulletWidth + spacing) / speed

    bulletEle.style.webkitTransform = `translate3d(${-distance}px, 0, 0)`
    bulletEle.style.transform = `translate3d(${-distance}px, 0, 0)`
    bulletEle.style.webkitTransition = `all ${duration}s linear`
    bulletEle.style.transition = `all ${duration}s linear`

    // 当弹幕拉开距离spacing时发射下一个弹幕
    let timeInstance = null
    if (rowIndex === 0) {
      timeInstance = setTimeout(() => {
        const nextBullet =
          bulletListRef.current[
            launchedCountRef.current % bulletListRef.current.length
          ]
        setLaunchedCount((v) => v + 1)
        launchBarrge(nextBullet, rowIndex)
      }, time * 1000)
    } else {
      timeInstance = setTimeout(() => {
        const nextBullet =
          bulletListRef.current[
            launchedCountRef.current % bulletListRef.current.length
          ]
        launchBarrge(nextBullet, rowIndex)
        setLaunchedCount((v) => v + 1)
      }, time * 1000)
    }
    setTimer(timeInstance)
  }

  const init = () => {
    if (bulletRef.current) {
      const {width} = document
        .querySelector('.react-bullet-screen')
        .getBoundingClientRect()
      setScrollWidth(width)
    }
    const whileInner = (count) => {
      const bullet = data[count]
      setTimeout(() => {
        launchBarrge(bullet, count)
      }, count * 1000)
    }
    while (launchedCountRef.current < row) {
      whileInner(launchedCountRef.current)
      setLaunchedCount((v) => v + 1)
    }
  }

  useEffect(() => {
    setScrollWidth(document.body.clientWidth)
    setTimeout(() => {
      init()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="react-bullet-screen"
      style={{
        position: 'relative',
        overflow: 'hidden',
        // minHeight: `${row * rowHeight}px`,
        height: '100%',
      }}
      ref={(ref) => {
        bulletRef.current = ref
      }}
    />
  )
}

export default Bullet

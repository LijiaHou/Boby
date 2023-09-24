import React, { useEffect, useState, useMemo, useRef } from "react"
import {RankData} from './useRankList'
import './index.scss'

// 列表项高度
const ITEM_HEIGHT = 200
// 预加载个数
const PRE_LOAD_NUM = 5

const PullRank = ({data, pullupEle, getNext, renderList}: 
  {data: RankData, pullupEle: string, getNext: () => any, renderList: (list: RankData['list']) => any}
) => {
  
  // 列表（包括滚动）的高度
  const scrollViewHeight = data.list?.length * ITEM_HEIGHT
  const containerRef = useRef<HTMLDivElement>(null)
  
  
  const [showRange, setShowRange] = useState({start: 0, end: 10})
  
  // 正在展示的列表
  const viewList = useMemo(() => data.list.slice(showRange.start, showRange.end), 
  [showRange.start, showRange.end, data.list])

  // 需要撑起的高度
  const scrollOffsetTop = useMemo(() => showRange.start * ITEM_HEIGHT, [showRange.start])

  const hasReachBottom = () => {
    const container = document.querySelector('.RankList')
    const offset = 20
    return container.scrollTop >= container.scrollHeight - container.clientHeight - offset
  }

  const calcShowRange = () => {
    const container = containerRef.current
    const newScrollTop = Math.floor(container?.scrollTop)
    const start = Math.ceil(newScrollTop / ITEM_HEIGHT) - PRE_LOAD_NUM
    const end = Math.ceil((newScrollTop + container?.getBoundingClientRect().height) / ITEM_HEIGHT) + PRE_LOAD_NUM
    
    console.log('newScrollTop', newScrollTop);
    console.log('start', start);
    console.log('end', end);
    
    setShowRange({
      start: start < 0 ? 0 : start,
      end: end >  data.list.length ? data.list.length : end
    })
  }

  useEffect(() => {
    const container = containerRef.current
    container.addEventListener('scroll', () => {
      calcShowRange()
      if (hasReachBottom()) {
        getNext()
      }
    })
    return container.removeEventListener('scroll', null)
  }, [data])
  
  console.log('viewList', viewList);
  
  return(
    <div className="RankList" ref={containerRef}>
      <div
        className="RankInner"
        style={
          {
            height: scrollViewHeight,
            paddingTop: scrollOffsetTop,
          }
        }
      >
        {renderList(viewList)}
      </div>
    </div>
  )
}

export default PullRank
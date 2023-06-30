import React, { useEffect, useState } from "react"
import './index.scss'

const Index = ({data, pullupEle, getNext, renderList}) => {
  const hasReachBottom = () => {
    const container = document.querySelector('.RankList')
    return container.scrollTop === container.scrollHeight - container.clientHeight
  }

  useEffect(() => {
    const container = document.querySelector('.RankList')
    container.addEventListener('scroll', () => {
      if (hasReachBottom()) {
        getNext()
      }
    })
    return container.removeEventListener('scroll', null)
  }, [])
  
  return(
    <div className="RankList">
      <div className="RankInner">
        {renderList(data.list)}
      </div>
    </div>
  )
}

export const useRankList = () => {
  const testList = [
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4302911',
      name: 'Jack',
      rank: 1,
      rounds: 130,
      mid: 1122,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4300875',
      name: 'Lady',
      rank: 2,
      rounds: 30,
      mid: 11232,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4300875',
      name: 'Wakaa',
      rank: 3,
      rounds: 99,
      mid: 11222,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4302911',
      name: 'Jack',
      rank: 4,
      rounds: 8,
      mid: 11242,
    },
  ]
  const orignData = {
    list: testList,
    more: true,
    loading: false,
  }
  const [data, setData] = useState(orignData)

  const getNext = async () => {
    setData(pre => ({
      ...pre,
      loading: true
    }))
    await new Promise((resolve) => {
      setTimeout(() => resolve(1), 1500)
    })
    setData(pre => {
      return {
        ...pre,
        list: pre.list.concat(testList.map((item, idx) => ({
          ...item,
          rank: pre.list[pre.list.length - 1].rank + idx + 1
        }))),
        loading: false
      }
    })
  }
  return {data, getNext}
}

export default Index
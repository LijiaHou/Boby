import {useState, useRef} from "react"

const testList = [
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4302911',
      name: 'Akon',
      rank: 1,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4300875',
      name: 'Boby',
      rank: 2,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4300895',
      name: 'Cirl',
      rank: 3,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4302911',
      name: 'David',
      rank: 4,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4300875',
      name: 'Boby',
      rank: 5,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4300895',
      name: 'Cirl',
      rank: 6,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4302911',
      name: 'David',
      rank: 7,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4300875',
      name: 'Boby',
      rank: 8,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4300895',
      name: 'Cirl',
      rank: 9,
    },
    {
      avatar:
        'http://me-media-gateway.srv.test.ixiaochuan.cn/img/png/id/4300895',
      name: 'Cirl',
      rank: 10,
    },
  ]

export interface RankData {
  list: Array<{avatar: string; name: string, rank: number}>;
  more: boolean;
  loading: boolean;
}

export const useRankList = () => {
    
    const orignData = {
      list: testList,
      more: true,
      loading: false,
    }
    const [data, setData] = useState<RankData>(orignData)
    const loading = useRef(false)
  
    const getNext = async () => {
      if (loading.current) {
        return
      }
      try {
        setData(pre => ({
          ...pre,
          loading: loading.current = true
        }))
        await new Promise((resolve) => {
          setTimeout(() => resolve(1), 1500)
        })
        setData(pre => {
          let newList = [...pre.list]

          for (let i = 0; i < 10; i++) {
            // eslint-disable-next-line no-loop-func
            newList = newList.concat(testList.map((item, idx) => ({
              ...item,
              rank: newList.at(-1).rank + idx
            })))
          }

          return {
            ...pre,
            list: newList
          }
        })
      } catch (error) {
        
      } finally {
        setData(pre => ({
          ...pre,
          loading: loading.current = false
        }))
      }
    }
    return {data, getNext}
  }
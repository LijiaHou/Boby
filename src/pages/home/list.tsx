import React, {useState, memo} from "react"
import { Button } from "antd";

const List = ({list, onClick}) => {

    const [names, setNames] = useState(list)

    const handleClick = (item) => {
        onClick(item)
        setNames(pre => {
            pre.splice(pre.findIndex(v => v.name === item.name), 1)
            console.log(pre);
            
            return [...pre]
        })
    }

    const handleAdd = () => {
        setNames(pre => {
            pre.splice(1,0, {name: '某某', id: 1})
            return [...pre]
        })
    }

    console.log('子组件list重新渲染')

    return (
        <>
            <ul>
                {
                    names.map((item, idx) => {
                        return (
                        <li key={item.id} onClick={() => handleClick(item)}>{item.name}</li>
                        )
                    })
                }
            </ul>
            <Button type="primary" onClick={handleAdd}>添加</Button>
        </>
    )
        
 }

export default memo(List)
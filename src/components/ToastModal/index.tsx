// 弹窗 组件
import React from "react"
import {createRoot} from 'react-dom/client'
import toast from 'react-hot-toast'
import './index.scss'

const ToastModal = (
  {
    contentFunc,
    mask = true,
    maskClosable = true
  } : {
    contentFunc?: ({hideToast}) => any
    mask?: boolean
    maskClosable?: boolean
  }) => {


  toast.custom((t) => {
    const handleClose = () => {
      toast.remove(t.id)
    }
    return (
      <div  
        className="ToastModal_mask"
        onClick={() => {
          if (maskClosable) {
            handleClose()
          }
        }}
      >
        <div
          className="ToastModal_inner"
          onClick={(e) => {

          }}
        >
          {contentFunc({hideToast: handleClose})}
        </div>
      </div>
    )
  }, {
    duration: Infinity
  }
  )

  return 1
}

export default ToastModal
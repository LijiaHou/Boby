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

  const handleClose = () => {
    console.log('hide');
    
    toast.remove()
  }

  toast.custom((t) => {
    return (
      <div  
        className="Toast_mask"
        onClick={() => {
          if (maskClosable) {
            handleClose()
          }
        }}
      >
        <div
          className="Toast_inner"
          onClick={(e) => {

          }}
        >
          {contentFunc({hideToast: handleClose})}
        </div>
      </div>
    )
  })

  return 1
}

export default ToastModal
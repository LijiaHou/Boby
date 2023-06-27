// 弹窗 组件
import React from "react"
import {createRoot} from 'react-dom/client'
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

  let root = null

  const init = () => {
    const modal = document.createElement('div')
    root = modal
    modal.className = "ToastModal"
    const modalInner = (
      <div className="ToastModal-inner" onClick={e => {
        // console.log('inner');
        
        e.stopPropagation()}}>
        {contentFunc({hideToast})}
      </div>
    )
    createRoot(modal).render(modalInner)

    setTimeout(() => {
      if (maskClosable) {
        document.querySelector('.ToastModal-inner')
        ?.addEventListener('click', e => {
          console.log('inner');
          
          e.stopPropagation()
        }, {capture: false}) 
        modal.addEventListener('click', (e) => {
          console.log('modal click');
          hideToast()
        })
      }
    }, 1000);

    document.querySelector('#root').appendChild(modal)
  }

  const hideToast = () => {
    console.log('hide');
    
    document.querySelector('#root').removeChild(root)
  }

  init()

  return 1
}

export default ToastModal
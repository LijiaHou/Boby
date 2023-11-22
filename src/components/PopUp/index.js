import React, {useRef} from 'react'
import {createPortal} from 'react-dom'
import PT from 'prop-types'
import cx from 'classnames'
import {useMount} from './hooks'

import './index.scss'

export default function PopUp(props) {
  const {
    active = false,
    className,
    title,
    showClose = true,
    backdrop = true,
    overflow,
    children,
    onClose,
  } = props

  const wrapper = useRef(null)
  const {didMount, isShow} = useMount({active, ref: wrapper})

  if (!didMount) return null

  return createPortal(
    <div
      ref={wrapper}
      className={cx('Popup', className, {active: isShow})}
      tabIndex={-1}
    >
      {backdrop && (
        <div
          className={cx('Backdrop', {active: isShow})}
          onClick={backdrop === true && onClose ? onClose : undefined}
          role="button"
          tabIndex={-1}
          aria-hidden
        />
      )}
      <div className="Popup__dialog" role="dialog">
        <div className="Popup__content">
          <div className="Popup__header">
            <h5 className="Popup__title">{title}</h5>
            {showClose &&
              onClose && (
                <div
                  className="Popup__close"
                  onClick={onClose}
                  role="button"
                  tabIndex={-1}
                  aria-label="关闭"
                />
              )}
          </div>
          <div className={cx(`Popup__body`, {overflow})}>{children}</div>
        </div>
      </div>
    </div>,
    document.body
  )
}

PopUp.propTypes = {
  active: PT.bool,
  className: PT.string,
  title: PT.string,
  showClose: PT.bool,
  backdrop: PT.bool,
  overflow: PT.string,
  children: PT.node,
  onClose: PT.func,
}

PopUp.defaultProps = {
  active: false,
  className: '',
  title: '',
  showClose: true,
  backdrop: true,
  overflow: '',
  children: null,
  onClose: () => {},
}

import React from 'react'
import home2 from '../icons/home/home2.png'
import { Modal } from 'antd'
import c from '../styles/oc.module.css'

function ModalPopComponent ({ width = 604, title, div, visible, onCancel }) {

  return (
    <Modal
			maskClosable={false}
      visible={visible}
      closable={false}
      width={width}
      footer={null}
      onCancel={onCancel}
    >
      <div>
        <div className={c.header}>
          <div className={c.title}>{title}</div>
          <img src={home2} alt="" onClick={onCancel} className={c.close}/>
        </div>
        {div}
      </div>
    </Modal>
  )
}

export default ModalPopComponent

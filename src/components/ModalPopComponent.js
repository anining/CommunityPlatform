import React from 'react'
import { Modal } from 'antd'
import c from '../styles/oc.module.css'

function ModalPopComponent ({ title, div, visible, onCancel }) {

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={null}
      onCancel={onCancel}
    >
      <div>
        <div className={c.header}>
          <div className={c.title}>{title}</div>
          <div className={c.close} onClick={onCancel}>X</div>
        </div>
        {div}
      </div>
    </Modal>
  )
}

export default ModalPopComponent

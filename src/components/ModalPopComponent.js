import React from 'react'
import { Modal } from 'antd'
import c from '../styles/oc.module.css'

function ModalPopComponent ({ title, div, visible, onCancel }) {

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onCancel}
    >
      <div>
        <div className={c.title}>{title}</div>
        {div}
      </div>
    </Modal>
  )
}

export default ModalPopComponent

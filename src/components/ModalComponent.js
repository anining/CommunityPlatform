import React from 'react'
import c from '../styles/modal.module.css'
import { Modal, Button } from 'antd'
import { styles } from "../styles/modal"

function ModalComponent ({ src, div, span, title, visible, onCancel, onOk }) {

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onCancel}
      bodyStyle={styles.bodyStyle}
    >
      <img className={c.img} src={src} alt="" />
      <div className={c.title}>{title}</div>
      <div className={c.context}>{div}<span className={c.tips}>{span}</span></div>
      <div className={c.btn_view}>
        <Button className={c.cancel} onClick={onCancel}>取消</Button>
        <Button type="primary" className={c.ok} onClick={onOk}>确定</Button>
      </div>
    </Modal>
  )
}

export default ModalComponent

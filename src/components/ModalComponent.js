import React from 'react'
import * as U from 'karet.util'
import c from '../styles/modal.module.css'
import { Modal, Button } from 'antd'
import { styles } from "../styles/modal"

function ModalComponent ({ child, action, src, div, span, title, visible, onCancel, onOk }) {
  const is_delete = action === "e"

  return (
    <Modal
      visible={visible}
      footer={null}
      width={550}
      onCancel={onCancel}
      bodyStyle={styles.bodyStyle}
    >
      <img className={c.img} src={src} alt="" />
      <div className={c.title}>{title}</div>
      {
        U.ifElse(child,
          child,
          <>
            <div className={c.context} style={{color:is_delete?"#BFBFBF":"#353535"}}>{div}<span style={{color:is_delete?"#3C3D3C":"#FF5730"}} className={c.tips}>{span}</span></div>
              {
                U.when(is_delete,(
                  <div className={c.delete}>删除商品可能导致数据异常且无法恢复，您确定要删除这些商品吗？</div>
                ))
              }
          </>
        )
      }
      <div className={c.btn_view}>
        <Button className={c.cancel} onClick={onCancel}>取消</Button>
        <Button type="primary" className={c.ok} onClick={onOk}>确定</Button>
      </div>
    </Modal>
  )
}

export default ModalComponent

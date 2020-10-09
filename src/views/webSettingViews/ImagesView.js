import React from 'react'
import { Button } from 'antd'
import c from '../../styles/edit.module.css'

function ImagesView () {

  return (
    <div className={c.container}>
      <div className={c.main} style={{marginTop:0}}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>使用七牛云图床</div>
          <div className={c.circle} />
        </div>
        <div>
          <Button className={c.aboutBtn} size="small" type="primary">申请地址</Button>
          <Button className={c.otherBtn} size="small">其它图床</Button>
        </div>
        <div className={c.item} style={{marginTop:0}}>
          <div className={c.itemRTV} style={{paddingRight:0}}>
            <div className={c.igsItem}>
              <div className={c.igs_label}>AccessKey</div>
              <div>5A548d4sf5d4f5ds</div>
            </div>
            <Button className={c.aboutBtn} size="small" type="primary">复制</Button>
          </div>
        </div>
        <div className={c.item} style={{marginTop:0}}>
          <div className={c.itemRTV} style={{paddingRight:0}}>
            <div className={c.igsItem}>
              <div className={c.igs_label}>SecretKey</div>
              <div>dasfdsf34fdDSFDAFF</div>
            </div>
            <Button className={c.aboutBtn} size="small" type="primary">复制</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagesView

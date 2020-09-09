import React, { useState } from 'react'
import { Button, Checkbox } from 'antd'
import c from '../../styles/edit.module.css'
import cs from '../../styles/business.module.css'
import guide1 from '../../icons/guide/guide1.png'
import guide2 from '../../icons/guide/guide2.png'
import guide3 from '../../icons/guide/guide3.png'

function BusinessSettingView () {
  const [checkes, setChecks] = useState([])

  function onChange (e, value) {
    if (e.target.checked) {
      setChecks([...checkes, ...[value]])
    } else {
      setChecks([...checkes].filter(item => item !== value))
    }
  }

  return (
    <div className={c.container}>
      <div className={c.main} style={{
        marginTop:0,
        paddingBottom:80,
      }}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>业务配置</div>
          <div className={c.circle} />
        </div>
        <div className={cs.main}>
          <div className={cs.title}>我们将会根据您的选择，为您定制您的管理系统。</div>
          <div className={cs.center}>
            <div className={cs.itemView} style={{borderColor:checkes.includes(1)?"#2C67FF":"#fff"}}>
              <img src={guide1} alt="" />
              <div className={cs.label}>全部业务</div>
              <Checkbox className={cs.checkbox} onChange={e=>onChange(e,1)} />
            </div>
            <div className={cs.itemView} style={{borderColor:checkes.includes(2)?"#2C67FF":"#fff"}}>
              <img src={guide3} alt="" />
              <div className={cs.label}>卡密业务</div>
              <Checkbox className={cs.checkbox} onChange={e=>onChange(e,2)} />
            </div>
            <div className={cs.itemView} style={{borderColor:checkes.includes(3)?"#2C67FF":"#fff"}}>
              <img src={guide2} alt="" />
              <div className={cs.label}>社区业务</div>
              <Checkbox className={cs.checkbox} onChange={e=>onChange(e,3)} />
            </div>
          </div>
          <div className={cs.tips}>业务类型调整会影响到您的系统管理员的权限，请在调整业务之后，对系统管理的权限进行重新分配。</div>
          <Button size="small" type="primary" className={cs.btn}>保存</Button>
        </div>
      </div>
    </div>
  )
}

export default BusinessSettingView

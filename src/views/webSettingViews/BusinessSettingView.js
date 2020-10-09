import React, { useState } from 'react'
import { Button, Checkbox } from 'antd'
import c from '../../styles/edit.module.css'
import cs from '../../styles/business.module.css'
import guide1 from '../../icons/guide/guide1.png'
import guide2 from '../../icons/guide/guide2.png'
import guide3 from '../../icons/guide/guide3.png'

function BusinessSettingView () {

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
            <Context />
          </div>
          <div className={cs.tips}>业务类型调整会影响到您的系统管理员的权限，请在调整业务之后，对系统管理的权限进行重新分配。</div>
          <Button size="small" type="primary" className={cs.btn}>保存</Button>
        </div>
      </div>
    </div>
  )
}

function Context () {
  const [selects, setSelects] = useState([])
  const views = [];
  const data = [
    {
      label: "全部业务",
      icon: guide1,
      id: 111,
    },
    {
      label: "卡密业务",
      icon: guide3,
      id: 222,
    },
    {
      label: '社区业务',
      icon: guide2,
      id: 333,
    }
  ]

  function onChange (id) {
    const localSelects = [...selects]
    if (localSelects.includes(id)) {
      localSelects.splice(localSelects.findIndex(item => item === id), 1)
      setSelects(localSelects)
    } else {
      setSelects([...localSelects, id])
    }
  }

  data.forEach((item, index) => {
    const { label, icon, id } = item;
    views.push(
      <div className={cs.itemView} onClick={()=>onChange(id)} style={{
        borderColor: selects.includes(id) ? '#2C67FF' : "rgba(44, 103, 255, 0.03)"
      }} key={id}>
        <img src={icon} alt=""/>
        <div className={cs.label}>{label}</div>
        <Checkbox checked={selects.includes(id)} className={cs.checkbox} />
      </div>
    )
  });

  return views
}

export default BusinessSettingView

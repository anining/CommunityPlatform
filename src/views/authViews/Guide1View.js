import React, { useState } from 'react'
import { Button, Checkbox } from 'antd'
import c from '../../styles/guide.module.css'
import guide1 from '../../icons/guide/guide1.png'
import guide2 from '../../icons/guide/guide2.png'
import guide3 from '../../icons/guide/guide3.png'
import { push } from "../../utils/util"
import Circle from "../../components/CircleComponent"

function Guide1View () {

  function submit () {
    push("/guide2")
  }

  return (
    <div className={c.container}>
      <div className={c.view}>
      <Title/>
      <div className={c.content}>
        <Context/>
      </div>
      <div className={c.footer}>
        <Button type="primary" className={c.btn} onClick={submit}>下一步</Button>
        <div className={c.footerText} onClick={()=>push("/main")}>稍后设置</div>
        <Circle i={0}/>
      </div>
      </div>
    </div>
  )
}

function Title () {

  return (
    <div className={c.text}>
      <div className={c.title}>请选择您的业务类型</div>
      <div className={c.minTitle}>我们将会根据您的选择，为您定制您的管理系统。</div>
      <div>您可以通过“系统设置 - 业务配置”来修改这些信息。</div>
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
      <div className={c.firstItem} onClick={()=>onChange(id)} style={{
        borderColor: selects.includes(id) ? '#2C67FF' : "rgba(44, 103, 255, 0.03)"
      }} key={id}>
        <img src={icon} alt="" className={c.firstImg}/>
        <div className={c.firstText}>{label}</div>
        <Checkbox checked={selects.includes(id)} className={c.firstCheckBox} />
      </div>
    )
  });

  return views
}

export default Guide1View

import React, { useState } from 'react'
import { Button, Checkbox } from 'antd'
import c from '../../styles/guide.module.css'
import guide1 from '../../icons/guide/guide1.png'
import guide2 from '../../icons/guide/guide2.png'
import guide3 from '../../icons/guide/guide3.png'
import { h } from '../../utils/history'

function Guide1View () {

  function submit () {
    const history = h.get();
    history.push('/guide2')
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
        <div className={c.footerText} onClick={()=>{
          const history = h.get()
          history.push('/main')
        }}>稍后设置</div>
        <Circle/>
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

  function onChange (e, id) {
    const localSelects = [...selects]
    if (e.target.checked) {
      setSelects([...localSelects, id])
    } else {
      localSelects.splice(localSelects.findIndex(item => item === id), 1)
      setSelects(localSelects)
    }
  }

  data.forEach((item, index) => {
    const { label, icon, id } = item;
    views.push(
      <div className={c.firstItem} style={{
        borderWidth: selects.includes(id) ? 1 : 0
      }} key={id}>
        <img src={icon} alt="" className={c.firstImg}/>
        <div className={c.firstText}>{label}</div>
        <Checkbox onChange={(e)=>onChange(e,id)} className={c.firstCheckBox} />
      </div>
    )
  });

  return views
}

function Circle () {
  const views = [];
  [0, 1, 2, 3].forEach((item, index) => {
    views.push(
      <div style={{
        height: 8,
        width: 8,
        marginLeft: 4,
        marginRight: 4,
        borderRadius: 8,
        background: index?'#D6D7DB':'#2C67FF'
      }} key={index}/>
    )
  })

  return <div className={c.circleView}>{views}</div>
}

export default Guide1View

import React from 'react'
import { Button } from 'antd'
import c from '../../styles/guide.module.css'
import { h } from '../../utils/history'

function Guide3View () {

  function submit () {
    const history = h.get();
    history.push('/guide4')
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
      <div className={c.title}>开通服务</div>
      <div className={c.minTitle}>开通免费的增值服务</div>
      <div>您可以在“增值服务”列表开通更多服务或者关闭某项服务，同时也可以查看到服务相关的详细数据。</div>
    </div>
  )
}

function Context () {
  const views = [];
  const data = [
    {
      label: "一键对接商品",
      tips: "开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。",
      price: 0
      },
    {
      label: "串货服务",
      tips: "开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。",
      price: 0
      },
    {
      label: "供货商服务",
      tips: "开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。",
      price: 5
      },
    {
      label: "微信通知服务",
      tips: "开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。",
      price: 5
      },
  ]

  data.forEach((item, index) => {
    const { label, tips, price } = item;
    views.push(
      <div className={c.threeItem} key={index}>
        <div className={c.threeText}>{label}</div>
        <div className={c.threeTips}>{tips}</div>
        <Button className={c.threeBtn} type='primary'>开通服务</Button>
        <div className={c.threeFooter}>收费模式: <span style={{color:"#FF5730"}}>{price?price+"元/永久":"免费使用"}</span></div>
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
        background: index!==2?'#D6D7DB':'#2C67FF'
      }} key={index}/>
    )
  })

  return <div className={c.circleView}>{views}</div>
}

export default Guide3View

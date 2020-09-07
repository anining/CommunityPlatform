import React, { useState, useEffect } from 'react'
import c from '../../styles/edit.module.css'
import cs from '../../styles/subService.module.css'
import { Input, Modal, Dropdown, Button, Upload, message, Radio, Checkbox } from 'antd'
import service7 from '../../icons/service/service7.png'
import service3 from '../../icons/service/service3.png'
import service5 from '../../icons/service/service5.png'
import service1 from '../../icons/service/service1.png'
import service4 from '../../icons/service/service4.png'
import service2 from '../../icons/service/service2.png'
import service6 from '../../icons/service/service6.png'
import QRCode from 'qrcode.react'

function SubServiceView () {
  const [visible, setVisible] = useState(false)
  const [visiblePay, setVisiblePay] = useState(false)
  const [payType, setPayType] = useState('wx')
  const [number, setNumber] = useState(300)

  function handleOk () {

  }

  function handleCancel () {

  }

  useEffect(() => {
    if (!visiblePay) { return }
    let num = 300
    const timer = setInterval(() => {
      setNumber(num--)
      console.log(number)
      if (number < 1) {
        timer && clearInterval(timer)
      }
    }, 1000)
    return () => timer && clearInterval(timer)
  }, [visiblePay])

  function pay () {
    setVisiblePay(true)
  }

  const views = [];
  const data = [
    {
      label: '微信通知服务',
      tips: '开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。',
      price: 0,
      icon: service7,
    },
    {
      label: '串货服务',
      tips: '开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。',
      price: 0,
      icon: service3,
    },
    {
      label: '供货商服务',
      tips: '开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。',
      price: 0,
      icon: service5,
    },
    {
      label: '微信通知服务',
      tips: '开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。',
      price: 0,
      icon: service1,
    }
  ]

  data.forEach((item, index) => {
    const { label, tips, price, icon } = item
    views.push(
      <div className={cs.item} key={index}>
        <img src={icon} alt="" className={cs.itemImg}/>
        <div className={cs.itemLabel}>{label}</div>
        <div className={cs.tips}>{tips}</div>
        <div className={cs.price}>¥<span>{price}</span>/月</div>
        <Button size="small" type="primary" className={cs.btn} onClick={()=>{
          // setVisible(true)
          pay()
        }}>开通服务</Button>
      </div>
    )
  })

  return (
    <div className={c.container}>
      <div className={c.main} style={{marginTop:0}}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>开通增值服务</div>
          <div className={c.circle} />
        </div>
        <div className={cs.main}>
          {views}
        </div>
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <div style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          }}>
          <img src={service4} alt="" style={{width:90}} />
          <div style={{color:'#000',fontSize:'1.714rem',marginTop:24,marginBottom:65}}>支付失败</div>
          <Button type="primary" size="small" className={cs.replaceBtn}>重新支付</Button>
        </div>
      </Modal>
      <Modal
        visible={visiblePay}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <div style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          }}>
          <div className={cs.payLabel}>支付方式：</div>
          <div style={{display:'flex',alignItems:'center',marginTop:16}}>
            <div onClick={()=>setPayType("ali")} className={cs.payTypeView} style={{marginRight:46,borderColor:payType==='ali'?"#4076FF":"#E0E3EA",background:payType==='ali'?"#ECF2FF":"#FFFFFF"}}>
              <Circle value={payType==='ali'}/>
              <img src={service6} alt="" />
              <div>支付宝支付</div>
            </div>
            <div className={cs.payTypeView} onClick={()=>setPayType('wx') } style={{borderColor:payType==='wx'?"#4076FF":"#E0E3EA",background:payType==='wx'?"#ECF2FF":"#FFFFFF"}}>
              <Circle value={payType==='wx'}/>
              <img src={service2} alt="" />
              <div>微信支付</div>
            </div>
          </div>
          <QRCode value="http://facebook.github.io/react/" className={cs.qrCode}/>
          <div className={cs.payTips}>请在<div style={{color:"#2C68FF",width:40,textAlign:'center'}}>{number}s</div>内扫码付款，付款完成后请点击“已支付”，如有疑问请与客服取得联系。</div>
          <div>
            <Button size="small" className={cs.payBtnF}>未支付</Button>
            <Button type="primary" size="small" className={cs.payBtn}>已支付</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function Circle ({ value }) {
  if (value) {
    return <div className={cs.selectT}/>
  }
  return <div className={cs.selectF}/>
}

export default SubServiceView

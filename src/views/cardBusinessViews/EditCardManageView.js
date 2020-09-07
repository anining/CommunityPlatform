import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Menu, Dropdown, Button, Upload, message, Radio, Checkbox } from 'antd'
import good5 from '../../icons/good/good5.png'

function EditCardManageView () {
  const [value, setValue] = useState()

  function onChange (e) {
    console.log('radio checked', e.target.value);
    setValue(e.target.value)
  }

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <div>首页 / 卡密业务 / <span>卡密商品</span></div>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增卡密</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>分类名称</div>
          </div>
          <div style={{width:'80%'}}>
            <div style={{marginBottom:12}}>
              <Input.TextArea
                value={value}
                style={{width:'56.875%',height:215,background:'#FBFBFB',color:'#34374A'}}
                onChange={onChange}
                placeholder="请输入卡密"
              />
              <Button type="primary" size="small" style={{
                height:38,
                width:127,
                background:'#2C68FF',
                marginLeft:30
              }}>TXT文本导入</Button>
            </div>
            <div>
              <Checkbox style={{marginRight:80}} onChange={onChange}>去除输入框中的重复卡密</Checkbox>
              <Checkbox onChange={onChange}>优先售卖此次添加的卡密</Checkbox>
            </div>
          </div>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit}>保存</Button>
            <div className={c.btnTipsView}>
              <div className={c.quitBtn}>放弃编辑</div>
              <div className={c.quitBorder}/>
              <div className={c.saveBtn}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCardManageView

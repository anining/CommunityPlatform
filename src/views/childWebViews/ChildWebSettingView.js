import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import cs from '../../styles/childWebSetting.module.css'
import { Input, Menu, Switch, Button, Upload, message, Radio, Checkbox } from 'antd'

function ChildWebSettingView () {

  function onChange (checked) {
    console.log(`switch to ${checked}`);
  }

  return (
    <div className={c.container}>
      <div className={c.main} style={{marginTop:0,marginBottom:0}}>
        <div className={cs.title}>分站设置</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>自主申请</div>
          </div>
          <div className={cs.switchView}>
            <Switch defaultChecked onChange={onChange} className={cs.switch}/>
            <div className={cs.switchText}>当前状态：开启自主申请开通分站</div>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>开启时，前端页面将会展示分站开通申请入口，用户可以填写信息并且支付之后，向后台发起分站开通申请。关闭时，前端不可以申请开通分站；只能后台创建分站。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>分站价格</div>
          </div>
          <div className={cs.priceView}>
            <div className={cs.priceViewL}>
              <div className={cs.priceViewLL}>基础版</div>
              <Input placeholder="请输入价格" size="small" className={cs.priceViewLI}/>
            </div>
            <div className={cs.priceViewR}>
              <div className={cs.priceViewRR}>创业版</div>
              <Input placeholder="请输入价格" size="small" className={cs.priceViewRI}/>
            </div>
          </div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>可选主域名</div>
          </div>
          <div style={{display:'flex'}}>
            <Checkbox onChange={onChange} className={cs.checkbox}>xyz.com</Checkbox>
            <Checkbox onChange={onChange} className={cs.checkbox}>xyz.cn</Checkbox>
            <Checkbox onChange={onChange} className={cs.checkbox}>abc.top</Checkbox>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>前端用户自主申请时可以选择的域名列表</div>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit}>保存</Button>
            <div className={c.btnTipsView} style={{justifyContent:'center'}}>
              <div className={c.quitBtn} style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>上次保存: 202.01.15 15:20:05</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChildWebSettingView

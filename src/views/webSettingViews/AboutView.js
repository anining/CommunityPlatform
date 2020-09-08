import React, { useState } from 'react'
import { Button } from 'antd'
import c from '../../styles/edit.module.css'

function AboutView () {

  return (
    <div className={c.container}>
      <div className={c.main} style={{
        marginBottom:0,
        marginTop:0,
        paddingBottom:80,
      }}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>系统信息</div>
          <div className={c.circle} />
        </div>
        <div className={c.item} style={{marginTop:0}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>站点ID</div>
          </div>
          <div className={c.itemRTV}>
            <div>110256</div>
          </div>
        </div>
        <div className={c.item} style={{marginTop:0}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>站点密钥</div>
          </div>
          <div className={c.itemRTV}>
            <div>已绑定手机：138****8293</div>
            <Button className={c.aboutBtn} size="small" type="primary">复制</Button>
          </div>
        </div>
        <div className={c.item} style={{marginTop:0}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>站点版本</div>
          </div>
          <div className={c.itemRTV}>
            <div>旗舰版</div>
            <Button className={c.aboutBtn} size="small" type="primary">管理域名</Button>
          </div>
        </div>
        <div className={c.item} style={{marginTop:0}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>站点主域名</div>
          </div>
          <div className={c.itemRTV}>
            <div>已绑定邮箱：ant***sing.com</div>
            <Button className={c.aboutBtn} size="small" type="primary">续费</Button>
          </div>
        </div>
        <div className={c.item} style={{marginTop:0}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>开通时间</div>
          </div>
          <div className={c.itemRTV}>
            <div>2020-01-01 15:12:09</div>
          </div>
        </div>
        <div className={c.item} style={{marginTop:0}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>到期时间</div>
          </div>
          <div className={c.itemRTV}>
            <div>2020-01-01 15:12:09</div>
          </div>
        </div>
        <div className={c.item} style={{marginTop:0}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>登录账号</div>
          </div>
          <div className={c.itemRTV}>
            <div>183745212547</div>
          </div>
        </div>
        <div className={c.item} style={{marginTop:0}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>登录时间</div>
          </div>
          <div className={c.itemRTV}>
            <div>2020-01-01 15:12:09</div>
          </div>
        </div>
      </div>
        <div style={{
          marginTop:66,
          marginBottom:32,
          display:'flex',
          flexDirection:'column',
          color:'rgba(0, 0, 0, 0.45)',
          alignItems:'center',
          justifyContent:'center',
          }}>
          <div style={{
            marginBottom:9
          }}>Version : 1.0.0</div>
          <div>
            <div>帮助中心&#12288; 丨 &#12288;开放平台&#12288; 丨 &#12288;免责条款&#12288; 丨　&#12288;技术支持&#12288;　丨　&#12288;版本记录</div>
          </div>
        </div>
    </div>
  )
}

export default AboutView

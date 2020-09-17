import React, { useState, useEffect } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, Switch } from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import cs from '../../styles/childWebSetting.module.css'
import { storeConfig } from "../../utils/api";
import { saveSuccess } from "../../utils/util";

function StoreSettingView () {
  const [under_maintenance, setUnder_maintenance] = useState(false) // 店铺维护中
  const [show_goods_under_maintenance, setShow_goods_under_maintenance] = useState(true) // 商品状态
  const [allow_registration, setAllow_registration] = useState(true) // 允许注册
  const [allow_guest, setAllow_guest] = useState(false) // 允许游客
  const [icp, setIcp] = useState("") // 备案信息
  const [announcement, setAnnouncement] = useState("") //维护公告

  useEffect(() => {
    storeConfig('get').then(r => {
      if (!r.error) {
        const { allow_guest, allow_registration, announcement, icp, show_goods_under_maintenance, under_maintenance } = r
        setAllow_guest(allow_guest)
        setAllow_registration(allow_registration)
        setAnnouncement(announcement)
        setIcp(icp)
        setShow_goods_under_maintenance(show_goods_under_maintenance)
        setUnder_maintenance(under_maintenance)
      }
    })
  }, [])

  function save () {
    storeConfig('modify', { under_maintenance, show_goods_under_maintenance, allow_registration, allow_guest, icp, announcement }).then(r => {
      !r.error && saveSuccess(false)
    })
  }

  return (
    <div className={c.container}>
      <div className={c.main} style={{marginTop:0}}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>店铺设置</div>
          <div className={c.circle} />
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>店铺维护中</div>
          </div>
          <div className={cs.switchView}>
            <Switch defaultChecked onClick={e=>{
              setUnder_maintenance(e)
            }} checked={under_maintenance} className={cs.switch}/>
            <div className={cs.switchText}>当前状态：开启自主申请开通分站</div>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>开启时，表示店铺正在维护，用户不可下单；关闭时，表示店铺正常营业。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>商品状态</div>
          </div>
          <div className={cs.switchView}>
            <Switch onClick={e=>setShow_goods_under_maintenance(e)} checked={show_goods_under_maintenance} className={cs.switch}/>
            <div className={cs.switchText}>当前状态：商品不可见</div>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>开启时，当店铺处于维护中状态，用户可以看见商品；关闭时，当店铺处于维护中状态，用户不可以看见商品。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>允许注册</div>
          </div>
          <div className={cs.switchView}>
            <Switch onClick={e=>setAllow_registration(e)} checked={allow_registration} className={cs.switch}/>
            <div className={cs.switchText}>当前状态：允许注册</div>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>开启时，用户可以注册；关闭时，用户只能登陆，不能注册。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>游客模式</div>
          </div>
          <div className={cs.switchView}>
            <Switch onClick={e=>setAllow_guest(e)} checked={allow_guest} className={cs.switch}/>
            <div className={cs.switchText}>当前状态 ： 允许游客访问</div>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>开启时，用户无须登录就可以直接访问商城；关闭时，用户必须要登录才能访问商城。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>备注信息</div>
          </div>
          <Input onChange={e=>setIcp(e.target.value)} value={icp} placeholder="请输入备案编号" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>维护公告</div>
          </div>
          <ReactQuill className={c.quill} theme="snow" value={announcement} onChange={e=>setAnnouncement(e)}/>
        </div>
        <div className={c.headerT} style={{marginTop:50}}>
          <div style={{zIndex:1}}>SEO相关</div>
          <div className={c.circle} />
        </div>
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName}> */}
        {/*     <span className={c.white}>*</span> */}
        {/*     <div className={c.itemText}>站点标题</div> */}
        {/*   </div> */}
        {/*   <Input placeholder="请输入站点的名称" className={c.itemInput}></Input> */}
        {/* </div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName}> */}
        {/*     <span className={c.white}>*</span> */}
        {/*     <div className={c.itemText}>SEO关键字</div> */}
        {/*   </div> */}
        {/*   <Input placeholder="请输入SEO的关键字" className={c.itemInput}></Input> */}
        {/* </div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName}> */}
        {/*     <span className={c.white}>*</span> */}
        {/*     <div className={c.itemText}>站点副标题</div> */}
        {/*   </div> */}
        {/*   <Input placeholder="请输入站点的副标题" className={c.itemInput}></Input> */}
        {/* </div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName}> */}
        {/*     <span className={c.white}>*</span> */}
        {/*     <div className={c.itemText}>SEO描述</div> */}
        {/*   </div> */}
        {/*   <Input placeholder="请输入SEO描述" className={c.itemInput}></Input> */}
        {/* </div> */}
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit} onClick={save}>保存</Button>
            <div className={c.btnTipsView} style={{justifyContent:'center'}}>
              <div style={{color:'#979BA3',fontSize:'0.857rem'}}>上次保存: 202.01.15 15:20:05</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreSettingView

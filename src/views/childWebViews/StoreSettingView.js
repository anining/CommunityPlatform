import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Menu, Dropdown, Button, Switch, message, Radio, Checkbox } from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import cs from '../../styles/childWebSetting.module.css'

function StoreSettingView () {
  const [value, setValue] = useState()
  const [quillValue, setQuillValue] = useState()


  function onChange (e) {
    console.log('radio checked', e.target.value);
    setValue(e.target.value)
  }

  function save () {
    message.success({
      content:"保存成功",
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
            <Switch defaultChecked onChange={onChange} className={cs.switch}/>
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
            <Switch defaultChecked onChange={onChange} className={cs.switch}/>
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
            <Switch defaultChecked onChange={onChange} className={cs.switch}/>
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
            <Switch defaultChecked onChange={onChange} className={cs.switch}/>
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
          <Input placeholder="请输入备案编号" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>维护公告</div>
          </div>
          <ReactQuill className={c.quill} theme="snow" value={quillValue} onChange={setQuillValue}/>
        </div>
        <div className={c.headerT} style={{marginTop:50}}>
          <div style={{zIndex:1}}>SEO相关</div>
          <div className={c.circle} />
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>站点标题</div>
          </div>
          <Input placeholder="请输入站点的名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>SEO关键字</div>
          </div>
          <Input placeholder="请输入SEO的关键字" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>站点副标题</div>
          </div>
          <Input placeholder="请输入站点的副标题" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>SEO描述</div>
          </div>
          <Input placeholder="请输入SEO描述" className={c.itemInput}></Input>
        </div>
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

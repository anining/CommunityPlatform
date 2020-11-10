import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, Breadcrumb, message } from 'antd'
import good5 from '../../icons/good/good5.png'
import {push, saveSuccess} from "../../utils/util";
import DropdownPromiseComponent from '../../components/DropdownPromiseComponent';
import {docking} from '../../utils/api';
import {useHistory} from 'react-router-dom';

function EditDockingView () {
  const { state = {} } = useHistory().location
  const h = useHistory()
	const { id, name:n, payload, type:t, endpoint:e } = state
	const p = payload ? JSON.parse(payload) : {}
	const [name, setName] = useState(n)
	const [endpoint, setEndpoint] = useState(e)
	const [type, setType] = useState(t)
	const [apiKey, setApiKey] = useState(p.key)
	const [apiToken, setApiToken] = useState(p.api_token)
	const [loading, setLoading] = useState(false)

  function save (jump) {
    if (!name || !endpoint || !apiToken || !apiKey) {
      message.warning("请完善信息")
      return
    }
    let body = {
			payload: JSON.stringify({ key: apiKey, api_token: apiToken }),
      name,
      endpoint,
      type: type || "yile",
    }
    setLoading(true)
    const promise = docking(id ? "modify" : 'add', id, undefined, body)
    promise.then(r => {
      setLoading(false)
      if (!r.error) {
        if (!jump) {
          h.replace('/main/editDocking')
        }
        saveSuccess(jump)
				setName(undefined)
				setEndpoint(undefined)
				setType(undefined)
				setApiToken(undefined)
				setApiKey(undefined)
      }
    }).catch(() => {
      if (!jump) {
        h.replace('/main/editDocking')
      }
      setLoading(false)
    })
  }

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/home")}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/docking")}>对接</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增对接</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增对接</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>名称</div>
          </div>
					<Input placeholder="请输入分类的名称" value={name} onChange={e=>setName(e.target.value)} maxLength={20} className={c.itemInput} />
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>对接系统</div>
          </div>
					<DropdownPromiseComponent initNums={[{name:"亿乐",id:"yile"}]} value={type} setValue={setType} placeholder="亿乐" />
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>站点域名</div>
          </div>
          <Input value={endpoint} onChange={e=>setEndpoint(e.target.value)} placeholder="请输入站点域名" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div style={{color:'#FF8D30'}}>站点主域名，如https://xxx.xxxx.com</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>登录账户</div>
          </div>
          <Input value={apiToken} onChange={e=>setApiToken(e.target.value)} placeholder="在对接系统的登录账号" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>登录密码</div>
          </div>
          <Input value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="在对接系统的登录密码" className={c.itemInput}></Input>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button loading={loading} type="primary" onClick={()=>save(true)} className={c.submit}>保存</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDockingView

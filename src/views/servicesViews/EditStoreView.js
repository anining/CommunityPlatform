import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, Breadcrumb, message } from 'antd'
import 'react-quill/dist/quill.snow.css';
import good5 from '../../icons/good/good5.png'
import { push, goBack, saveSuccess } from "../../utils/util";
import { useHistory } from "react-router-dom";
import { providers } from "../../utils/api";

function EditStoreView () {
  const { state = {} } = useHistory().location
  const h = useHistory()
  const { id, nickname: n, account: a } = state
  const [loading, setLoading] = useState(false)
  const [nickname, setNickname] = useState(n)
  const [account, setAccount] = useState(a)

  function save (jump) {
    if (!nickname || !account) {
      message.warning("请完善信息")
      return
    }
    setLoading(true)
    providers(id ? "modify" : "add", id, undefined, { nickname, account }).then(r => {
      setLoading(false)
      if (!jump) {
        h.replace('/main/editStore')
      }
      if (!r.error) {
        setNickname("")
        setAccount("")
        saveSuccess(jump)
      }
    }).catch(() => {
      if (!jump) {
        h.replace('/main/editStore')
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
            <span onClick={()=>push("/main/store")}>供货商</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增供货商</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增供货商</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>供货商名称</div>
          </div>
          <Input placeholder="请输入供货商名称" className={c.itemInput} value={nickname} maxLength={20} onChange={e=>setNickname(e.target.value)}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>供货商账号</div>
          </div>
          <Input maxLength={20} value={account} onChange={e=>setAccount(e.target.value)} placeholder="请输入供货商账号" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div style={{color:'#FF8D30'}}>填写商品进价之后，系统可以核算出每日的收益毛利。</div>
        </div>
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName}> */}
        {/*     <span>*</span> */}
        {/*     <div className={c.itemText}>联系方式</div> */}
        {/*   </div> */}
        {/*   <div style={{width:'29.25%',display:'flex',alignItems:'center',justifyContent:'space-between'}}> */}
        {/*     <DropdownComponent keys={[]} placeholder="联系信息" style={{ */}
        {/*       width: '23.931%', */}
        {/*       height: 40, */}
        {/*       marginTop:0, */}
        {/*       marginLeft:0, */}
        {/*       marginBottom:0, */}
        {/*       marginRight:'1.5%', */}
        {/*       color: '#34374A', */}
        {/*     }}/> */}
        {/*     <Input placeholder="请输入供货商联系方式" className={c.itemInput} style={{width:'70.94%'}}></Input> */}
        {/*   </div> */}
        {/* </div> */}
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit} loading={loading} onClick={()=>save(true)}>保存</Button>
            <div className={c.btnTipsView}>
              <div className={c.quitBtn} onClick={goBack}>放弃编辑</div>
              <div className={c.quitBorder}/>
              <div className={c.saveBtn} onClick={()=>save(false)}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditStoreView

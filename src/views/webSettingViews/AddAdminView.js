import React, { useState, useEffect } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Transfer, Button, message } from 'antd'
import 'react-quill/dist/quill.snow.css';
import good5 from '../../icons/good/good5.png'
import { permissions, addManagers } from "../../utils/api";
import { saveSuccess } from "../../utils/util";

function AddAdminView () {
  const [number, setNumber] = useState() // 管理员账号
  const [name, setName] = useState() // 管理员名称
  const [purview, setPurview] = useState([]) // 权限列表
  const [targetKeys, setTargetKeys] = useState([]) // 选中权限列表

  function format (arr) {
    const localArr = [];
    arr.forEach((item, index) => {
      localArr.push({
        title: item,
        key: index
      })
    })
    return localArr
  }

  useEffect(() => {
    permissions().then(r => {
      const { error, data } = r;
      !error && setPurview(format(data))
    })
  }, [])

  function save () {
    if (!name || !number) {
      message.warning("请完善信息")
      return;
    }
    const localPurview = []
    targetKeys.forEach(item => {
      localPurview.push(purview[item].title)
    })
    addManagers(number, name, localPurview).then(r => {
      setNumber(undefined)
      setName(undefined)
      setTargetKeys([]);
      !r.error && message.success("保存成功")
      saveSuccess()
    })
  }

  function handleChange (nextTargetKeys, direction, moveKeys) {
    setTargetKeys(nextTargetKeys)
  };

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <div>首页 / 站点设置 / 管理员 / <span>新增管理员</span></div>
      </div>
      <div className={c.main} style={{marginBottom:0}}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增管理员</div>
          <div className={c.circle} />
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>管理员账号</div>
          </div>
          <Input value={number} onChange={e=>setNumber(e.target.value)} placeholder="请填写管理员登录账号" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div style={{color:'#FF8D30'}}>用户默认密码为a123456，为保证账户安全，请提醒用户及时修改密码。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>管理员名称</div>
          </div>
          <Input value={name} onChange={e=>setName(e.target.value)} placeholder="请填写管理员名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>管理员权限</div>
          </div>
          <Transfer
            dataSource={purview}
            titles={['全部权限', '当前权限']}
            targetKeys={targetKeys}
            onChange={handleChange}
            render={item => item.title}
            style={{color:'#000',width:'29.25%'}}
            className="transfer-admin"
          />
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit} onClick={save}>保存</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAdminView

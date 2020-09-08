import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Menu, Transfer, Button, Switch, message, Radio, Checkbox } from 'antd'
import 'react-quill/dist/quill.snow.css';
import good5 from '../../icons/good/good5.png'

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

function AddAdminView () {
  const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
  const [targetKeys, setTargetKeys] = useState(oriTargetKeys)
  const [selectedKeys, setSelectedKeys] = useState([])
  const [disabled, setDisabled] = useState(false)

  function save () {
    message.success({
      content: "保存成功",
    })
  }

  function handleSelectChange (sourceSelectedKeys, targetSelectedKeys) {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  function handleScroll (direction, e) {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  function handleChange (nextTargetKeys, direction, moveKeys) {
    setTargetKeys(nextTargetKeys)
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
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
          <Input placeholder="请填写管理员登录账号" className={c.itemInput}></Input>
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
          <Input placeholder="请填写管理员名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>管理员权限</div>
          </div>
          <Transfer
            dataSource={mockData}
            titles={['全部权限', '当前权限']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            onScroll={handleScroll}
            render={item => item.title}
            disabled={disabled}
            style={{
              color:'#000',
              width:'29.25%'
            }}
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

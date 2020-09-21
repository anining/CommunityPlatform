import React, { useState } from 'react'
import { Menu, Button, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import c from '../styles/view.module.css'

function DropdownComponent ({ action, style = {}, submit, keys, setAction, placeholder = "批量操作" }) {
  const [key, setKey] = useState(action)

  const menu = (
    <Menu onClick={e=>{
      setKey(e.key);
      setAction && setAction(e.key)
    }}>
      {
        keys.map(i=>(
          <Menu.Item key={i.key}>
            {i.name}
          </Menu.Item>
        ))
      }
    </Menu>
  );

  if (submit) {
    return (
      <div className={c.actionView} style={{height:80}}>
        <Dropdown overlay={menu}>
          <Button size="small" className={c.actionBtn}>
            <div className={c.hiddenText}>
              { key ? keys.filter(i => i.key === key)[0].name : "批量操作" }
            </div>
            <DownOutlined />
          </Button>
        </Dropdown>
        <Button disabled={!key} className={c.action} onClick={()=>submit(key)} size="small">执行操作</Button>
      </div>
    )
  }

  return (
    <Dropdown overlay={menu}>
        <Button size="small" className={c.actionBtn} style={style}>
          <div className={c.hiddenText}>
            { key ? keys.filter(i => i.key === key)[0].name : placeholder}
          </div>
          <DownOutlined />
        </Button>
      </Dropdown>
  )
}

export default DropdownComponent

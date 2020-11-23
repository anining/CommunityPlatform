import React, { useState } from 'react'
import { Menu, Button, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import c from '../styles/view.module.css'

function DropdownComponent ({ loading, selectedRows, action, style = {}, submit, keys, setAction, placeholder = "批量操作" }) {
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
          <Button size="small" className={c.actionBtnDelete}>
            <div className={c.hiddenText}>
              { key ? keys.filter(i => i.key === key)[0].name : "批量操作" }
            </div>
            <DownOutlined />
          </Button>
        </Dropdown>
        <Button loading={loading} disabled={!key || selectedRows.length===0} className={c.action} onClick={()=>submit(key)} size="small">执行操作</Button>
      </div>
    )
  }

  return (
    <Dropdown trigger={["click"]} overlay={menu}>
        <Button size="small" className={c.actionBtn} style={style}>
          <div className={c.hiddenText} style={{color:action?"#34374A":"#C4C4C4"}}>
            { action ? keys.filter(i => i.key === action)[0].name : placeholder }
          </div>
          <DownOutlined />
        </Button>
      </Dropdown>
  )
}

export default DropdownComponent

import React, { useState } from 'react'
import { Dropdown, Button, Menu } from 'antd'
import c from '../styles/action.module.css'
import { DownOutlined } from '@ant-design/icons';

function ActionComponent ({selectedRows, submit, keys, setSelectRows}) {
  const [key, setKey] = useState()

  const menu = (
    <Menu onClick={e=>setKey(e.key)}>
      {
        keys.map(i=>(
          <Menu.Item key={i.key}>
            {i.name}
          </Menu.Item>
        ))
      }
    </Menu>
  );

	return (
		<div className={c.view} style={{display: selectedRows.length?"flex":"none"}}>
			<div className={c.selected_view} onClick={()=>setSelectRows([])}>
				<div className={c.selected}><div className={c.selected_in}/></div>
				<div className={c.selected_text}>已选中<span>{ selectedRows.length }</span>项</div>
			</div>
      <div className={c.actionView}>
        <Dropdown overlay={menu} placement="topCenter">
          <Button size="small" className={c.actionBtnDelete}>
            <div className={c.hiddenText}>
              { key ? keys.filter(i => i.key === key)[0].name : "批量操作" }
            </div>
            <DownOutlined />
          </Button>
        </Dropdown>
        <Button disabled={!key} className={c.action} onClick={()=>submit(key)} size="small">批量操作</Button>
      </div>
		</div>
	)
}

export default ActionComponent

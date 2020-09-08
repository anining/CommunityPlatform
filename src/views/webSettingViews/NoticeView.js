import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, Modal, Pagination } from 'antd'
import c from '../../styles/view.module.css'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { h } from '../../utils/history'
import good7 from '../../icons/good/good7.png'

function NoticeView () {
  const [visible, setVisible] = useState(false)

  return (
    <div className="container">
      <div className={c.container}>
        <RTable setVisible={setVisible} />
      </div>
    </div>
  )
}

function RTable ({ setVisible }) {
  const [selectionType, setSelectionType] = useState('checkbox');

  const columns = [
    {
      title: '公告标题',
      dataIndex: 'label',
      align: 'center',
  },
    {
      title: '公告内容',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '发送人',
      align: 'center',
      dataIndex: 'user',
  },
    {
      title: '创建时间',
      dataIndex: 'time',
      align: 'center',
  },
];

  const data = [
    {
      key: 1240,
      label: '新增知乎会员',
      name: '店铺上新啦，新增知乎会员购买，快来下单吧…',
      user: '名字是什么',
      time: '2017-10-31  23:12:00',
    },
  ];

  for (let i = 0; i < 100; i++) {
    data.push({
      key: 1240,
      label: '新增知乎会员',
      name: '店铺上新啦，新增知乎会员购买，快来下单吧…',
      user: '名字是什么',
      time: '2017-10-31  23:12:00',
    })
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      // disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      // name: record.name,
    }),
  };

  function handleMenuClick (e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        1st menu item
      </Menu.Item>
      <Menu.Item key="2">
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3">
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={c.main} style={{marginTop:0}}>
        <div className={c.searchView}>
          <div className={c.search}>
            <div className={c.searchL}>
            </div>
            <div className={c.searchR}>
              <Button icon={
                <img src={good7} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
                onClick={()=>{
                  const history = h.get()
                  history.push("/main/addNotice")
                }}
              className={c.searchBtn}>新增公告</Button>
            </div>
          </div>
      </div>
      <div className={c.actionView}>
        <Dropdown overlay={menu}>
          <Button size="small" className={c.actionBtn}>
            <div className={c.hiddenText}>
              批量操作
            </div>
            <DownOutlined />
          </Button>
        </Dropdown>
        <Button className={c.action} onClick={()=>setVisible(true)} size="small">执行操作</Button>
      </div>
      <Table columns={columns} rowSelection={{
        type: selectionType,
        ...rowSelection
      }} dataSource={data} rowClassName={(record,index)=>{
        if (index % 2) {
          return "f1f5ff"
        }
      }} size="small" pagination={{showQuickJumper:true}}
      />
    </div>
  )
}

export default NoticeView

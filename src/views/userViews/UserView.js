import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, Popconfirm } from 'antd'
import c from '../../styles/view.module.css'
import { DownOutlined } from '@ant-design/icons';
import good23 from '../../icons/good/good23.png'
import good24 from '../../icons/good/good24.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'
import { h } from '../../utils/history'
import good41 from '../../icons/good/good41.png'

function UserView () {
  const [visible, setVisible] = useState(false)

  return (
    <div className="container">
      <div className={c.container}>
        <div className={c.header}>
          <div className={c.headerL}>
            <HeaderItem />
          </div>
          <Button icon={
            <img src={good7} alt="" style={{width:16,marginRight:6}} />
          }
          type = "primary"
          size = "small"
          onClick={()=>{
            const history = h.get()
            history.push("/main/addUser")
          }}
          className = {c.headerAddBtn}>添加用户</Button>
        </div>
        <RTable setVisible={setVisible} />
      </div>
    </div>
  )
}

function RTable ({ setVisible }) {
  const [selectionType, setSelectionType] = useState('checkbox');

  const obj = [
    {
      color: '#2C68FF',
      text: '正常',
    },
    {
      color: '#FF4D4F',
      text: '封禁',
    }
  ]
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '用户账号',
      dataIndex: 'number',
      align: 'center',
  },
    {
      title: '消费总额',
      align: 'center',
      dataIndex: 'close',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 1,
      },
  },
    {
      title: '用户余额',
      dataIndex: 'balance',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 2,
      },
  },
    {
      title: '下单次数',
      dataIndex: 'num',
      align: 'center',
  },
    {
      title: '注册时间',
      align: 'center',
      dataIndex: 'time',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 3,
      },
  },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (text, record, index) => {
        const { color, text: t } = obj[text]
        return <div style={{color}}>{t}</div>
      }
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small" style={{color:'#2C68FF'}}>
            <Popconfirm icon={()=><img src="" alt="" style={{width:0,height:0}}/>
              }
              placement = "left"
              title = {
                  () => {
                    return (
                      <div style={styles.view}>
                        <div style={styles.header}>
                          <img src={good41} alt="" style={styles.icon}/>
                          <div>请输入您要修改成多少的余额</div>
                        </div>
                        <Input style={styles.input} placeholder="请在这里修改余额"/>
                        <div style={styles.footer}>
                          <Button size="small" style={styles.cancelBtn}>取消</Button>
                          <Button size="small" type="primary" style={styles.okBtn}>确定</Button>
                        </div>
                      </div>
                    )
                  }
                } >
              <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
                // const history = h.get()
                // history.push("/main/editCommunityGood")
              }}>修改余额</div>
            </Popconfirm>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
            const history = h.get()
            history.push("/main/editUserPrice")
          }}>修改密价</div>
        </Space>
      )
  },
];

  const data = [
    {
      key: 1240,
      id: '01',
      number: '123355466',
      close: '12.456',
      balance: '123.12',
      num: 789,
      time: '2017-10-31 23:12:00',
      status: 0
    },
    {
      key: 1240,
      id: '01',
      number: '123355466',
      close: '12.456',
      balance: '123.12',
      num: 789,
      time: '2017-10-31 23:12:00',
      status: 1
    },
  ];

  // function onChange (pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  for (let i = 0; i < 100; i++) {
    data.push({
      key: 1240,
      id: '01',
      number: '123355466',
      close: '12.456',
      balance: '123.12',
      num: 789,
      time: '2017-10-31 23:12:00',
      status: 0
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
    <div className={c.main} style={{marginBottom:24}}>
        <div className={c.searchView}>
          <div className={c.search}>
            <div className={c.searchL} style={{width:'25.369%'}}>
              <Input placeholder="请输入用户名" size="small" className={c.searchInput} style={{width:'45.145%'}}/>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn} style={{width:'45.145%'}}>
                  <div className={c.hiddenText}>
                    请选择用户状态
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            <div className={c.searchR}>
              <Button size="small" className={c.resetBtn}>重置</Button>
              <Button icon={
                <img src={good9} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
              className={c.searchBtn}>搜索用户</Button>
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

function HeaderItem () {
  const views = [];
  const data = [
    {
      label: '用户总数',
      number: '10,100',
      icon: good23,
      id: 111,
    },
    {
      label: '今日新增',
      number: '10,111',
      icon: good24,
      id: 222,
    },
  ]

  data.forEach((item, index) => {
    const { label, number, icon, id } = item;
    views.push(
      <div className={c.headerItem} key={id}>
        <img src={icon} alt="" className={c.headerItemImg} />
        <div className={c.headerIR} style={{borderRightWidth:index<data.length-1?1:0}}>
          <div className={c.headerNumber}>{number}</div>
          <div className={c.headerLabel}>{label}</div>
        </div>
      </div>
    )
  })

  return views
}

const styles = {
  view: {
    width: 340,
  },
  input: {
    height: 32,
    width: "100%",
    marginTop: 29,
    marginBottom:72
  },
  header: {
    marginTop: 18,
    color: 'rgba(0, 0, 0, 0.65)',
    display: 'flex',
    alignItems: 'center'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    width: 14,
    marginRight: 9,
  },
  cancelBtn: {
    height: 24,
    width: 58,
    color: 'rgba(0, 0, 0, 0.65)',
  },
  okBtn: {
    marginLeft: 19,
    height: 24,
    width: 58,
    background: '#1890FF'
  },
}

export default UserView

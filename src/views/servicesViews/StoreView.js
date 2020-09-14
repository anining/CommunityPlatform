import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, Popconfirm } from 'antd'
import c from '../../styles/view.module.css'
import { DownOutlined } from '@ant-design/icons';
import good38 from '../../icons/good/good38.png'
import good39 from '../../icons/good/good39.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'
import { h } from '../../utils/history'
import good41 from '../../icons/good/good41.png'

function StoreView () {
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
          className = {c.headerAddBtn}>新增</Button>
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
      text: '暂停',
      color: '#FF8D30',
    },
    {
      text: '正常',
      color: '#000'
    }
  ]
  const columns = [
    {
      title: '供货商ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '供货商名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '供货商账户',
      align: 'center',
      dataIndex: 'number',
  },
    {
      title: '总收益',
      dataIndex: 'price',
      align: 'center',
  },
    {
      title: '待结算收益',
      dataIndex: 'in_price',
      align: 'center',
  },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (text, record, index) => {
        const { text: t, color } = obj[text];
        return <div style={{color}}>{t}</div>
      }
  },
    {
      title: '供货商商品数',
      dataIndex: 'num',
      align: 'center',
  },
    {
      title: '对接时间',
      align: 'center',
      dataIndex: 'time',
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small" style={{color:'#2C68FF'}}>
          <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
            const history = h.get()
            history.push("/main/editStore")
          }}>修改</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
            <Popconfirm icon={()=><img src="" alt="" style={{width:0,height:0}}/>
              }
              placement = "left"
              title = {
                  () => {
                    return (
                      <div style={styles.view}>
                        <div style={styles.header}>
                          <img src={good41} alt="" style={styles.icon}/>
                          <div>请输入结算金额</div>
                        </div>
                        <Input style={styles.input} placeholder="请在这里输入结算金额"/>
                        <div style={styles.tips}>全部结算</div>
                        <div style={styles.footer}>
                          <Button size="small" style={styles.cancelBtn}>取消</Button>
                          <Button size="small" type="primary" style={styles.okBtn}>确定</Button>
                        </div>
                      </div>
                    )
                  }
                } >
              <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} href="/main/editCommunityGood">结算</div>
            </Popconfirm>
        </Space>
      )
  },
];

  const data = [
    {
      key: 1240,
      name: 'xx',
      number: '13242342343',
      price: '12,444',
      in_price: '12,555',
      status: 0,
      num: 10,
      time: '2017-10-31 23:12:00',
    },
    {
      key: 1240,
      name: 'xx',
      number: '13242342343',
      price: '12,444',
      in_price: '12,555',
      status: 1,
      num: 10,
      time: '2017-10-31 23:12:00',
    },
  ];

  // function onChange (pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  for (let i = 0; i < 100; i++) {
    data.push({
      key: 1240,
      name: 'xx',
      number: '13242342343',
      price: '12,444',
      in_price: '12,555',
      status: 1,
      num: 10,
      time: '2017-10-31 23:12:00',
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
    <div className={c.main}>
        <div className={c.searchView}>
          <div className={c.search}>
            <div className={c.searchL} style={{width:'11.453%'}}>
              <Input placeholder="请输入名称" size="small" className={c.searchInput} style={{width:'100%'}}/>
            </div>
            <div className={c.searchR}>
              <Button size="small" className={c.resetBtn}>重置</Button>
              <Button icon={
                <img src={good9} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
              className={c.searchBtn}>搜索</Button>
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
      label: '供货商',
      number: '10,100',
      icon: good38,
      id: 111,
    },
    {
      label: '供货商品数',
      number: '10,111',
      icon: good39,
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
  tips:{
    color:'#2C68FF',
    fontSize:'0.857rem',
    marginTop:8,
    marginBottom: 46,
  }
}

export default StoreView

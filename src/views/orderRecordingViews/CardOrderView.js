import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, Modal, DatePicker } from 'antd'
import c from '../../styles/view.module.css'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import good19 from '../../icons/good/good19.png'
import good20 from '../../icons/good/good20.png'
import good9 from '../../icons/good/good9.png'
import good32 from '../../icons/good/good32.png'
import good34 from '../../icons/good/good34.png'
import good35 from '../../icons/good/good35.png'
import ErrorComponent from "../../components/ErrorComponent";

function CardOrderView () {
  const [visible, setVisible] = useState(false)

  // return <ErrorComponent />

  return (
    <div className="container">
      <div className={c.container}>
        <div className={c.header}>
          <div className={c.headerL} style={{width:'87.684%'}}>
            <HeaderItem />
          </div>
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
      color: "#2C68FF",
      text: '待发货',
      icon: good32,
    },
    {
      color: "#52C41A",
      text: '已完成',
      icon: good34,
    },
    {
      color: "#FF8D30",
      text: '异常',
      icon: good35,
    },
  ]
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '商品信息',
      dataIndex: 'text',
      align: 'center',
  },
    {
      title: '预留方式',
      dataIndex: 'msg',
      align: 'center',
      render: (text, record, index) => {
        const { type, number } = text;
        return (
          <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src={obj[type].icon} alt="" style={{width:20,marginRight:12}}/>
            <div>{number}</div>
          </div>
        )
      }
  },
    {
      title: '商品分类',
      align: 'center',
      dataIndex: 'category',
  },
    {
      title: '对应卡密',
      dataIndex: 'number',
      align: 'center',
  },
    {
      title: '供货商',
      dataIndex: 'store',
      align: 'center',
  },
    {
      title: '订单状态',
      align: 'center',
      dataIndex: 'status',
      render: (text, record, index) => {
        const { text: t, color } = obj[text]
        return <div style={{color}}>{t}</div>
      }
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small" style={{color:'#2C68FF'}}>
          <div>修改状态</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div>退款</div>
        </Space>
      )
  },
];

  const data = [
    {
      key: 1240,
      id: 1,
      msg: {
        type: 0,
        number: 127587,
      },
      text: '饿昏了么联名卡',
      category: '饿昏了么',
      number: '2333',
      store: '-',
      status: 0,
    },
    {
      key: 1240,
      id: 1,
      msg: {
        type: 1,
        number: 127587,
      },
      text: '饿昏了么联名卡',
      category: '饿昏了么',
      number: '2333',
      store: '-',
      status: 1,
    },
    {
      key: 1240,
      id: 1,
      msg: {
        type: 2,
        number: 127587,
      },
      text: '饿昏了么联名卡',
      category: '饿昏了么',
      number: '2333',
      store: '-',
      status: 2,
    },
  ];

  // function onChange (pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  for (let i = 0; i < 100; i++) {
    data.push({
      key: 1240,
      id: 1,
      msg: {
        type: 1,
        number: 127587,
      },
      text: '饿昏了么联名卡',
      category: '饿昏了么',
      number: '2333',
      store: '-',
      status: 0,
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
      <div className={c.searchView} style={{height:72}}>
        <div className={c.search} style={{borderBottomWidth:0}}>
            <div className={c.searchL}>
              <Input placeholder="请输入订单编号" size="small" className={c.searchInput}/>
              <Input placeholder="请输入商品名称" size="small" className={c.searchInput}/>
              <Input placeholder="请输入预留方式" size="small" className={c.searchInput}/>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn}>
                  <div className={c.hiddenText}>
                    请选择商品分类
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn}>
                  <div className={c.hiddenText}>
                    请选择订单状态
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
              className={c.searchBtn}>搜索订单</Button>
            </div>
          </div>
      </div>
      <div className={c.searchView} style={{height:52}}>
        <div className={c.search} style={{alignItems:'flex-start'}}>
          <div className={c.searchL} style={{width:'35.344%'}}>
            <Dropdown overlay={menu}>
              <Button size="small" className={c.dropdownBtn} style={{width:'32.404%'}}>
                <div className={c.hiddenText}>
                  请选供货商
                </div>
                <DownOutlined />
              </Button>
            </Dropdown>
            <DatePicker.RangePicker style={{width:'60.627%',height:32}}/>
            </div>
          </div>
      </div>
      <div className={c.actionView} style={{height:72}}>
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
      label: '订单总数',
      number: '10,100',
      icon: good19,
      id: 111,
    },
    {
      label: '异常订单',
      number: '1',
      icon: good20,
      id: 555,
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

export default CardOrderView

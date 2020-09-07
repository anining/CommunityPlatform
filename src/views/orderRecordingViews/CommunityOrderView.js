import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, Modal, DatePicker } from 'antd'
import c from '../../styles/view.module.css'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import good17 from '../../icons/good/good17.png'
import good18 from '../../icons/good/good18.png'
import good19 from '../../icons/good/good19.png'
import good20 from '../../icons/good/good20.png'
import good21 from '../../icons/good/good21.png'
import good9 from '../../icons/good/good9.png'

function CommunityOrderView () {
  const [visible, setVisible] = useState(false)

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
      {/* <Modal */}
      {/*   visible={visible} */}
      {/*   onOk={handleOk} */}
      {/*   footer={null} */}
      {/*   onCancel={handleCancel} */}
      {/* > */}
      {/*   <div className={{ */}
      {/*     display:'flex', */}
      {/*     flexDirection:'column', */}
      {/*     alignItems:'center', */}
      {/*     padding:25, */}
      {/*     }}> */}
      {/*     <img src={good6} alt="" style={{width:90}} /> */}
      {/*     <h4 style={{marginBottom:25,marginTop:25}}>{actionId===1?"确定要删除此支付账户吗？":"确定要删除这个分类吗？"}</h4> */}
      {/*     {(()=>{ */}
      {/*     if(actionId===1){ */}
      {/*       return <p>分类<span style={{color:"#2C68FF"}}>哔哩哔哩</span> 一共包含了 15 个商品，包含商品的分类不允许被删除，请更改关联商品的分类之后重试。</p> */}
      {/*     } */}
      {/*       return <p>删除的分类不可被找回，请确认。</p> */}
      {/*     })()} */}
      {/*     <div style={{display:'flex',justifyContent:'space-around',marginTop:25,alignItems:'center',width:'100%'}}> */}
      {/*       <Button key="back" style={{width:150}}> */}
      {/*         取消 */}
      {/*       </Button> */}
      {/*       <Button key="submit"style={{width:150}} type="primary" onClick={handleOk}> */}
      {/*         确定 */}
      {/*       </Button> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </Modal> */}
    </div>
  )
}

function RTable ({ setVisible }) {
  const [selectionType, setSelectionType] = useState('checkbox');

  const obj = [
    {
      color: "#FF8D30",
      text: '待处理',
    },
    {
      color: "#2C68FF",
      text: '进行中',
    },
    {
      color: "#52C41A",
      text: '已完成',
    },
    {
      color: "#FF8D30",
      text: '异常',
    },
    {
      color: "#FF5730",
      text: '申请退款',
    }
  ]
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '下单信息',
      dataIndex: 'msg',
      align: 'center',
      render: (text, record, index) => {
        const { uri, number, password } = text;
        return (
          <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div>
              <div>主页链接 :{uri}</div>
              <div style={{display:'flex'}}>
                <div style={{marginRight:30}}>账号: {number}</div>
                <div>密码: {password}</div>
              </div>
            </div>
          </div>
        )
      }
  },
    {
      title: '扩展信息',
      align: 'center',
      dataIndex: 'text',
      render: (text, record, index) => {
        const { begin_num, num } = text;
        return (
          <div>
            <div>初始量 :{begin_num}</div>
            <div>当前量: {num}</div>
          </div>
        )
      }
  },
    {
      title: '下单数量',
      dataIndex: 'number',
      align: 'center',
  },
    {
      title: '订单金额',
      dataIndex: 'price',
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
      title: '下单时间',
      dataIndex: 'time',
      align: 'center',
  },
    {
      title: '订单历程',
      align: 'center',
      render: (text, record, index) => (
        <div style={{color:'#2C68FF',textDecoration:'underline',textDecorationColor:'#2C68FF'}}>点击查看</div>
      )
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small" style={{color:'#2C68FF'}}>
          <div style={{color:'#FF4D4F',textDecoration:'#FF4D4F underline'}}>退款</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{color:'#2C68FF',textDecoration:'#2C68FF underline'}}>添加备注</div>
        </Space>
      )
  },
];

  const data = [
    {
      key: 1240,
      id: 1,
      msg: {
        uri: "https://www.baidu.com/s/324654",
        number: 127587,
        password: "57657575",
      },
      text: {
        begin_num: '1,456',
        num: '1,456',
      },
      number: '1,2333',
      price: '1,2333',
      time: '2020-10-31  23:12:00',
      status: 0,
    },
    {
      key: 1240,
      id: 1,
      msg: {
        uri: "https://www.baidu.com/s/324654",
        number: 127587,
        password: "57657575",
      },
      text: {
        begin_num: '1,456',
        num: '1,456',
      },
      number: '1,2333',
      price: '1,2333',
      time: '2020-10-31  23:12:00',
      status: 1,
    },
    {
      key: 1240,
      id: 1,
      msg: {
        uri: "https://www.baidu.com/s/324654",
        number: 127587,
        password: "57657575",
      },
      text: {
        begin_num: '1,456',
        num: '1,456',
      },
      number: '1,2333',
      price: '1,2333',
      time: '2020-10-31  23:12:00',
      status: 2,
    },
    {
      key: 1240,
      id: 1,
      msg: {
        uri: "https://www.baidu.com/s/324654",
        number: 127587,
        password: "57657575",
      },
      text: {
        begin_num: '1,456',
        num: '1,456',
      },
      number: '1,2333',
      price: '1,2333',
      time: '2020-10-31  23:12:00',
      status: 3,
    },
    {
      key: 1240,
      id: 1,
      msg: {
        uri: "https://www.baidu.com/s/324654",
        number: 127587,
        password: "57657575",
      },
      text: {
        begin_num: '1,456',
        num: '1,456',
      },
      number: '1,2333',
      price: '1,2333',
      time: '2020-10-31  23:12:00',
      status: 4,
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
        uri: "https://www.baidu.com/s/324654",
        number: 127587,
        password: "57657575",
      },
      text: {
        begin_num: '1,456',
        num: '1,456',
      },
      number: '1,2333',
      price: '1,2333',
      time: '2020-10-31  23:12:00',
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
              <Input placeholder="请输入下单账号" size="small" className={c.searchInput}/>
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
                  请选择商品名称
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
      label: '待处理订单',
      number: '10,111',
      icon: good21,
      id: 222,
    },
    {
      label: '申请退款',
      number: '10,111',
      icon: good17,
      id: 333,
    },
    {
      label: '申请补单',
      number: '10,111',
      icon: good18,
      id: 444,
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

export default CommunityOrderView

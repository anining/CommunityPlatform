import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, DatePicker, Pagination } from 'antd'
import c from '../../styles/view.module.css'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { h } from '../../utils/history'
import good22 from '../../icons/good/good22.png'
import good27 from '../../icons/good/good27.png'
import good26 from '../../icons/good/good26.png'
import good25 from '../../icons/good/good25.png'
import good9 from '../../icons/good/good9.png'

function CapitalFlowView () {
  const [visible, setVisible] = useState(false)

  return (
    <div className="container">
      <div className={c.container}>
        <div className={c.header}>
          <div className={c.headerL}>
            <HeaderItem />
          </div>
        </div>
        <div className={c.headerTips}>
          <div className={c.headerText}>
            <img src={good27} alt="" className={c.tipsImg}/>
            <div>用户充值会产生流水记录，但是不会计入今日消费；今日消费只计算购买商品产生的流水总和。</div>
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
      color: "#53C41C",
      text: '充值',
      textColor: '#2C68FF',
    },
    {
      color: "#FF8D30",
      text: '系统加款',
      textColor: '#FF4D4F',
    },
    {
      color: "#FF4D4F",
      text: '退款',
      textColor: '#FF8D30',
    },
    {
      color: "#2C68FF",
      text: '购买卡密商品',
    }
  ]
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '用户账号',
      dataIndex: 'number',
      align: 'center',
  },
    {
      title: '流水金额',
      align: 'center',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 1,
      },
      render: (text, record, index) => {
        const { status, t } = text
        const { textColor: color } = obj[status]
        return <div style={{color}}>{t}</div>
      }
  },
    {
      title: '支付方式',
      dataIndex: 'type',
      align: 'center'
  },
    {
      title: '消费类型',
      dataIndex: 'close_type',
      align: 'center',
      render: (text, record, index) => {
        const { text: t, color } = obj[text]
        return <div style={{color}}>{t}</div>
      }
  },
    {
      title: '时间',
      dataIndex: 'time',
      align: 'center',
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small" style={{color:'#2C68FF'}}>
          <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
            const history = h.get()
            history.push("/main/editCommunityGood")
          }}>修改状态</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} href="/main/editCommunityGood">退款</div>
        </Space>
      )
  },
];

  const data = [
    {
      key: 1240,
      id: 1233,
      number: '123355466',
      price: {
        status: 0,
        t: 235.6
      },
      type: '-',
      close_type: 0,
      time: '2020-10-31  23:12:00'
    },
    {
      key: 1240,
      id: 1233,
      number: '123355466',
      price: {
        status: 1,
        t: 235.6
      },
      type: '-',
      close_type: 1,
      time: '2020-10-31  23:12:00'
    },
    {
      key: 1240,
      id: 1233,
      number: '123355466',
      price: {
        status: 2,
        t: 235.6
      },
      type: '-',
      close_type: 2,
      time: '2020-10-31  23:12:00'
    },
    {
      key: 1240,
      id: 1233,
      number: '123355466',
      price: {
        status: 0,
        t: 235.6
      },
      type: '-',
      close_type: 3,
      time: '2020-10-31  23:12:00'
    },
  ];

  // function onChange (pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  for (let i = 0; i < 100; i++) {
    data.push({
      key: 1240,
      id: 1233,
      number: '123355466',
      price: {
        status: 0,
        t: 235.6
      },
      type: '-',
      close_type: 0,
      time: '2020-10-31  23:12:00'
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
            <div className={c.searchL} style={{width:'78.571%'}}>
              <Input placeholder="请输入用户账户" size="small" className={c.searchInput} style={{width:'16.457%'}}/>
              <Input placeholder="请输入订单编号" size="small" className={c.searchInput} style={{width:'16.457%'}}/>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn} style={{width:'14.576%'}}>
                  <div className={c.hiddenText}>
                    请选择支付方式
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn} style={{width:'14.576%'}}>
                  <div className={c.hiddenText}>
                    请选择消费类型
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
              <DatePicker.RangePicker style={{height:32,width:'27.272%'}}/>
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
      label: '今日流水',
      number: '10,100',
      icon: good22,
      id: 111,
    },
    {
      label: '今日充值',
      number: '10,111',
      icon: good26,
      id: 222,
    },
    {
      label: '今日退款',
      number: '10,111',
      icon: good25,
      id: 333,
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

export default CapitalFlowView

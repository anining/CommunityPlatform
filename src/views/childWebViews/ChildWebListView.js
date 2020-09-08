import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, Modal, Pagination } from 'antd'
import good1 from '../../icons/good/good1.png'
import c from '../../styles/view.module.css'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { h } from '../../utils/history'
import good28 from '../../icons/good/good28.png'
import good29 from '../../icons/good/good29.png'
import good30 from '../../icons/good/good30.png'
import good32 from '../../icons/good/good32.png'
import good34 from '../../icons/good/good34.png'
import good35 from '../../icons/good/good35.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'

function ChildWebListView () {
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
              history.push("/main/editChildWeb")
            }}
          className = {c.headerAddBtn}>新增分站</Button>
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
      color: "#2C68FF",
      text: '正常',
      icon: good32,
    },
    {
      color: "#FF4D4F",
      text: '关闭',
      icon: good34,
    },
    {
      color: "#FF8D30",
      text: '申请开通',
      icon: good35,
    }
  ]
  const columns = [
    {
      title: '站点编号',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '站点域名',
      dataIndex: 'uri',
      align: 'center',
  },
    {
      title: '站点版本',
      align: 'center',
      dataIndex: 'version',
  },
    {
      title: '主账号',
      dataIndex: 'number',
      align: 'center',
  },
    {
      title: '联系方式',
      align: 'center',
      dataIndex: 'text',
      render: (text, record, index) => {
        const { status, t } = text
        return (
          <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src={obj[status].icon} alt="" style={{width:20}}/>
            <div style={{marginLeft:12}}>{t}</div>
          </div>
        )
      }
  },
    {
      title: '状态',
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
        <div style={{textDecoration:"underline",color:'#2C68FF',textDecorationColor:'#2C68FF'}} onClick={()=>{
            const history = h.get()
            history.push("/main/editChildWeb")
          }}>重置密码</div>
      )
  },
];

  const data = [
    {
      key: 1240,
      id: 123,
      uri: '5df.my.com',
      version: '基础版',
      number: '123355466',
      text: {
        status: 0,
        t: 11544564545,
      },
      status: 0,
    },
    {
      key: 1240,
      id: 123,
      uri: '5df.my.com',
      version: '基础版',
      number: '123355466',
      text: {
        status: 1,
        t: 11544564545,
      },
      status: 1,
    },
    {
      key: 1240,
      id: 123,
      uri: '5df.my.com',
      version: '基础版',
      number: '123355466',
      text: {
        status: 2,
        t: 11544564545,
      },
      status: 2,
    }
  ];

  // function onChange (pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  for (let i = 0; i < 100; i++) {
    data.push({
      key: 1240,
      id: 123,
      uri: '5df.my.com',
      version: '基础版',
      number: '123355466',
      text: {
        status: 2,
        t: 11544564545,
      },
      status: 2,
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
            <div className={c.searchL} style={{width:'54.679%'}}>
              <Input placeholder="请输入站点域名" size="small" className={c.searchInput} style={{width:'23.648%'}}/>
              <Input placeholder="请输入主账号" size="small" className={c.searchInput} style={{width:'23.648%'}}/>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn} style={{width:'20.945%'}}>
                  <div className={c.hiddenText}>
                    请选择站点状态
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn} style={{width:'20.945%'}}>
                  <div className={c.hiddenText}>
                    请选择站点版本
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
              className={c.searchBtn}>搜索分站</Button>
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
      label: '分站个数',
      number: '10,100',
      icon: good30,
      id: 111,
    },
    {
      label: '分站流水总和',
      number: '10,111',
      icon: good28,
      id: 222,
    },
    {
      label: '申请开通',
      number: '10,111',
      icon: good29,
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

export default ChildWebListView

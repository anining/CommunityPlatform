import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, Modal, Pagination } from 'antd'
import c from '../../styles/view.module.css'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import good11 from '../../icons/good/good11.png'
import good12 from '../../icons/good/good12.png'
import good13 from '../../icons/good/good13.png'
import good14 from '../../icons/good/good14.png'
import good16 from '../../icons/good/good16.png'
import good15 from '../../icons/good/good15.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'
import { h } from '../../utils/history'

function CardManageView () {
  const [visible, setVisible] = useState(false)

  return (
    <div className="container">
      <div className={c.container}>
        <div className={c.header}>
          <div className={c.headerL} style={{width:'89.839%'}}>
            <HeaderItem />
          </div>
          <Button icon={
            <img src={good7} alt="" style={{width:16,marginRight:6}} />
          }
          type = "primary"
          size = "small"
          className = {c.headerAddBtn}>添加卡密</Button>
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
      color: "#4177FE",
      text: '已售出',
    },
    {
      color: "#FF8D30",
      text: '未售出',
    },
  ]
  const columns = [
    {
      title: '卡密编号',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '商品编号',
      dataIndex: 'good_id',
      align: 'center',
  },
    {
      title: '商品名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '商品类别',
      align: 'center',
      dataIndex: 'category',
  },
    {
      title: '卡密类型',
      dataIndex: 'card_category',
      align: 'center',
  },
    {
      title: '卡号',
      dataIndex: 'number',
      align: 'center',
  },
    {
      title: '卡密',
      dataIndex: 'card',
      align: 'center',
  },
    {
      title: '卡密状态',
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
          history.push("/main/editCardManage")
        }}>修改</div>
      )
  },
];

  const data = [
    {
      key: 1240,
      id: 1,
      good_id: 1,
      name: '饿昏了么联名卡',
      category: '饿昏了么',
      card_category: '循环卡',
      card: 'HJHJHJHGLFDFFD',
      number: '234234234234',
      status: 1
    },
    {
      key: 1240,
      id: 1,
      good_id: 1,
      name: '饿昏了么联名卡',
      category: '饿昏了么',
      card_category: '循环卡',
      card: 'HJHJHJHGLFDFFD',
      number: '234234234234',
      status: 0
    },
  ];

  // function onChange (pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  for (let i = 0; i < 100; i++) {
    data.push({
      key: 1240,
      id: 1,
      good_id: 1,
      name: '饿昏了么联名卡',
      category: '饿昏了么',
      card_category: '循环卡',
      card: 'HJHJHJHGLFDFFD',
      number: '234234234234',
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
    <div className={c.main}>
        <div className={c.searchView}>
          <div className={c.search}>
            <div className={c.searchL} style={{width:'82.512%'}}>
              <Input placeholder="请输入商品编号" size="small" className={c.searchInput} style={{width:'15.671%'}}/>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn} style={{width:'13.88%'}}>
                  <div className={c.hiddenText}>
                    请选择商品名称
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn} style={{width:'13.88%'}}>
                  <div className={c.hiddenText}>
                    请选择卡密编号
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn} style={{width:'13.88%'}}>
                  <div className={c.hiddenText}>
                    请选择商品类型
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn} style={{width:'13.88%'}}>
                  <div className={c.hiddenText}>
                    请选择卡密类型
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn} style={{width:'13.88%'}}>
                  <div className={c.hiddenText}>
                    请选择卡密状态
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            <div className={c.searchR} style={{width:'17.488%'}}>
              <Button size="small" className={c.resetBtn}>重置</Button>
              <Button icon={
                <img src={good9} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
                className={c.searchBtn} style={{marginLeft:'12.323%'}}>搜索商品</Button>
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
      label: '卡密总数',
      number: '10,100',
      icon: good16,
      id: 111,
    },
    {
      label: '已售出',
      number: '10,111',
      icon: good15,
      id: 222,
    },
    {
      label: '未售出',
      number: '10,111',
      icon: good14,
      id: 333,
    },
    {
      label: '常规卡',
      number: '10,111',
      icon: good12,
      id: 444,
    },
    {
      label: '重复卡',
      number: '10,111',
      icon: good11,
      id: 555,
    },
    {
      label: '循环卡',
      number: '10,111',
      icon: good13,
      id: 666,
    },
  ]

  data.forEach((item, index) => {
    const { label, number, icon, id } = item;
    views.push(
      <div className={c.headerItem} style={{width:'17.546%'}} key={id}>
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

export default CardManageView

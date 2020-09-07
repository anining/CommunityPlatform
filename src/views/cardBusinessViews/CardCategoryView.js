import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, Modal, Pagination } from 'antd'
import c from '../../styles/view.module.css'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import good7 from '../../icons/good/good7.png'
import good31 from '../../icons/good/good31.png'
import { h } from '../../utils/history'

function CardCategoryView () {
  const [visible, setVisible] = useState(false)

  return (
    <div className="container">
      <div className={c.container}>
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

  const columns = [
    {
      title: '分类编号',
      dataIndex: 'id',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 1,
      }
  },
    {
      title: '分类名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '包含商品数量',
      align: 'center',
      dataIndex: 'number',
  },
    {
      title: '创建时间',
      dataIndex: 'time',
      align: 'center',
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF',color:'#2C68FF'}} onClick={()=>{
          const history = h.get()
          history.push("/main/editCardCategory")
        }}>编辑分类</div>
      )
  },
];

  const data = [
    {
      key: 1240,
      id: 1,
      name: '哔哩哔哩',
      number: 45,
      time: '2017-10-31  23:12:00',
    },
  ];

  // function onChange (pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  for (let i = 0; i < 100; i++) {
    data.push({
      key: 1240,
      id: 1,
      name: '哔哩哔哩',
      number: 45,
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
      <div className={c.searchView} style={{height:88}}>
          <div className={c.search}>
            <div className={c.searchL} style={{width:'22.783%'}}>
              <Input placeholder="请输入分类名称" size="small" className={c.searchInput} style={{width:'61.621%'}}/>
              <Button icon={
                <img src={good31} alt="" style={{width:14,marginRight:6}} />
              }
              size = "small"
                className={c.searchBtn} style={{
                  marginLeft:19.422,
                  // marginLeft:0,
                  borderColor:'#3372FF',
                  color:'#2C68FF'
              }}>搜索分类</Button>
            </div>
            <div className={c.searchR}>
              <Button icon={
                <img src={good7} alt="" style={{width:16,marginRight:6}} />
              }
              type = "primary"
              size = "small"
              className={c.searchBtn}>新增分类</Button>
            </div>
          </div>
      </div>
      <div className={c.actionView} style={{height:80}}>
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

export default CardCategoryView

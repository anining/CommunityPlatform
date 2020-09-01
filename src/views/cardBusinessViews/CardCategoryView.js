import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, Modal } from 'antd'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import good6 from '../../icons/good/good6.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'

function CardCategoryView () {
  const [visible, setVisible] = useState(false)
  const [actionId, setActionId] = useState(2)

  function handleOk (e) {
    console.log(e);
    setVisible(false)
  };

  function handleCancel (e) {
    console.log(e);
    setVisible(false)
  };

  return (
    <div className="container">
      <div className="container" style={styles.container}>
        <RTable setVisible={setVisible} />
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <div style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          padding:25,
          }}>
          <img src={good6} alt="" style={{width:90}} />
          <h4 style={{marginBottom:25,marginTop:25,fontSize:18,fontWeight:500}}>{actionId===1?"确定要删除此支付账户吗？":"确定要删除这个分类吗？"}</h4>
          {(()=>{
          if(actionId===1){
            return <p>分类<span style={{color:"#2C68FF"}}> 哔哩哔哩</span> 一共包含了 15 个商品，包含商品的分类不允许被删除，请更改关联商品的分类之后重试。</p>
          }
            return <p>删除的分类不可被找回，请确认。</p>
          })()}
          <div style={{display:'flex',justifyContent:'space-around',marginTop:25,alignItems:'center',width:'100%'}}>
            <Button key="back" style={{width:150,height:32,fontSize:12}}>
              取消
            </Button>
            <Button key="submit"style={{width:150,height:32,fontSize:12}} type="primary" onClick={handleOk}>
              确定
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function RTable ({ setVisible }) {
  const [selectionType, setSelectionType] = useState('checkbox');

  const columns = [
    {
      title: 'id',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '商品名称',
      dataIndex: 'chinese',
      align: 'center',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
  },
    {
      title: '商品分类',
      align: 'center',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
  },
    {
      title: '下单模型',
      dataIndex: 'english',
      align: 'center',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
  },
    {
      title: '进价',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '售价',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '密价',
      align: 'center',
      dataIndex: 'name',
  },
    {
      title: '单位',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '下单限制',
      align: 'center',
      dataIndex: 'name',
  },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'name',
      render: name => {
        return (
          <>
            <div>重复下单: <span style={{color:"green"}}>开启</span></div> <
          div > 批量下单: 关闭 < /div> < / >
        )
      }
  },
    {
      title: '操作',
      align: 'center',
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <a href="/main/editCardCategory">编辑商品</a>
        </Space>
      )
  },
];

  const data = [
    {
      key: '1',
      name: 'rown',
      chinese: 98,
      math: 60,
      english: 70,
  },
    {
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
  },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
  },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
  },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
  },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
  },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
  },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
  },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
  },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
  },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
  },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
  },
];

  function onChange (pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  function handleMenuClick (e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }


  const menu = (
    <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
  );

  return (
    <div style={styles.main}>
      <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        height:'10%',
        flexWrap:'nowrap',
        borderBottomWidth:1,
        borderBottomStyle:'solid',
        borderBottomColor:'rgba(0, 0, 0, 0.09)',
        marginLeft:'2%',
        marginRight:'2%',
        width:'96%',
      }}>
        <div>
          <Input placeholder="请输入分类名称" size="small" style={{width:120,fontSize:12}}/>
          <Button icon={
            <img src={good9} alt="" style={{width:10,marginRight:5,marginBottom:1}} />
          }
          type = "primary"
          size = "small"
            style = { { fontSize: 12,height:20,marginLeft:20} } > 搜索分类 < /Button>
        </div>
        <Button icon={
          <img src={good7} alt="" style={{width:10,marginRight:5,marginBottom:1}} />
        }
        type = "primary"
        size = "small"
          style = { { fontSize: 12,height:20 } } > 新建分类 < /Button>
      </div>
      <div style={{
        display:'flex',
        alignItems:'center',
        height:'10%',
        flexWrap:'nowrap',
        width:'100%',
      }}>
        <Dropdown overlay={menu}>
          <Button size="small" style={{
            marginLeft: 20,
            height: 20,
            fontSize: 12
          }}>批量操作<DownOutlined />
          </Button>
        </Dropdown>
        <Button style={{marginLeft:20,height:20,fontSize:12}} onClick={()=>setVisible(true)} size="small">执行操作</Button>
      </div>
    <Table columns={columns} rowSelection={{
      type: selectionType,
      ...rowSelection
    }} dataSource={data} rowClassName={(record,index)=>{
      return "f1f5ff"
      }} size="small" onChange={onChange} />
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dropdown: {
    marginLeft: 20,
    width: 120,
    height: 20,
    fontSize: 12
  },
  main: {
    width: '100%',
    height: '100%',
    background: '#fff',
    borderRadius: 2
  },
}

export default CardCategoryView

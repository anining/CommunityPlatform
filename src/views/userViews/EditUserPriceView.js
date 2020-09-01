import React, { useState } from 'react'
import { Button, Popconfirm, Radio, Menu, Dropdown, Table, message, Input, Space, Modal } from 'antd'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import good6 from '../../icons/good/good6.png'
import good9 from '../../icons/good/good9.png'
import good27 from '../../icons/good/good27.png'

function EditUserPriceView () {
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
          <div style={styles.header}>
            <div style={styles.headerT}>
              <HeaderItem />
            </div>
            <div style={styles.headerB}>
              <img src={good27} alt="" style={{width:10,marginRight:5}}/>
              <div>用户充值会产生流水记录，但是不会计入今日消费；今日消费只计算购买商品产生的流水总和。</div>
             </div>
          </div>
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
          <h4 style={{marginBottom:25,marginTop:25}}>{actionId===1?"确定要删除此支付账户吗？":"确定要删除这个分类吗？"}</h4>
          {(()=>{
          if(actionId===1){
            return <p>分类<span style={{color:"#2C68FF"}}>哔哩哔哩</span> 一共包含了 15 个商品，包含商品的分类不允许被删除，请更改关联商品的分类之后重试。</p>
          }
            return <p>删除的分类不可被找回，请确认。</p>
          })()}
          <div style={{display:'flex',justifyContent:'space-around',marginTop:25,alignItems:'center',width:'100%'}}>
            <Button key="back" style={{width:150}}>
              取消
            </Button>
            <Button key="submit"style={{width:150}} type="primary" onClick={handleOk}>
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
      render: name => {
        return (
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={()=>{}}
            onCancel={()=>{}}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        )
      }
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
          <a href="/main/editCommunityGood">编辑商品</a>
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
        height:'8%',
        flexWrap:'nowrap',
        marginLeft:'2%',
        marginRight:'2%',
        width:'96%',
      }}>
        <div>
          <Input placeholder="请输入商品ID" size="small" style={{width:120,fontSize:12,marginRight:20}}/>
          <Input placeholder="请输入商品名称" size="small" style={{width:120,fontSize:12}}/>
          <Dropdown overlay={menu}>
            <Button size="small" style={styles.dropdown}>
              请选择业务类型 <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu} style={styles.dropdown}>
            <Button style={styles.dropdown} size="small">
              请选择商品类型 <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div>
          <Button size="small" style={{color:'#979BA3',marginRight:15,fontSize:12,height:20}}>重置</Button>
          <Button icon={
            <img src={good9} alt="" style={{width:10,marginRight:5,marginBottom:1}} />
          }
          type = "primary"
          size = "small"
            style = { { fontSize: 12,height:20 } } > 搜索商品 < /Button>
        </div>
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

function HeaderItem () {
  const [value, setValue] = useState()

  function onChange () {

  }

  return (
    <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'space-between'}}>
      <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
        <div style={{display:'flex',alignItems:'flex-end'}}>
          <div style={{fontSize:18,fontWeight:500}}>修改用户密价</div>
          <div style={{color:'#6F717E',fontSize:12,marginLeft:10,marginRight:5}}>当前用户:</div>
          <div style={{color:'#2C68FF',fontSize:12}}>2346237462374</div>
        </div>
        <div style={{display:'flex',alignItems:'center'}}>
          <div style={{color:'#34374A',marginRight:20}}>价格类型</div>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1} style={{fontSize:12}}>已上架</Radio>
            <Radio value={2} style={{fontSize:12}}>已下架</Radio>
          </Radio.Group>
        </div>
      </div>
      <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div>
          <Button size="small" style={{marginRight:20,fontSize:12,width:70}}>放弃</Button>
          <Button size="small" style={{fontSize:12,width:70}} type="primary">保存</Button>
        </div>
        <div style={{color:'#979BA3',fontSize:12,marginTop:5}}>上次保存： 2020.01.15 15:25:04</div>
      </div>
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
    height: '77%',
    background: '#fff',
    borderRadius: 2
  },
  headerB: {
    height: '25%',
    borderRadius: 2,
    width: '96%',
    color: '#FF8D30',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '2%',
    marginRight: '2%',
    background: '#FFFCEB',
    fontSize: 12,
  },
  headerT: {
    height: '70%',
    width: '100%',
    display: 'flex',
    paddingLeft: '1%',
    paddingRight: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    height: '20%',
    width: '100%',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
  },
}

export default EditUserPriceView

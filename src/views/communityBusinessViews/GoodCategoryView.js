import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space } from 'antd'
import good1 from '../../icons/good/good1.png'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import good2 from '../../icons/good/good2.png'
import good3 from '../../icons/good/good3.png'
import good4 from '../../icons/good/good4.png'

function GoodCategoryView () {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerL}>
          <HeaderItem />
        </div>
        <Button type="primary" size="small">添加卡密</Button>
      </div>
      <RTable />
    </div>
  )
}

function RTable () {
  const [selectionType, setSelectionType] = useState('checkbox');

  const columns = [
    {
      title: 'id',
      dataIndex: 'name',
  },
    {
      title: '商品名称',
      dataIndex: 'chinese',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
  },
    {
      title: '商品分类',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
  },
    {
      title: '下单模型',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
  },
    {
      title: '进价',
      dataIndex: 'name',
  },
    {
      title: '售价',
      dataIndex: 'name',
  },
    {
      title: '密价',
      dataIndex: 'name',
  },
    {
      title: '单位',
      dataIndex: 'name',
  },
    {
      title: '下单限制',
      dataIndex: 'name',
  },
    {
      title: '状态',
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
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <a href="">编辑商品</a>
        </Space>
      )
  },
];

  const data = [
    {
      key: '1',
      name: 'John Brown',
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
        height:'12%',
        flexWrap:'nowrap',
        borderBottomWidth:1,
        borderBottomStyle:'solid',
        borderBottomColor:'#979BA3',
        marginLeft:'2%',
        marginRight:'2%',
        width:'96%',
      }}>
        <div>
          <Input placeholder="请输入商品编号" size="small" style={{width:150}}/>
          <Dropdown overlay={menu}>
            <Button size="small" style={styles.dropdown}>
              请选择商品分类 <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu} style={styles.dropdown}>
            <Button style={styles.dropdown} size="small">
              请选择商品状态 <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu} style={styles.dropdown}>
            <Button style={styles.dropdown} size="small">
              请选择用户权限 <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu} style={styles.dropdown}>
            <Button style={styles.dropdown} size="small">
              请选择供货商 <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div>
          <Button size="small" style={{color:'#979BA3',marginRight:15}}>重置</Button>
          <Button size="small" type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
        </div>
      </div>
      <div style={{
        display:'flex',
        alignItems:'center',
        height:'12%',
        flexWrap:'nowrap',
        paddingLeft:'2%',
        paddingRight:'2%',
        width:'100%',
      }}>
        <Dropdown overlay={menu}>
          <Button size="small">
            批量操作 <DownOutlined />
          </Button>
        </Dropdown>
        <Button style={{marginLeft:15}} size="small">执行操作</Button>
      </div>
    <Table columns={columns} rowSelection={{
      type: selectionType,
      ...rowSelection
    }} dataSource={data} rowClassName={(record,index)=>{
      if(record.name==="John Brown") {
        return "greenRow"
      }
      console.log(index)
      console.log(record)
      }} size="small" onChange={onChange} />
    </div>
  )
}

function HeaderItem () {
  const views = [];
  const data = [
    {
      label: '商品总数',
      number: 10100,
      icon: good3,
      id: 111,
    },
    {
      label: '已上架数',
      number: 10100,
      icon: good1,
      id: 222,
    },
    {
      label: '已下架数',
      number: 10100,
      icon: good2,
      id: 333,
    },
    {
      label: '关闭下单',
      number: 10100,
      icon: good4,
      id: 444,
    },
  ]

  data.forEach((item, index) => {
    const { label, number, icon, id } = item;
    views.push(
      <div style={{
        boxSizing:'border-box',
        display:'flex',
        alignItems:'center',
        paddingLeft:index?25:0,
        height:'100%',
        }} key={id}>
        <img src={icon} alt="" style={{height:'100%'}} />
        <div style={{
          boxSizing:'border-box',
          display: 'flex',
          flexDirection:'column',
          alignItems:'flex-start',
          justifyContent:'center',
          paddingRight:35,
          borderRightColor:'#D6D7DB',
          borderRightWidth:1,
          borderRightStyle:'solid'
        }}>
          <div style={{color:'#000',fontSize:20,fontWeight:800}}>{number}</div>
          <div style={{fontSize:12,color:'#6F717E'}}>{label}</div>
        </div>
      </div>
    )
  })

  return views
}

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dropdown: {
    marginLeft: 15,
  },
  main: {
    width: '100%',
    height: '86%',
    background: '#fff',
    borderRadius: 2
  },
  header: {
    height: '12%',
    width: '100%',
    background: '#fff',
    display: 'flex',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '1%',
    paddingRight: '2%'
  },
  headerL: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '70%',
  }
}

export default GoodCategoryView

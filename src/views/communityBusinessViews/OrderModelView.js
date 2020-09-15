import React, { useState, useEffect } from 'react'
import { Button, Menu, Dropdown, Table, message, Input } from 'antd'
import c from '../../styles/view.module.css'
import { DownOutlined } from '@ant-design/icons';
import good7 from '../../icons/good/good7.png'
import good31 from '../../icons/good/good31.png'
import { h } from '../../utils/history'
import { communityParamTemplates } from "../../utils/api";

function OrderModelView () {
  const [visible, setVisible] = useState(false)

  return (
    <div className="container">
      <div className={c.container}>
        <RTable setVisible={setVisible} />
      </div>
    </div>
  )
}

function RTable ({ setVisible }) {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    communityParamTemplates("get", undefined, { page: current, size: pageSize }).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
      }
    })
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
    })
    return arr
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const columns = [
    {
      title: '模型编号',
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
      title: '模型名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '包含参数',
      align: 'center',
      dataIndex: 'used_by',
  },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      align: 'center',
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <div style={{cursor:'pointer',textDecoration:"underline",textDecorationColor:'#2C68FF',color:'#2C68FF'}} onClick={()=>{
          const history = h.get()
          history.push("/main/editOrderModel",{record})
        }}>编辑模型</div>
      )
    },
  ];

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
              }}>搜索模型</Button>
            </div>
            <div className={c.searchR}>
              <Button icon={
                <img src={good7} alt="" style={{width:16,marginRight:6}} />
              }
              type = "primary"
              size = "small"
                onClick={()=>{
                  const history = h.get()
                  history.push('/main/editOrderModel')
                }}
              className={c.searchBtn}>新增模型</Button>
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
      }} size="small" pagination={{
          showQuickJumper:true,
          current,
          pageSize,
          hideOnSinglePage:false,
          showLessItems:true,
          total,
          onChange
        }}
      />
    </div>
  )
}

export default OrderModelView

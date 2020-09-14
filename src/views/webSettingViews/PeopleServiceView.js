import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, Modal, Pagination } from 'antd'
import c from '../../styles/view.module.css'
import { h } from '../../utils/history'
import good7 from '../../icons/good/good7.png'

function PeopleServiceView () {
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

  const obj = [
    {
      color: "#2C68FF",
      text: '已上架',
    },
    {
      color: "#FF4D4F",
      text: '已下架',
    },
    {
      color: "#FF8D30",
      text: '已关闭订单',
    }
  ]
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '客服名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '客服QQ',
      align: 'center',
      dataIndex: 'qq',
  },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
  },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'time',
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small" style={{color:'#2C68FF'}}>
          <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
            const history = h.get()
            history.push("/main/editCommunityGood")
          }}>修改</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{textDecoration:"underline",textDecorationColor:'#FF4D4F',color:'#FF4D4F'}} onClick={()=>{

          }}>删除</div>
        </Space>
      )
  },
];

  const data = [
    {
      key: 1240,
      id: 1,
      name: '一号客服',
      qq: '12354678945',
      remark: '音符订单客服',
      time: '2017-10-31  23:12:00',
    }
  ];

  // function onChange (pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  for (let i = 0; i < 100; i++) {
    data.push({
      key: 1240,
      id: 1,
      name: '一号客服',
      qq: '12354678945',
      remark: '音符订单客服',
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

  return (
    <div className={c.main}>
        <div className={c.searchView}>
          <div className={c.search} style={{borderBottom:'none'}}>
            <div className={c.searchL}>
            </div>
            <div className={c.searchR}>
              <Button icon={
                <img src={good7} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
              className={c.searchBtn}>新增客服</Button>
            </div>
          </div>
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

export default PeopleServiceView

import React, { useState } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space, Modal, DatePicker } from 'antd'
import c from '../../styles/view.module.css'
import good9 from '../../icons/good/good9.png'

function LoggerView () {
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

  const obj = ["#FF4D4F", "#FF8D30", '#000'];
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '操作人账号',
      dataIndex: 'number',
      align: 'center',
  },
    {
      title: '操作内容',
      dataIndex: 'text',
      align: 'center',
      render: (text, record, index) => {
        const { status, t } = text;
        return (
          <div style={{color:obj[status]}}>{t}</div>
        )
      }
  },
    {
      title: '登录时间',
      dataIndex: 'time',
      align: 'center',
  },
];

  const data = [
    {
      key: 1240,
      id: 1,
      number: '234234234234',
      text: {
        status: 0,
        t: '删除订单 (2548)',
      },
      time: '2020-10-31  23:12:00',
    },
    {
      key: 1240,
      id: 1,
      number: '234234234234',
      text: {
        status: 1,
        t: '删除订单 (2548)',
      },
      time: '2020-10-31  23:12:00',
    },
    {
      key: 1240,
      id: 1,
      number: '234234234234',
      text: {
        status: 2,
        t: '删除订单 (2548)',
      },
      time: '2020-10-31  23:12:00',
    },
  ];

  // function onChange (pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  for (let i = 0; i < 100; i++) {
    data.push({
      key: 1240,
      id: 1,
      number: '234234234234',
      text: {
        status: 2,
        t: '删除订单 (2548)',
      },
      time: '2020-10-31  23:12:00',
    })
  }

  return (
    <div className={c.main} style={{marginTop:0}}>
      <div className={c.searchView}>
        <div className={c.search} style={{borderBottomWidth:0}}>
          <div className={c.searchL} style={{width:'36.822%'}}>
            <Input placeholder="请输入操作人账号" size="small" className={c.searchInput} style={{width:'35.117%'}}/>
            <DatePicker.RangePicker style={{width:'58.193%',height:32}}/>
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
      <Table columns={columns} dataSource={data} rowClassName={(record,index)=>{
        if (index % 2) {
          return "f1f5ff"
        }
      }} size="small" pagination={{showQuickJumper:true}}
      />
    </div>
  )
}

export default LoggerView

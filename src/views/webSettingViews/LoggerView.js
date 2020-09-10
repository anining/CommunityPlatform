import React, { useState, useEffect } from 'react'
import { Button, Table, Input, DatePicker } from 'antd'
import c from '../../styles/view.module.css'
import good9 from '../../icons/good/good9.png'
import { loginlogs } from "../../utils/api"

function LoggerView () {

  return (
    <div className="container">
      <div className={c.container}>
        <RTable/>
      </div>
    </div>
  )
}

function RTable () {
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    loginlogs(current, pageSize).then(r => {
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
      item.account = item.manager.account
    })
    return arr
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const obj = ["#FF4D4F", "#FF8D30", '#000'];
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '操作人账号',
      dataIndex: 'account',
      align: 'center',
  },
    {
      title: '操作内容',
      dataIndex: 'text',
      align: 'center',
      render: (text, record, index) => {
        return 1
        // const { status, t } = text;
        // return (
        //   <div style={{color:obj[status]}}>{t}</div>
        // )
      }
  },
    {
      title: '登录时间',
      dataIndex: 'created_at',
      align: 'center',
    },
  ];

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
      <Table columns={columns} dataSource={data} size="small" pagination={{
        showQuickJumper:true,
        current,
        pageSize,
        hideOnSinglePage:true,
        showLessItems:true,
        total,
        onChange
        }}
      />
    </div>
  )
}

export default LoggerView

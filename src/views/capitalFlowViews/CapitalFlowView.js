import React, { useState, useEffect } from 'react'
import { Button,Input, Space, Table, message, DatePicker } from 'antd'
import c from '../../styles/view.module.css'
import good22 from '../../icons/good/good22.png'
import good27 from '../../icons/good/good27.png'
import good26 from '../../icons/good/good26.png'
import good25 from '../../icons/good/good25.png'
import good9 from '../../icons/good/good9.png'
import good63 from '../../icons/good/good63.png'
import good64 from '../../icons/good/good64.png'
import good65 from '../../icons/good/good65.png'
import good66 from '../../icons/good/good66.png'
import good67 from '../../icons/good/good67.png'
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent";
import { balanceChanges } from "../../utils/api"
import { getKey, transformTime } from "../../utils/util"
import {SCROLL, CONSUMPTION_TYPE} from '../../utils/config'

function CapitalFlowView () {
  const data = [
    {
      label: '今日下单额',
      number: '0',
      icon: good66,
      id: 111,
    },
    {
      label: '今日退款额',
      number: '0',
      icon: good67,
      id: 222,
    },
    {
      label: '今日充值',
      number: '0',
      icon: good65,
      id: 333,
    },
    {
      label: '今日加款',
      number: '0',
      icon: good64,
      id: 333,
    },
    {
      label: '今日减款',
      number: '0',
      icon: good63,
      id: 333,
    }
  ]

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent data={data}/>
        <RTable />
      </div>
    </div>
  )
}

function RTable () {
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [date, setDate] = useState([])
  const [moment, setMoment] = useState()

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    balanceChanges(current, pageSize, date[0], date[1]).then(r => {
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
      item.time = transformTime(item.created_at)
    })
    return arr
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const columns = [
    {
      title: '用户账号',
			ellipsis: true,
      dataIndex: 'user_account',
  },
    {
      title: '变动数额',
			ellipsis: true,
      dataIndex: 'amount',
      render: (text, record, index) => {
        const color = Number(text) > 0 ? "#2C68FF" : "#FF4D4F"
        return <div style={{color}}>{text}</div>
      }
  },
    {
      title: '支付方式',
			ellipsis: true,
      dataIndex: 'pay_type',
      render: (text, record, index) => {
        return '-'
      }
    },
    {
      title: '消费类型',
			ellipsis: true,
      dataIndex: 'type',
      render: (text, record, index) => {
        const { text: t, color } = getKey(text, CONSUMPTION_TYPE)
        return <div style={{color}}>{t}</div>
      }
  },
    {
      title: '时间',
			ellipsis: true,
      dataIndex: 'time',
  },
  ];

  function submit (key) {
    switch (key) {
      case "delete":
        message.success('批量删除操作');
        break
      default:
        ;
    }
  }

  function reset () {
    setMoment(undefined)
    setDate([])
  }

  function dateChange (data, dataString) {
    setDate([new Date(dataString[0]).toISOString(), new Date(dataString[1]).toISOString()])
    setMoment(data)
  }

  return (
    <div className={c.main}>
			<div className={c.searchView} style={{marginBottom:0}}>
        <div className={c.search}>
          <div className={c.searchL}>
            {/* <Input placeholder="请输入用户账户" size="small" className={c.searchInput}/> */}
            {/* <Input placeholder="请输入订单编号" size="small" className={c.searchInput}/> */}
            {/* <DropdownComponent keys={[]} placeholder="请选择支付方式" style={{width:186}}/> */}
            {/* <DropdownComponent keys={[]} placeholder="请选择消费类型" style={{width:186}}/> */}
            <DatePicker.RangePicker
              format="YYYY-MM-DD"
              onChange={dateChange}
              value={moment}
              className={c.dataPicker}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
            <Button icon={
                <img src={good9} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
              onClick={()=>get(current)}
              className={c.searchBtn}>搜索记录</Button>
          </div>
        </div>
      </div>
      <Button className={c.excelBtn} disabled={true} type="primary">导出本页为Excel</Button>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        pagination={{
					showSizeChanger:false,
          showQuickJumper:true,
          current,
          pageSize,
          showLessItems:true,
          total,
          onChange
        }}
      />
    </div>
  )
}

export default CapitalFlowView

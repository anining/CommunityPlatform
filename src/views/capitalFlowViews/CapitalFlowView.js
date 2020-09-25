import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input, DatePicker } from 'antd'
import c from '../../styles/view.module.css'
import good22 from '../../icons/good/good22.png'
import good27 from '../../icons/good/good27.png'
import good26 from '../../icons/good/good26.png'
import good25 from '../../icons/good/good25.png'
import good9 from '../../icons/good/good9.png'
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent";
import { balanceChanges } from "../../utils/api"

function CapitalFlowView () {
  const data = [
    {
      label: '今日流水',
      number: '10,100',
      icon: good22,
      id: 111,
    },
    {
      label: '今日充值',
      number: '10,111',
      icon: good26,
      id: 222,
    },
    {
      label: '今日退款',
      number: '10,111',
      icon: good25,
      id: 333,
    },
  ]

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent data={data}/>
        <div className={c.headerTips}>
          <div className={c.headerText}>
            <img src={good27} alt="" className={c.tipsImg}/>
            <div>用户充值会产生流水记录，但是不会计入今日消费；今日消费只计算购买商品产生的流水总和。</div>
          </div>
        </div>
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
    balanceChanges(current, pageSize, data[0], data[1]).then(r => {
      if (!r.error) {
        // const { data, total } = r
        // setTotal(total)
        // setData(format(data))
      }
    })
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = item.created_at
    })
    return arr
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  // const obj = [
  //   {
  //     color: "#53C41C",
  //     text: '充值',
  //     textColor: '#2C68FF',
  //   },
  //   {
  //     color: "#FF8D30",
  //     text: '系统加款',
  //     textColor: '#FF4D4F',
  //   },
  //   {
  //     color: "#FF4D4F",
  //     text: '退款',
  //     textColor: '#FF8D30',
  //   },
  //   {
  //     color: "#2C68FF",
  //     text: '购买卡密商品',
  //   }
  // ]
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '用户账号',
      dataIndex: 'number',
      align: 'center',
  },
    {
      title: '流水金额',
      align: 'center',
      dataIndex: 'price',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // },
      // render: (text, record, index) => {
      //   const { status, t } = text
      //   const { textColor: color } = obj[status]
      //   return <div style={{color}}>{t}</div>
      // }
  },
    {
      title: '支付方式',
      dataIndex: 'type',
      align: 'center'
  },
    {
      title: '消费类型',
      dataIndex: 'close_type',
      align: 'center',
      // render: (text, record, index) => {
      //   const { text: t, color } = obj[text]
      //   return <div style={{color}}>{t}</div>
      // }
  },
    {
      title: '时间',
      dataIndex: 'time',
      align: 'center',
  },
    {
      title: '操作',
      align: 'center',
      // render: (text, record, index) => (
      //   <Space size="small" style={{color:'#2C68FF'}}>
      //     <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
      //       const history = h.get()
      //       history.push("/main/editCommunityGood")
      //     }}>修改状态</div>
      //     <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
      //     <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} href="/main/editCommunityGood">退款</div>
      //   </Space>
      // )
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, rows) => {
      setSelectRows(selectedRowKeys)
    }
  };

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
    // setId(undefined)
  }

  function dateChange (data, dataString) {
    setDate(dataString)
    setMoment(data)
  }

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input placeholder="请输入用户账户" size="small" className={c.searchInput}/>
            <Input placeholder="请输入订单编号" size="small" className={c.searchInput}/>
            <DropdownComponent keys={[]} placeholder="请选择支付方式" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择消费类型" style={{width:186}}/>
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
      <DropdownComponent submit={submit} keys={[]}/>
      <Table
        columns={columns}
        rowSelection={{
          ...rowSelection
        }}
        dataSource={data}
        size="small"
        pagination={{
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

import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input, DatePicker } from 'antd'
import c from '../../styles/view.module.css'
import good19 from '../../icons/good/good19.png'
import good20 from '../../icons/good/good20.png'
import good9 from '../../icons/good/good9.png'
import good62 from '../../icons/good/good62.png'
import good34 from '../../icons/good/good34.png'
import good35 from '../../icons/good/good35.png'
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent"
import { transformTime } from "../../utils/util"
import {SCROLL} from '../../utils/config'
import ActionComponent from '../../components/ActionComponent'

function CardOrderView () {
  const data = [
    {
      label: '订单总数',
      number: '10,100',
      icon: good19,
      id: 111,
    },
    {
      label: '待发货订单',
      number: '12',
      icon: good62,
      id: 555,
    },
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

function RTable ({ setVisible }) {
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

  function dateChange (data, dataString) {
    setDate(dataString)
    setMoment(data)
  }

  function get (current) {
    // communityGoodsOrders(current, pageSize, id, search_user_account, search_goods_name, community_goods_category_id, status, date[0], date[1]).then(r => {
    //   if (!r.error) {
    //     // const { data, total } = r
    //     // setTotal(total)
    //     // setData(format(data))
    //   }
    // })
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = transformTime(item.created_at)
    })
    return arr
  }

  // const obj = [
  //   {
  //     color: "#2C68FF",
  //     text: '待发货',
  //     icon: good32,
  //   },
  //   {
  //     color: "#52C41A",
  //     text: '已完成',
  //     icon: good34,
  //   },
  //   {
  //     color: "#FF8D30",
  //     text: '异常',
  //     icon: good35,
  //   },
  // ]
  const columns = [
    {
      title: '订单编号',
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '商品名称',
			ellipsis: true,
      dataIndex: 'text',
  },
    {
      title: '商品分类',
			ellipsis: true,
      dataIndex: 'ctg',
  },
    {
      title: '卡密编号',
			ellipsis: true,
      dataIndex: 'number',
  },
    {
      title: '下单用户',
			ellipsis: true,
      dataIndex: 'msg',
  },
    {
      title: '订单状态',
			ellipsis: true,
      dataIndex: 'status',
      // render: (text, record, index) => {
      // const { text: t, color } = getKey(text, obj)
      //   const { text: t, color } =
      //   return <div style={{color}}>{t}</div>
      // }
  },
    {
      title: '下单时间',
			ellipsis: true,
      dataIndex: 'msg',
  },
    {
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 136,
			fixed: 'right',
      // render: (text, record, index) => (
      //   <div style={{color:'#2c68ff',cursor:'pointer'}}>置为已完成</div>
      // )
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, rows) => {
      setSelectRows(selectedRowKeys)
    }
  };

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

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

  }

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input placeholder="请输入订单编号" size="small" className={c.searchInput}/>
            <Input placeholder="请输入商品名称" size="small" className={c.searchInput}/>
            <Input placeholder="请输入下单用户" size="small" className={c.searchInput}/>
            <Input placeholder="请输入卡密编号" size="small" className={c.searchInput}/>
            <DropdownComponent keys={[]} placeholder="请选择商品分类" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择订单状态" style={{width:186}}/>
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
              className={c.searchBtn}>搜索订单</Button>
          </div>
        </div>
      </div>
			<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[]}/>
      <Table
				scroll={SCROLL}
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

export default CardOrderView

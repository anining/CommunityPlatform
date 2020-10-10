import React, { useState, useEffect } from 'react'
import { Button, Table, Input } from 'antd'
import good1 from '../../icons/good/good1.png'
import c from '../../styles/view.module.css'
import good2 from '../../icons/good/good2.png'
import good3 from '../../icons/good/good3.png'
import good4 from '../../icons/good/good4.png'
import good9 from '../../icons/good/good9.png'
import DropdownComponent from "../../components/DropdownComponent";
import { push, getKey, saveSuccess } from "../../utils/util"
import TableHeaderComponent from "../../components/TableHeaderComponent"
import { communityGoods } from "../../utils/api"
import SelectComponent from "../../components/SelectComponent"

let win

function CommunityGoodView () {
  const [data] = useState([
    {
      label: '商品总数',
      number: '10,100',
      icon: good3,
      id: 111,
    },
    {
      label: '已上架数',
      number: '10,111',
      icon: good1,
      id: 222,
    },
    {
      label: '已下架数',
      number: '10,111',
      icon: good2,
      id: 333,
    },
    {
      label: '关闭下单',
      number: '10,111',
      icon: good4,
      id: 444,
    },
  ])

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/editCommunityGood" data={data} text="添加商品"/>
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

  const [id, setId] = useState()
  const [search_name, setSearch_name] = useState()
  const [community_goods_category_id, setCommunity_goods_category_id] = useState()
  const [community_goods_category_name, setCommunity_goods_category_name] = useState()
  const [status, setStatus] = useState()
  const [refundable, setRefundable] = useState()
  const [order_by, setOrder_by] = useState()
  const [ordering, setOrdering] = useState()
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  window.localClick = function (type, ids) {
    setCommunity_goods_category_id(ids.id)
    setCommunity_goods_category_name(ids.name)
    win && win.close()
  }

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    let body = { page: current, size: pageSize }
    if (id) {
      body = { ...body, ...{ id } }
    }
    if (search_name) {
      body = { ...body, ...{ search_name } }
    }
    if (community_goods_category_id) {
      body = { ...body, ...{ community_goods_category_id } }
    }
    if (status) {
      body = { ...body, ...{ status } }
    }
    if (refundable === "refundable" || refundable === "no_refundable") {
      body = { ...body, ...{ refundable: refundable === "refundable" } }
    }
    // if (order_by) {
    //   body = { ...body, ...{ order_by } }
    // }
    // if (ordering) {
    //   body = { ...body, ...{ ordering } }
    // }
    setLoading(true)
    communityGoods("get", undefined, body).then(r => {
      setLoading(false)
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
      }
    }).catch(() => {
      setLoading(false)
    })
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
    })
    return arr
  }

  function click () {
    win = window.open("/select-good-category", "_blank", "left=390,top=145,width=1200,height=700")
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const rowSelection = {
    onChange: (selectedRowKeys, rows) => {
      setSelectRows(selectedRowKeys)
    },
    selectedRowKeys: selectedRows
  };

  function submit (key) {
    setActionLoading(true)
    const params = new URLSearchParams()
    selectedRows.forEach(i => params.append("ids", data[i].id))
    communityGoods("modifys", undefined, params.toString(), { status: key }).then(r => {
      setActionLoading(false)
      if (!r.error) {
        saveSuccess(false)
        setSelectRows([])
        get(current)
      }
    }).catch(() => {
      setActionLoading(false)
    })
  }

  function reset () {
    setId(undefined)
    setSearch_name(undefined)
    setCommunity_goods_category_name(undefined)
    setCommunity_goods_category_id(undefined)
    setStatus(undefined)
    setRefundable(undefined)
    setOrder_by(undefined)
  }

  const obj = {
    available: {
      color: "#2C68FF",
      text: '已上架',
    },
    unavailable: {
      color: "#FF8D30",
      text: '已关闭订单',
    },
    paused: {
      color: "#FF4D4F",
      text: '已下架',
    },
  }
  const columns = [
    {
      title: '商品编号',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '商品名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '商品分类',
      align: 'center',
      dataIndex: 'category_name',
  },
    {
      title: '下单模型',
      dataIndex: 'param_template_name',
      align: 'center',
  },
    {
      title: '进价',
      dataIndex: 'unit_cost',
      align: 'center',
      render: (text, record, index) => {
        return '-'
      }
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // }
  },
    {
      title: '售价',
      dataIndex: 'unit_price',
      align: 'center',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // }
  },
    {
      title: '密价',
      align: 'center',
      dataIndex: 'disc_price',
      render: (text, record, index) => {
        return '-'
      }
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // }
  },
    {
      title: '单位',
      dataIndex: 'unit',
      align: 'center',
  },
    {
      title: '下单限制',
      align: 'center',
      dataIndex: 'text',
      render: (text, record, index) => {
        const { repeat_order, batch_order } = record
        const repeat = repeat_order > 0 ? { text: "开启", color: "#52C41A" } : { text: "关闭", color: "#C8C8C8" }
        const batch = batch_order > 0 ? { text: "开启", color: "#52C41A" } : { text: "关闭", color: "#C8C8C8" }
        return (
          <div>
            <div>批量下单: <span style={{color:repeat.color}}>{repeat.text}</span></div>
            <div>重复下单: <span style={{color:batch.color}}>{batch.text}</span></div>
          </div>
        )
      }
  },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      render: (text, record, index) => {
        const { text: t, color } = getKey(text, obj)
        return <div style={{color}}>{t}</div>
      }
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <div className={c.clickText} onClick={()=>push('/main/editCommunityGood',record)}>编辑商品</div>
      )
    },
  ];

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input value={id} onPressEnter={()=>get(current)} onChange={e=>setId(e.target.value)} placeholder="请输入商品编号" size="small" className={c.searchInput}/>
            <Input value={search_name} onPressEnter={()=>get(current)} onChange={e=>setSearch_name(e.target.value)} placeholder="请输入商品名称" size="small" className={c.searchInput}/>
            <DropdownComponent action={status} setAction={setStatus} keys={[{name:"已上架",key:"available"},{name:"已关闭订单",key:"unavailable"},{name:"已下架",key:"paused"}]} placeholder="请选择商品状态" style={{width:186}}/>
            <DropdownComponent keys={[{name:"可退单",key:"refundable"},{name:"不可退单",key:"no_refundable"},{name:"全部",key:"un_refundable"}]} action={refundable} setAction={setRefundable} placeholder="请选择是否可退单" style={{width:186}}/>
            <SelectComponent placeholder="请选择商品分类" id={community_goods_category_id} name={community_goods_category_name} click={click}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
            <Button icon={
              <img src={good9} alt="" style={{width:14,marginRight:6}} />
            }
              type = "primary"
              size = "small"
              loading={loading}
              onClick={()=>get(current)}
              className={c.searchBtn}>搜索商品</Button>
            </div>
        </div>
      </div>
      <DropdownComponent loading={actionLoading} selectedRows={selectedRows} submit={submit} keys={[{name:"批量上架",key:"available"},{name:"批量关闭",key:"unavailable"},{name:"批量下架",key:"paused"}]}/>
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

export default CommunityGoodView

import React, { useState, useEffect } from 'react'
import { Button, Table, Input } from 'antd'
import c from '../../styles/view.module.css'
import good31 from '../../icons/good/good31.png'
import { communityParamTemplates } from "../../utils/api";
import { transformTime } from "../../utils/util";

function OrderModelView () {

  return (
    <div className="select-view">
      <div className={c.container}>
        <RTable />
      </div>
    </div>
  )
}

function RTable () {
  const [search_name, setSearch_name] = useState()
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    let body = { page: current, size: pageSize }
    if (search_name) {
      body = { ...body, ...{ search_name } }
    }
    communityParamTemplates("get", undefined, body).then(r => {
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
      title: '模型编号',
      dataIndex: 'id',
      align: 'center',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // }
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
      dataIndex: 'time',
      align: 'center',
  },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'id',
      render: (text, record, index) => (
        <div className={c.clickText} onClick={()=>{window.opener.localClick('order-model-id', text)}}>选择</div>
      )
    },
  ];

  return (
    <div className={c.main}>
      <div className={c.searchView}>
          <div className={c.search}>
            <div className={c.searchL}>
              <Input value={search_name} onChange={e=>setSearch_name(e.target.value)} placeholder="请输入分类名称" size="small" className={c.searchInput}/>
              <Button icon={
                <img src={good31} alt="" style={{width:14,marginRight:6}} />
              }
                size = "small"
                onClick={()=>get(current)}
                className={c.searchBtn}>搜索模型</Button>
            </div>
          </div>
      </div>
      <Table
        columns={columns}
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

export default OrderModelView

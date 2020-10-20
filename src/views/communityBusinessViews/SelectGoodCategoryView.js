import React, { useState, useEffect } from 'react'
import { Button, Table, Input } from 'antd'
import c from '../../styles/view.module.css'
import cs from '../../styles/edit.module.css'
import good9 from '../../icons/good/good9.png'
import { communityGoodsCategories } from '../../utils/api'
import { transformTime } from "../../utils/util";

function SelectGoodCategoryView () {

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
    communityGoodsCategories("get", undefined, body).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
      }
    })
  }

  function format (arr = []) {
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
    // {
    //   title: '分类编号',
    //   dataIndex: 'id',
    //   align: 'center',
    //   // sorter: {
    //   //   compare: (a, b) => {
    //   //     console.log(a, b)
    //   //   },
    //   //   multiple: 1,
    //   // }
  // },
    {
      title: '分类名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '包含商品数量',
      align: 'center',
      dataIndex: 'used_by',
  },
    // {
    //   title: '创建时间',
    //   dataIndex: 'time',
    //   align: 'center',
  // },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <div className={c.clickText} onClick={()=>{window.opener.localClick('good_category_id', record)}}>选择</div>
      )
    },
  ];

  return (
    <div className={c.main} style={{marginBottom:24}}>
      <div style={{marginTop:33}} className={cs.table_header}>
        <div style={{zIndex:1}}>选择分类</div>
        <div style={{top:0}} className={cs.table_circle} />
        <Button className={cs.table_btn} style={{marginBottom:0}}>新增分类</Button>
      </div>
      <div className={c.searchView}>
          <div className={c.search}>
            <div className={c.searchL} style={{justifyContent:'space-between',width:'100%'}}>
              <Input onPressEnter={()=>get(current)} placeholder="请输入商品分类" value={search_name} onChange={e=>setSearch_name(e.target.value)} size="small" className={c.searchInput} />
              <Button
                icon={
                  <img src={good9} alt="" style={{width:14,marginRight:6}} />
                }
                size = "small"
                onClick={()=>get(current)}
                className={c.select_searchBtn}>搜索分类</Button>
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

export default SelectGoodCategoryView

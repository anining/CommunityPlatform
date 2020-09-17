import React, { useState, useEffect } from 'react'
import { Button, Table, Input } from 'antd'
import c from '../../styles/view.module.css'
import good31 from '../../icons/good/good31.png'
import { communityGoodsCategories } from '../../utils/api'

function SelectGoodCategoryView () {

  return (
    <div className="view" style={{
      background:'#F0F2F5',
      minHeight:'100%',
      padding:24
    }}>
      <div className={c.container}>
        <RTable />
      </div>
    </div>
  )
}

function RTable () {
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    communityGoodsCategories("get", undefined, { page: current, size: pageSize }).then(r => {
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
      // item.account = item.manager.account
    })
    return arr
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const columns = [
    {
      title: '分类编号',
      dataIndex: 'id',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 1,
      },
      render: (text, record, index) => (
        <div style={{color:"#2c68ff",cursor:'pointer'}} onClick={()=>{
            window.opener.localClick('good_category_id', text)
          }}>{text}</div>
      )
  },
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
    {
      title: '创建时间',
      dataIndex: 'created_at',
      align: 'center',
  },
];

  return (
    <div className={c.main} style={{marginTop:0}}>
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
              }}>搜索分类</Button>
            </div>
          </div>
      </div>
      <Table columns={columns} dataSource={data} size="small" pagination={{
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

export default SelectGoodCategoryView

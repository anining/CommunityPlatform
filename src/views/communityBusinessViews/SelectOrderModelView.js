import React, { useState, useEffect } from 'react'
import { Button, Table, Input } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import good31 from '../../icons/good/good31.png'
import { h } from '../../utils/history'
import { communityParamTemplates } from "../../utils/api";

function SelectOrderModelView () {

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
    communityParamTemplates("get", undefined, { page: current, size: pageSize }).then(r => {
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
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 1,
      },
      render: (text, record, index) => (
        <div style={{color:"#2c68ff",cursor:'pointer'}} onClick={()=>{
            window.opener.localClick('order-model-id', text)
          }}>{text}</div>
      )
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
                  borderColor:'#3372FF',
                  color:'#2C68FF'
              }}>搜索模型</Button>
            </div>
            <div className={c.searchR}>
              <Button icon={
                <img src={good7} alt="" style={{width:16,marginRight:6}} />
              }
              type = "primary"
              size = "small"
                onClick={()=>{
                  const history = h.get()
                  history.push('/main/editOrderModel')
                }}
              className={c.searchBtn}>新增模型</Button>
            </div>
          </div>
      </div>
      <Table columns={columns} dataSource={data} rowClassName={(record,index)=>{
        if (index % 2) {
          return "f1f5ff"
        }
      }} size="small" pagination={{
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

export default SelectOrderModelView

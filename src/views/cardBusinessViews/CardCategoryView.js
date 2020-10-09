import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import good31 from '../../icons/good/good31.png'
import { push, transformTime } from "../../utils/util"
import DropdownComponent from "../../components/DropdownComponent"

function CardCategoryView () {
  return (
    <div className="view">
      <div className={c.container}>
        <RTable />
      </div>
    </div>
  )
}

function RTable ({ setVisible }) {
  const [selectedRows, setSelectRows] = useState([]);
  const [search_name, setSearch_name] = useState()
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    // let body = { page: current, size: pageSize }
    // if (search_name) {
    //   body = { ...body, ...{ search_name } }
    // }
    // communityParamTemplates("get", undefined, body).then(r => {
    //   if (!r.error) {
    //     const { data, total } = r
    //     setTotal(total)
    //     setData(format(data))
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

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const columns = [
    {
      title: '分类编号',
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
      title: '分类名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '包含商品数量',
      align: 'center',
      dataIndex: 'number',
  },
    {
      title: '创建时间',
      dataIndex: 'time',
      align: 'center',
  },
    {
      title: '操作',
      align: 'center',
      // render: (text, record, index) => (
      //   <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF',color:'#2C68FF'}} onClick={()=>{
      //     const history = h.get()
      //     history.push("/main/editCardCategory")
      //   }}>编辑分类</div>
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

  return (
    <div className={c.main} style={{marginTop:0}}>
      <div className={c.searchView}>
          <div className={c.search}>
            <div className={c.searchL}>
              <Input placeholder="请输入分类名称" size="small" className={c.searchInput}/>
              <Button icon={
                  <img src={good31} alt="" style={{width:14,marginRight:6}} />
                }
                size = "small"
                onClick={()=>get(current)}
                className={c.searchBtn}>搜索分类</Button>
            </div>
            <div className={c.searchR}>
              <Button icon={
                  <img src={good7} alt="" style={{width:16,marginRight:6}} />
                }
                type = "primary"
                onClick={()=>push('/main/editCardCategory')}
                size = "small"
                className={c.searchBtn}>新增分类</Button>
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

export default CardCategoryView

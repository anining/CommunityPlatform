import React, { useState, useEffect } from 'react'
import { Button, Table, Input } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import good31 from '../../icons/good/good31.png'
import { communityParamTemplates } from "../../utils/api";
import DropdownComponent from '../../components/DropdownComponent'
import { push, transformTime, saveSuccess } from "../../utils/util";

function OrderModelView () {

  return (
    <div className="view">
      <div className={c.container}>
        <RTable />
      </div>
    </div>
  )
}

function RTable () {
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
      render: (text, record, index) => (
        <div className={c.clickText} onClick={()=>push('/main/editOrderModel',record)}>编辑模型</div>
      )
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, rows) => {
      setSelectRows(selectedRowKeys)
    },
    selectedRowKeys: selectedRows
  };

  function submit (key) {
    switch (key) {
      case "delete":
        const params = new URLSearchParams()
        selectedRows.forEach(i => params.append("ids", data[i].id))
        communityParamTemplates("delete", undefined, undefined, params.toString()).then(r => {
          if (!r.error) {
            saveSuccess(false)
            setSelectRows([])
            get(current)
          }
        })
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
              <Input value={search_name} onPressEnter={()=>get(current)} onChange={e=>setSearch_name(e.target.value)} placeholder="请输入分类名称" size="small" className={c.searchInput}/>
              <Button icon={
                <img src={good31} alt="" style={{width:14,marginRight:6}} />
              }
                size = "small"
                onClick={()=>get(current)}
                className={c.searchBtn}>搜索模型</Button>
            </div>
            <div className={c.searchR}>
              <Button icon={
                <img src={good7} alt="" style={{width:16,marginRight:6}} />
              }
                type = "primary"
                size = "small"
                onClick={()=>push('/main/editOrderModel')}
                className={c.searchBtn}>新增模型</Button>
            </div>
          </div>
      </div>
      <DropdownComponent selectedRows={selectedRows} submit={submit} keys={[{name:"批量删除",key:"delete"}]}/>
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

export default OrderModelView

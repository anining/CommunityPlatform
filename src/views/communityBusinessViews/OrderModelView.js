import React, { useState, useEffect } from 'react'
import { Button, Table, Input, Space } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import good31 from '../../icons/good/good31.png'
import { communityParamTemplates } from "../../utils/api";

import { push, transformTime, saveSuccess } from "../../utils/util";
import ActionComponent from '../../components/ActionComponent'
import {SCROLL} from '../../utils/config'

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
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [search_name, setSearch_name] = useState()

  useEffect(() => {
    get(current)
  }, [current, get])

  function get (current) {
    let body = { page: current, size: pageSize }
    if (search_name) {
      body = { ...body, ...{ name: search_name } }
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

  function onChange (page ) {
    setCurrent(page)
    get(page)
  }

  const columns = [
    {
      title: '模型编号',
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '模型名称',
			ellipsis: true,
      dataIndex: 'name',
  },
    {
      title: '包含参数',
			ellipsis: true,
      dataIndex: 'used_by',
  },
    {
      title: '创建时间',
			ellipsis: true,
      dataIndex: 'time',
  },
    {
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 136,
			fixed: 'right',
      render: (record) => (
				<Space size="small" className={c.space}>
					<div className={c.clickText} onClick={()=>push('/main/editOrderModel',record)}>编辑模型</div>
				</Space>
      )
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys ) => {
      setSelectRows(selectedRowKeys)
    },
    selectedRowKeys: selectedRows
  };

  function submit (key) {
    switch (key) {
      case "delete":
        communityParamTemplates("delete", undefined, undefined, "ids=" + selectedRows.map(i => data[i].id).toString()).then(r => {
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
			<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{name:"批量删除",key:"delete"}]}/>
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

export default OrderModelView

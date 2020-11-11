import React, { useState, useEffect } from 'react'
import { Button, Table, Input, Modal, Space } from 'antd'
import c from '../../styles/view.module.css'
import ce from '../../styles/edit.module.css'
import good7 from '../../icons/good/good7.png'
import good6 from '../../icons/good/good6.png'
import good31 from '../../icons/good/good31.png'
import { communityGoodsCategories } from '../../utils/api'
import { push, transformTime, saveSuccess } from "../../utils/util";
import DropdownComponent from '../../components/DropdownComponent'
import { styles } from "../../styles/modal"
import ActionComponent from '../../components/ActionComponent'
import {SCROLL} from '../../utils/config'

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
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [search_name, setSearch_name] = useState()

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    let body = { page: current, size: pageSize }
    if (search_name) {
      body = { ...body, name: search_name }
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
    {
      title: '分类名称',
			ellipsis: true,
      dataIndex: 'name',
  },
    {
      title: '包含商品数量',
			ellipsis: true,
      dataIndex: 'used_by',
  },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record, index) => (
        <div className={c.clickText} onClick={()=>{window.opener.localClick('good-category', text)}}>导入到这个分类</div>
      )
    }
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
        communityGoodsCategories("delete", undefined, undefined, "ids=" + selectedRows.map(i => data[i].id).toString()).then(r => {
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
    <div className={c.main}>
			<div className={c.select_label_view}>
				<div className={ce.headerT} style={{padding:0,background:'#fff'}}>
					<div style={{zIndex:1}}>要将商品导入到哪个分类下</div>
					<div className={ce.circle} style={{left:-5,top:10}}/>
				</div>
				<Button onClick={()=>window.opener.localClick} className={c.add_select_category}>新增分类</Button>
			</div>
			<div style={{color:"rgba(0, 0, 0, 0.45)",fontSize:"0.857rem",textAlign:'right'}}>新增分类会离开这页面，请先保存已填写的内容。</div>
      <div className={c.searchView}>
				<div className={c.search} style={{borderBottomColor:"rgba(0, 0, 0, 0.09)",borderBottomWidth:1,borderBottomStyle:"solid",marginBottom:18}}>
            <div className={c.searchL}>
              <Input onPressEnter={()=>get(current)} placeholder="请输入商品分类" value={search_name} onChange={e=>setSearch_name(e.target.value)} size="small" className={c.searchInput} />
            </div>
            <div className={c.searchR}>
              <Button
                icon={
                  <img src={good31} alt="" style={{width:14,marginRight:6}} />
                }
                type = "primary"
                size = "small"
                onClick={()=>get(current)}
                className={c.searchBtn}>搜索分类</Button>
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

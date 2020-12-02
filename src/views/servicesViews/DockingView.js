import React, { useState, useEffect } from 'react'
import { Button, Space, Input } from 'antd'
import c from '../../styles/view.module.css'
import oc from '../../styles/oc.module.css'
import good36 from '../../icons/good/good36.png'
import good37 from '../../icons/good/good37.png'
import good9 from '../../icons/good/good9.png'
import TableHeaderComponent from "../../components/TableHeaderComponent"
import ModalPopComponent from "../../components/ModalPopComponent"
import ActionComponent from '../../components/ActionComponent'
import { docking, extPrvdStats } from '../../utils/api'
import {dateFormat, push, saveSuccess } from '../../utils/util'
import Table from '../../components/Table'
import SearchInput from "../../components/SearchInput"

function DockingView () {
  const [visible, setVisible] = useState(false)
	const [labels, setLabels] = useState([
    {
      label: '已对接',
      number: '-',
      icon: good36,
      id: 111,
    },
    {
      label: '总对接商品',
      number: '-',
      icon: good37,
      id: 222,
    }
	])

	// useEffect(()=>{
	// 	extPrvdStats().then(r=>{
	// 		if(!r.error){
	// 			const { total_ext_prvd_amount, total_providing_amount } = r.data
	// 			setLabels([
	// 				{
	// 					label: '已对接',
	// 					number: total_ext_prvd_amount,
	// 					icon: good36,
	// 					id: 111,
	// 				},
	// 				{
	// 					label: '总对接商品',
	// 					number:total_providing_amount,
	// 					icon: good37,
	// 					id: 222,
	// 				}
	// 			])
	// 		}
	// 	})
	// },[])

  function onCancel () {
    setVisible(false)
  }

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/edit-docking" data={labels} text="新增"/>
        <RTable />
      </div>
      <ModalPopComponent
        div={
          <div className={oc.limit_view}>
            <div className={oc.limit_item}>登录账号：<span>10</span></div>
            <div className={oc.limit_item}>登录密码：<span>100000</span></div>
            <div className={oc.limit_item}>&#12288;&#12288;&#12288;ID：<span>121334</span></div>
            <div className={oc.limit_item}>&#12288;&#8194;token：<span>dsfadfasdf</span></div>
          </div>
        }
        title="对接凭证"
        visible={visible}
        onCancel={onCancel}
      />
    </div>
  )
}

function RTable () {
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
	const [name, setName] = useState()
	const [type, setType] = useState()

  useEffect(() => {
    get(current)
  }, [pageSize, current])

  function get (page = current) {
		setLoading(true)
    let body = { page, size: pageSize }
    if (name) {
      body = { ...body, ...{ name } }
    }
    if (type) {
      body = { ...body, ...{ type } }
    }
    docking("get", undefined, body).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
				setSelectRows([])
      }
			setLoading(false)
		}).catch(()=>setLoading(false))
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = dateFormat(item.created_at)
    })
    return arr
  }

  const columns = [
    {
      title: '对接目标编号',
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '对接目标名称',
			ellipsis: true,
      dataIndex: 'name',
  },
    {
      title: '对接平台',
			ellipsis: true,
      dataIndex: 'type',
  },
    {
      title: '已对接商品',
			ellipsis: true,
      dataIndex: 'offering',
			render: text => text + "个"
  },
    {
      title: '对接凭证',
			ellipsis: true,
      dataIndex: 'payload',
			render: text => JSON.parse(text).key
  },
    {
      title: '对接时间',
			ellipsis: true,
      dataIndex: 'time',
  },
    {
			title: "操作",
      render: (...args) => (
				<Space size="small">
          <div style={{cursor: "wait"}} className={c.clickText} onClick={()=>{
						// push("/main/import-good", {...args[1],...{provider_type: "external_provider"}})
					}}>导入商品</div>
          <div className={c.line} />
					<div className={c.clickText} onClick={()=>push("/main/edit-docking", args[1])}>修改对接信息</div>
				</Space>
      )
    }
  ];

  function submit (key) {
    switch (key) {
      case "delete":
        docking("delete", undefined, undefined, selectedRows.map(i => data[i].id).toString()).then(r => {
          if (!r.error) {
            saveSuccess(false)
            setSelectRows([])
            get(current)
          }
        })
        break
      default:
    }
  }

  function reset () {
		setName(undefined)
		setType(undefined)
  }

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
						<Input placeholder="请输入名称" value={name} onChange={e=>setName(e.target.value)} onPressEnter={()=> {
              setCurrent(1)
              get(1)
}} size="small" className={c.searchInput}/>
						<SearchInput initNums={[{name:"亿乐",id:"yile"}]} placeholder="请选择对接平台" value={type} setValue={setType} view={true}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
            <Button icon={
                <img src={good9} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
              onClick={()=> {
                setCurrent(1)
                get(1)
              }}
              className={c.searchBtn}>搜索</Button>
          </div>
        </div>
      </div>
			<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{name:"批量删除",key:"delete"}]}/>
			<Table
				scroll={null}
				setPageSize={setPageSize}
				loading={loading}
				setCurrent={setCurrent}
				setSelectedRowKeys={setSelectRows}
				selectedRowKeys={selectedRows}
				columns={columns}
				dataSource={data}
				pageSize={pageSize}
				total={total}
				current={current}
			/>
    </div>
  )
}

export default DockingView

import React, { useState, useEffect } from 'react'
import { Button, Table, Input, Space, message } from 'antd'
import c from '../../styles/view.module.css'
import ce from '../../styles/edit.module.css'
import good23 from '../../icons/good/good23.png'
import good24 from '../../icons/good/good24.png'
import good9 from '../../icons/good/good9.png'
import { extPrvdsGoods, extPrvdsGood, goodsSummaries } from "../../utils/api";
import { push, saveSuccess } from "../../utils/util"
import ActionComponent from '../../components/ActionComponent'
import {useHistory} from 'react-router-dom'

let win

function ImportView () {
  const { state = {} } = useHistory().location
	const { id, provider_type, name, nickname, type } = state

  const [selected, setSelected] = useState()
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [initDate, setInitDate] = useState([])
  const [selectedRows, setSelectRows] = useState([]);

	window.localClick = function (type, id) {
		switch (type) {
			case 'good-category':
				imp(selected, {p_ctg_id: id})
				break
			default:
				;
		}
		win && win.close()
	}

	window.localJump = function () {
		push("/main/goodCategory")
		win && win.close()
	}

	function imp (record = selected, parameter = {}) {
		if(provider_type === "supplier") {
			message.warning("暂未开放!")
		}else {
			extPrvdsGood(id, record.ext_prvd_goods_id).then(r=>!r.error && push("/main/impGood", {...formatGood(r.data),...parameter,...{provider_type, provide_name: name, ext_prvd_id: id}}))
		}
	}

	function formatGood (data) {
		switch(type) {
			case "yile":
				const { gid, name, price, limit_min, limit_max, inputs=[], image, desc } = data
				return { p_goods_id: gid, p_name: name, p_price: price, params: JSON.stringify(inputs.map(i=>({name:i[0], field:i[1], type: "text"}))), p_min_order_amount: limit_min, p_max_order_amount: limit_max, p_pics:[image], p_intro: desc }
			default:
				return {}
		}
	}

  useEffect(() => {
		initGet()
  }, [])

  function initGet () {
		if(provider_type === "supplier") {
			goodsSummaries(id).then(r=>{
				if (!r.error) {
					const { data } = r
					setTotal(data.length)
					setInitDate(format(data))
					get(current, data)
				}
			})
		}else {
			extPrvdsGoods(id).then(r => {
				if (!r.error) {
					const { data } = r
					setTotal(data.length)
					setInitDate(format(data))
					get(current, data)
				}
			})
		}
  }

  function onChange (page) {
    setCurrent(page)
    get(page)
  }

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectRows(selectedRowKeys)
    },
    selectedRowKeys: selectedRows
  };

  function submit (key) {
  }

  function reset () {
    // setAccount(undefined)
    // setStatus(undefined)
  }

  const columns = [
    {
      title: '导入状态',
			ellipsis: true,
      dataIndex: 'imported',
  },
    {
      title: '商品编号',
			ellipsis: true,
			dataIndex: provider_type === "supplier"? "id" : 'ext_prvd_goods_id',
  },
    {
      title: '商品名称',
			ellipsis: true,
      dataIndex: 'name',
  },
    {
			title: "操作",
      render: (text, record, index) => (
				<Space size="small">
					<div onClick={()=>{
						setSelected(record)
						win = window.open("/select-goods-category", "_blank", "left=390,top=145,width=1200,height=700")
					}} className={c.clickText}>一键导入</div>
          <div className={c.line} />
          <div className={c.clickText} onClick={()=>imp(record)}>导入并编辑</div>
        </Space>
      )
    },
  ];

  function get (current, nums=initDate) {
		setData(nums.slice(current*10-10,current*10-1))
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.imported = item.imported || "-"
    })
    return arr
  }

  return (
    <div className="view">
      <div className={c.container}>
				<div style={{marginTop:0,paddingTop:24}} className={c.main}>
					<div className={ce.headerT} style={{marginBottom:8}}>
						<div style={{zIndex:1}}>从{nickname || name ||  "供应商"}导入商品</div>
						<div className={ce.circle} />
					</div>
					<div className={c.searchView}>
						<div className={c.search}>
							<div className={c.searchL}>
								{/* <Input onPressEnter={()=>get(current)} maxLength={20} placeholder="请输入名称" onChange={e=>setAccount(e.target.value)} value={account} size="small" className={c.searchInput} /> */}
								{/* <DropdownComponent setAction={setStatus} action={status} keys={[{key:"normal",name:"正常"},{key:"banned",name:"封禁"}]} placeholder="请选择导入状态" style={{width:186}}/> */}
								{/* <DropdownComponent setAction={setStatus} action={status} keys={[{key:"normal",name:"正常"},{key:"banned",name:"封禁"}]} placeholder="请选择用户等级" style={{width:186}}/> */}
								{/* { */}
								{/*   <DatePicker.RangePicker */}
								{/*     format="YYYY-MM-DD" */}
								{/*     onChange={dateChange} */}
								{/*     value={moment} */}
								{/*     className={c.dataPicker}/> */}
								{/* } */}
							</div>
							<div className={c.searchR}>
								<Button size="small" className={c.resetBtn} onClick={reset}>重置</Button>
								<Button icon={
									<img src={good9} alt="" style={{width:14,marginRight:6}} />
									}
									type = "primary"
									onClick={()=>get(current)}
									size = "small"
									className={c.searchBtn}>搜索</Button>
							</div>
						</div>
					</div>
					{/* <ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{name:"批量解封",key:"normal"},{name:"批量封禁",key:"banned"}]}/> */}
					<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[]}/>
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
      </div>
    </div>
  )
}

export default ImportView

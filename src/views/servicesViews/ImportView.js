import React, { useState, useEffect } from 'react'
import { Button, Table, Input, Space, message } from 'antd'
import c from '../../styles/view.module.css'
import ce from '../../styles/edit.module.css'
import good23 from '../../icons/good/good23.png'
import good24 from '../../icons/good/good24.png'
import good9 from '../../icons/good/good9.png'
import { extPrvdsGoods, extPrvdsGood, goodsSummaries, communityGoods, suppGood } from "../../utils/api";
import { push, saveSuccess } from "../../utils/util"
import ActionComponent from '../../components/ActionComponent'
import {useHistory} from 'react-router-dom'
import DropdownComponent from '../../components/DropdownComponent'

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
  const [filterData, setFilterData] = useState([])
  const [selectedRows, setSelectRows] = useState([]);
	const [account, setAccount] = useState()
	const [status, setStatus] = useState()

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

	function addSupplierGood (data, parameter) {
		const localData = {...formatGood(data),...parameter,...{provider_type, provide_name: name, ext_prvd_id: id}}
		const { p_name, p_intro, p_pics, p_price, p_goods_id } = localData
    let body = {
			name: p_name,
			status: "paused",
			supp_goods: { provider_type, goods_id: p_goods_id },
			ctg_id: parameter.p_ctg_id,
			tag_ids: [],
      prices: [p_price,0,0,0],
			unit: "个",
			refundable: false,
			recommended: false,
			repeatable: false,
      min_order_amount: 1,
      max_order_amount: 10000,
      weight: 1,
			pics: p_pics,
			unit_cost: p_price,
			intro: p_intro,
    }
    const promise = communityGoods('add', undefined, undefined, body)
    promise.then(r => {
      if (!r.error) {
        saveSuccess(false)
      }
    }).catch(() => {
    })
	}

	function addGood (data, parameter) {
		const localData = {...formatGood(data),...parameter,...{provider_type, provide_name: name, ext_prvd_id: id}}
		const { p_name, p_intro, p_pics, p_price, p_goods_id, ext_prvd_id, params } = localData
    let body = {
			name: p_name,
			status: "paused",
			supp_goods: { provider_type, ext_prvd_goods_id: p_goods_id, ext_prvd_id, params },
			ctg_id: parameter.p_ctg_id,
			tag_ids: [],
      prices: [p_price,0,0,0],
			unit: "个",
			refundable: false,
			recommended: false,
			repeatable: false,
      min_order_amount: 1,
      max_order_amount: 10000,
      weight: 1,
			pics: p_pics,
			unit_cost: p_price,
			intro: p_intro,
    }
    const promise = communityGoods('add', undefined, undefined, body)
    promise.then(r => {
      if (!r.error) {
        saveSuccess(false)
      }
    }).catch(() => {
    })
	}

	function imp (record = selected, parameter = {}) {
		if(provider_type === "supplier") {
			if(parameter.p_ctg_id) {
				suppGood(record.id).then(r=>!r.error && addSupplierGood(r.data, parameter))
			}else {
				suppGood(record.id).then(r=>!r.error && push("/main/impGood", {...formatGood(r.data),...parameter,...{provider_type, provide_name: name, ext_prvd_id: id}}))
			}
		}else {
			if(parameter.p_ctg_id) {
				extPrvdsGood(id, record.ext_prvd_goods_id).then(r=>!r.error && addGood(r.data, parameter))
			}else {
				extPrvdsGood(id, record.ext_prvd_goods_id).then(r=>!r.error && push("/main/impGood", {...formatGood(r.data),...parameter,...{provider_type, provide_name: name, ext_prvd_id: id}}))
			}
		}
	}

	function formatGood (data) {
		switch(type) {
			case "yile":
				const { gid, name, price, limit_min, limit_max, inputs=[], image, desc } = data
				return { p_goods_id: gid, p_name: name, p_price: price && Number(price).toFixed(4), params: JSON.stringify(inputs.map((i,index)=>({name:i[0], field:`value${index + 1}`, type: "text", placeholder: i[1]}))), p_min_order_amount: limit_min, p_max_order_amount: limit_max, p_pics:[image], p_intro: desc }
			default:
				const { id, name: supplier_name, price: supplier_price, max_order_amount, min_order_amount, intro, unit } = data
				return { p_goods_id: id, p_name: supplier_name, p_price: supplier_price && Number(supplier_price).toFixed(4), p_min_order_amount: min_order_amount, p_max_order_amount: max_order_amount, p_pics:[], p_intro: intro, p_unit: unit }
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
					setFilterData(format(data))
					get(current, data)
				}
			})
		}else {
			extPrvdsGoods(id).then(r => {
				if (!r.error) {
					const { data } = r
					setTotal(data.length)
					setInitDate(format(data))
					setFilterData(format(data))
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
    setAccount(undefined)
    setStatus(undefined)
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
		let localData = account ? nums.filter(i => i.name.indexOf(account) > -1) : nums
		localData = status ? localData.filter(i => i.imported && (i.imported).toString().indexOf(status) > -1) : localData
		setTotal(localData.length)
		setData(localData.slice(current*10-10,current*10-1))
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
								<Input onPressEnter={()=>get(current)} maxLength={20} placeholder="请输入名称" onChange={e=>setAccount(e.target.value)} value={account} size="small" className={c.searchInput} />
								<Input onPressEnter={()=>get(current)} maxLength={20} placeholder="请输入导入状态" onChange={e=>setStatus(e.target.value)} value={status} size="small" className={c.searchInput} />
								{/* <DropdownComponent setAction={setStatus} action={status} keys={[]} placeholder="请选择导入状态" style={{width:186}}/> */}
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
						bordered={true}
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

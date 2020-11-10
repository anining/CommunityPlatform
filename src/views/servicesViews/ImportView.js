import React, { useState, useEffect } from 'react'
import { Radio, Button, Table, Input, Space, message } from 'antd'
import c from '../../styles/view.module.css'
import ce from '../../styles/edit.module.css'
import { USER_STATUS, SCROLL } from "../../utils/config"
import oc from '../../styles/oc.module.css'
import good23 from '../../icons/good/good23.png'
import good24 from '../../icons/good/good24.png'
import good9 from '../../icons/good/good9.png'
import good41 from '../../icons/good/good41.png'
import { users, updateUsers, extPrvdStat, extPrvdsGoods, extPrvdsGood } from "../../utils/api";
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent";
import { transformTime, push, getKey, saveSuccess } from "../../utils/util"
import ModalPopComponent from "../../components/ModalPopComponent"
import ModalComponent from "../../components/ModalComponent"
import { USER_RANK } from "../../utils/config"
import ActionComponent from '../../components/ActionComponent'
import {useHistory} from 'react-router-dom'

let win

function ImportView () {
  const { state = {} } = useHistory().location
  const h = useHistory()
	const { id, name, type } = state

  // TODO: 三个弹窗
  const [visible, setVisible] = useState(false)
  const [visible_action, setVisibleAction] = useState(false)
  const [visible_balance, setVisibleBalance] = useState(false)
  const [title, setTitle] = useState()
  const [selected, setSelected] = useState([])
  const [key, setKey] = useState()
  const [src, setSrc] = useState()
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [sel, setSel] = useState({})
  const [seled, setSeled] = useState(0)
  const [account, setAccount] = useState()
  const [status, setStatus] = useState()
  const [date, setDate] = useState([])
  const [initDate, setInitDate] = useState([])
  const [moment, setMoment] = useState()
  const [selectedRows, setSelectRows] = useState([]);
  const labels = [
    {
      label: '用户总数',
      number: '10,100',
      icon: good23,
      id: 111,
    },
    {
      label: '今日新增',
      number: '10,111',
      icon: good24,
      id: 222,
    },
  ]

	window.localClick = function (type, ids) {
		switch (type) {
			case 'good-category':
				message.error("一键导入失败")
				// push("/main/impGood",ids)
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

	function imp (record) {
		// 携带供应商类型参数 provider_type
		extPrvdsGood(id, record.ext_prvd_goods_id).then(r=>{
			if(!r.error) {
				push("/main/impGood", formatGood(r.data))
			}
		})
	}

	function formatGood (data) {
		switch(type) {
			case "yile":
				const { gid, name:n, price, limit_min, limit_max, image, desc } = data
				return { p_goods_id: gid, p_name: name, p_price: price, p_min_order_amount: limit_min, p_max_order_amount: limit_max, p_pics:[image], p_intro: desc, provider_type: "external_provider"}
			default:
		}
	}

  useEffect(() => {
		initGet()
  }, [])

  function initGet () {
    extPrvdsGoods(id).then(r => {
      if (!r.error) {
        const { data } = r
        setTotal(data.length)
        setInitDate(format(data))
				get(current, data)
      }
    })
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const rowSelection = {
    onChange: (selectedRowKeys, rows) => {
      setSelectRows(selectedRowKeys)
    },
    selectedRowKeys: selectedRows
  };

  function submit (key) {
    let title = ""
    switch (key) {
      case "banned":
        title = "您确定要封禁选中用户吗？";
        break;
      case "normal":
        title = "您确定要解封选中用户吗？";
        break;
      default:
    }

    setTitle(title)
    setSelected(selectedRows.map(i => data[i]))
    setSrc(USER_STATUS[key].src)
    setKey(key)
    setVisibleAction(true)
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
      dataIndex: 'ext_prvd_goods_id',
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
						win = window.open("/select-goods-category", "_blank", "left=390,top=145,width=1200,height=700")
					}} className={c.clickText}>一键导入</div>
          <div className={c.line} />
          <div className={c.clickText} onClick={()=>imp(record)}>导入并编辑</div>
        </Space>
      )
    },
  ];

  function dateChange (data, dataString) {
    setDate([new Date(dataString[0]).toISOString(), new Date(dataString[1]).toISOString()])
    setMoment(data)
  }

  function get (current, nums=initDate) {
		setData(nums.slice(current*10-10,current*10-1))
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      // item.time = transformTime(item.created_at)
    })
    return arr
  }

  function onCancel () {
    setVisible(false)
    setVisibleAction(false)
  }

  let text = []
  selected.forEach(i => text.push(i.account))

  function onOk () {
    setVisible(false)
    updateUsers({lv:seled},"ids=" + sel.id).then(r => {
      if (!r.error) {
        saveSuccess(false)
        setSelectRows([])
        get(current)
      }
    })
  }

  function updateStatus () {
    setVisibleAction(false)
    updateUsers({status:key},"ids=" + selected.map(i => i.id).toString()).then(r => {
      if (!r.error) {
        saveSuccess(false)
        setSelectRows([])
        get(current)
      }
    })
  }

  return (
    <div className="view">
      <div className={c.container}>
				<div style={{marginTop:0,paddingTop:24}} className={c.main}>
					<div className={ce.headerT} style={{marginBottom:8}}>
						<div style={{zIndex:1}}>从{name || "供应商"}导入商品</div>
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
					<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{name:"批量解封",key:"normal"},{name:"批量封禁",key:"banned"}]}/>
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

const styles = {
  view: {
    width: 340,
  },
  input: {
    height: 32,
    width: "100%",
    marginTop: 29,
    marginBottom: 72
  },
  header: {
    marginTop: 18,
    color: 'rgba(0, 0, 0, 0.65)',
    display: 'flex',
    alignItems: 'center'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    width: 14,
    marginRight: 9,
  },
  cancelBtn: {
    height: 24,
    width: 58,
    color: 'rgba(0, 0, 0, 0.65)',
  },
  okBtn: {
    marginLeft: 19,
    height: 24,
    width: 58,
    background: '#1890FF'
  }
}

export default ImportView

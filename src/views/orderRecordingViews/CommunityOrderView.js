import React, { useState, useEffect } from 'react'
import { Button, Badge, Space, Popconfirm, Table,  Input, DatePicker } from 'antd'
import c from '../../styles/view.module.css'
import * as L from "partial.lenses"
import * as R from 'kefir.ramda'
import oc from '../../styles/oc.module.css'
import good17 from '../../icons/good/good17.png'


import good19 from '../../icons/good/good19.png'

import good21 from '../../icons/good/good21.png'
import good59 from '../../icons/good/good59.png'

import good60 from '../../icons/good/good60.png'
import { styles as ms } from '../../styles/modal'

import good9 from '../../icons/good/good9.png'
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent";
import { dateFormat, push, getKey, saveSuccess } from "../../utils/util";
import { refundAccept, orderSync, orderComments, communityGoodsOrders, communityGoodsCategories, ordersStat } from "../../utils/api"

import ModalPopComponent from "../../components/ModalPopComponent"
import ModalComponent from "../../components/ModalComponent"
import DropdownPromiseComponent from '../../components/DropdownPromiseComponent'
import { REFUND_STATUS, SCROLL, COMMUNITY_SYNC_STATUS, COMMUNITY_ORDER_STATUS,  COMMUNITY_AFTER_STATUS } from '../../utils/config'
import ActionComponent from '../../components/ActionComponent'
import TableComponent from '../../components/TableComponent'

function CommunityOrderView () {
  const [visibleMsg, setVisibleMsg] = useState(false)
  const [visible_push, setVisiblePush] = useState(false)
  const [visible_ref, setVisibleRef] = useState(false)
  const [visible, setVisible] = useState(false)
  const [remark, setRemark] = useState()
  const [refundNum, setRefundNum] = useState()
  const [sel, setSel] = useState({})
  const [selected, setSelected] = useState([])
	const [labels, setLabels] = useState([
    {
      label: '订单总数',
      number: '0',
      icon: good19,
      id: 111,
    },
    {
      label: '待处理订单',
      number: '0',
      icon: good21,
      id: 222,
    },
    {
      label: '退款中',
      number: '0',
      icon: good17,
      id: 333,
    },
    {
      label: '通信失败',
      number: '0',
      icon: good59,
      id: 444,
    },
  ])
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(true)
  const [date, setDate] = useState([])
  const [moment, setMoment] = useState()
  const [id, setId] = useState()
  const [search_user_account, setSearch_user_account] = useState()
  const [search_goods_name, setSearch_goods_name] = useState()
  const [community_goods_category_id, setCommunity_goods_category_id] = useState()
  const [status, setStatus] = useState()
  const [refundStatus, setRefundStatus] = useState()
	const [width, setWidth] = useState([209,0,0,0])

	const sumIf = pred => R.pipe(
		R.filter(pred),
		R.map(R.prop("count")),
		R.sum
	)

	const getNums = () => {
		ordersStat().then(r=>{
			if(!r.error){
				const goods_num = sumIf(() => true)(r.data)
				const pending_num = sumIf(x => x.status === "pending")(r.data)
				const refunding_num = sumIf(x => x.refund_status === "refunding")(r.data)
				const failed_num = sumIf(x => x.sync_status === "failed")(r.data)
				setLabels([
					{
						label: '订单总数',
						number: goods_num,
						icon: good19,
						id: 111,
					},
					{
						label: '待处理订单',
						number: pending_num,
						icon: good21,
						id: 222,
					},
					{
						label: '退款中',
						number: refunding_num,
						icon: good17,
						id: 333,
					},
					{
						label: '通信失败',
						number: failed_num,
						icon: good59,
						id: 444,
					}
				])
			}
		})
	}

  const setPriceAt = i => R.pipe(
    num => L.set([i], num, width),
    setWidth
  )

  function getGoodsSummaries(page,size) {
    return communityGoodsCategories("get",undefined,{page,size}).then(r => {
      if (!r.error) {
        return r.data
      }
      return []
    }).catch(()=>[])
  }

  console.log(sel)

  function refund () {
    setVisibleRef(false)
    refundAccept(sel.id,refundNum).then(r=>{
      if (!r.error) {
        saveSuccess(false)
        setRefundNum(undefined)
        get(current)
      }
    })
  }

  useEffect(() => {
    get(current)
  }, [])

  function addRemark () {
		orderComments("ids="+sel.id, remark).then(r=> {
      if (!r.error) {
        saveSuccess(false)
        setRemark(undefined)
        get(current)
      }
		})
    setVisible(false)
  }

  function dateChange (data, dataString) {
    setDate([new Date(dataString[0]).toISOString(), new Date(dataString[1]).toISOString()])
    setMoment(data)
  }

  function get (current) {
		setLoading(true)
		getNums()
		communityGoodsOrders(current, pageSize, id, refundStatus, search_user_account, search_goods_name, community_goods_category_id, status, date[0], date[1]).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
				selectedRows.length && setSelectRows(format(data).map(i => i.key))
      }
			setLoading(false)
		}).catch(() => setLoading(false))
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = dateFormat(item.created_at)
    })
    return arr
  }

  function detail (id, index) {
    // const localVisible = []
    // data.forEach((item, i) => {
    //   if (index === i) {
    //     localVisible.push(true)
    //   } else {
    //     localVisible.push(false)
    //   }
    // })
    // localVisible[index] = true
    // setVisible(localVisible)
    // managersPermissions(id).then(r => {
    //   const { error, data } = r;
    //   !error && setPurview(data)
    //   setVisible(true)
    //   console.log(data)
    // })
  }

  function close () {
    // const localVisible = []
    // data.forEach((item, i) => {
    //   localVisible.push(false)
    // })
    // // localVisible[index] = true
    // setVisible(localVisible)
  }

  const rowSelection = {
    onChange: (selectedRowKeys ) => {
      setSelectRows(selectedRowKeys)
    },
    selectedRowKeys: selectedRows
  };

  function onChange (page ) {
    setCurrent(page)
    get(page)
  }

	const ordersPush = (sels = selected) => {
		orderSync("ids=" + sels.map(i => i.id).toString()).then(r => {
			if (!r.error) {
				saveSuccess(false)
				setSelectRows([])
				get(current)
			}
		})
	}

  function submit (key) {
    switch (key) {
      case "push":
      case "sync":
				setSelected(selectedRows.map(i => data[i]))
				ordersPush(selectedRows.map(i => data[i]))
        break
      default:
    }
  }

  function reset () {
    setId(undefined)
    setSearch_user_account(undefined)
    setSearch_goods_name(undefined)
		setRefundStatus(undefined)
    setCommunity_goods_category_id(undefined)
    setStatus(undefined)
    setDate([])
    setMoment()
  }

  const columns = [
    {
      title: '订单编号',
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '商品名称',
			width: 200,
			ellipsis: true,
      dataIndex: 'goods_name',
  },
    {
      title: '商品分类',
			ellipsis: true,
      dataIndex: 'ctg_name',
  },
    {
      title: '下单用户',
			ellipsis: true,
      dataIndex: 'user_account',
  },
    // {
    //   title: '下单信息',
			// ellipsis: true,
    //   render: (text, record, index) => {
    //     return <div onClick={()=>{
    //       setSel(record)
    //       setVisibleMsg(true)
    //     }} className={c.view_text}>查看</div>
  // }
// }, {
  // title: '拓展信息',
			// ellipsis: true,
  // render: (text, record, index) => {
    // return <div onClick={()=>{
    //   setSel(record)
    //   setVisibleOther(true)
    // }} className={c.view_text}>查看</div>
  // }
// }, 
		{
  title: '下单数量',
			ellipsis: true,
  dataIndex: 'amount',
}, {
  title: '订单总额',
			ellipsis: true,
  dataIndex: 'h_price',
},
{
  title: '订单状态',
			ellipsis: true,
  dataIndex: 'status',
	render: (text) => {
		const { text: t, status } = getKey(text, COMMUNITY_ORDER_STATUS)
		return <Badge status={status} text={t}/>
	}
}, {
  title: '售后状态',
			ellipsis: true,
  dataIndex: 'refund_status',
  render: (text, record ) => {
    const { reject_reason="暂无" } = record
    const { text: t, status } = getKey(text, REFUND_STATUS)
    return (
			<Popconfirm
				icon={<img src="" alt="" style={ms.popConfirmIcon}/>}
				placement="bottomRight"
				title={()=><div style={{color:'#999',fontSize:'0.857rem',paddingTop:8}}>{reject_reason}</div>}
			>
				<Badge status={status} text={t} />
			</Popconfirm>
    )
  }
}, {
  title: '通信状态',
	ellipsis: true,
  dataIndex: 'sync_status',
  render: (text , index) => {
    const { text: t, status } = getKey(text, COMMUNITY_SYNC_STATUS)
		return <Badge status={status} text={t} />
}
},
	{
  title: '订单去向',
			ellipsis: true,
  dataIndex: 'time',
  render: (text, record, index) => {
    return '-'
}
},
	{
  title: '下单时间',
	width: 200,
	ellipsis: true,
  dataIndex: 'time',
},
	{
  title: '用户备注(用户可见)',
			ellipsis: true,
  dataIndex: 'time',
  render: (text, record, index) => {
    return '-'
}
},
	{
  title: '订单信息',
	ellipsis: true,
  dataIndex: 'time',
	render: (text, record ) => {
		return <div onClick={()=>{
			setSel(record)
			setVisibleMsg(true)
		}} className={c.view_text}>查看</div>
	}
},
	{
	title: () => <span style={{marginLeft:32}}>操作</span>,
	width: width[0]+width[1]+width[2]+width[3],
	fixed: 'right',
  render: (...args) => {
		if(args[1].refund_status === "refunding") {
			if(width[1] !== 73) {
				const localWidth = [...width]
				localWidth[1] = 73
				setWidth(localWidth)
			}
		}
		if(args[1].sync_status === "pending") {
			if(width[2] !== 73) {
				const localWidth = [...width]
				localWidth[2] = 73
				setWidth(localWidth)
			}
		}
		if(args[1].sync_status === "failed") {
			if(width[3] !== 73) {
				const localWidth = [...width]
				localWidth[3] = 73
				setWidth(localWidth)
			}
		}
		return (
			<Space size="small" className={c.space} style={{paddingLeft:32, justifyContent: "flex-start"}}>
				<div className={c.clickText} onClick={()=>{
					setSel(args[1])
					setRemark(sel.comment)
					setVisible(true)
				}}>
					添加备注
				</div>
				<div className={c.line} />
				<div className={c.clickText} onClick={()=>push('/main/order-recording',args[1])}>订单历程</div>
				{
					args[1].refund_status === "refunding" ?
						<>
							<div className={c.line} />
							<div onClick={()=>{
								setSel(args[1])
								setVisibleRef(true)
							}} className={c.clickText}>同意退款</div>
						</>:null
				}
				{
					args[1].sync_status === "failed" ?
						<>
							<div className={c.line} />
							<div onClick={()=>{
								ordersPush([args[1]])
							}} className={c.clickText}>重新推送</div>
						</>:null
				}
				{
					args[1].sync_status === "out_of_date" ?
						<>
							<div className={c.line} />
							<div onClick={()=>{
								ordersPush([args[1]])
							}} className={c.clickText}>重新同步</div>
						</>:null
				}
			</Space>
		)
	}
}
];

  function onOk () {

  }

  function onCancel () {
    setVisible(false)
    setVisiblePush(false)
    setVisibleMsg(false)
  }

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent data={labels}/>
        <div className={c.main}>
          <div className={c.searchView}>
            <div className={c.search}>
              <div className={c.searchL}>
                <Input value={id} onChange={e=>setId(e.target.value)} onPressEnter={()=>get(current)} placeholder="请输入订单编号" size="small" className={c.searchInput}/>
                <Input onPressEnter={()=>get(current)} placeholder="请输入商品名称" value={search_goods_name} onChange={e=>setSearch_goods_name(e.target.value)} size="small" className={c.searchInput}/>
                {/* <Input onPressEnter={()=>get(current)} placeholder="请输入下单编号" value={search_goods_name} onChange={e=>setSearch_goods_name(e.target.value)} size="small" className={c.searchInput}/> */}
                <Input onPressEnter={()=>get(current)} value={search_user_account} onChange={e=>setSearch_user_account(e.target.value)} placeholder="请输入下单用户" size="small" className={c.searchInput}/>
                <DropdownPromiseComponent view placeholder="请选择商品分类" value={community_goods_category_id} setValue={setCommunity_goods_category_id} fetchName={getGoodsSummaries}/>
                {/* <DropdownComponent action={status} setAction={setStatus} keys={[{"name":"待处理",key:"pending"},{"name":"进行中",key:"processing"},{"name":"已完成",key:"completed"},{"name":"已关闭",key:"closed"}]} placeholder="请选择商品分类" style={{width:186}}/> */}
                {/* <DropdownComponent action={status} setAction={setStatus} keys={[{"name":"待处理",key:"pending"},{"name":"进行中",key:"processing"},{"name":"已完成",key:"completed"},{"name":"已关闭",key:"closed"}]} placeholder="请选择订单状态" style={{width:186}}/> */}
                <DropdownComponent action={refundStatus} setAction={setRefundStatus} keys={[{"name":"退款中",key:"refunding"},{"name":"已退款",key:"refunded"},{"name":"已拒绝",key:"rejected"}]} placeholder="请选择售后状态" style={{width:186}}/>
                {/* <DropdownComponent action={status} setAction={setStatus} keys={[{"name":"待处理",key:"pending"},{"name":"进行中",key:"processing"},{"name":"已完成",key:"completed"},{"name":"已关闭",key:"closed"}]} placeholder="请选择通信状态" style={{width:186}}/> */}
                <DropdownComponent action={status} setAction={setStatus} keys={[{"name":"待处理",key:"pending"},{"name":"进行中",key:"processing"},{"name":"已完成",key:"completed"},{"name":"已终止",key:"closed"}]} placeholder="请选择订单状态" style={{width:186}}/>
                <DatePicker.RangePicker
                  format="YYYY-MM-DD"
                  onChange={dateChange}
                  value={moment}
                  className={c.dataPicker}/>
              </div>
              <div className={c.searchR}>
                <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
                <Button icon={
                    <img src={good9} alt="" style={{width:14,marginRight:6}} />
                  }
                  type = "primary"
                  size = "small"
                  onClick={()=>get(current)}
                  className={c.searchBtn}>搜索订单</Button>
              </div>
            </div>
          </div>
					<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{"name":"重新推送",key:"push"},{"name":"重新通信",key:"sync"}]}/>
					<TableComponent
						setPageSize={setPageSize}
						setCurrent={setCurrent}
						getDataSource={get}
						loading={loading}
						setSelectedRowKeys={setSelectRows}
						selectedRowKeys={selectedRows}
						columns={columns}
						dataSource={data}
						pageSize={pageSize}
						total={total}
						current={current}
					/>
        </div>
    </div>

      <ModalPopComponent
        div={
          <div className={oc.limit_view}>
            {
              sel.args ? Object.keys(JSON.parse(sel.args || "{}")).map(i=><div key={i} className={oc.limit_item}>{i}：<span>{JSON.parse(sel.args || "{}")[i]}</span></div>) : null
            }
            {
              sel.extras ? Object.keys(JSON.parse(sel.extras || "{}")).map(i=><div key={i} className={oc.limit_item}>{i}：<span>{JSON.parse(sel.extras || "{}")[i]}</span></div>) : null
            }
            {
							!sel.extras && !sel.args ? <div className={oc.limit_item} style={{paddingLeft:0}}>暂无</div> : null
            }
          </div>
        }
        title="订单信息"
        visible={visibleMsg}
        onCancel = {onCancel}
      />
      <ModalComponent
        //src={good61}
        src={good60}
        title="您确定要重新推送订单吗？"
        // title="您确定要尝试重新通信吗？"
       // child={
        //  <div style={{color:'#BFBFBF'}}>系统将会尝试与选中的订单重新进行通信并更新通信状态，请在大约<span style={{color:"#FF6236"}}>5-10分钟</span>之后再来查看通信状态。</div>
        // }
        child={
          <div style={{color:'#BFBFBF'}}>重新推送只对订单状态为<span style={{color:"#FF6236"}}>“待处理”</span>且通信状态为<span style={{color:"#FF6236"}}>“通信失败”</span>的订单有效。</div>
        }
        visible={visible_push}
        onCancel={onCancel}
        onOk={onOk}
      />
      <ModalPopComponent
        div={
          <div className={oc.center_view}>
            <div className={oc.remark}>
              <div>退款数量：</div>
              <Input style={{width:370}} value={refundNum} onChange={e=>setRefundNum(e.target.value)} placeholder="请输入退款数量"/>
            </div>
            <div className={oc.remark_tips}>
              当前选中订单： <span> {sel.id}({ sel.goods_name }) </span>
            </div>
            <div className = {oc.change_btn_view} style={{marginTop: 70}}>
              <Button className={oc.change_btn_cancel} onClick={()=>setVisibleRef(false)}>取消</Button>
              <Button type="primary" className={oc.change_btn_ok} onClick={refund}>确定</Button>
            </div>
          </div>
        }
        title="退款"
        visible={visible_ref}
        onCancel={()=>setVisibleRef(false)}
      />
      <ModalPopComponent
        div={
          <div>
            <div className={oc.remark}>
              <div>备注内容：</div>
              <Input placeholder="请输入备注内容" value={remark} onChange={e=>setRemark(e.target.value)}/>
            </div>
            <div className={oc.remark_tips}>
              当前选中订单： <span> {sel.id}( {sel.goods_name} ) </span>
            </div>
            <div className = { oc.change_btn_view } style = { { marginTop: 70 } } >
              <Button className={oc.change_btn_cancel} onClick={()=>setVisible(false)}>取消</Button>
              <Button type="primary" className={oc.change_btn_ok} onClick={addRemark}>确定</Button>
            </div>
          </div>
        }
        title="添加备注"
        visible={visible}
        onCancel={onCancel}
      />
    </div>
)
}

const styles = {
  item: {
    width: '100%',
  },
  close: {
    width: '100%',
    height: 32,
    display: 'flex',
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  closeImg: {
    width: 13
  },
  view: {
    width: 340,
  },
  input: {
    height: 32,
    width: "100%",
    marginTop: 29,
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
    background: '#2C67FF'
  },
  tips: {
    color: '#2C68FF',
    fontSize: '0.857rem',
    marginTop: 8,
    marginBottom: 46,
  }
}

export default CommunityOrderView

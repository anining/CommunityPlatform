import React, { useState, useEffect } from 'react'
import * as R from 'kefir.ramda'
import * as L from "partial.lenses"
import { Button, Badge, Empty,  Modal, Timeline, Space,  notification, Input, message } from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import good46 from '../../icons/good/good46.png'
import good47 from '../../icons/good/good47.png'
import good48 from '../../icons/good/good48.png'
import good1 from '../../icons/good/good1.png'
import { styles } from '../../styles/modal'
import c from '../../styles/view.module.css'
import oc from '../../styles/oc.module.css'
import good2 from '../../icons/good/good2.png'
import auth12 from '../../icons/auth/auth12.png'
import good3 from '../../icons/good/good3.png'
import good4 from '../../icons/good/good4.png'
import good9 from '../../icons/good/good9.png'
import good45 from '../../icons/good/good45.png'
import DropdownComponent from "../../components/DropdownComponent";
import ModalComponent from "../../components/ModalComponent";
import { push, decrypt, getKey, saveSuccess, transformTime, regexNumber } from "../../utils/util"
import TableHeaderComponent from "../../components/TableHeaderComponent"
import { communityGoods, communityGoodsCategories, goodsStat, priceHistories, cmntPadjs, goodsPrice } from "../../utils/api"
import { GOODS_STATUS,  SCROLL } from "../../utils/config"
import ModalPopComponent from "../../components/ModalPopComponent"
import ActionComponent from '../../components/ActionComponent';
import Table from '../../components/Table';
import SearchInput from "../../components/SearchInput";

function CommunityGoodView () {
  const [visible, setVisible] = useState(false)
  const [statusSelected,setSTatusSelected] = useState()
  const [visible_limit, setVisibleLimit] = useState(false)
  const [visibleS, setVisibleS] = useState(false)
  const [visible_c, setVisibleC] = useState(false)
  const [title, setTitle] = useState()
  const [his, setHis] = useState([])
  const [selected, setSelected] = useState([])
  const [key, setKey] = useState()
  const [src, setSrc] = useState()
  const [sel, setSel] = useState({})
	const [loading, setLoading] = useState(true)
	const [unit_cost, setUnit_cost] = useState()
  const [dockingTarget, setDockingTarget] = useState()
  const [marks, setMarks] = useState([])
  const [factors, setFactors] = useState([])
  const [labels, setLabels] = useState([
    {
      label: '商品总数',
      number: '-',
      icon: good3,
      id: 111,
    },
    {
      label: '已上架数',
      number: '-',
      icon: good1,
      id: 222,
    },
    {
      label: '已下架数',
      number: '-',
      icon: good2,
      id: 333,
    },
    {
      label: '维护中数',
      number: '-',
      icon: good4,
      id: 444,
    }
  ])
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const [id, setId] = useState()
  const [search_name, setSearch_name] = useState()
  const [community_goods_category_id, setCommunity_goods_category_id] = useState()
  const [status, setStatus] = useState()
  const [refundable, setRefundable] = useState()
  const [order_by, setOrder_by] = useState()

	const modifyPrice = () => {
		if(!unit_cost || factors.length!==4) {
			message.warning("请完善信息")
			return
		}
		setVisibleC(false)
    communityGoods("modify", sel.id, undefined, {unit_cost, prices: factors, padj_id: dockingTarget}).then(r => {
      if (!r.error) {
				setUnit_cost(undefined)
				setFactors([])
				setDockingTarget(undefined)
				saveSuccess(false)
				get(1)
        setSelectRows([])
      }
    })
	}

  useEffect(() => {
    if (dockingTarget) {
      const values = marks.filter(i => i.id == dockingTarget)
			if(values && values[0]) {
				const { type, factors } = values[0]
				let localValues = [0, 0, 0, 0];
				for (let j = 0; j < 4; j++) {
					if (type === "absolute") {
						localValues[j] = ((+factors[j] || 0) + (+unit_cost || 0)).toFixed(6)
					} else {
						localValues[j] = (((+factors[j] || 0) + 100) / 100 * (+unit_cost || 0)).toFixed(6)
					}
				}
				setFactors(localValues)
			}
    }
  }, [dockingTarget, marks, unit_cost])

	const setPriceAt = (e, i) => {
		const localFactors = [...factors]
		const { value } = e.target
		localFactors[i] = regexNumber(value, true)
		setFactors(localFactors)
	}

	const sumIf = pred => R.pipe(
		R.filter(pred),
		R.map(R.prop("count")),
		R.sum
	)

	const getNums = () => {
		goodsStat().then(r=>{
			if(!r.error){
				const goods_num = sumIf(() => true)(r.data)
				const available_num = sumIf(x => x.status === "available")(r.data)
				const unavailable_num = sumIf(x => x.status === "unavailable")(r.data)
				const paused_num = sumIf(x => x.status === "paused")(r.data)
				setLabels([
					{
						label: '商品总数',
						number: goods_num,
						icon: good3,
						id: 111,
					},
					{
						label: '已上架数',
						number: available_num,
						icon: good1,
						id: 222,
					},
					{
						label: '已下架数',
						number: unavailable_num,
						icon: good2,
						id: 333,
					},
					{
						label: '维护中数',
						number: paused_num,
						icon: good4,
						id: 444,
					}
				])
			}
		})
	}

  function getCmntPadjs (page, size, name) {
    const body = {page, size, name}
    !name && delete body.name
    return cmntPadjs("get", undefined, body).then(r => {
      if (!r.error) {
        setMarks(r.data)
				return [...r.data]
      }
      return []
    }).catch(()=> [])
  }

  function get (page = current) {
		setLoading(true)
		getNums()
    let body = { page, size: pageSize, cmnt_ctgs__name__foreign_key: "foreign_get",  cmnt_padjs__name__foreign_key: "foreign_get" }
    // if (id) {
    //   body = { ...body, ...{ id } }
    // }
    if (search_name) {
      body = { ...body, ...{ name: search_name } }
    }
    if (community_goods_category_id) {
      body = { ...body, ...{ cmnt_ctgs__id__foreign_key: community_goods_category_id } }
    }
    if (status) {
      body = { ...body, ...{ status } }
    }
    if (refundable === "refundable" || refundable === "no_refundable") {
      body = { ...body, ...{ refundable: refundable === "refundable" } }
    }
    console.log(body)
    communityGoods("get", undefined, body).then(r => {
      setLoading(false)
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
				setSelectRows([])
        }	
    }).catch(() => {
			setLoading(false)
		})
  }

  function getGoodsSummaries(page, size, name) {
    const body = {page, size, name}
    !name && delete body.name
    return communityGoodsCategories("get", undefined, body).then(r => {
      if (!r.error) {
        return r.data
      }
      return []
    }).catch(()=>[])
  }

  function getHis (record) {
		setSel(record)
    const { id } = record
    priceHistories(id).then(r=>{
      if (!r.error) {
        setHis(r.data)
				setVisibleLimit(true)
      }
    })
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
    })
    return arr
  }

  useEffect(() => {
    get()
  }, [pageSize, current])

  function submit (key) {
    let title = ""
    switch (key) {
      case "recommendedTrue":
        title = "您确定要推荐这些商品吗？";
        break;
      case "recommendedFalse":
        title = "您确定要取消推荐这些商品吗？";
        break;
      case "del":
        title = "您确定要删除选中的商品吗?";
        break;
      default:
        title = `修改商品状态为${GOODS_STATUS[key].text}`
    }
    setTitle(title)
    setSelected(selectedRows.map(i => data[i]))
    setSrc(GOODS_STATUS[key].src)
    setKey(key)
    setVisible(true)
  }

  function reset () {
    setId(undefined)
    setSearch_name(undefined)
    setCommunity_goods_category_id(undefined)
    setStatus(undefined)
    setRefundable(undefined)
    setOrder_by(undefined)
  }

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
			render: (text, record) => <div title={text} className={c.hiddenText}>{record.recommended ? <img src={good45} style={{width:20,marginRight:8}} alt="" />:null}{text}</div>
  },
    {
      title: '商品分类',
			ellipsis: true,
      dataIndex: 'cmnt_ctgs',
      render: text => text.name,
  },
    {
      title: '进价',
			ellipsis: true,
      dataIndex: 'unit_cost',
      render: (text) => {
        return text || '-'
      },
  },
    {
      title: '单价',
			ellipsis: true,
      dataIndex: 'prices',
      render: (text) => text[0]
  },
    {
      title: '单位',
			ellipsis: true,
      dataIndex: 'unit',
  },
    {
      title: '状态',
      dataIndex: 'status',
			ellipsis: true,
      render: (text) => {
        const { text: t, status } = getKey(text, GOODS_STATUS)
        return <Badge status={status} text={t}/>
      }
  },
    {
      title: '商品来源',
			ellipsis: true,
      dataIndex: 'provider_type'
  },
    {
      title: '调价模版',
			ellipsis: true,
      dataIndex: 'cmnt_padjs',
			render: text => (text && text.name) || "-"
  },
    {
      title: '自助退款',
			ellipsis: true,
      dataIndex: 'refundable',
      render: (text) => <div style={{color:text?"#595959":"#C8C8C8"}}>{text?"允许退款":"不允许退款"}</div>
  },
    {
      title: '更多信息',
			ellipsis: true,
      dataIndex: '',
			render: (...args) => <div onClick={()=>{
				getHis(args[1])
			}} className={c.view_text}>查看</div>
  },
    {
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 282,
			fixed: 'right',
      render: (record) => (
				<Space size="small" className={c.space}>
          <div className={c.clickText} onClick={()=>push('/main/edit-goods-community', record)}>修改商品</div>
          <div className={c.line} />
          <div className={c.clickText} onClick={()=>{
            setSel(record)
            setVisibleS(true)
          }}>修改状态</div>
          <div className={c.line} />
          <div onClick={()=>{
            setSel(record)
						setUnit_cost(record.unit_cost)
						setFactors(record.prices)
						setDockingTarget(record.padj_id)
            setVisibleC(true)
					}} className={c.clickText}>修改价格</div>
        </Space>
      )
    }
  ];

  function onCancel () {
    setVisible(false)
    setVisibleLimit(false)
    setVisibleC(false)
    setVisibleS(false)
  }

  function onOk () {
		setVisible(false)
		if (key === "del") {
			communityGoods("del", undefined, undefined, selected.map(i => i.id).toString()).then(r => {
				if (!r.error) {
					saveSuccess(false)
					setSelectRows([])
					get(current)
				}
			})
		} else {
			let body
			switch (key) {
				case "recommendedTrue":
					body = { recommended: true }
					break
				case "recommendedFalse":
					body = { recommended: false }
					break
				case "refundableTrue":
					body = { refundable: true }
					break
				case "refundableFalse":
					body = { refundable: false }
					break
				default:
					body = { status: key }
			}
			communityGoods("modify", selected.map(i => i.id).toString(), undefined, body).then(r => {
				if (!r.error) {
					saveSuccess(false)
					setSelectRows([])
					get(current)
				}
			})
		}
  }

  function modalOk () {
    if (!statusSelected) {
      message.warning("请完善信息")
      return
    }
    setVisibleS(false)
    communityGoods("modify", sel.id, undefined, {status: statusSelected}).then(r => {
      if (!r.error) {
        saveSuccess(false)
        get(current)
      }
    })
  }

  const { text: t, color } = getKey(sel.status, GOODS_STATUS)

  let text = []
  selected.forEach(i => text.push(i.name))

	const customize = (
		<>
			<Button className={c.docking_btn} onClick={()=>push("/main/docking", null, true)}>导入对接商品</Button>
			<Button className={c.store_btn} onClick={()=>push("/main/store", null, true)} type="primary">导入供应商商品</Button>
		</>
	)

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent customize={customize} path="/main/editCommunityGood" data={labels} text="添加商品"/>
        <div className={c.main}>
          <div className={c.searchView}>
            <div className={c.search}>
              <div className={c.searchL}>
                {/* <Input value={id} onPressEnter={()=>get(current)} onChange={e=>setId(e.target.value)} placeholder="请输入商品编号" size="small" className={c.searchInput}/> */}
                <Input value={search_name} onPressEnter={()=>{
                  (setSearch_name && search_name === decrypt("U2FsdGVkX18gbk6+Gqdcl4lOHiGaM/qMZnh6gl7vYEE=")) && notification.open({message: decrypt("U2FsdGVkX19qRkuqXwfKlQPX97o49Q08x5LSPixLTuo="),description: decrypt("U2FsdGVkX18s/mj00aiQXBbnDz7ONKIFN4p9GKIb4s2ehjz7uKlrHj1opMVuGxj0"),icon: <SmileOutlined style={{color:'#108ee9'}}/>})
                  setCurrent(1)
                  get(1)
                }} onChange={e=>setSearch_name(e.target.value)} placeholder="请输入商品名称" size="small" className={c.searchInput}/>
                <DropdownComponent action={status} setAction={setStatus} keys={[{name:"已上架",key:"available"},{name:"已下架",key:"unavailable"},{name:"维护中",key:"paused"}]} placeholder="请选择商品状态" style={{width:186}}/>
                <DropdownComponent keys={[{name:"允许退款",key:"refundable"},{name:"不允许退款",key:"no_refundable"}]} action={refundable} setAction={setRefundable} placeholder="请选择自助退款状态" style={{width:186}}/>
								<SearchInput view placeholder="请选择商品分类" value={community_goods_category_id} setValue={setCommunity_goods_category_id} fetchName={getGoodsSummaries} />
              </div>
              <div className={c.searchR}>
                <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
                <Button 
	                icon={<img src={good9} alt="" style={{width:14,marginRight:6}} />}
                  type="primary"
                  size="small"
                  onClick={()=> {
                    setCurrent(1)
                    get(1)
                  }}
                  className={c.searchBtn}>搜索商品</Button>
                </div>
            </div>
          </div>
					<Table
						setPageSize={setPageSize}
						setCurrent={setCurrent}
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
				<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{name:"置为已上架",key:"available"},{name:"置为已下架",key:"unavailable"},{name:"置为维护中",key:"paused"},{name:"置为推荐商品",key:"recommendedTrue"},{name:"取消推荐商品",key:"recommendedFalse"},{name:"置为允许退款",key:"refundableTrue"},{name:"置为不允许退款",key:"refundableFalse"},{name:"删除选中商品",key:"del"}]}/>
      </div>
      <ModalComponent
        src={src}
        div="当前选中商品："
        span={text.join('、')}
        title={title}
        action={key}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
      />
			<ModalPopComponent
				div={
					<div className={oc.change_desc_view}>
						<div className={oc.item}>
							<div className={oc.item_label}>进价</div>
							<Input value={unit_cost} disabled={true} placeholder="请输入进价"/>
						</div>
						<div className={oc.item}>
							<div className={oc.item_label}>调价模版</div>
							<SearchInput placeholder="请选择调价模版" value={dockingTarget} setValue={setDockingTarget} fetchName={getCmntPadjs} style={{width: "70%"}} />
						</div>
						<div className={oc.item}>
							<div className={oc.item_label}>单价</div>
							<Input value={factors[0] || "-"} disabled={dockingTarget} onChange={e => setPriceAt(e, 0)} placeholder="请输入单价"/>
						</div>
						<div className={oc.item} style={{alignItems:'flex-start'}}>
							<div className={oc.item_label}>统一密价</div>
							<div className={oc.vip_view}>
								<div className={oc.item_vip}>
									<img src={good46} alt="" />
									<div>高级会员</div>
									<Input value={factors[1] || "-"} disabled={dockingTarget} onChange={e => setPriceAt(e, 1)} placeholder="请输入密价"/>
								</div>
								<div className={oc.item_vip}>
									<img src={good48} alt="" />
									<div>钻石会员</div>
									<Input value={factors[2] || "-"} disabled={dockingTarget} onChange={e => setPriceAt(e, 2)}  placeholder="请输入密价"/>
								</div>
								<div className={oc.item_vip}>
									<img src={good47} alt="" />
									<div>至尊会员</div>
									<Input value={factors[3] || "-"} disabled={dockingTarget} onChange={e => setPriceAt(e, 3)}  placeholder="请输入密价"/>
								</div>
							</div>
						</div>
						<div className={oc.change_btn_view}>
							<Button className={oc.change_btn_cancel} onClick={()=>setVisibleC(false)}>取消</Button>
							<Button type="primary" onClick={modifyPrice} className={oc.change_btn_ok}>确定</Button>
						</div>
					</div>
				}
				title="修改商品价格"
				visible={visible_c}
				onCancel={onCancel}
			/>
			<Modal
				visible={visible_limit}
				footer={null}
				width={1031}
				centered={true}
				onCancel = { onCancel }
			>
				<div className={oc.more_msg}>
					<div className={oc.headerT}>
						<div style={{zIndex:1}}>更多信息</div>
						<div className={oc.circle} />
					</div>
					<div className={oc.more_label}>基本信息</div>
						{
							sel.tags && sel.tags.length && false ?
								<div className={oc.basic_msg} style={{marginBottom:10,flexDirection:'column'}}>
									<div className={oc.basic_msg_label} style={{marginBottom:0}}>下单参数</div>
									<div className={oc.basic_msg_parameter}>
										{
											(sel.tags || []).map(i=><Button className={oc.tags_btn} key={i.id}>{i.name}</Button>)
										}
									</div>
								</div>: null
						}
					<div className={oc.basic_msg}>
						<div className={oc.basic_msg_view}>
							<div className={oc.basic_msg_label}>统一密价</div>
							<div className={oc.more_item}>
								<img src={good46} alt="" />
								<div>高级会员:</div>
								<span>{sel.prices && sel.prices[1]}</span>
							</div>
							<div className={oc.more_item}>
								<img src={good48} alt="" />
								<div>钻石会员:</div>
								<span>{sel.prices && sel.prices[2]}</span>
							</div>
							<div className={oc.more_item}>
								<img src={good47} alt="" />
								<div>至尊会员:</div>
								<span>{sel.prices && sel.prices[3]}</span>
							</div>
						</div>
						<div className={oc.basic_msg_view}>
							<div className={oc.basic_msg_label}>下单限制</div>
							<div className={oc.limit_item}>最低下单：<span style={{marginRight:30}}>{sel.min_order_amount || 0}</span>最高下单：<span>{sel.max_order_amount || 0}</span></div>
							<div className={oc.limit_item}>重复下单：<span style={{color:sel.repeatable?"#333":"#FF5F5F"}}>{sel.repeatable?"允许重复下单":"不允许重复下单"}</span></div>
							<div className={oc.limit_item}>批量下单：<span style={{color:sel.repeatable?"#333":"#FF5F5F"}}>{sel.repeatable?"允许批量下单":"不允许批量下单"}</span></div>
						</div>
					</div>
					<div className={oc.more_label}>商品标签</div>
					{
						sel.tags && sel.tags.length ? 
							<div className={oc.table_msg}>
								{
									(sel.tags || []).map(i=><Button className={oc.tags_btn} key={i.id}>{i.name}</Button>)
								}
							</div>:
							<Empty style={{background:"#FAFAFA",paddingTop:29,paddingBottom:29}} image={Empty.PRESENTED_IMAGE_SIMPLE} />

					}
					<div className={oc.more_label}>调价历史</div>
						{
							his.length ? 
								<Timeline className={oc.more_time}>
									{
										his.map(i=>{
											const { created_at, prices, unit_cost } = i
											return (
												<Timeline.Item color="#1890FF">
													<div className={oc.time_line}><span className={oc.time}>{transformTime(created_at)}</span> 价格调整　进价：<span style={{color:"#2C68FF"}}>{unit_cost}</span>、单价：<span style={{color:"#FF5F5F"}}>{prices[0]}</span>、高级会员：<span style={{fontWeight:800}}>{prices[1]}</span>、钻石会员：<span style={{fontWeight:800}}>{prices[2]}</span>、至尊会员<span style={{fontWeight:800}}>{prices[3]}</span> 。</div>
												</Timeline.Item>
											)
									})
									}
								</Timeline>:
								<Empty style={{background:"#FAFAFA",paddingTop:29,paddingBottom:29}} image={Empty.PRESENTED_IMAGE_SIMPLE} />
						}
				</div>
			</Modal>
      <Modal
        visible={visibleS}
        footer={null}
        centered={true}
        onCancel={onCancel}
      >
        <div style={styles.view}>
          <div style={styles.statusLabel}>
            <img src={auth12} alt="" style={styles.inputImg} />
            修改状态
          </div>
          <div>
            <div className={c.statusModelTips}>商品状态：<span style={{color}}>{t}</span></div>
            {/* <div className={c.statusModelTips}>选中订单：{sel.id}&#8195;&#8195;订单状态：<span style={{color}}>{t}</span></div> */}
            <div className={c.statusModelTitle}>修改为</div>
            <div>
              <Button className={c.statusBtn} onClick={()=>setSTatusSelected("available")} style={{
                color:statusSelected==="available"?"#fff":"rgba(0, 0, 0, 0.25)",
                background:statusSelected==="available"?"#2C68FF":"#fff",
                borderColor:statusSelected==="available"?"#2C68FF":"rgba(0, 0, 0, 0.15)",
              }}>已上架</Button>
              <Button className={c.statusBtn} onClick={()=>setSTatusSelected("unavailable")} style={{
                color:statusSelected==="unavailable"?"#fff":"rgba(0, 0, 0, 0.25)",
                background:statusSelected==="unavailable"?"#2C68FF":"#fff",
                borderColor:statusSelected==="unavailable"?"#2C68FF":"rgba(0, 0, 0, 0.15)",
              }}>已下架</Button>
              <Button className={c.statusBtn} onClick={()=>setSTatusSelected("paused")} style={{
                color:statusSelected==="paused"?"#fff":"rgba(0, 0, 0, 0.25)",
                background:statusSelected==="paused"?"#2C68FF":"#fff",
                borderColor:statusSelected==="paused"?"#2C68FF":"rgba(0, 0, 0, 0.15)",
              }}>维护中</Button>
            </div>
          </div>
          <div style={{marginTop:8}}>
            <Button onClick={()=>setVisibleS(false)} style={styles.cancelBtn}>取消</Button>
            <Button type="primary" style={styles.okBtn} onClick={()=>modalOk()}>确定</Button>
          </div>
        </div>
      </Modal>
    </div >
  )
}

export default CommunityGoodView

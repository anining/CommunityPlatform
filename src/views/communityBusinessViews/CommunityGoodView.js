import React, { useState, useEffect } from 'react'
import { Button, Timeline, Space, Table, Input } from 'antd'
import good46 from '../../icons/good/good46.png'
import good47 from '../../icons/good/good47.png'
import good48 from '../../icons/good/good48.png'
import good1 from '../../icons/good/good1.png'
import c from '../../styles/view.module.css'
import oc from '../../styles/oc.module.css'
import good2 from '../../icons/good/good2.png'
import good3 from '../../icons/good/good3.png'
import good4 from '../../icons/good/good4.png'
import good9 from '../../icons/good/good9.png'
import good45 from '../../icons/good/good45.png'
import DropdownComponent from "../../components/DropdownComponent";
import ModalComponent from "../../components/ModalComponent";
import { push, getKey, saveSuccess } from "../../utils/util"
import TableHeaderComponent from "../../components/TableHeaderComponent"
import { communityGoods } from "../../utils/api"
import SelectComponent from "../../components/SelectComponent"
import { GOODS_STATUS } from "../../utils/config"
import ModalPopComponent from "../../components/ModalPopComponent"

let win

function CommunityGoodView () {
  const [visible, setVisible] = useState(false)
  const [visible_limit, setVisibleLimit] = useState(false)
  const [visible_his, setVisibleHis] = useState(false)
  const [visible_c, setVisibleC] = useState(false)
  const [visible_introduction, setVisibleIntroduction] = useState(false)
  const [visible_desc, setVisibleDesc] = useState(false)
  const [title, setTitle] = useState()
  const [selected, setSelected] = useState([])
  const [key, setKey] = useState()
  const [src, setSrc] = useState()
  const [label] = useState([
    {
      label: '商品总数',
      number: '10,100',
      icon: good3,
      id: 111,
    },
    {
      label: '已上架数',
      number: '10,111',
      icon: good1,
      id: 222,
    },
    {
      label: '已下架数',
      number: '10,111',
      icon: good2,
      id: 333,
    },
    {
      label: '关闭下单',
      number: '10,111',
      icon: good4,
      id: 444,
    },
  ])
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const [id, setId] = useState()
  const [search_name, setSearch_name] = useState()
  const [community_goods_category_id, setCommunity_goods_category_id] = useState()
  const [community_goods_category_name, setCommunity_goods_category_name] = useState()
  const [status, setStatus] = useState()
  const [refundable, setRefundable] = useState()
  const [order_by, setOrder_by] = useState()
  const [ordering, setOrdering] = useState()

  function get (current) {
    let body = { page: current, size: pageSize }
    if (id) {
      body = { ...body, ...{ id } }
    }
    if (search_name) {
      body = { ...body, ...{ search_name } }
    }
    if (community_goods_category_id) {
      body = { ...body, ...{ community_goods_category_id } }
    }
    if (status) {
      body = { ...body, ...{ status } }
    }
    if (refundable === "refundable" || refundable === "no_refundable") {
      body = { ...body, ...{ refundable: refundable === "refundable" } }
    }
    // if (order_by) {
    //   body = { ...body, ...{ order_by } }
    // }
    // if (ordering) {
    //   body = { ...body, ...{ ordering } }
    // }
    communityGoods("get", undefined, body).then(r => {
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
    })
    return arr
  }

  function onCancel () {
    setVisible(false)
    setVisibleLimit(false)
    setVisibleHis(false)
    setVisibleIntroduction(false)
    setVisibleC(false)
    setVisibleDesc(false)
  }

  function onOk () {
    setVisible(false)
    const params = new URLSearchParams()
    selected.forEach(i => params.append("ids", i.id))
    communityGoods("modifys", undefined, params.toString(), { status: key }).then(r => {
      if (!r.error) {
        saveSuccess(false)
        setSelectRows([])
        get(current)
      }
    })
  }

  let text = []
  selected.forEach(i => text.push(i.name))

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/editCommunityGood" data={label} text="添加商品"/>
        <RTable selectedRows={selectedRows} setVisibleC={setVisibleC} setVisibleIntroduction={setVisibleIntroduction} setVisibleHis={setVisibleHis} setVisible={setVisible} setVisibleLimit={setVisibleLimit} setSelectRows={setSelectRows} data={data} setData={setData} current={current} setCurrent={setCurrent} pageSize={pageSize} total={total} setTotal={setTotal} id={id} setId={setId} search_name={search_name} setSearch_name={setSearch_name} community_goods_category_id={community_goods_category_id} setCommunity_goods_category_id={setCommunity_goods_category_id} community_goods_category_name={community_goods_category_name} setCommunity_goods_category_name={setCommunity_goods_category_name} status={status} setStatus={setStatus} refundable={refundable} setRefundable={setRefundable} order_by={order_by} setOrder_by={setOrder_by} ordering={ordering} setOrdering={setOrdering} get={get} setTitle={setTitle} setSelected={setSelected} setSrc={setSrc} setKey={setKey} />
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
          <>
            <div className={oc.introduction}>
                    商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容商品介绍富文本内容。
            </div> <
    div className = { oc.btnView } >
    <Button className={oc.closeBtn} onClick={onCancel}>关闭窗口</Button> <
    /div> < / >
  }
  title = "商品介绍"
  visible = { visible_introduction }
  onCancel = { onCancel }
  /> <
  ModalPopComponent
  div = {
    <div>
            <div className={oc.item}>
              <div>进价</div>
              <Input placeholder="百分比加价模版"/>
            </div>
            <div className={oc.item}>
              <div>加价模版</div>
              <Input placeholder="百分比加价模版"/>
            </div>
            <div className={oc.item}>
              <div>单价</div>
              <Input placeholder="百分比加价模版"/>
            </div>
            <div className={oc.item} style={{alignItems:'flex-start'}}>
              <div>统一密价</div>
              <div className={oc.vip_view}>
                <div className={oc.item_vip}>
                  <img src={good46} alt="" />
                  <div>高级会员</div>
                  <Input placeholder="请输入密价"/>
                </div>
                <div className={oc.item_vip}>
                  <img src={good48} alt="" />
                  <div>钻石会员</div>
                  <Input placeholder="请输入密价"/>
                </div>
                <div className={oc.item_vip}>
                  <img src={good47} alt="" />
                  <div>至尊会员</div>
                  <Input placeholder="请输入密价"/>
                </div>
              </div>
            </div>
            <div className={oc.change_btn_view}>
              <Button className={oc.change_btn_cancel}>取消</Button>
              <Button type="primary" className={oc.change_btn_ok}>确定</Button>
            </div>
          </div>
  }
  title = "修改商品价格"
  visible = { visible_c }
  onCancel = { onCancel }
  /> <
  ModalPopComponent
  div = {
    <div className={oc.limit_view}>
            <div className={oc.limit_item}>最低下单：<span>10</span></div>
            <div className={oc.limit_item}>最高下单：<span>100000</span></div>
            <div className={oc.limit_item}>重复下单：<span style={{color:"#FF5F5F"}}>不允许重复下单</span></div>
            <div className={oc.limit_item}>批量下单：<span>允许批量下单</span></div>
          </div>
  }
  title = "下单限制"
  visible = { visible_limit }
  onCancel = { onCancel }
  /> <
  ModalPopComponent
  div = {
    <div className={oc.limit_view}>
      <div className={oc.desc_item}>
        <img src={good46} alt="" />
        <div>高级会员</div>
        <span>0.22</span>
      </div>
      <div className={oc.desc_item}>
        <img src={good48} alt="" />
        <div>钻石会员</div>
        <span>0.22</span>
      </div>
      <div className={oc.desc_item}>
        <img src={good47} alt="" />
        <div>至尊会员</div>
        <span>0.22</span>
      </div>
    </div>
  }
  title = "统一密价"
  visible = { visible_desc }
  onCancel = { onCancel }
  /> <
  ModalPopComponent
  div = {
    <Timeline>
            <Timeline.Item color="#1890FF">
              <div className={oc.time}>2020.01.15 15:01:04</div>
              <div className={oc.time_line}>价格调整　进价：<span>0.05</span>、单价：<span>0.05</span>、高级会员：<span>0.05</span>、钻石会员：-、至尊会员<span>0.5</span></div>
            </Timeline.Item>
            <Timeline.Item color="#1890FF">
              <div className={oc.time}>2020.01.15 15:01:04</div>
              <div className={oc.time_line}>价格调整　进价：<span>0.05</span>、单价：<span>0.05</span>、高级会员：<span>0.05</span>、钻石会员：-、至尊会员<span>0.5</span></div>
            </Timeline.Item>
          </Timeline>
  }
  title = "调价历史"
  visible = { visible_his }
  onCancel = { onCancel }
  /> < /
  div >
)
}

function RTable ({ selectedRows, setSelectRows, data, setVisibleLimit, setVisibleC, setData, setVisibleHis, setVisibleIntroduction, current, setCurrent, pageSize, total, setTotal, id, setId, search_name, setSearch_name, community_goods_category_id, setCommunity_goods_category_id, community_goods_category_name, setCommunity_goods_category_name, status, setStatus, refundable, setRefundable, order_by, setOrder_by, ordering, setOrdering, get, setVisible, setTitle, setSelected, setSrc, setKey }) {
  window.localClick = function (type, ids) {
    setCommunity_goods_category_id(ids.id)
    setCommunity_goods_category_name(ids.name)
    win && win.close()
  }

  useEffect(() => {
    get(current)
  }, [])

  function click () {
    win = window.open("/select-good-category", "_blank", "left=390,top=145,width=1200,height=700")
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
      case "c":
        title = "您确定要推荐这些商品吗？";
        break;
      case "d":
        title = "您确定要取消推荐这些商品吗？";
        break;
      case "e":
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
    setCommunity_goods_category_name(undefined)
    setCommunity_goods_category_id(undefined)
    setStatus(undefined)
    setRefundable(undefined)
    setOrder_by(undefined)
  }

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      align: 'center',
      render: (text, record, index) => {
        return <div><img src={good45} style={{width:20,marginRight:8}} alt="" />{text}</div>
      }
  },
    {
      title: '商品分类',
      align: 'center',
      dataIndex: 'category_name',
  },
    {
      title: '下单模型',
      dataIndex: 'param_template_name',
      align: 'center',
      render: (text, record, index) => {
        return <div>(0815) {text}</div>
      }
  },
    {
      title: '商品来源',
      dataIndex: 'unit_cost',
      align: 'center',
      render: (text, record, index) => {
        return '-'
      }
  },
    {
      title: '进价',
      dataIndex: 'unit_cost',
      align: 'center',
      render: (text, record, index) => {
        return '-'
      },
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 1,
      }
  },
    {
      title: '单价',
      dataIndex: 'unit_price',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 1,
      }
  },
    {
      title: '统一密价',
      align: 'center',
      dataIndex: 'disc_price',
      render: (text, record, index) => {
        return <div>查看</div>
      }
  },
    {
      title: '单位',
      dataIndex: 'unit',
      align: 'center',
  },
    // {
    //   title: '下单限制',
    //   align: 'center',
    //   dataIndex: 'text',
    //   render: (text, record, index) => {
    //     const { repeat_order, batch_order } = record
    //     const repeat = repeat_order > 0 ? { text: "开启", color: "#52C41A" } : { text: "关闭", color: "#C8C8C8" }
    //     const batch = batch_order > 0 ? { text: "开启", color: "#52C41A" } : { text: "关闭", color: "#C8C8C8" }
    //     return (
    //       <div>
    //         <div>批量下单: <span style={{color:repeat.color}}>{repeat.text}</span></div>
    //         <div>重复下单: <span style={{color:batch.color}}>{batch.text}</span></div>
    //       </div>
    //     )
    //   }
  // },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      render: (text, record, index) => {
        const { text: t, color } = getKey(text, GOODS_STATUS)
        return <div style={{color}}>{t}</div>
      }
  },
    {
      title: '自助退款',
      dataIndex: 'unit_cost',
      align: 'center',
      render: (text, record, index) => {
        return '-'
      }
  },
    {
      title: '下单限制',
      align: 'center',
      dataIndex: 'disc_price',
      render: (text, record, index) => {
        return <div onClick={()=>setVisibleLimit(true)}>查看</div>
      }
  },
    {
      title: '商品标签',
      align: 'center',
      dataIndex: 'disc_price',
      render: (text, record, index) => {
        return <div>查看</div>
      }
  },
    {
      title: '调价历史',
      align: 'center',
      dataIndex: 'disc_price',
      render: (text, record, index) => {
        return <div>查看</div>
      }
  },
    {
      title: '商品介绍',
      align: 'center',
      dataIndex: 'disc_price',
      render: (text, record, index) => {
        return <div>查看</div>
      }
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small">
          <div className={c.clickText} onClick={()=>push('/main/editCommunityGood',record)}>修改商品</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{cursor:'wait'}} className={c.clickText}>修改状态</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{cursor:'wait'}} className={c.clickText}>修改价格</div>
        </Space>
      )
    }
  ];

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input value={id} onPressEnter={()=>get(current)} onChange={e=>setId(e.target.value)} placeholder="请输入商品编号" size="small" className={c.searchInput}/>
            <Input value={search_name} onPressEnter={()=>get(current)} onChange={e=>setSearch_name(e.target.value)} placeholder="请输入商品名称" size="small" className={c.searchInput}/>
            <DropdownComponent action={status} setAction={setStatus} keys={[{name:"已上架",key:"available"},{name:"已关闭订单",key:"unavailable"},{name:"已下架",key:"paused"}]} placeholder="请选择商品状态" style={{width:186}}/>
            <DropdownComponent keys={[{name:"可退单",key:"refundable"},{name:"不可退单",key:"no_refundable"},{name:"全部",key:"un_refundable"}]} action={refundable} setAction={setRefundable} placeholder="请选择是否可退单" style={{width:186}}/>
            <SelectComponent placeholder="请选择商品分类" id={community_goods_category_id} name={community_goods_category_name} click={click}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
            <Button icon={
              <img src={good9} alt="" style={{width:14,marginRight:6}} />
            }
              type = "primary"
              size = "small"
              onClick={()=>get(current)}
              className={c.searchBtn}>搜索商品</Button>
            </div>
        </div>
      </div>
      <DropdownComponent selectedRows={selectedRows} submit={submit} keys={[{name:"批量允许退款",key:"a"},{name:"批量不允许退款",key:"b"},{name:"批量置为推荐商品",key:"c"},{name:"批量删除推荐商品",key:"d"},{name:"批量删除",key:"e"},{name:"批量上架",key:"available"},{name:"批量关闭",key:"unavailable"},{name:"批量下架",key:"paused"}]}/>
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

export default CommunityGoodView

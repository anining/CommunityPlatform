import * as React from 'karet'
import { useState, useEffect } from 'react'
import { Button, Table, Input, Breadcrumb, Space } from 'antd'
import c from '../../styles/view.module.css'
import oc from '../../styles/oc.module.css'
import cs from '../../styles/edit.module.css'
import ce from '../../styles/edit.module.css'
import good5 from '../../icons/good/good5.png'
import good55 from '../../icons/good/good55.png'
import good27 from '../../icons/good/good27.png'
import good9 from '../../icons/good/good9.png'
import header1 from '../../icons/header/header1.png'
import { useHistory } from "react-router-dom"
import { communityDiscPrices, addDiscPrices, deleteDiscPrices, usersPricingType } from "../../utils/api"
import { saveSuccess, push } from "../../utils/util";
import { USER_RANK, SCROLL } from '../../utils/config'
import ModalPopComponent from "../../components/ModalPopComponent"

function EditUserPriceView () {
  const { state = {} } = useHistory().location
  const { account, lv, id } = state

  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const [goods_id, setGoods_id] = useState()
  const [goods_name, setGoods_name] = useState()
  const [good_category_id, setGood_category_id] = useState()

  const [visible, setVisible] = useState(false)
  const [checked, setChecked] = useState(false)
  const [selected,setSelected] = useState({})
  const [discPrice,setDisePrice] = useState()

  useEffect(() => {
    if (selected.id) {
      setDisePrice(selected.user_price)
    }
  }, [selected])

  function onCancel () {
    setVisible(false)
  }

  function get (current) {
    communityDiscPrices(current, pageSize, id, goods_id, goods_name, good_category_id).then(r => {
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

  function updateDiscPrice () {
    addDiscPrices(id, selected.id, discPrice).then(r => {
      if (!r.error) {
        setVisible(false)
        get(current)
        saveSuccess(false)
      }
    })
  }

  function delDiscPrice () {
		if(!selected.cmnt_user_price_id) {
			return
		}
    deleteDiscPrices(selected.cmnt_user_price_id).then(r => {
      if (!r.error) {
        saveSuccess(false)
        setVisible(false)
        get(current)
      }
    })
  }

  return (
    <div className="view">
      <ModalPopComponent
        div={
          <div className={oc.edit_user_price}>
            <div onClick={delDiscPrice} style={{cursor:'pointer',textAlign:'right',color:'#2C68FF',marginTop:16}}>删除密价</div>
						<div className={oc.remark_tips} style={{marginLeft:84}}>
							当前选中商品： <span>( {selected.name || ''} )</span>
						</div>
						<div className={oc.remark} style={{paddingTop:10}}>
							<div>用户密价：</div>
							<Input placeholder="请输入用户密价" value={discPrice} onChange={e=>setDisePrice(e.target.value)}/>
						</div>
						{/* <div className = { oc.remark_tips } style={{color:'#FF5730',fontSize:'0.857rem'}}> */}
						{/*   填写的价格小于进价，这样会亏本哦。 */}
						{/* </div> */}
						<div className={oc.change_btn_view} style={{ marginTop: 70}}>
							<Button onClick={onCancel} className={oc.change_btn_cancel}>
								取消
							</Button>
							<Button type="primary" onClick={updateDiscPrice} className={oc.change_btn_ok}>确定</Button>
						</div>
          </div>
				}
      title="用户密价"
      visible={visible}
      onCancel={onCancel}
      />
      <div className={c.container}>
        <div className={ce.header} style={{flexShrink:0}}>
          <img src={good5} alt="" className={ce.headerImg}/>
          <Breadcrumb>
            <Breadcrumb.Item>
              <span onClick={()=>push("/main/home")}>首页</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span onClick={()=>push("/main/user")}>用户管理</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>修改用户密价</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={c.header} style={{marginTop:24,flexDirection:'column',paddingLeft:24}}>
          <div className={cs.headerT} style={{marginTop:24}}>
            <div style={{zIndex:1}}>用户商品用户密价</div>
            <div className={cs.circle} />
          </div>
          <div style={{display:'flex',alignItems:'center',marginTop:38}}>
            <img src={header1} alt="" style={{width:60,marginRight:9}}/>
            <div>
              <div style={{color:'#34374A',fontWeight:500,fontSize:'1.285rem',marginBottom:5}}>{account}</div>
              <img src={USER_RANK[lv].src} alt="" style={{width:100}}/>
            </div>
          </div>
          <div className={cs.tem_header} style={{width:'100%'}}>
            <img src={good55} alt="" />
            <div>
              <div>下单价格优先级：用户密价 > 统一密价 > 单价；用户密价未设置时，使用统一密价，统一密价未设置时使用单价。</div>
              <div>举例：商品Z的单价为0.2，设置普通用户统一密价0.18、高级会员统一密价0.17，其他会员等级统一密价未设置；用户小A为普通用户，此时他下单Z商品的单价为0.18；用户小B为高级会员；此时他下单Z商品的单价为0.17；小C为钻石会员，此时他下单Z商品的单价为0.2；用户小D为高级会员，小D已设置Z商品的用户密价为0.15，此时小D下单Z商品的单价为0.15。</div>
            </div>
          </div>
        </div>
        <RTable setCurrent={setCurrent} get={get} setGoods_name={setGoods_name} current={current} goods_name={goods_name} data={data} pageSize={pageSize} total={total} setSelected={setSelected} setVisible={setVisible} id={id} checked={checked}/>
      </div>
    </div>
  )
}

function RTable ({setCurrent, get, setGoods_name, current, pageSize, data, total, goods_name, setVisible, id, setSelected, checked }) {

  useEffect(() => {
    get(current)
  }, [])

  function insertSave (goods_id, index, disc_price_id) {
    // setVisible(data.map((item, i) => false))
    // if (val) {
    //   addDiscPrices(id, goods_id, "cmnt", val).then(r => {
    //     if (!r.error) {
    //       const localData = [...data]
    //       localData[index].user_disc_price = val
    //       setData(localData)
    //       setVal(undefined);
    //       saveSuccess(false)
    //     }
    //   })
    // } else {
    //   deleteDiscPrices(disc_price_id).then(r => {
    //     if (!r.error) {
    //       const localData = [...data]
    //       localData[index].user_disc_price = val
    //       setData(localData)
    //       setVal(undefined);
    //       saveSuccess(false)
    //     }
    //   })
    // }
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  function reset () {
    setGoods_name(undefined)
    // setGoods_id(undefined)
    // setGood_category_id(undefined)
    // setGood_category_name(undefined)
  }

  function click () {
    // win = window.open("/select-good-category", "_blank", "left=390,top=145,width=1200,height=700")
  }

  const columns = [
    {
      title: '商品名称',
			ellipsis: true,
      dataIndex: 'name',
  },
    {
      title: '商品分类',
			ellipsis: true,
      dataIndex: 'ctg_name',
  },
    {
      title: '进价',
			ellipsis: true,
      dataIndex: 'unit_cost',
      render: (text, record, index) => text || '-'
  },
    {
      title: '单价',
			ellipsis: true,
      dataIndex: 'prices',
      render: (text, record, index) => {
        const { user_price } = record
        const color = (text[0] > 0 && !user_price && !text[3] && !text[2] && !text[1]) ? "#4177FE" : "#595959"
        return <div style={{color}}>{text[0] || '-'}</div>
      }
  },
    {
      title: '统一密价(高级会员)',
			ellipsis: true,
      dataIndex: 'prices',
      render: (text, record, index) => {
        const { user_price } = record
        const color = (text[1] > 0 && !user_price && !text[3] && !text[2]) ? "#4177FE" : "#595959"
        return <div style={{color}}>{text[1] || '-'}</div>
      }
  },
    {
      title: '统一密价(钻石会员)',
			ellipsis: true,
      dataIndex: 'prices',
      render: (text, record, index) => {
        const { user_price } = record
        const color = (text[2] > 0 && !user_price && !text[3]) ? "#4177FE" : "#595959"
        return <div style={{color}}>{text[2] || '-'}</div>
      }
  },
    {
      title: '统一密价(至尊会员)',
			ellipsis: true,
      dataIndex: 'prices',
      render: (text, record, index) => {
        const { user_price } = record
        const color = (text[3] > 0 && !user_price) ? "#4177FE" : "#595959"
        return <div style={{color}}>{text[3] || '-'}</div>
      }
  },
    {
      title: '用户密价',
			ellipsis: true,
      dataIndex: 'user_price',
      render: (text, record, index) => {
        const color = text > 0 ? "#4177FE" : "#595959"
        return <div style={{color}}>{text || '-'}</div>
      }
    },
    {
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 164,
			fixed: 'right',
      render: (text, record, index) => {
        return (
					<Space size="small" className={c.space}>
						<div onClick={()=>{
							setSelected(record)
							setVisible(true)
						}} className={c.clickText}>
							修改用户密价
						</div>
					</Space>
				)
      }
    }
  ];

  return (
    <div className={c.main} style={{marginTop:0}}>
        <div className={c.searchView}>
          <div className={c.search} style={{borderBottom:'none'}}>
            <div className={c.searchL}>
              <Input placeholder="请输入商品名称" onChange={e=>setGoods_name(e.target.value)} value={goods_name} size="small" className={c.searchInput} onPressEnter={()=>get(current)}/>
              {/* <SelectComponent click={click} id={good_category_id} name={good_category_name} placeholder="请选择商品分类" style={{width:186}}/> */}
            </div>
            <div className={c.searchR}>
              <Button size="small" className={c.resetBtn} onClick={reset}>重置</Button>
              <Button icon={
                <img src={good9} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
                onClick={()=>get(current)}
              size = "small"
              className={c.searchBtn}>搜索商品</Button>
            </div>
          </div>
      </div>
      <Table
				scroll={SCROLL}
        columns={columns}
        dataSource={data}
        size="small"
        pagination={{
          showQuickJumper:true,
					showSizeChanger:false,
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

export default EditUserPriceView

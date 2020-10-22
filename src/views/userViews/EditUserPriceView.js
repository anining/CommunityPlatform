import React, { useState, useEffect } from 'react'
import { Button, Table, Input, Switch, Breadcrumb } from 'antd'
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
import SelectComponent from "../../components/SelectComponent"
import DropdownComponent from "../../components/DropdownComponent"
import { USER_RANK } from '../../utils/config'
import ModalPopComponent from "../../components/ModalPopComponent"

let win

function EditUserPriceView () {
  const { state = {} } = useHistory().location
  const { account, id } = state
  const [visible, setVisible] = useState(true)
  const [checked, setChecked] = useState(false)

  function check (e) {
    setChecked(e)
    usersPricingType(id, e ? "disc" : "normal").then(r => {
      !r.error && saveSuccess(false)
    })
  }

  function onCancel () {
    setVisible(false)
  }

  return (
    <div className="view">
      <ModalPopComponent
      div = {
        <div>
          <div style={{textAlign:'right',color:'#2C68FF',marginBottom:15}}>删除密价</div>
            <div className = { oc.remark_tips } >
        当前选中商品： < span > (音符点赞) < /span> < /
        div >
          <div className={oc.remark} style={{marginTop:10}}>
            <div>用户密价：</div>
            <Input placeholder="请输入用户密价"/>
          </div>
          <div className = { oc.remark_tips } style={{color:'#FF5730',fontSize:'0.857rem'}}>
              填写的价格小于进价，这样会亏本哦。
            < /div >
              <
        div className = { oc.change_btn_view } style = { { marginTop: 70 } } >
        <Button className={oc.change_btn_cancel}>取消</Button> <
        Button type = "primary"
        className = { oc.change_btn_ok } > 确定 < /Button> < /
        div > <
        /div>
      }
      title = "用户密价"
      visible = { visible }
      onCancel = { onCancel }
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
              <div style={{color:'#34374A',fontWeight:500,fontSize:'1.285rem',marginBottom:5}}>2346237462374627</div>
              <img src={USER_RANK['a'].src} alt="" style={{width:100}}/>
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
        <RTable id={id} checked={checked}/>
      </div>
    </div>
  )
}

function RTable ({ id, checked }) {
  const [data, setData] = useState([])
  const [val, setVal] = useState()
  const [visible, setVisible] = useState([])
  // const [categorys, setCategorys] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const [goods_id, setGoods_id] = useState()
  const [goods_name, setGoods_name] = useState()
  const [good_category_id, setGood_category_id] = useState()
  const [good_category_name, setGood_category_name] = useState()

  window.localClick = function (type, ids) {
    setGood_category_id(ids.id)
    setGood_category_name(ids.name)
    win && win.close()
  }

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    communityDiscPrices(current, pageSize, id, goods_id, goods_name, good_category_id).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
      }
    })
  }

  function insert (index, user_disc_price) {
    setVal(user_disc_price)
    setVisible(data.map((item, i) => i === index))
  }

  function insertSave (goods_id, index, disc_price_id) {
    setVisible(data.map((item, i) => false))
    if (val) {
      addDiscPrices(id, goods_id, "community", val).then(r => {
        if (!r.error) {
          const localData = [...data]
          localData[index].user_disc_price = val
          setData(localData)
          setVal(undefined);
          saveSuccess(false)
        }
      })
    } else {
      deleteDiscPrices(disc_price_id).then(r => {
        if (!r.error) {
          const localData = [...data]
          localData[index].user_disc_price = val
          setData(localData)
          setVal(undefined);
          saveSuccess(false)
        }
      })
    }
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
    })
    return arr
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  function reset () {
    setGoods_name(undefined)
    setGoods_id(undefined)
    setGood_category_id(undefined)
    setGood_category_name(undefined)
  }

  function click () {
    win = window.open("/select-good-category", "_blank", "left=390,top=145,width=1200,height=700")
  }

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '商品分类',
      align: 'center',
      dataIndex: 'category_name',
  },
    {
      title: '进价',
      dataIndex: 'unit_price',
      align: 'center',
  },
    {
      title: '单价',
      align: 'center',
      render: (text, record, index) => {
        const { unit_cost, disc_price, user_disc_price } = record
        const color = (checked && user_disc_price > 0) ? "#595959" : disc_price > 0 ? "#595959" : "#4177FE"
        return <div style={{color}}>{unit_cost || '-'}</div>
      }
  },
    {
      title: '统一密价(高级会员)',
      dataIndex: 'unit_price',
      align: 'center',
  },
    {
      title: '统一密价(钻石会员)',
      dataIndex: 'unit_price',
      align: 'center',
  },
    {
      title: '统一密价(至尊会员)',
      dataIndex: 'unit_price',
      align: 'center',
  },
    {
      title: '用户密价',
      align: 'center',
      dataIndex: 'user_disc_price',
      render: (text, record, index) => {
        // const { user_disc_price, id, disc_price_id } = record
        return '-'
      }
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'user_disc_price',
      render: (text, record, index) => {
        return <div className={c.clickText}>修改用户密价</div>
      }
    }
  ];

  return (
    <div className={c.main} style={{marginTop:0}}>
        <div className={c.searchView}>
          <div className={c.search} style={{borderBottom:'none'}}>
            <div className={c.searchL}>
              <Input placeholder="请输入商品名称" onChange={e=>setGoods_name(e.target.value)} value={goods_name} size="small" className={c.searchInput} onPressEnter={()=>get(current)}/>
              {/* <SelectComponent click={click} id={good_category_id} name={good_category_name} placeholder="请选择商品类型" style={{width:186}}/> */}
              <DropdownComponent keys={[{name:"已上架",key:"available"},{name:"已关闭订单",key:"unavailable"},{name:"已下架",key:"paused"}]} placeholder="请选择商品分类" style={{width:186}}/>
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

export default EditUserPriceView

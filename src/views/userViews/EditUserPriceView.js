import React, { useState, useEffect } from 'react'
import { Button, Dropdown, Table, Menu, Input, Switch } from 'antd'
import c from '../../styles/view.module.css'
import ce from '../../styles/edit.module.css'
import { DownOutlined } from '@ant-design/icons';
import good5 from '../../icons/good/good5.png'
import good27 from '../../icons/good/good27.png'
import good9 from '../../icons/good/good9.png'
import { useHistory } from "react-router-dom"
import { communityDiscPrices, communityGoodsCategories } from "../../utils/api"

function EditUserPriceView () {
  const { state = {} } = useHistory().location || {}
  const { account, id } = state
  const [value, setValue] = useState()
  const [checked, setChecked] = useState(true)

  function onChange (e) {
    setValue(e.target.value)
  }

  function save () {

  }

  return (
    <div className="container">
      <div className={c.container}>
        <div className={ce.header} style={{flexShrink:0}}>
          <img src={good5} alt="" className={ce.headerImg}/>
          <div>首页 / 用户管理 / <span>修改用户密价</span></div>
        </div>
        <div className={c.header} style={{marginTop:24, height:188}}>
          <div className={c.headerL} style={{
            width:'auto',
            flexDirection:'column',
            alignItems:'flex-start',
            justifyContent:'space-around'
          }}>
            <div style={{display:'flex',alignItems:'flex-end'}}>
              <div style={{
                color:'#34374A',
                fontSize:'2rem',
                fontWeight:500
              }}>修改用户密价</div>
              <div style={{color:'#6F717E',fontWeight:500,marginLeft:14}}>当前用户：<span style={{color:'#2C68FF'}}>{account}</span></div>
            </div>
            <div style={{
              display:'flex',
              alignItems:'flex-start',
            }}>
              <div style={{
                color:'#34374A',
                fontWeight:500,
                fontSize:'1.142rem',
                marginTop:12,
              }}>是否使用密价</div>
              <Switch checked={checked} onClick={e=>setChecked(e)} style={{marginTop:14,marginLeft:32,marginRight:14}}></Switch>
              <div style={{marginTop:16,color:'#2C68FF',fontSize:'0.857rem'}}>当前状态： 使用密价</div>
              <div className={c.headerText} style={{
                width:457,
                height:'auto',
                marginLeft:10,
                fontSize:'0.857rem',
                display:'flex',
                alignItems:'flex-start',
                paddingTop:15,
                paddingBottom:15,
              }}>
                <img src={good27} alt="" className={c.tipsImg}/>
                <div>用户密价高于所有价格类型；当用户密价被填写时，系统将会使用用户密价。当用户密价未填写时，将会根据您的配置，使用密价或者单价。如果密价未填写，用户密价也未填写，系统将会使用单价。</div>
              </div>
            </div>
          </div>
        </div>
        <RTable id={id}/>
      </div>
    </div>
  )
}

function RTable ({ id }) {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [data, setData] = useState([])
  const [good_categorys, setGood_categorys] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [goods_id, setGoods_id] = useState()
  const [goods_name, setGoods_name] = useState()
  const [goods_category, setGoods_category] = useState()

  useEffect(() => {
    get(current)
    getGoodCategory()
  }, [])

  function getGoodCategory () {
    communityGoodsCategories("get", undefined, { page: current, size: pageSize }).then(r => {
      if (!r.error) {
        const { data } = r
        console.log(data)
        setGood_categorys(format(data))
      }
    })
  }

  function get (current) {
    communityDiscPrices(current, pageSize, id, goods_id, goods_name).then(r => {
      console.log(r)
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

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const columns = [
    {
      title: '商品ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '商品名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '商品分类',
      align: 'center',
      dataIndex: 'category',
  },
    {
      title: '业务类型',
      dataIndex: 'type',
      align: 'center',
  },
    {
      title: '进价',
      dataIndex: 'in_price',
      align: 'center',
      render: (text, record, index) => {
        return <div style={{color:'#FF8D30'}}>{text}</div>
      }
  },
    {
      title: '单价',
      dataIndex: 'a_price',
      align: 'center',
  },
    {
      title: '密价',
      align: 'center',
      dataIndex: 'price',
      render: (text, record, index) => {
        return <div style={{color:'#4177FE'}}>{text}</div>
      }
  },
    {
      title: '用户密价',
      align: 'center',
      dataIndex: 'user_price',
      render: (text, record, index) => {
        return <div style={{color:'#4177FE'}}>{text}</div>
      }
  }
];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      // disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      // name: record.name,
    }),
  };

  function reset () {
    setGoods_name(undefined)
    setGoods_id(undefined)
  }

  function handleMenuClick (e) {
    setGoods_category(Number.parseInt(e.key))
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {good_categorys.map((item,i)=>{
        const { id,name } = item
        return (
          <Menu.Item key={id}>
            {name}
          </Menu.Item>
        )
      })}
    </Menu>
  );

  return (
    <div className={c.main} style={{marginBottom:24}}>
        <div className={c.searchView}>
          <div className={c.search} style={{borderBottom:'none'}}>
            <div className={c.searchL} style={{width:'56.157%'}}>
              <Input placeholder="请输入商品ID" onChange={e=>setGoods_id(e.target.value)} value={goods_id} size="small" className={c.searchInput} style={{width:'23.026%'}}/>
              <Input placeholder="请输入商品名称" onChange={e=>setGoods_name(e.target.value)} value={goods_name} size="small" className={c.searchInput} style={{width:'23.026%'}}/>
              {/* <Dropdown overlay={menu}> */}
              {/*   <Button size="small" className={c.dropdownBtn} style={{width:'20.394%'}}> */}
              {/*     <div className={c.hiddenText}> */}
              {/*       请选择业务类型 */}
              {/*     </div> */}
              {/*     <DownOutlined /> */}
              {/*   </Button> */}
              {/* </Dropdown> */}
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn} style={{width:'20.394%'}}>
                  <div className={c.hiddenText}>
                    { goods_category ? good_categorys.filter(i => i.id === goods_category)[0].name : "请选择商品类型" }
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
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
      <Table columns={columns} rowSelection={{
        type: selectionType,
        ...rowSelection
      }} dataSource={data} rowClassName={(record,index)=>{
        if (index % 2) {
          return "f1f5ff"
        }
      }} size="small" pagination={{
          showQuickJumper:true,
          current,
          pageSize,
          hideOnSinglePage:false,
          showLessItems:true,
          total,
          onChange
        }}
      />
    </div>
  )
}

export default EditUserPriceView

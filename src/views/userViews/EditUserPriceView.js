import React, { useState, useEffect } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Radio } from 'antd'
import good1 from '../../icons/good/good1.png'
import c from '../../styles/view.module.css'
import ce from '../../styles/edit.module.css'
import { DownOutlined } from '@ant-design/icons';
import good5 from '../../icons/good/good5.png'
import good2 from '../../icons/good/good2.png'
import good3 from '../../icons/good/good3.png'
import good4 from '../../icons/good/good4.png'
import good27 from '../../icons/good/good27.png'
import good9 from '../../icons/good/good9.png'
import { useHistory } from "react-router-dom"
import { goBack } from "../../utils/util"
import { communityDiscPrices } from "../../utils/api"

function EditUserPriceView () {
  const { state = {} } = useHistory().location || {}
  const { account, id } = state
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState()

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
        <div className={c.header} style={{marginTop:24}}>
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
              alignItems:'center',
            }}>
              <div style={{
                color:'#34374A',
                fontWeight:500
              }}>价格类型</div>
              <Radio.Group onChange={onChange} value={value}>
                {/* <Radio value={1} style={{marginLeft:33,marginRight:70}}>单价</Radio> */}
                {/* <Radio value={2}>密价</Radio> */}
              </Radio.Group>
            </div>
          </div>
          <div style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
          }}>
            <div style={{marginBottom:11}}>
              <Button size="small" style={{
                width:131,
                height:40,
                color:'#979BA3',
                fontSize:'1.142rem',
                marginRight:32
              }} onClick={goBack}>放弃</Button>
              <Button size="small" type="primary" style={{
                width:131,
                height:40,
                background:'#2C68FF',
                fontSize:'1.142rem'
              }} onClick={save}>保存</Button>
            </div>
            <div style={{
              color:'#979BA3',
              fontSize:'0.857rem'
            }}>上次保存： 2020.01.15 15:25:04</div>
          </div>
        </div>
        <div className={c.headerTips}>
          <div className={c.headerText}>
            <img src={good27} alt="" className={c.tipsImg}/>
            <div>当用户密价填写时，系统会优先使用用户密价。</div>
          </div>
        </div>
        <RTable setVisible={setVisible} id={id}/>
      </div>
    </div>
  )
}

function RTable ({ setVisible, id }) {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [goods_id, setGoods_id] = useState()
  const [goods_name, setGoods_name] = useState()

  useEffect(() => {
    get(current)
  }, [])

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

  function handleMenuClick (e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  function reset () {
    setGoods_name(undefined)
    setGoods_id(undefined)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        1st menu item
      </Menu.Item>
      <Menu.Item key="2">
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3">
        3rd menu item
      </Menu.Item>
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
              {/* <Dropdown overlay={menu}> */}
              {/*   <Button size="small" className={c.dropdownBtn} style={{width:'20.394%'}}> */}
              {/*     <div className={c.hiddenText}> */}
              {/*       请选择商品类型 */}
              {/*     </div> */}
              {/*     <DownOutlined /> */}
              {/*   </Button> */}
              {/* </Dropdown> */}
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

function HeaderItem () {
  const views = [];
  const data = [
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
  ]

  data.forEach((item, index) => {
    const { label, number, icon, id } = item;
    views.push(
      <div className={c.headerItem} key={id}>
        <img src={icon} alt="" className={c.headerItemImg} />
        <div className={c.headerIR} style={{borderRightWidth:index<data.length-1?1:0}}>
          <div className={c.headerNumber}>{number}</div>
          <div className={c.headerLabel}>{label}</div>
        </div>
      </div>
    )
  })

  return views
}

export default EditUserPriceView

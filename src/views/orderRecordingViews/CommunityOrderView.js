import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input, DatePicker } from 'antd'
import c from '../../styles/view.module.css'
import good17 from '../../icons/good/good17.png'
import good18 from '../../icons/good/good18.png'
import good40 from '../../icons/good/good40.png'
import good19 from '../../icons/good/good19.png'
import good20 from '../../icons/good/good20.png'
import good21 from '../../icons/good/good21.png'
import good41 from '../../icons/good/good41.png'
import good9 from '../../icons/good/good9.png'
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent";
import { transformTime } from "../../utils/util";
import { communityGoodsOrders } from "../../utils/api"

function CommunityOrderView () {
  const data = [
    {
      label: '订单总数',
      number: '10,100',
      icon: good19,
      id: 111,
    },
    {
      label: '待处理订单',
      number: '10,111',
      icon: good21,
      id: 222,
    },
    {
      label: '申请退款',
      number: '10,111',
      icon: good17,
      id: 333,
    },
    {
      label: '申请补单',
      number: '10,111',
      icon: good18,
      id: 444,
    },
    {
      label: '异常订单',
      number: '1',
      icon: good20,
      id: 555,
    },
  ]

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent data={data}/>
        <RTable />
      </div>
    </div>
  )
}

function RTable () {
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [date, setDate] = useState([])
  const [moment, setMoment] = useState()
  const [id, setId] = useState()
  const [search_user_account, setSearch_user_account] = useState()
  const [search_goods_name, setSearch_goods_name] = useState()
  const [community_goods_category_id, setCommunity_goods_category_id] = useState()
  const [status, setStatus] = useState()

  useEffect(() => {
    get(current)
  }, [])

  function dateChange (data, dataString) {
    setDate(dataString)
    setMoment(data)
  }

  function get (current) {
    communityGoodsOrders(current, pageSize, id, search_user_account, search_goods_name, community_goods_category_id, status, date[0], date[1]).then(r => {
      if (!r.error) {
        // const { data, total } = r
        // setTotal(total)
        // setData(format(data))
      }
    })
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = transformTime(item.created_at)
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

  // const obj = [
  //   {
  //     color: "#FF8D30",
  //     text: '待处理',
  //   },
  //   {
  //     color: "#2C68FF",
  //     text: '进行中',
  //   },
  //   {
  //     color: "#52C41A",
  //     text: '已完成',
  //   },
  //   {
  //     color: "#FF8D30",
  //     text: '异常',
  //   },
  //   {
  //     color: "#FF5730",
  //     text: '申请退款',
  //   }
  // ]
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '下单信息',
      dataIndex: 'msg',
      align: 'center',
      // render: (text, record, index) => {
      //   const { uri, number, password } = text;
      //   return (
      //     <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      //     <div>
      //       <div>主页链接 :{uri}</div>
      //       <div style={{display:'flex'}}>
      //         <div style={{marginRight:30}}>账号: {number}</div>
      //         <div>密码: {password}</div>
      //       </div>
      //     </div>
      //   </div>
      //   )
      // }
  },
    {
      title: '扩展信息',
      align: 'center',
      dataIndex: 'text',
      // render: (text, record, index) => {
      //   const { begin_num, num } = text;
      //   return (
      //     <div>
      //     <div>初始量 :{begin_num}</div>
      //     <div>当前量: {num}</div>
      //   </div>
      //   )
      // }
  },
    {
      title: '推送状态',
      dataIndex: 'number',
      align: 'center',
  },
    {
      title: '售后状态',
      dataIndex: 'price',
      align: 'center',
  },
    {
      title: '订单状态',
      align: 'center',
      dataIndex: 'status',
      // render: (text, record, index) => {
      //   const { text: t, color } = obj[text]
      //   return <div style={{color}}>{t}</div>
      // }
  },
    {
      title: '下单时间',
      dataIndex: 'time',
      align: 'center',
  },
    {
      title: '订单历程',
      align: 'center',
      // render: (text, record, index) => (
      //   <Popconfirm icon={()=><img src="" alt="" style={{width:0,height:0}}/>
      // }
      // visible = { visible[index] }
      // placement = "leftTop"
      // title = {
      //   () => {
      //     return (
      //       <div style={styles.view}>
      //             <div style={styles.close} onClick={close}>
      //               <img src={good40} style={styles.closeImg} alt="" />
      //             </div>
      //             <Timeline>
      //               <Timeline.Item color="#2C67FF">2020.01.15 15:01:04　用户下单，订单状态变为<span style={{color:'#4177FE'}}>待处理</span></Timeline.Item>
      //               <Timeline.Item color="#979BA3">Create a services site 2015-09-01</Timeline.Item>
      //               <Timeline.Item color="#2C67FF">2020.01.15 15:01:04　用户下单，订单状态变为<span style={{color:'#4177FE'}}>待处理</span></Timeline.Item>
      //               <Timeline.Item color="#2C67FF">2020.01.15 15:01:04　用户下单，订单状态变为<span style={{color:'#4177FE'}}>待处理</span></Timeline.Item>
      //               <Timeline.Item color="#2C67FF">2020.01.15 15:01:04　用户下单，订单状态变为<span style={{color:'#4177FE'}}>待处理</span></Timeline.Item>
      //               <Timeline.Item color="#979BA3">Create a services site 2015-09-01</Timeline.Item>
      //               <Timeline.Item color="#979BA3">Create a services site 2015-09-01</Timeline.Item>
      //               <Timeline.Item color="#979BA3">Create a services site 2015-09-01</Timeline.Item>
      //             </Timeline>
      //           </div>
      //     )
      //   }
      // } >
      // <div style={{color:'#2C68FF'}} onClick={()=>detail(text,index)}>点击查看</div> <
      // /Popconfirm>
      // )
    },
    {
      title: '操作',
      align: 'center',
      // render: (text, record, index) => (
      //   <Space size="small" style={{color:'#2C68FF'}}>
      //       <Popconfirm icon={()=><img src="" alt="" style={{width:0,height:0}}/>
      //         }
      //         placement = "leftTop"
      //         title = {
      //             () => {
      //               return (
      //                 <div style={styles.view}>
      //                   <div style={styles.header}>
      //                     <img src={good41} alt="" style={styles.icon}/>
      //                     <div>请输入需要退款的数量</div>
      //                   </div>
      //                   <Input style={styles.input} placeholder="请在这里输入退款数量"/>
      //                   <div style={styles.tips}>全部退款</div>
      //                   <div style={styles.footer}>
      //                     <Button size="small" style={styles.cancelBtn}>取消</Button>
      //                     <Button size="small" type="primary" style={styles.okBtn}>确定</Button>
      //                   </div>
      //                 </div>
      //               )
      //             }
      //           } >
      //         <div style={{color:'#FF4D4F'}}>退款</div>
      //       </Popconfirm>
      //     <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
      //       <Popconfirm icon={()=><img src="" alt="" style={{width:0,height:0}}/>
      //         }
      //         placement = "leftTop"
      //         title = {
      //             () => {
      //               return (
      //                 <div style={styles.view}>
      //                   <div style={styles.header}>
      //                     <img src={good41} alt="" style={styles.icon}/>
      //                     <div>请为此订单输入备注信息</div>
      //                   </div>
      //                   <Input style={styles.input} placeholder="请在这里输入备注信息"/>
      //                   <div style={styles.footer}>
      //                     <Button size="small" style={styles.cancelBtn}>取消</Button>
      //                     <Button size="small" type="primary" style={styles.okBtn}>确定</Button>
      //                   </div>
      //                 </div>
      //               )
      //             }
      //           } >
      //         <div style={{color:'#2C68FF'}}>添加备注</div>
      //       </Popconfirm>
      //   </Space>
      // )
      },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, rows) => {
      setSelectRows(selectedRowKeys)
    }
  };

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  function submit (key) {
    switch (key) {
      case "delete":
        message.success('批量删除操作');
        break
      default:
        ;
    }
  }

  function reset () {

  }

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input onPressEnter={()=>get(current)} placeholder="请输入订单编号" size="small" className={c.searchInput}/>
            <Input onPressEnter={()=>get(current)} placeholder="请输入商品名称" size="small" className={c.searchInput}/>
            <Input onPressEnter={()=>get(current)} placeholder="请输入下单账号" size="small" className={c.searchInput}/>
            <DropdownComponent keys={[]} placeholder="请选择商品分类" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择订单状态" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择商品名称" style={{width:186}}/>
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
      <DropdownComponent submit={submit} keys={[]}/>
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

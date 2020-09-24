import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input } from 'antd'
import c from '../../styles/view.module.css'
import good38 from '../../icons/good/good38.png'
import good39 from '../../icons/good/good39.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'
import good41 from '../../icons/good/good41.png'
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent";

function StoreView () {
  const data = [
    {
      label: '供货商',
      number: '10,100',
      icon: good38,
      id: 111,
    },
    {
      label: '供货商品数',
      number: '10,111',
      icon: good39,
      id: 222,
    },
  ]

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/editStore" data={data} text="新增"/>
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

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    // let body = { page: current, size: pageSize }
    // if (id) {
    //   body = { ...body, ...{ id } }
    // }
    // communityGoods("get", undefined, body).then(r => {
    //   if (!r.error) {
    //     const { data, total } = r
    //     setTotal(total)
    //     setData(format(data))
    //   }
    // })
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

  // const obj = [
  //   {
  //     text: '暂停',
  //     color: '#FF8D30',
  //   },
  //   {
  //     text: '正常',
  //     color: '#000'
  //   }
  // ]
  const columns = [
    {
      title: '供货商ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '供货商名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '供货商账户',
      align: 'center',
      dataIndex: 'number',
  },
    {
      title: '总收益',
      dataIndex: 'price',
      align: 'center',
  },
    {
      title: '待结算收益',
      dataIndex: 'in_price',
      align: 'center',
  },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      // render: (text, record, index) => {
      //   const { text: t, color } = obj[text];
      //   return <div style={{color}}>{t}</div>
      // }
  },
    {
      title: '供货商商品数',
      dataIndex: 'num',
      align: 'center',
  },
    {
      title: '对接时间',
      align: 'center',
      dataIndex: 'time',
  },
    {
      title: '操作',
      align: 'center',
      // render: (text, record, index) => (
      //   <Space size="small" style={{color:'#2C68FF'}}>
      //     <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
      //       const history = h.get()
      //       history.push("/main/editStore")
      //     }}>修改</div>
      //     <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
      //       <Popconfirm icon={()=><img src="" alt="" style={{width:0,height:0}}/>
      //         }
      //         placement = "left"
      //         title = {
      //             () => {
      //               return (
      //                 <div style={styles.view}>
      //                   <div style={styles.header}>
      //                     <img src={good41} alt="" style={styles.icon}/>
      //                     <div>请输入结算金额</div>
      //                   </div>
      //                   <Input style={styles.input} placeholder="请在这里输入结算金额"/>
      //                   <div style={styles.tips}>全部结算</div>
      //                   <div style={styles.footer}>
      //                     <Button size="small" style={styles.cancelBtn}>取消</Button>
      //                     <Button size="small" type="primary" style={styles.okBtn}>确定</Button>
      //                   </div>
      //                 </div>
      //               )
      //             }
      //           } >
      //         <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} href="/main/editCommunityGood">结算</div>
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
    // setId(undefined)
  }

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input placeholder="请输入名称" size="small" className={c.searchInput}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" className={c.resetBtn} onClick={reset}>重置</Button>
            <Button icon={
                <img src={good9} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
              onClick={()=>get(current)}
              className={c.searchBtn}>搜索</Button>
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
    background: '#1890FF'
  },
  tips: {
    color: '#2C68FF',
    fontSize: '0.857rem',
    marginTop: 8,
    marginBottom: 46,
  }
}

export default StoreView

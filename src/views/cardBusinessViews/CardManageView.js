import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input } from 'antd'
import c from '../../styles/view.module.css'
import good11 from '../../icons/good/good11.png'
import good12 from '../../icons/good/good12.png'
import good13 from '../../icons/good/good13.png'
import good14 from '../../icons/good/good14.png'
import good16 from '../../icons/good/good16.png'
import good15 from '../../icons/good/good15.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'
import TableHeaderComponent from "../../components/TableHeaderComponent"
import DropdownComponent from "../../components/DropdownComponent"

function CardManageView () {
  const data = [
    {
      label: '卡密总数',
      number: '10,100',
      icon: good16,
      id: 111,
    },
    {
      label: '已售出',
      number: '10,111',
      icon: good15,
      id: 222,
    },
    {
      label: '未售出',
      number: '10,111',
      icon: good14,
      id: 333,
    },
    {
      label: '常规卡',
      number: '10,111',
      icon: good12,
      id: 444,
    },
    {
      label: '重复卡',
      number: '10,111',
      icon: good11,
      id: 555,
    },
    {
      label: '循环卡',
      number: '10,111',
      icon: good13,
      id: 666,
    },
  ]

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/editCardManage" data={data} text="添加卡密"/>
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
  //     color: "#4177FE",
  //     text: '已售出',
  //   },
  //   {
  //     color: "#FF8D30",
  //     text: '未售出',
  //   },
  // ]
  const columns = [
    {
      title: '卡密编号',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '商品编号',
      dataIndex: 'good_id',
      align: 'center',
  },
    {
      title: '商品名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '商品类别',
      align: 'center',
      dataIndex: 'category',
  },
    {
      title: '卡密类型',
      dataIndex: 'card_category',
      align: 'center',
  },
    {
      title: '卡号',
      dataIndex: 'number',
      align: 'center',
  },
    {
      title: '卡密',
      dataIndex: 'card',
      align: 'center',
  },
    {
      title: '卡密状态',
      align: 'center',
      dataIndex: 'status',
      // render: (text, record, index) => {
      //   const { text: t, color } = obj[text]
      //   return <div style={{color}}>{t}</div>
      // }
  },
    {
      title: '操作',
      align: 'center',
      // render: (text, record, index) => (
      //   <div style={{textDecoration:"underline",color:'#2C68FF',textDecorationColor:'#2C68FF'}} onClick={()=>{
      //     const history = h.get()
      //     history.push("/main/editCardManage")
      //   }}>修改</div>
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
            <Input placeholder="请输入商品编号" size="small" className={c.searchInput}/>
            <DropdownComponent keys={[]} placeholder="请选择商品名称" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择卡密编号" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择商品类型" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择卡密类型" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择卡密状态" style={{width:186}}/>
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

export default CardManageView

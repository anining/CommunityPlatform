import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input } from 'antd'
import good1 from '../../icons/good/good1.png'
import c from '../../styles/view.module.css'
import good2 from '../../icons/good/good2.png'
import good3 from '../../icons/good/good3.png'
import good4 from '../../icons/good/good4.png'
import good10 from '../../icons/good/good10.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'
import TableHeaderComponent from "../../components/TableHeaderComponent"
import DropdownComponent from "../../components/DropdownComponent"
import ActionComponent from '../../components/ActionComponent'
import {SCROLL} from '../../utils/config'

function CardGoodView () {
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
    {
      label: '库存预警',
      number: '1',
      icon: good10,
      id: 555,
    },
  ]

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/editCardGood" data={data} text="添加卡密"/>
        <RTable />
      </div>
    </div>
  )
}

function RTable ({ setVisible }) {
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
  //     color: "#595959",
  //     text: '正常',
  //   },
  //   {
  //     color: "rgba(0, 0, 0, 0.25)",
  //     text: '空',
  //   },
  //   {
  //     color: "#FF8D30",
  //     text: '库存预警',
  //   }
  // ]
  // const obj2 = [
  //   {
  //     color: "#2C68FF",
  //     text: '已上架',
  //   },
  //   {
  //     color: "#FF4D4F",
  //     text: '关闭订单',
  //   },
  //   {
  //     color: "rgba(0, 0, 0, 0.25)",
  //     text: '已下架',
  //   }
  // ]
  const columns = [
    {
      title: '商品编号',
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '商品名称',
			ellipsis: true,
      dataIndex: 'name',
  },
    {
      title: '商品类别',
			ellipsis: true,
      dataIndex: 'ctg',
  },
    {
      title: '卡密类型',
			ellipsis: true,
      dataIndex: 'card_category',
  },
    {
      title: '进价',
			ellipsis: true,
      dataIndex: 'in_price',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // }
  },
    {
      title: '售价',
			ellipsis: true,
      dataIndex: 'out_price',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 2,
      // }
  },
    {
      title: '密价',
			ellipsis: true,
      dataIndex: 'price',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 3,
      // }
  },
    {
      title: '卡密详情',
			ellipsis: true,
      dataIndex: 'msg',
      // render: (text, record, index) => (
      //   <div style={{textDecoration:"underline",color:'#2C68FF',textDecorationColor:'#2C68FF'}} href="/main/editCommunityGood">共 {text} 条</div>
      // )
  },
    {
      title: '库存',
			ellipsis: true,
      dataIndex: 'num',
  },
    {
      title: '库存状态',
			ellipsis: true,
      dataIndex: 'status',
      // render: (text, record, index) => {
      // const { text: t, color } = getKey(text, obj)
      //   const { text: t, color } =
      //   return <div style={{color}}>{t}</div>
      // }
  },
    {
      title: '商品状态',
			ellipsis: true,
      dataIndex: 'status',
      // render: (text, record, index) => {
      // const { text: t, color } = getKey(text, obj)
      //   const { text: t, color } =
      //   return <div style={{color}}>{t}</div>
      // }
  },
    {
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 136,
			fixed: 'right',
      // render: (text, record, index) => (
      //   <div style={{textDecoration:"underline",color:'#2C68FF',textDecorationColor:'#2C68FF'}} onClick={()=>{
      //     const history = h.get()
      //     history.push("/main/editCardGood")
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
            <DropdownComponent keys={[]} placeholder="请选择商品状态" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择卡密类型" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择供货商" style={{width:186}}/>
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
			<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[]}/>
      <Table
        columns={columns}
        rowSelection={{
          ...rowSelection
        }}
        dataSource={data}
				scroll={SCROLL}
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

export default CardGoodView

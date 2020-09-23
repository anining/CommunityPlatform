import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input } from 'antd'
import good1 from '../../icons/good/good1.png'
import c from '../../styles/view.module.css'
import good2 from '../../icons/good/good2.png'
import good3 from '../../icons/good/good3.png'
import good4 from '../../icons/good/good4.png'
import good9 from '../../icons/good/good9.png'
import DropdownComponent from "../../components/DropdownComponent";
import { push } from "../../utils/util"
import TableHeaderComponent from "../../components/TableHeaderComponent"
import { communityGoods } from "../../utils/api"

function CommunityGoodView () {
  const [data, setData] = useState([
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

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/editCommunityGood" data={data} text="添加商品"/>
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
  const [id, setId] = useState()

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    let body = { page: current, size: pageSize }
    if (id) {
      body = { ...body, ...{ id } }
    }
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

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const obj = {
    available: {
      color: "#2C68FF",
      text: '已上架',
    },
    unavailable: {
      color: "#FF8D30",
      text: '已关闭订单',
    },
    paused: {
      color: "#FF4D4F",
      text: '已下架',
    },
  }
  const columns = [
    {
      title: '商品编号',
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
      dataIndex: 'category_name',
  },
    {
      title: '下单模型',
      dataIndex: 'param_template_name',
      align: 'center',
  },
    {
      title: '进价',
      dataIndex: 'unit_cost',
      align: 'center',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // }
  },
    {
      title: '售价',
      dataIndex: 'unit_price',
      align: 'center',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // }
  },
    {
      title: '密价',
      align: 'center',
      dataIndex: 'disc_price',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // }
  },
    {
      title: '单位',
      dataIndex: 'unit',
      align: 'center',
  },
    {
      title: '下单限制',
      align: 'center',
      dataIndex: 'text',
      render: (text, record, index) => {
        const { repeat_order, batch_order } = record
        const repeat = repeat_order > 0 ? { text: "开启", color: "#52C41A" } : { text: "关闭", color: "#C8C8C8" }
        const batch = batch_order > 0 ? { text: "开启", color: "#52C41A" } : { text: "关闭", color: "#C8C8C8" }
        return (
          <div>
            <div>批量下单: <span style={{color:repeat.color}}>{repeat.text}</span></div>
            <div>重复下单: <span style={{color:batch.color}}>{batch.text}</span></div>
          </div>
        )
      }
  },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      render: (text, record, index) => {
        const { text: t, color } = obj[text]
        return <div style={{color}}>{t}</div>
      }
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <div className={c.clickText} onClick={()=>push('/main/editCommunityGood',record)}>编辑商品</div>
      )
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
    setId(undefined)
  }

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input value={id} onPressEnter={()=>get(current)} onChange={e=>setId(e.target.value)} placeholder="请输入商品编号" size="small" className={c.searchInput}/>
            <DropdownComponent keys={[]} placeholder="请选择商品分类" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择商品状态" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择用户权限" style={{width:186}}/>
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

export default CommunityGoodView

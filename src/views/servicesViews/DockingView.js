import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input } from 'antd'
import c from '../../styles/view.module.css'
import good36 from '../../icons/good/good36.png'
import good37 from '../../icons/good/good37.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'
import TableHeaderComponent from "../../components/TableHeaderComponent"
import DropdownComponent from "../../components/DropdownComponent"

function DockingView () {
  const data = [
    {
      label: '已对接',
      number: '10,100',
      icon: good36,
      id: 111,
    },
    {
      label: '总对接商品',
      number: '10,111',
      icon: good37,
      id: 222,
    },
  ]
  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/editDocking" data={data} text="新增"/>
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

  const columns = [
    {
      title: '对接ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '对接平台',
      align: 'center',
      dataIndex: 'platform',
  },
    {
      title: '对接域名',
      dataIndex: 'uri',
      align: 'center',
  },
    {
      title: '对接商品',
      dataIndex: 'good',
      align: 'center',
  },
    {
      title: '使用账户',
      dataIndex: 'number',
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
      //   <div style={{color:'#2C68FF',textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
      //         const history = h.get()
      //         history.push("/main/editDocking")
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
            <Input placeholder="请输入名称" size="small" className={c.searchInput}/>
            <DropdownComponent keys={[]} placeholder="请选择对接平台" style={{width:186}}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
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

export default DockingView

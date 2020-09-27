import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input } from 'antd'
import good1 from '../../icons/good/good1.png'
import c from '../../styles/view.module.css'
import good28 from '../../icons/good/good28.png'
import good29 from '../../icons/good/good29.png'
import good30 from '../../icons/good/good30.png'
import good32 from '../../icons/good/good32.png'
import good34 from '../../icons/good/good34.png'
import good35 from '../../icons/good/good35.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent"

function ChildWebListView () {
  const data = [
    {
      label: '分站个数',
      number: '10,100',
      icon: good30,
      id: 111,
    },
    {
      label: '分站流水总和',
      number: '10,111',
      icon: good28,
      id: 222,
    },
    {
      label: '申请开通',
      number: '10,111',
      icon: good29,
      id: 333,
    },
  ]

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/editChildWebList" data={data} text="新增分站"/>
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
  //     color: "#2C68FF",
  //     text: '正常',
  //     icon: good32,
  //   },
  //   {
  //     color: "#FF4D4F",
  //     text: '关闭',
  //     icon: good34,
  //   },
  //   {
  //     color: "#FF8D30",
  //     text: '申请开通',
  //     icon: good35,
  //   }
  // ]
  const columns = [
    {
      title: '站点编号',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '站点域名',
      dataIndex: 'uri',
      align: 'center',
  },
    {
      title: '站点版本',
      align: 'center',
      dataIndex: 'version',
  },
    {
      title: '主账号',
      dataIndex: 'number',
      align: 'center',
  },
    {
      title: '联系方式',
      align: 'center',
      dataIndex: 'text',
      // render: (text, record, index) => {
      //   const { status, t } = text
      // const { text: t, color } = getKey(text, obj)
      //   return (
      //     <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      //       <img src={icon} alt="" style={{width:20}}/>
      //       <div style={{marginLeft:12}}>{t}</div>
      //     </div>
      //   )
      // }
  },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      // const { text: t, color } = getKey(text, obj)
      // render: (text, record, index) => {
      //   const { text: t, color } =
      //   return <div style={{color}}>{t}</div>
      // }
  },
    {
      title: '操作',
      align: 'center',
      // render: (text, record, index) => (
      //   <div style={{textDecoration:"underline",color:'#2C68FF',textDecorationColor:'#2C68FF'}} onClick={()=>{
      //       const history = h.get()
      //       history.push("/main/editChildWeb")
      //     }}>重置密码</div>
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
            <Input placeholder="请输入站点域名" size="small" className={c.searchInput}/>
            <Input placeholder="请输入主账号" size="small" className={c.searchInput}/>
            <DropdownComponent keys={[]} placeholder="请选择站点状态" style={{width:186}}/>
            <DropdownComponent keys={[]} placeholder="请选择站点版本" style={{width:186}}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
            <Button icon={
                <img src={good9} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
              onClick={()=>get(current)}
              className={c.searchBtn}>搜索分站</Button>
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

export default ChildWebListView

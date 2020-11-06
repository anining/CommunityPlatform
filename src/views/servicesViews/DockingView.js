import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input } from 'antd'
import c from '../../styles/view.module.css'
import oc from '../../styles/oc.module.css'
import good36 from '../../icons/good/good36.png'
import good37 from '../../icons/good/good37.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'
import TableHeaderComponent from "../../components/TableHeaderComponent"
import DropdownComponent from "../../components/DropdownComponent"
import ModalPopComponent from "../../components/ModalPopComponent"
import {SCROLL} from '../../utils/config'
import ActionComponent from '../../components/ActionComponent'

function DockingView () {
  const [visible, setVisible] = useState(true)

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

  function onCancel () {
    setVisible(false)
  }

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent small_btn="查看已归档" path="/main/editDocking" data={data} text="新增"/>
        <RTable />
      </div>
      <ModalPopComponent
      div = {
        <div className={oc.limit_view}>
          <div className={oc.limit_item}>登录账号：<span>10</span></div>
          <div className={oc.limit_item}>登录密码：<span>100000</span></div>
          <div className={oc.limit_item}>&#12288;&#12288;&#12288;ID：<span>121334</span></div>
          <div className={oc.limit_item}>&#12288;&#8194;token：<span>dsfadfasdf</span></div>
        </div>
      }
      title = "对接凭证"
      visible = { visible}
      onCancel = { onCancel }
      />
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
      title: '对接目标编号',
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '对接目标名称',
			ellipsis: true,
      dataIndex: 'name',
  },
    {
      title: '对接平台',
			ellipsis: true,
      dataIndex: 'platform',
  },
    {
      title: '对接商品',
			ellipsis: true,
      dataIndex: 'good',
  },
    {
      title: '对接凭证',
			ellipsis: true,
      dataIndex: 'number',
  },
    {
      title: '对接时间',
			ellipsis: true,
      dataIndex: 'time',
  },
    {
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 136,
			fixed: 'right',
      // render: (text, record, index) => (
      //   <div style={{color:'#2C68FF',textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
      //         const history = h.get()
      //         history.push("/main/editDocking")
      //   }}>修改对接信息</div>
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
			<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[]}/>
      <Table
        columns={columns}
				scroll={SCROLL}
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

import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input, Space } from 'antd'

import c from '../../styles/view.module.css'
import good28 from '../../icons/good/good28.png'

import good30 from '../../icons/good/good30.png'




import good9 from '../../icons/good/good9.png'
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent"
import {SCROLL} from '../../utils/config'
import ActionComponent from '../../components/ActionComponent'

function ChildWebListView () {
  const data = [
    {
      label: '分站个数',
      number: '10,100',
      icon: good30,
      id: 111,
    },
    {
      label: '分站下单总额',
      number: '10,111',
      icon: good28,
      id: 222,
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

function RTable ({  }) {
  const [selectedRows, setSelectRows] = useState([]);
  const [data, ] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, ] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get () {
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

  function onChange (page ) {
    setCurrent(page)
    get(page)
  }

  // const obj = [
  //   {
  //     color: "#595959",
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
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '站点域名',
			ellipsis: true,
      dataIndex: 'uri',
  },
    {
      title: '站点名称',
			ellipsis: true,
      dataIndex: 'version',
  },
    {
      title: '主账号',
			ellipsis: true,
      dataIndex: 'number',
  },
    {
      title: '下单总额',
			ellipsis: true,
      dataIndex: 'number',
  },
    {
      title: '联系方式',
			ellipsis: true,
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
			ellipsis: true,
      dataIndex: 'status',
      // const { text: t, color } = getKey(text, obj)
      // render: (text, record, index) => {
      //   const { text: t, color } =
      //   return <div style={{color}}>{t}</div>
      // }
  },
    {
      title: '备注',
			ellipsis: true,
      dataIndex: 'number',
  },
    {
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 136,
			fixed: 'right',
      render: (text, record, index) => (
				<Space size="small" className={c.space}>
					<div style={{textDecoration:"underline",color:'#2C68FF',textDecorationColor:'#2C68FF'}} onClick={()=>{
							// const history = h.get()
							// history.push("/main/editChildWeb")
						}}>修改</div>
				</Space>
      )
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys ) => {
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
			<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{name:"批量删除",key:"delete"}]}/>
      <Table
				scroll={SCROLL}
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

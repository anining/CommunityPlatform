import React, { useState, useEffect } from 'react'
import { Button, Table,  Input } from 'antd'
import c from '../../styles/view.module.css'
import good11 from '../../icons/good/good11.png'
import good12 from '../../icons/good/good12.png'
import good13 from '../../icons/good/good13.png'
import good14 from '../../icons/good/good14.png'
import good16 from '../../icons/good/good16.png'
import good15 from '../../icons/good/good15.png'

import good9 from '../../icons/good/good9.png'
import TableHeaderComponent from "../../components/TableHeaderComponent"
import DropdownComponent from "../../components/DropdownComponent"
import ModalComponent from "../../components/ModalComponent"
import { CARDS_STATUS, SCROLL } from "../../utils/config"
import ActionComponent from '../../components/ActionComponent'

function CardManageView () {
  const [title, setTitle] = useState()
  const [key, setKey] = useState()
  const [selected, setSelected] = useState([])
  const [src, setSrc] = useState()
  const [visible, setVisible] = useState(false)
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

  function onCancel () {
    setVisible(false)
  }

  function onOk () {
    setVisible(false)
    // const params = new URLSearchParams()
    // selected.forEach(i => params.append("ids", i.id))
    // communityGoods("modifys", undefined, params.toString(), { status: key }).then(r => {
    //   if (!r.error) {
    //     saveSuccess(false)
    //     setSelectRows([])
    //     get(current)
    //   }
    // })
  }


  let text = []
  selected.forEach(i => text.push(i.name))

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/editCardManage" data={data} text="添加卡密"/>
        <RTable setTitle={setTitle} setSelected={setSelected} setSrc={setSrc} setKey={setKey} setVisible={setVisible}/>
      </div>
      <ModalComponent
        src={src}
        div="当前选中商品："
        span={text.join('、')}
        title={title}
        action={key}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
      />
    </div>
  )
}

function RTable ({ setVisible, setKey, setSrc, setSelected, setTitle }) {
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([{ id: 1, name: 'name' }])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

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

  // const obj2 = [
  //   {
  //     color: "#2C68FF",
  //     text: '已售出',
  //   },
  //   {
  //     color: "rgba(0, 0, 0, 0.25)",
  //     text: '未售出',
  //   },
  //   {
  //     color: "#595959",
  //     text: '-',
  //   }
  // ]
  const columns = [
    {
      title: '卡密编号',
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '商品编号',
			ellipsis: true,
      dataIndex: 'good_id',
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
      title: '卡号',
			ellipsis: true,
      dataIndex: 'number',
  },
    {
      title: '卡密',
			ellipsis: true,
      dataIndex: 'card',
  },
    {
      title: '卡密状态',
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
      //     history.push("/main/editCardMan")
      //   }}>修改</div>
      // )
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys ) => {
      setSelectRows(selectedRowKeys)
    }
  };

  function submit (key) {
    let title = ""
    switch (key) {
      case "a":
        title = "您确定要将卡密状态修改为已出售吗？";
        break;
      case "d":
        title = "您确定要取消推荐这些商品吗？";
        break;
      case "e":
        title = "您确定要删除选中的商品吗?";
        break;
      default:
        title = `修改商品状态为${CARDS_STATUS[key].text}`
    }

    setTitle(title)
    setSelected(selectedRows.map(i => data[i]))
    setSrc(CARDS_STATUS[key].src)
    setKey(key)
    setVisible(true)
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
			<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{name:"批量设置已售出",key:"a"}]}/>
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

export default CardManageView

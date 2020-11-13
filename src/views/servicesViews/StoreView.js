import React, {useState, useEffect} from 'react'
import {Button, Table, message, Input} from 'antd'
import c from '../../styles/view.module.css'
import good38 from '../../icons/good/good38.png'
import good39 from '../../icons/good/good39.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'
import good57 from '../../icons/good/good57.png'
import good58 from '../../icons/good/good58.png'
import good41 from '../../icons/good/good41.png'
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent";
import {paySettle, providers} from "../../utils/api"
import Popconfirm from "antd/es/popconfirm"
import Space from "antd/es/space"
import {getPath, saveSuccess, push} from "../../utils/util"
import ActionComponent from '../../components/ActionComponent'
import {SCROLL} from '../../utils/config'

function StoreView() {

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
    {
      label: '关闭供货',
      number: '3',
      icon: good57,
      id: 333,
    },
    {
      label: '申请结算',
      number: '3',
      icon: good58,
      id: 444,
    },
  ]

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/editStore" data={data} text="新增"/>
        <RTable/>
      </div>
    </div>
  )
}

function RTable() {
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
  const [nickname, setNickname] = useState()
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get(current) {
    let body = {page: current, size: pageSize}
    if (nickname) {
      body = { ...body, ...{ nickname } }
    }
    providers("get", undefined, body).then(r => {
      if (!r.error) {
        const {data, total} = r
        setTotal(total)
        setData(format(data))
      }
    })
  }

  function format(arr = []) {
    arr.forEach((item, index) => {
      item.key = index
    })
    return arr
  }

  function onChange(page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const obj = [
    {
      text: '关闭',
      color: '#595959',
    },
    {
      text: '正常',
      color: '#2C68FF'
    }
  ]
  const obj1 = [
    {
      text: '是',
      color: '#595959',
    },
    {
      text: '否',
      color: '#595959'
    }
  ]
  const columns = [
    {
      title: '供货商编号',
			ellipsis: true,
      dataIndex: 'id',
    },
    {
      title: '供货商名称',
			ellipsis: true,
      dataIndex: 'nickname',
    },
    {
      title: '供货商账号',
			ellipsis: true,
      dataIndex: 'account',
    },
    {
      title: '供货商商品数',
			ellipsis: true,
      dataIndex: 'providing_amount',
    },
    {
      title: '总消耗',
			ellipsis: true,
      dataIndex: 'price',
      render: (text, record, index) => {
        return '-'
      }
    },
    {
      title: '待结算',
			ellipsis: true,
      dataIndex: 'value_stlreqed',
      render: (text, record, index) => {
        return '-'
      }
    },
    {
      title: '申请结算',
			ellipsis: true,
      dataIndex: 'value_stlreqed',
      render: (text, record, index) => {
        return <div>{text || 0}</div>
      }
    },
    {
      title: '供货状态',
			ellipsis: true,
      dataIndex: 'status',
      render: (text, record, index) => {
        return '-'
      }
      // render: (text, record, index) => {
      // const { text: t, color } = getKey(text, obj)
      //   const { text: t, color } =
      //   return <div style={{color}}>{t}</div>
      // }
    },
    {
      title: '结算二维码',
			ellipsis: true,
      dataIndex: 'status',
      render: (text, record, index) => <div className={c.view_text}>查看</div>
    },
    {
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 282,
			fixed: 'right',
      render: (...arg) => (
        <Space size="small" className={c.space}>
          <div className={c.clickText} onClick={()=>push("/main/editStore",arg[1])}>修改信息</div>
          <div className={c.line} />
					<div className={c.clickText} onClick={()=>push("/main/imp",{...arg[1],...{provider_type: "supplier"}})}>导入商品</div>
          <div className={c.line} />
          <div className={c.clickText} onClick={() => {
            if(!getPath(['0', 'value_stlreqed'], arg)) {
              message.info('暂无可结算金额');
              return false;
            }
            paySettle(arg[0]['id']).then(r=>{
              if (!r.error) {
                saveSuccess(false)
                get(current)
              }
            })
          }}>
            立即结算
          </div>
        </Space>
      )
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, rows) => {
      setSelectRows(selectedRowKeys)
    },
    selectedRowKeys: selectedRows
  };

  function submit(key) {
    switch (key) {
      case "delete":
        message.success('批量删除操作');
        break
      default:
    }
  }

  function reset() {
    setNickname(undefined)
  }

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input placeholder="请输入名称" value={nickname} onChange={e=>setNickname(e.target.value)} onPressEnter={()=>get(current)} size="small" className={c.searchInput}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" className={c.resetBtn} onClick={reset}>重置</Button>
            <Button icon={<img src={good9} alt="" style={{width: 14, marginRight: 6}}/>}
              type="primary"
              size="small"
              onClick={() => get(current)}
              className={c.searchBtn}
            >
              搜索
            </Button>
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
          showQuickJumper: true,
          current,
          pageSize,
          showLessItems: true,
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

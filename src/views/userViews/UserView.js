import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input, Space, Popconfirm } from 'antd'
import c from '../../styles/view.module.css'
import good23 from '../../icons/good/good23.png'
import good24 from '../../icons/good/good24.png'
import good9 from '../../icons/good/good9.png'
import good41 from '../../icons/good/good41.png'
import { users } from "../../utils/api";
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent";
import { transformTime, push, getKey } from "../../utils/util"

function UserView () {
  const data = [
    {
      label: '用户总数',
      number: '10,100',
      icon: good23,
      id: 111,
    },
    {
      label: '今日新增',
      number: '10,111',
      icon: good24,
      id: 222,
    },
  ]

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/addUser" data={data} text="添加用户"/>
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
  const [account, setAccount] = useState()
  const [status, setStatus] = useState()

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    users(current, pageSize, account, status).then(r => {
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
      item.time = transformTime(item.created_at)
    })
    return arr
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

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
    setAccount(undefined)
    setStatus(undefined)
  }

  const obj = {
    normal: {
      color: '#2C68FF',
      text: '正常',
    },
    banned: {
      color: '#FF4D4F',
      text: '封禁',
    }
  }
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '用户账号',
      dataIndex: 'account',
      align: 'center',
  },
    {
      title: '消费总额',
      align: 'center',
      dataIndex: 'consumed',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // },
  },
    {
      title: '用户余额',
      dataIndex: 'balance',
      align: 'center',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 2,
      // },
  },
    {
      title: '下单次数',
      dataIndex: 'ordered',
      align: 'center',
  },
    {
      title: '注册时间',
      align: 'center',
      dataIndex: 'time',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 3,
      // },
  },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (text, record, index) => {
        const { text: t, color } = getKey(text, obj)
        return <div style={{color}}>{t}</div>
      }
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small">
          {/* <Popconfirm icon={<img src="" alt="" style={{width:0,height:0}}/>} */}
          {/*   placement = "left" */}
          {/*   title = { */}
          {/*       () => { */}
          {/*         return ( */}
          {/*           <div style={styles.view}> */}
          {/*             <div style={styles.header}> */}
          {/*               <img src={good41} alt="" style={styles.icon}/> */}
          {/*               <div>请输入您要修改成多少的余额</div> */}
          {/*             </div> */}
          {/*             <Input style={styles.input} placeholder="请在这里修改余额"/> */}
          {/*             <div style={styles.footer}> */}
          {/*               <Button size="small" style={styles.cancelBtn}>取消</Button> */}
          {/*               <Button size="small" type="primary" style={styles.okBtn}>确定</Button> */}
          {/*             </div> */}
          {/*           </div> */}
          {/*         ) */}
          {/*       } */}
          {/*     } > */}
            <div style={{cursor:'wait'}} className={c.clickText}>修改余额</div>
          {/* </Popconfirm> */}
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div className={c.clickText} onClick={()=>push('/main/editUserPrice',record)}>修改密价</div>
        </Space>
      )
    },
  ];

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input onPressEnter={()=>get(current)} maxLength={20} placeholder="请输入用户名" onChange={e=>setAccount(e.target.value)} value={account} size="small" className={c.searchInput} />
            <DropdownComponent setAction={setStatus} action={status} keys={[{key:"normal",name:"正常"},{key:"banned",name:"封禁"}]} placeholder="请选择用户状态" style={{width:186}}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" className={c.resetBtn} onClick={reset}>重置</Button>
            <Button icon={
              <img src={good9} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              onClick={()=>get(current)}
              size = "small"
              className={c.searchBtn}>搜索用户</Button>
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
    marginBottom: 72
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
  }
}

export default UserView

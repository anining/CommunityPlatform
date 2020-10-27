import React, { useState, useEffect } from 'react'
import { Radio, DatePicker, Button, Table, message, Input, Space, Popconfirm } from 'antd'
import c from '../../styles/view.module.css'
import { USER_STATUS } from "../../utils/config"
import oc from '../../styles/oc.module.css'
import good23 from '../../icons/good/good23.png'
import good24 from '../../icons/good/good24.png'
import good9 from '../../icons/good/good9.png'
import good41 from '../../icons/good/good41.png'
import { users, updateUsers } from "../../utils/api";
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent";
import { transformTime, push, getKey, saveSuccess } from "../../utils/util"
import ModalPopComponent from "../../components/ModalPopComponent"
import ModalComponent from "../../components/ModalComponent"

function UserView () {
  // TODO: 三个弹窗
  const [visible, setVisible] = useState(false)
  const [visible_action, setVisibleAction] = useState(false)
  const [visible_balance, setVisibleBalance] = useState(false)
  const [title, setTitle] = useState()
  const [selected, setSelected] = useState([])
  const [key, setKey] = useState()
  const [src, setSrc] = useState()
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [sel, setSel] = useState({})
  const [seled, setSeled] = useState(0)
  const [account, setAccount] = useState()
  const [status, setStatus] = useState()
  const [date, setDate] = useState([])
  const [moment, setMoment] = useState()
  const [selectedRows, setSelectRows] = useState([]);
  const labels = [
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

  function onCancel () {
    setVisible(false)
    setVisibleAction(false)
  }

  let text = []
  selected.forEach(i => text.push(i.name))

  function onOk () {
    setVisible(false)
    updateUsers(seled,"ids=" + sel.id).then(r => {
      if (!r.error) {
        saveSuccess(false)
        setSelectRows([])
        get(current)
      }
    })
  }

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/addUser" data={labels} text="添加用户"/>
        <RTable selectedRows={selectedRows} setSelectRows={setSelectRows} setSel={setSel} setVisible={setVisible} setTitle={setTitle} get={get} current={current} setCurrent={setCurrent} data={data} setAccount={setAccount} setStatus={setStatus} setDate={setDate} account={account} pageSize={pageSize} total={total} status={status} setMoment={setMoment} setSelected={setSelected} setSrc={setSrc} setKey={setKey} setVisibleAction={setVisibleAction}/>
      </div>
  <ModalPopComponent
    div = {
      <div>
        <div className={oc.user_setting}>
          <div style={{color:'#333'}}>当前选中用户：{sel.account||''}</div>
          <div className={oc.user_tips}>修改为</div>
          <div className={oc.selects}>
            {
              [{id:0,label:"普通用户"},{id:1,label:"高级用户"},{id:2,label:"钻石用户"},{id:3,label:"至尊用户"}].map(i=><Button style={{color:seled===i.id?'#fff':'rgba(0, 0, 0, 0.25)',background:seled===i.id?'#2C68FF':"#fff"}} onClick={()=>setSeled(i.id)} className={oc.user_sel}>{i.label}</Button>)
            }
          </div>
        </div> <
    div className = { oc.change_btn_view } >
    <Button className={oc.change_btn_cancel}>取消</Button> <
    Button type = "primary"
    className = { oc.change_btn_ok } onClick={onOk}> 确定 < /Button> <
    /div> <
    /div>
  }
  title = "用户等级"
  visible = { visible }
  onCancel = { onCancel }
  /> <
  ModalComponent
  src = { src }
  div = "当前选中用户："
  span = { text.join('、') }
  title = { title }
  action = { key }
  visible = { visible_action }
  onCancel = { onCancel }
  onOk = { onOk }
  /> <
  ModalPopComponent
  div = {
      <div>
          <div className={oc.remark}>
            <div>余额数值：</div>
            <Radio.Group style={{marginLeft:12}}>
              <Radio value="normal">加款</Radio>
              <Radio value="banned">
                减款
              </Radio>
            </Radio.Group>
          </div>
          <div className={oc.remark} style={{marginTop:24}}>
            <div>余额数值：</div>
            <Input placeholder="请输入变动数值"/>
          </div>
            <div className = { oc.remark_tips } >
        当前选中订单： < span > 20200105020305(音符点赞) < /span> < /
        div > <
        div className = { oc.change_btn_view } style = { { marginTop: 70 } } >
        <Button className={oc.change_btn_cancel}>取消</Button> <
        Button type = "primary"
        className = { oc.change_btn_ok } > 确定 < /Button> < /
        div > <
        /div>
      }
      title = "用户余额"
      visible = { visible_balance }
      onCancel = { onCancel }
      />
    </div>
  )
}

function RTable ({ selectedRows,setSelectRows,setSel,get,current,setCurrent,data,setAccount,setStatus,setDate,setMoment,account,pageSize,total,status,setVisible,setVisibleAction,setKey,setSrc,setTitle,setSelected }) {

  useEffect(() => {
    get(current)
  }, [])

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
    let title = ""
    switch (key) {
      case "a":
        title = "您确定要封禁选中用户吗？";
        break;
      case "b":
        title = "您确定要解封选中用户吗？";
        break;
      default:
    }

    setTitle(title)
    setSelected(selectedRows.map(i => data[i]))
    setSrc(USER_STATUS[key].src)
    setKey(key)
    setVisibleAction(true)
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
      title: '用户编号',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '用户账号',
      dataIndex: 'account',
      align: 'center',
  },
    {
      title: '用户等级',
      dataIndex: 'ordered',
      align: 'center',
      render: (text, record, index) => {
        return '-'
      }
  },
    {
      title: '消费总额',
      align: 'center',
      dataIndex: 'consumed',
  },
    {
      title: '用户余额',
      dataIndex: 'balance',
      align: 'center',
  },
    {
      title: '下单次数',
      dataIndex: 'ordered',
      align: 'center',
  },
    {
      title: '社区商品密价',
      align: 'center',
      render: (text, record, index) => {
        return (
        <Space size="small">
          <div onClick={()=>push('/main/editUserPrice',record)} className={c.clickText}>查看</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div className={c.clickText} onClick={()=>push('/main/editUserPrice',record)} >修改</div>
        </Space>
        )
      }
  },
    {
      title: '卡密商品密价',
      dataIndex: 'ordered',
      align: 'center',
      render: (text, record, index) => {
        return (
        <Space size="small">
          <div style={{cursor:'wait'}} className={c.clickText}>查看</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{cursor:'wait'}} className={c.clickText} onClick={()=>{}}>修改</div>
        </Space>
        )
      }
  },
    {
      title: '注册时间',
      align: 'center',
      dataIndex: 'time',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 3,
      },
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
          {/* <div className={c.clickText} onClick={()=>push('/main/editUserPrice',record)}>修改等级</div> */}
          <div className={c.clickText} onClick={()=>{
            setSel(record)
            setVisible(true)
          }}>修改等级</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          {/* <div className={c.clickText} onClick={()=>push('/main/addUser',record)}>修改用户信息</div> */}
          <div style={{cursor:'wait'}} className={c.clickText} onClick={()=>{}}>修改用户信息</div>
        </Space>
      )
    },
  ];

  function dateChange (data, dataString) {
    setDate([new Date(dataString[0]).toISOString(), new Date(dataString[1]).toISOString()])
    setMoment(data)
  }

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input onPressEnter={()=>get(current)} maxLength={20} placeholder="请输入用户账号" onChange={e=>setAccount(e.target.value)} value={account} size="small" className={c.searchInput} />
            <DropdownComponent setAction={setStatus} action={status} keys={[{key:"normal",name:"正常"},{key:"banned",name:"封禁"}]} placeholder="请选择用户状态" style={{width:186}}/>
            {/* <DropdownComponent setAction={setStatus} action={status} keys={[{key:"normal",name:"正常"},{key:"banned",name:"封禁"}]} placeholder="请选择用户等级" style={{width:186}}/> */}
            {/* { */}
            {/*   <DatePicker.RangePicker */}
            {/*     format="YYYY-MM-DD" */}
            {/*     onChange={dateChange} */}
            {/*     value={moment} */}
            {/*     className={c.dataPicker}/> */}
            {/* } */}
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
      <DropdownComponent selectedRows={selectedRows} submit={submit} keys={[]}/>
      {/* <DropdownComponent selectedRows={selectedRows} submit={submit} keys={[{name:"批量解封",key:"b"},{name:"批量封禁",key:"a"}]}/> */}
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

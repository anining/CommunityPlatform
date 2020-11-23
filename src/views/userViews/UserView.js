import React, { useState, useEffect } from 'react'
import { Radio, Button, Table, Input, Space } from 'antd'
import c from '../../styles/view.module.css'
import { USER_STATUS, SCROLL } from "../../utils/config"
import oc from '../../styles/oc.module.css'
import good23 from '../../icons/good/good23.png'
import good24 from '../../icons/good/good24.png'
import good9 from '../../icons/good/good9.png'

import { users, updateUsers, usersBalances } from "../../utils/api";
import TableHeaderComponent from "../../components/TableHeaderComponent";
import DropdownComponent from "../../components/DropdownComponent";
import { transformTime, push, getKey, saveSuccess } from "../../utils/util"
import ModalPopComponent from "../../components/ModalPopComponent"
import ModalComponent from "../../components/ModalComponent"
import { USER_RANK } from "../../utils/config"
import ActionComponent from '../../components/ActionComponent'
import TableComponent from '../../components/TableComponent'

function UserView () {
  const [visible, setVisible] = useState(false)
  const [visible_action, setVisibleAction] = useState(false)
  const [visible_balance, setVisibleBalance] = useState(false)
  const [title, setTitle] = useState()
	const [add, setAdd] = useState(false)
	const [addBalabce, setAddBalance] = useState()
  const [selected, setSelected] = useState([])
	const [loading, setLoading] = useState(true)
  const [key, setKey] = useState()
  const [src, setSrc] = useState()
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [sel, setSel] = useState({})
  const [seled, setSeled] = useState(0)
  const [account, setAccount] = useState()
  const [status, setStatus] = useState()
  const [, setDate] = useState([])
  const [, setMoment] = useState()
  const [selectedRows, setSelectRows] = useState([]);
  const labels = [
    {
      label: '用户总数',
      number: '-',
      icon: good23,
      id: 111,
    },
    {
      label: '今日新增',
      number: '-',
      icon: good24,
      id: 222,
    }
  ]

  useEffect(() => {
    get(current)
  }, [])

  function submit (key) {
    let title = ""
    switch (key) {
      case "banned":
        title = "您确定要封禁选中用户吗？";
        break;
      case "normal":
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
      color: '#595959',
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
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '用户账号',
			ellipsis: true,
      dataIndex: 'account',
  },
    {
      title: '用户等级',
			ellipsis: true,
      dataIndex: 'lv',
      render: (text , index) => {
        return USER_RANK[text].label
      }
  },
    {
      title: '消费总额',
			ellipsis: true,
      dataIndex: 'consumed',
  },
    {
      title: '用户余额',
			ellipsis: true,
      dataIndex: 'balance',
  },
    {
      title: '下单次数',
			ellipsis: true,
      dataIndex: 'ordered',
  },
    {
      title: '社区商品密价',
			ellipsis: true,
      render: (text, record ) => {
        return (
        <Space size="small">
          <div onClick={()=>push('/main/edit-price-user',record)} className={c.view_text}>查看</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div className={c.view_text} onClick={()=>push('/main/edit-price-user',record)} >修改</div>
        </Space>
        )
      }
  },
    {
      title: '卡密商品密价',
			ellipsis: true,
      dataIndex: 'ordered',
      render: (text, record, index) => {
        return (
        <Space size="small">
          <div style={{cursor:'wait'}} className={c.view_text}>查看</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{cursor:'wait'}} className={c.view_text} onClick={()=>{}}>修改</div>
        </Space>
        )
      }
  },
    {
      title: '注册时间',
			ellipsis: true,
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
			ellipsis: true,
      dataIndex: 'status',
      render: (text , index) => {
        const { text: t, color } = getKey(text, obj)
        return <div style={{color}}>{t}</div>
      }
  },
    {
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 282,
			fixed: 'right',
      render: (text, record ) => (
				<Space size="small" className={c.space}>
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
					<div onClick={()=>{
            setSel(record)
            setVisibleBalance(true)
					}} className={c.clickText}>修改余额</div>
          {/* </Popconfirm> */}
          <div className={c.line} />
          {/* <div className={c.clickText} onClick={()=>push('/main/editUserPrice',record)}>修改等级</div> */}
          <div className={c.clickText} onClick={()=>{
            setSel(record)
            setVisible(true)
          }}>修改等级</div>
          <div className={c.line} />
          {/* <div className={c.clickText} onClick={()=>push('/main/addUser',record)}>修改用户信息</div> */}
          <div style={{cursor:'wait'}} className={c.clickText} onClick={()=>{}}>修改信息</div>
        </Space>
      )
    },
  ];

  function dateChange (data, dataString) {
    setDate([new Date(dataString[0]).toISOString(), new Date(dataString[1]).toISOString()])
    setMoment(data)
  }

  function get (current) {
		setLoading(true)
    users(current, pageSize, account, status).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
				selectedRows.length && setSelectRows(format(data).map(i => i.key))
      }
			setLoading(false)
		}).catch(() => setLoading(false))
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = transformTime(item.created_at)
    })
    return arr
  }

	const addMoney = () => {
		setAddBalance(undefined)
		setAdd(false)
		setVisibleBalance(false)
		usersBalances(sel.id, add ? +addBalabce: -addBalabce).then(r=>{
			if(!r.error) {
				saveSuccess(false)
				get(current)
			}
		})
	}

  function onCancel () {
    setVisible(false)
    setVisibleAction(false)
		setVisibleBalance(false)
  }

  let text = []
  selected.forEach(i => text.push(i.account))

  function onOk () {
    setVisible(false)
    updateUsers({lv:seled},"ids=" + sel.id).then(r => {
      if (!r.error) {
        saveSuccess(false)
        setSelectRows([])
        get(current)
      }
    })
  }

  function updateStatus () {
    setVisibleAction(false)
    updateUsers({status:key},"ids=" + selected.map(i => i.id).toString()).then(r => {
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
        <TableHeaderComponent path="/main/edit-user" data={labels} text="添加用户"/>
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
					<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{name:"批量解封",key:"normal"},{name:"批量封禁",key:"banned"}]}/>
					<TableComponent
						loading={loading}
						setPageSize={setPageSize}
						setCurrent={setCurrent}
						getDataSource={get}
						setSelectedRowKeys={setSelectRows}
						selectedRowKeys={selectedRows}
						columns={columns}
						dataSource={data}
						pageSize={pageSize}
						total={total}
						current={current}
					/>
				</div>
      </div>
      <ModalPopComponent
        div={
          <div>
            <div className={oc.user_setting}>
              <div style={{color:'#333'}}>当前选中用户：{sel.account||''}</div>
              <div className={oc.user_tips}>修改为</div>
              <div className={oc.selects}>
                {
                  [{id:0,label:"普通用户"},{id:1,label:"高级用户"},{id:2,label:"钻石用户"},{id:3,label:"至尊用户"}].map(i=><Button style={{color:seled===i.id?'#fff':'rgba(0, 0, 0, 0.25)',background:seled===i.id?'#2C68FF':"#fff"}} onClick={()=>setSeled(i.id)} className={oc.user_sel}>{i.label}</Button>)
                }
              </div>
            </div>
            <div className={oc.change_btn_view}>
              <Button onClick={()=>setVisible(false)} className={oc.change_btn_cancel}>取消</Button>
              <Button type = "primary" className = { oc.change_btn_ok } onClick={onOk}> 确定 < /Button>
            </div>
          </div>
        }
        title="用户等级"
        visible={visible}
        onCancel={onCancel}
      />
      <ModalComponent
        src={src}
        div="当前选中用户："
        span={text.join('、')}
        title={title}
        action={key}
        visible={visible_action}
        onCancel={onCancel}
        onOk={updateStatus}
      />
      <ModalPopComponent
        div={
          <div>
            <div className={oc.remark}>
              <div>余额数值：</div>
							<Radio.Group value={add} onChange={e=>setAdd(e.target.value)} style={{marginLeft:12}}>
                <Radio value={true}>加款</Radio>
                <Radio value={false}>
                  减款
                </Radio>
              </Radio.Group>
            </div>
            <div className={oc.remark} style={{paddingTop:0}}>
              <div>余额数值：</div>
							<Input onChange={e=>setAddBalance(e.target.value)} value={addBalabce} placeholder="请输入变动数值"/>
            </div>
						<div className={oc.remark_tips} style={{marginLeft:85}}>当前选中用户： <span> {sel.id}({sel.account}) </span></div>
              <div className = { oc.change_btn_view } style={{marginTop: 70}}>
								<Button className={oc.change_btn_cancel} onClick={()=>{
									setAddBalance(undefined)
									setAdd(false)
									setVisibleBalance(false)
								}}>取消</Button>
                <Button type = "primary" onClick={addMoney} className={oc.change_btn_ok}>确定</Button>
              </div>
          </div>
        }
        title = "用户余额"
        visible = { visible_balance }
        onCancel = { onCancel }
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

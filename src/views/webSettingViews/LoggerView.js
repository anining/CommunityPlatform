import React, { useState, useEffect } from 'react'
import { Button, Table, Input, DatePicker } from 'antd'
import c from '../../styles/view.module.css'
import good9 from '../../icons/good/good9.png'
import { loginlogs } from "../../utils/api"
import { dateFormat } from "../../utils/util"
import TableComponent from '../../components/TableComponent'

function LoggerView () {

  return (
    <div className="view">
      <div className={c.container}>
        <RTable/>
      </div>
    </div>
  )
}

function RTable () {
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
	const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [manager_id, setManager_id] = useState()
  const [date, setDate] = useState([])
  const [moment, setMoment] = useState()

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
		setLoading(true)
    loginlogs(current, pageSize, manager_id, date[0], date[1]).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
      }
			setLoading(false)
		}).catch(() => setLoading(false))
  }

  function dateChange (data, dataString) {
    setDate(dataString)
    setMoment(data)
  }

  function reset () {
    setDate([])
    setMoment(undefined)
    setManager_id(undefined)
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = dateFormat(item.created_at)
    })
    return arr
  }

  function onChange (page) {
    setCurrent(page)
    get(page)
  }

  // const obj = ["#FF4D4F", "#FF8D30", '#000'];
  const columns = [
    {
      title: 'ID',
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '操作人账号',
			ellipsis: true,
      dataIndex: 'merchant_id',
  },
    {
      title: '登录IP',
			ellipsis: true,
      dataIndex: 'data',
      render: text => text.ip
  },
    {
      title: '登录时间',
			ellipsis: true,
      dataIndex: 'time',
    },
  ];

  return (
    <div className={c.main} style={{marginTop:0}}>
      <div className={c.searchView}>
        <div className={c.search} style={{borderBottomWidth:0}}>
          <div className={c.searchL}>
            <Input onPressEnter={()=>get(current)} placeholder="请输入操作人账号" onChange={e=>setManager_id(e.target.value)} value={manager_id} size="small" className={c.searchInput}/>
						{/* <> */}
						{/* 	<DatePicker.RangePicker */}
						{/* 		format="YYYY-MM-DD" */}
						{/* 		onChange={dateChange} */}
						{/* 		value={moment} */}
						{/* 		className={c.dataPicker}/> */}
						{/* 	</> */}
          </div>
          <div className={c.searchR}>
            <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
            <Button
              icon={<img src={good9} alt="" style={{width:14,marginRight:6}} />}
              type="primary"
              size="small"
              onClick={()=>get(current)}
              className={c.searchBtn}>搜索记录</Button>
          </div>
        </div>
      </div>
			<TableComponent
				scroll={null}
				setPageSize={setPageSize}
				loading={loading}
				setCurrent={setCurrent}
				getDataSource={get}
				columns={columns}
				dataSource={data}
				pageSize={pageSize}
				total={total}
				current={current}
			/>
    </div>
  )
}

export default LoggerView

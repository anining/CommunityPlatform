import React, { useState, useEffect, useRef } from 'react'
import { Button, DatePicker, Input } from 'antd'
import c from '../../styles/view.module.css'
import good9 from '../../icons/good/good9.png'
import { loginlogs } from "../../utils/api"
import { dateFormat, _debounce, regexNumber } from "../../utils/util"
import Table from '../../components/Table'

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
  const [sort, setSort] = useState([])
  const [total, setTotal] = useState(0)
  const [manager_id, setManager_id] = useState()
  const [date, setDate] = useState([])
  const [moment, setMoment] = useState()
  const num = useRef(_debounce(get, 500))

  useEffect(() => {
    get()
  }, [pageSize, current, JSON.stringify(sort)])

  function get (page = current) {
		setLoading(true)
    loginlogs(page, pageSize, manager_id, date[0], date[1], sort).then(r => {
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
      item.created_at = dateFormat(item.created_at)
    })
    return arr
  }

  // const obj = ["#FF4D4F", "#FF8D30", '#000'];
  const columns = [
    {
      title: 'ID',
			ellipsis: true,
      dataIndex: 'id',
      sorter: {
        multiple: 1,
      }
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
      dataIndex: 'created_at',
      sorter: {
        multiple: 4,
      }
    },
  ];

  return (
    <div className={c.main} style={{marginTop:0}}>
      <div className={c.searchView}>
        <div className={c.search} style={{borderBottomWidth:0}}>
          <div className={c.searchL}>
            <Input onPressEnter={()=> {
              setCurrent(1)
              get()
            }} placeholder="请输入操作人账号" onChange={e=>setManager_id(regexNumber(e.target.value))} value={manager_id} size="small" className={c.searchInput}/>
            <DatePicker.RangePicker
              format="YYYY-MM-DD"
              onChange={dateChange}
              value={moment}
              className={c.dataPicker}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
            <Button
              icon={<img src={good9} alt="" style={{width:14,marginRight:6}} />}
              type="primary"
              size="small"
              onClick={()=> {
                setCurrent(1)
                get()
              }}
              className={c.searchBtn}>搜索记录</Button>
          </div>
        </div>
      </div>
			<Table
				scroll={null}
        setSort={setSort}
				setPageSize={setPageSize}
				loading={loading}
				setCurrent={setCurrent}
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

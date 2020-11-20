import React, { useState, useEffect } from 'react'
import { Button, Space, Table } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import { transformTime, push } from "../../utils/util"
import { customerServices } from "../../utils/api"
import TableComponent from '../../components/TableComponent'


function PeopleServiceView () {

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
	const [pageSize, setPageSize] = useState(10)
	const [current, setCurrent] = useState(1)

	const get = () => {
    customerServices("get").then(r => {
      const { error, data } = r;
			if(!error) {
				setData(format(data))
			}
    })
	}

  useEffect(() => {
		get()
  }, [])

  const columns = [
    {
      title: 'ID',
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '客服名称',
			ellipsis: true,
      dataIndex: 'name',
  },
    {
      title: '客服QQ',
			ellipsis: true,
      dataIndex: 'contact',
  },
    {
      title: '备注',
			ellipsis: true,
      dataIndex: 'comment',
  },
    {
      title: '创建时间',
			ellipsis: true,
      dataIndex: 'time',
  },
    {
			title: "操作",
      render: (text, record, index) => (
				<Space size="small">
          <div className={c.clickText} style={{cursor:'wait'}} onClick={()=>{}}>修改</div>
          <div className={c.line} />
          <div style={{cursor:'wait',color:'#FF4D4F',textDecorationColor:"#FF4D4F"}} className={c.clickText} onClick={()=>{}}>删除</div>
        </Space>
      )
    },
  ];

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.comment = item.comment || '-'
      item.time = transformTime(item.created_at)
    })
    return arr
  }

  return (
    <div className={c.main} style={{marginTop:0}}>
      <div className={c.searchView}>
        <div className={c.search} style={{borderBottom:'none'}}>
          <div className={c.searchL} />
          <div className={c.searchR}>
            <Button icon={
                <img src={good7} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
              onClick={()=>push('/main/edit-people-setting')}
              className={c.searchBtn}>新增客服</Button>
          </div>
        </div>
      </div>
			<TableComponent
				scroll={null}
				columns={columns}
				dataSource={data}
				total={data.length}
				getDataSource={get}
				setPageSize={setPageSize}
				pageSize={pageSize}
				current={current}
				setCurrent={setCurrent}
			/>
    </div>
  )
}

export default PeopleServiceView

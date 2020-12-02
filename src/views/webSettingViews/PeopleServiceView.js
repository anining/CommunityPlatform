import React, { useState, useEffect, useRef } from 'react'
import { Button, Space } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import good53 from '../../icons/good/good53.png'
import { saveSuccess, transformTime, push } from "../../utils/util"
import { customerServices } from "../../utils/api"
import ModalComponent from '../../components/ModalComponent'
import Table from '../../components/Table'

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
  const id = useRef((null))
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
	const [pageSize, setPageSize] = useState(10)
	const [loading, setLoading] = useState(true)
	const [current, setCurrent] = useState(1)
	const [visible, setVisible] = useState(false)

	const get = (page = current) => {
		setLoading(true)
    let body = { page, size: pageSize }
    customerServices("get", undefined, body).then(r => {
      const { error, data } = r;
			if(!error) {
				setData(format(data))
        setTotal(total)
			}
			setLoading(false)
		}).catch(() => setLoading(false))
	}

  const del = () => {
		customerServices("delete", undefined, undefined, id.current).then(r => {
			if (!r.error) {
        setVisible(false)
				saveSuccess(false)
				get()
			}
		})
  }

  useEffect(() => {
		get()
  }, [current, pageSize])

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
      render: (...args) => (
				<Space size="small">
          <div className={c.clickText} onClick={()=>push("/main/edit-people-setting", args[1])}>修改</div>
          <div className={c.line} />
          <div className={c.clickText} onClick={() => {
            id.current = args[1].id
            setVisible(true)
          }}>删除</div>
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
			<Table
				scroll={null}
				loading={loading}
				columns={columns}
				dataSource={data}
				total={total}
				setPageSize={setPageSize}
				pageSize={pageSize}
				current={current}
				setCurrent={setCurrent}
			/>
      <ModalComponent
        src={good53}
        title="确定继续删除 ?"
        visible={visible}
				onCancel={() => setVisible(false)}
        onOk={del}
      />
    </div>
  )
}

export default PeopleServiceView

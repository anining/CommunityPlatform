import React, { useState, useEffect } from 'react'
import { Button, Table, message } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import { push, dateFormat, getSimpleText } from "../../utils/util";
import { announcements } from '../../utils/api'
import ActionComponent from '../../components/ActionComponent';
import TableComponent from "../../components/TableComponent";

function NoticeView () {

  return (
    <div className="view">
      <div className={c.container}>
        <RTable />
      </div>
    </div>
  )
}

function RTable () {
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
	const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
		setLoading(true)
    announcements("get", undefined, { current, pageSize }).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
				setSelectRows([])
				// selectedRows.length && setSelectRows(format(data).map(i => i.key))
      }
			setLoading(false)
		}).catch(() => setLoading(false))
  }

  function format (arr = []) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = dateFormat(item.created_at)
    })
    return arr
  }

  function onChange (page ) {
    setCurrent(page)
    get(page)
  }

  const columns = [
    {
      title: '公告标题',
			ellipsis: true,
      dataIndex: 'title',
  },
    {
      title: '公告内容',
			ellipsis: true,
      dataIndex: 'content',
      width: 300,
      render: (text  ) => <div className={c.noticeHtml}>{getSimpleText(text)}</div>
  },
    {
      title: '发送人',
			ellipsis: true,
      dataIndex: 'manager_account',
  },
    {
      title: '创建时间',
			ellipsis: true,
      dataIndex: 'time',
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
        message.warning('敬请期待');
        break
      default:
        ;
    }
  }

  return (
    <div className={c.main} style={{marginTop:0}}>
			<div className={c.searchView} style={{marginBottom:0}}>
        <div className={c.search}>
          <div className={c.searchL}/>
          <div className={c.searchR}>
            <Button icon={
                <img src={good7} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
              onClick={()=>push('/main/edit-notice-setting')}
              className={c.searchBtn}>新增公告</Button>
          </div>
        </div>
      </div>
			<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{name:"批量删除",key:"delete"}]}/>
			<TableComponent
				scroll={null}
				setPageSize={setPageSize}
				setCurrent={setCurrent}
				getDataSource={get}
				setSelectedRowKeys={setSelectRows}
				selectedRowKeys={selectedRows}
				columns={columns}
				loading={loading}
				dataSource={data}
				pageSize={pageSize}
				total={total}
				current={current}
			/>
    </div>
  )
}

export default NoticeView

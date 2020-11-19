import React from 'react'
import { SCROLL } from "../utils/config"
import { Table } from "antd"

function TableComponent ({ setPageSize, setCurrent, getDataSource, columns, selectedRowKeys, setSelectedRowKeys, dataSource, pageSize, total, current }) {
  const rowSelection = {
    onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys),
    selectedRowKeys 
  }
	const onShowSizeChange = (current, size) => {
		setPageSize(size)
		setCurrent(current)
		getDataSource(current, size)
	}
	const onChange = page => {
    setCurrent(page)
    getDataSource(page)
  }

	return (
		<Table
			columns={columns}
			rowSelection={{...rowSelection}}
			dataSource={dataSource}
			size="small"
			scroll={SCROLL}
			pagination={{
				pageSize,
				onShowSizeChange,
				pageSizeOptions:[10,20,50],
				showSizeChanger:false,
				showQuickJumper:true,
				current,
				showLessItems:true,
				total,
				onChange
			}}
		/>
	)
}

export default TableComponent

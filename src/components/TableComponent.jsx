import React from 'react'
import { SCROLL } from "../utils/config"
import { Table } from "antd"

function TableComponent ({ change, sizeChange, setPageSize, setCurrent, scroll=SCROLL, getDataSource, columns, selectedRowKeys, setSelectedRowKeys, dataSource, pageSize, total, current }) {
  const rowSelection = {
    onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys),
    selectedRowKeys 
  }
	const onShowSizeChange = (current, size) => {
		if(sizeChange && typeof sizeChange === "function") {
			sizeChange(current, size)
		}else {
			setPageSize(size)
			setCurrent(current)
			getDataSource(current, size)
		}
	}
	const onChange = page => {
		if(change && typeof change === "function") {
			change(page)
		}else {
    setCurrent(page)
    getDataSource(page)
		}
  }

	return (
		<Table
			columns={columns}
			rowSelection={selectedRowKeys ? {...rowSelection} : null}
			dataSource={dataSource}
			size="small"
			scroll={scroll}
			pagination={{
				pageSize,
				onShowSizeChange,
				pageSizeOptions:[10,20,50],
				showSizeChanger:true,
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

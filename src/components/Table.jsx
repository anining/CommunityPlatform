import React from 'react'
import { SCROLL } from "../utils/config"
import { ConfigProvider, Skeleton, Empty, Table as T } from "antd"

function Table ({ loading, pageSize, setPageSize, current, setCurrent, scroll = SCROLL, setSort, columns, selectedRowKeys, setSelectedRowKeys, dataSource, total }) {

  const EmptyComponent = () => {
		if(loading) {
			return <Skeleton active title={false} paragraph={{ rows: 10 }}/>
		}

		return (
			<Empty
				style={{
					marginTop: 10,
					marginBottom: 10
				}}
				image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
				imageStyle={{
					height: 60
				}}
				description="暂无数据"
			>
			</Empty>
		)
	}

  const rowSelection = {
    onChange: selectedRowKeys => {
			setSelectedRowKeys(selectedRowKeys)
		},
    selectedRowKeys 
  }
	const onChange = (...args) => {
    const { current, pageSize } = args[0]
    setCurrent(current)
    setPageSize(pageSize)
    setSort && setSort(args[2] instanceof Array ? args[2] : Object.keys(args[2]).length ? [args[2]] : [])
  }

	return (
		<ConfigProvider renderEmpty={EmptyComponent}>
			<T
        onChange={onChange}
        sorter={true}
				columns={columns}
				rowSelection={selectedRowKeys ? {...rowSelection} : null}
				dataSource={dataSource}
				size="small"
				scroll={scroll}
				pagination={{
					pageSize,
					pageSizeOptions: [10, 20, 50],
					showSizeChanger: true,
					showQuickJumper: true,
					current,
					showLessItems: true,
					total
				}}
			/>
		</ConfigProvider>
	)
}

export default Table

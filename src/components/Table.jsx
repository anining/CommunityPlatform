import React, { useRef, useCallback } from 'react'
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd'
import { SCROLL } from "../utils/config"
import { ConfigProvider, Skeleton, Empty, Table as T } from "antd"
import { HTML5Backend } from 'react-dnd-html5-backend'

const type = 'DragableBodyRow'

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
}

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

  // 拖拽排序
  const RNDContext = createDndContext(HTML5Backend);
  const manager = useRef(RNDContext);
  const components = {body: {row: DragableBodyRow}}
  const moveRow = useCallback((dragIndex, hoverIndex) => {
    const dragRow = dataSource[dragIndex];
    console.log(dragRow)
    console.log("update")
  }, [dataSource]);

	return (
    <DndProvider manager={manager.current.dragDropManager}>
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
          // components={components}
          // onRow={(record, index) => ({index, moveRow})}
        />
      </ConfigProvider>
    </DndProvider>
	)
}

export default Table

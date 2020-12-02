import React, { useState, useEffect } from 'react'
import { Button, Input, Modal, message } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import good6 from '../../icons/good/good6.png'
import good31 from '../../icons/good/good31.png'
import { communityGoodsCategories } from '../../utils/api'
import { push, saveSuccess, dateFormat } from "../../utils/util";
import { styles } from "../../styles/modal"
import ActionComponent from '../../components/ActionComponent'
import Table from '../../components/Table'

function GoodCategoryView () {
  // TODO: 两个删除弹窗
  const [visible, setVisible] = useState(false)
  const [actionId, ] = useState(1)

  function handleOk () {

  }

  function handleCancel () {

  }

  return (
    <div className="view">
      <div className={c.container}>
        <RTable setVisible={setVisible}/>
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <div style={styles.modal}>
          <img src={good6} alt="" style={styles.icon} />
          <div style={styles.label}>
            {actionId===1?"确定要删除此分类吗？":"删除分类"}
          </div>
          {(()=>{
          if(actionId===1){
            return <p style={styles.p}>分类<span style={{color:"#2C68FF"}}> 哔哩哔哩 </span>一共包含了 15 个商品，包含商品的分类不允许被删除，请更改关联商品的分类之后重试。</p>
          }
            return (
              <>
                <p style={styles.p}>有商品正在使用您选中的分类，请先取消商品和分类的关联。</p>
                <p style={styles.del}>只允许删除“包含商品数量”为0的分类。</p>
              </>
            )
          })()}
          <div style={styles.btnView}>
            <Button key="back" style={styles.btnCancle}>
              取消
            </Button>
            <Button key="submit" type="primary" onClick={handleOk} style={styles.btnOk}>
              确定
            </Button>
          </div>
        </div>
      </Modal>
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
  const [search_name, setSearch_name] = useState()

  useEffect(() => {
    get()
  }, [current, pageSize])

  function get (page = current) {
		setLoading(true)
    let body = { page, size: pageSize }
    if (search_name) {
      body = { ...body, name: search_name }
    }
    communityGoodsCategories("get", undefined, body).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
				setSelectRows([])
      }
			setLoading(false)
		})
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
      title: '分类编号',
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '分类名称',
			ellipsis: true,
      dataIndex: 'name',
  },
    {
      title: '包含商品数量',
			ellipsis: true,
      dataIndex: 'used_by',
  },
    {
      title: '创建时间',
			ellipsis: true,
      dataIndex: 'time',
  },
    {
			title: "操作",
      render: (record) =>	<div className={c.clickText} onClick={()=>push("/main/edit-category-community",record)}>编辑分类</div>
  }
];

  const rowSelection = {
    onChange: (selectedRowKeys ) => {
      setSelectRows(selectedRowKeys)
    },
    selectedRowKeys: selectedRows
  };

	function deleteCategory () {
		setSelectRows([])
		// setVisible(true)
		communityGoodsCategories("delete", undefined, undefined, selectedRows.map(i => data[i].id).toString()).then(r => {
			if (!r.error) {
				saveSuccess(false)
				setSelectRows([])
				get()
			}
		})
	}

  function submit (key) {
    switch (key) {
      case "delete":
				deleteCategory()
        break
      default:
        ;
    }
  }

  return (
    <div className={c.main} style={{marginTop:0}}>
      <div className={c.searchView}>
          <div className={c.search}>
            <div className={c.searchL}>
              <Input onPressEnter={()=> {
                setCurrent(1)
                get(1)
              }} placeholder="请输入分类名称" value={search_name} onChange={e=>setSearch_name(e.target.value)} size="small" className={c.searchInput} />
              <Button
                icon={
                  <img src={good31} alt="" style={{width:14,marginRight:6}} />
                }
                size = "small"
                onClick={()=> {
                  setCurrent(1)
                  get(1)
                }}
                className={c.searchBtn}>搜索分类</Button>
            </div>
            <div className={c.searchR}>
              <Button
                icon={
                  <img src={good7} alt="" style={{width:16,marginRight:6}} />
                }
                type = "primary"
                size = "small"
                onClick={()=>push('/main/edit-category-community')}
                className={c.searchBtn}>新增分类</Button>
            </div>
          </div>
      </div>
			<Table
				scroll={null}
				current={current}
				setPageSize={setPageSize}
				setCurrent={setCurrent}
				loading={loading}
				setSelectedRowKeys={setSelectRows}
				selectedRowKeys={selectedRows}
				columns={columns}
				dataSource={data}
				pageSize={pageSize}
				total={total}
			/>
			<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{name:"批量删除",key:"delete"}]}/>
    </div>
  )
}

export default GoodCategoryView

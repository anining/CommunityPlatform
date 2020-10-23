import React, { useState, useEffect } from 'react'
import { Button, Table, Input, Modal } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import good6 from '../../icons/good/good6.png'
import good31 from '../../icons/good/good31.png'
import { communityGoodsCategories } from '../../utils/api'
import { push, transformTime, saveSuccess } from "../../utils/util";
import DropdownComponent from '../../components/DropdownComponent'
import { styles } from "../../styles/modal"

function MarkupTemView () {
  const [visible, setVisible] = useState(false)
  const [actionId, setActionId] = useState(2)

  function handleOk () {

  }

  function handleCancel () {

  }

  return (
    <div className="view">
      <div className={c.container}>
        <RTable />
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
            {actionId===1?"确定要删除此支付账户吗？":"删除分类"}
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
  const [search_name, setSearch_name] = useState()
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    let body = { page: current, size: pageSize }
    if (search_name) {
      body = { ...body, search_name }
    }
    setLoading(true)
    communityGoodsCategories("get", undefined, body).then(r => {
      setLoading(false)
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
      }
    }).catch(() => {
      setLoading(false)
    })
  }

  function format (arr = []) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = transformTime(item.created_at)
    })
    return arr
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const columns = [
    {
      title: '模版编号',
      dataIndex: 'id',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 1,
      },
      render: (text, record, index) => '-'
  },
    {
      title: '模版名称',
      dataIndex: 'name',
      align: 'center',
      render: (text, record, index) => '-'
  },
    {
      title: '包含商品',
      align: 'center',
      dataIndex: 'used_by',
      render: (text, record, index) => '-'
  },
    {
      title: '模版类型',
      dataIndex: 'time',
      align: 'center',
      render: (text, record, index) => '-'
  },
    {
      title: '创建时间',
      dataIndex: 'time',
      align: 'center',
      render: (text, record, index) => '-'
  },
    {
      title: '修改时间',
      dataIndex: 'time',
      align: 'center',
      render: (text, record, index) => '-'
  }
];

  const rowSelection = {
    onChange: (selectedRowKeys, rows) => {
      setSelectRows(selectedRowKeys)
    },
    selectedRowKeys: selectedRows
  };

  function submit (key) {
    setActionLoading(true)
    switch (key) {
      case "delete":
        const params = new URLSearchParams()
        selectedRows.forEach(i => params.append("ids", data[i].id))
        communityGoodsCategories("delete", undefined, undefined, params.toString()).then(r => {
          setActionLoading(false)
          if (!r.error) {
            saveSuccess(false)
            setSelectRows([])
            get(current)
          }
        }).catch(() => {
          setActionLoading(false)
        })
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
              <Input onPressEnter={()=>get(current)} placeholder="请输入加价模版关键字" value={search_name} onChange={e=>setSearch_name(e.target.value)} size="small" className={c.searchInput} />
              <Button
                icon={
                  <img src={good31} alt="" style={{width:14,marginRight:6}} />
                }
                size = "small"
                onClick={()=>get(current)}
                loading={loading}
                className={c.searchBtn}>搜索模版</Button>
            </div>
            <div className={c.searchR}>
              <Button
                icon={
                  <img src={good7} alt="" style={{width:16,marginRight:6}} />
                }
                type = "primary"
                size = "small"
                onClick={()=>push('/main/editMarkupTem')}
                className={c.searchBtn}>新增模版</Button>
            </div>
          </div>
      </div>
      <DropdownComponent loading={actionLoading} selectedRows={selectedRows} submit={submit} keys={[{name:"批量删除",key:"delete"}]}/>
      <Table
        columns={columns}
        rowSelection={{
          ...rowSelection
        }}
        dataSource={data}
        size="small"
        pagination={{
          showQuickJumper:true,
          current,
          pageSize,
          showLessItems:true,
          total,
          onChange
        }}
      />
    </div>
  )
}

export default MarkupTemView

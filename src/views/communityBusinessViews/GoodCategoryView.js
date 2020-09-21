import React, { useState, useEffect } from 'react'
import { Button, Menu, Table, message, Input, Modal } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import good6 from '../../icons/good/good6.png'
import good31 from '../../icons/good/good31.png'
import { h } from '../../utils/history'
import { styles } from '../../styles/modal'
import { communityGoodsCategories } from '../../utils/api'
import { push, transformTime } from "../../utils/util";
import DropdownComponent from '../../components/DropdownComponent'

function GoodCategoryView () {
  const [visible, setVisible] = useState(false)
  const [actionId, setActionId] = useState(2)

  function handleOk () {

  }

  function handleCancel () {

  }

  return (
    <div className="view">
      <div className={c.container}>
        <RTable setVisible={setVisible} />
      </div>
      {/* <Modal */}
      {/*   visible={visible} */}
      {/*   onOk={handleOk} */}
      {/*   footer={null} */}
      {/*   onCancel={handleCancel} */}
      {/* > */}
      {/*   <div style={styles.modal}> */}
      {/*     <img src={good6} alt="" style={styles.icon} /> */}
      {/*     <div style={styles.label}> */}
      {/*       {actionId===1?"确定要删除此支付账户吗？":"确定要删除这个分类吗？"} */}
      {/*     </div> */}
      {/*     {(()=>{ */}
      {/*     if(actionId===1){ */}
      {/*       return <p style={styles.p}>分类<span style={{color:"#2C68FF"}}> 哔哩哔哩 </span>一共包含了 15 个商品，包含商品的分类不允许被删除，请更改关联商品的分类之后重试。</p> */}
      {/*     } */}
      {/*       return <p style={styles.p}>删除的分类不可被找回，请确认。</p> */}
      {/*     })()} */}
      {/*     <div style={styles.btnView}> */}
      {/*       <Button key="back" style={styles.btnCancle}> */}
      {/*         取消 */}
      {/*       </Button> */}
      {/*       <Button key="submit" type="primary" onClick={handleOk} style={styles.btnOk}> */}
      {/*         确定 */}
      {/*       </Button> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </Modal> */}
    </div>
  )
}

function RTable ({ setVisible }) {
  const [selectedRows, setSelectRows] = useState([]);
  const [search_name, setSearch_name] = useState()
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    let body = { page: current, size: pageSize }
    if (search_name) {
      body = { ...body, ...{ search_name } }
    }
    communityGoodsCategories("get", undefined, body).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
      }
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
      title: '分类编号',
      dataIndex: 'id',
      align: 'center',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // }
  },
    {
      title: '分类名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '包含商品数量',
      align: 'center',
      dataIndex: 'used_by',
  },
    {
      title: '创建时间',
      dataIndex: 'time',
      align: 'center',
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <div className={c.clickText} onClick={()=>push("/main/editGoodCategory",record)}>编辑分类</div>
      )
  },
];

  const rowSelection = {
    onChange: (selectedRowKeys, rows) => {
      setSelectRows(selectedRowKeys)
    }
  };

  function submit (key) {
    switch (key) {
      case "delete":
        message.success('批量删除操作');
        break
      default:
        ;
    }
  }

  return (
    <div className={c.main} style={{marginTop:0}}>
      <div className={c.searchView} style={{height:88}}>
          <div className={c.search}>
            <div className={c.searchL} style={{width:'22.783%'}}>
              <Input onPressEnter={()=>get(current)} placeholder="请输入分类名称" value={search_name} onChange={e=>setSearch_name(e.target.value)} size="small" className={c.searchInput} style={{width:'61.621%'}}/>
              <Button
                icon={
                  <img src={good31} alt="" style={{width:14,marginRight:6}} />
                }
                size = "small"
                onClick={()=>get(current)}
                className={c.searchBtn} style={{
                  marginLeft:19.422,
                  borderColor:'#3372FF',
                  color:'#2C68FF'
                }}>搜索分类</Button>
            </div>
            <div className={c.searchR}>
              <Button
                icon={
                  <img src={good7} alt="" style={{width:16,marginRight:6}} />
                }
                type = "primary"
                size = "small"
                onClick={()=>push('/main/editGoodCategory')}
                className={c.searchBtn}>新增分类</Button>
            </div>
          </div>
      </div>
      <DropdownComponent submit={submit} keys={[{key:'delete',name:'批量删除'}]}/>
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

export default GoodCategoryView

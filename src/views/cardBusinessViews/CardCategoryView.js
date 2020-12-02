import React, { useState, useEffect } from 'react'
import { Button, Table, message, Input } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import good31 from '../../icons/good/good31.png'
import { push, transformTime } from "../../utils/util"
import ActionComponent from '../../components/ActionComponent'

function CardCategoryView () {
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
  const [, ] = useState()
  const [data, ] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, ] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get () {
    // let body = { page: current, size: pageSize }
    // if (search_name) {
    //   body = { ...body, ...{ search_name } }
    // }
    // communityParamTemplates("get", undefined, body).then(r => {
    //   if (!r.error) {
    //     const { data, total } = r
    //     setTotal(total)
    //     setData(format(data))
    //   }
    // })
  }

  // function format (arr) {
  //   arr.forEach((item, index) => {
  //     item.key = index
  //     item.time = transformTime(item.created_at)
  //   })
  //   return arr
  // }

  function onChange (page ) {
    setCurrent(page)
    get(page)
  }

  const columns = [
    {
      title: '分类编号',
			ellipsis: true,
      dataIndex: 'id',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // }
  },
    {
      title: '分类名称',
			ellipsis: true,
      dataIndex: 'name',
  },
    {
      title: '包含商品数量',
			ellipsis: true,
      dataIndex: 'number',
  },
    {
      title: '创建时间',
			ellipsis: true,
      dataIndex: 'time',
  },
    {
			title: "操作",
      // render: (text, record, index) => (
      //   <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF',color:'#2C68FF'}} onClick={()=>{
      //     const history = h.get()
      //     history.push("/main/editCardCategory")
      //   }}>编辑分类</div>
      // )
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
        message.success('批量删除操作');
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
              <Input placeholder="请输入分类名称" size="small" className={c.searchInput}/>
              <Button icon={
                  <img src={good31} alt="" style={{width:14,marginRight:6}} />
                }
                size = "small"
                onClick={()=>get(current)}
                className={c.searchBtn}>搜索分类</Button>
            </div>
            <div className={c.searchR}>
              <Button icon={
                  <img src={good7} alt="" style={{width:16,marginRight:6}} />
                }
                type = "primary"
                onClick={()=>push('/main/editCardCategory')}
                size = "small"
                className={c.searchBtn}>新增分类</Button>
            </div>
          </div>
      </div>
			<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[]}/>
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

export default CardCategoryView

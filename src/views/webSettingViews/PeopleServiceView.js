import React, { useState, useEffect } from 'react'
import { Button, Space, Table } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import { transformTime, push } from "../../utils/util"
import { customerServices } from "../../utils/api"

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
  const [data, setData] = useState([])

  useEffect(() => {
    customerServices("get").then(r => {
      const { error, data } = r;
      !error && setData(format(data))
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '客服名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '客服QQ',
      align: 'center',
      dataIndex: 'contact',
  },
    {
      title: '备注',
      dataIndex: 'comment',
      align: 'center',
  },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'time',
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small">
          <div className={c.clickText} style={{cursor:'wait'}} onClick={()=>{}}>修改</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{cursor:'wait',color:'#FF4D4F',textDecorationColor:"#FF4D4F"}} className={c.clickText} onClick={()=>{}}>删除</div>
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
              onClick={()=>push('/main/addPeopleService')}
              className={c.searchBtn}>新增客服</Button>
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        pagination={{
          showQuickJumper:true,
          showLessItems:true,
        }}
      />
    </div>
  )
}

export default PeopleServiceView

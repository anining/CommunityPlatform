import React, { useState, useEffect } from 'react'
import { Button, Table, Space } from 'antd'
import c from '../../styles/view.module.css'
import { h } from '../../utils/history'
import { managers, managersPermissions } from '../../utils/api'
import good7 from '../../icons/good/good7.png'

function AdminView () {

  return (
    <div className="container">
      <div className={c.container}>
        <RTable />
      </div>
    </div>
  )
}

function RTable () {
  const [data, setData] = useState([])
  const [purview, setPurview] = useState([])

  useEffect(() => {
    managers().then(r => {
      const { error, data } = r;
      !error && setData(format(data))
    })
  }, [])

  function detail (id) {
    managersPermissions(id).then(r => {
      const { error, data } = r;
      !error && setPurview(data)
      console.log(data)
    })
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
    })
    return arr
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '管理员账号',
      dataIndex: 'account',
      align: 'center',
  },
    {
      title: '管理员名称',
      dataIndex: 'nickname',
      align: 'center',
  },
    {
      title: '管理员权限',
      dataIndex: 'id',
      render: (text, record, index) => (
        <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF',color:'#2C68FF'}} onClick={()=>detail(text)}>查看详情</div>
      )
  },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'created_at',
  },
    {
      title: '操作',
      dataIndex: 'id',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small" style={{color:'#2C68FF'}}>
          <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
            const history = h.get()
            history.push("/main/AddAdminView")
          }}>修改</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
            const history = h.get()
            history.push("/main/password", { manager_id: text })
          }}>重置密码</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{textDecoration:"underline",textDecorationColor:'#FF4D4F',color:'#FF4D4F'}} onClick={()=>{

          }}>删除</div>
        </Space>
      )
    }
  ];

  return (
    <div className={c.main} style={{marginTop:0,marginBottom:0}}>
      <div className={c.searchView}>
        <div className={c.search} style={{borderBottom:'none'}}>
          <div className={c.searchL}>
          </div>
          <div className={c.searchR}>
            <Button icon={
              <img src={good7} alt="" style={{width:14,marginRight:6}} />
            }
            type = "primary"
            size = "small"
              onClick={()=>{
                const history = h.get()
                history.push("/main/addAdmin")
              }}
            className={c.searchBtn}>新增管理员</Button>
          </div>
        </div>
      </div>
      <Table columns={columns} dataSource={data} size="small" pagination={{showQuickJumper:true}}/>
    </div>
  )
}

export default AdminView

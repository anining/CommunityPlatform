import React, { useState, useEffect } from 'react'
import { Button, Table, Space, Popconfirm } from 'antd'
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
  const [data, setData] = useState([
    {
      id: 1,
    }
  ])
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
        render: (text, record, index) => {
          const views = []
          const data = ["删除用户信息", '删除用户信息', '删除用户信息', '删除用户信息',"删除用户信息", '删除用户信息', '删除用户信息', '删除用户信息']
          data.forEach((item, index) => {
            views.push(
              <div style={{...styles.item,...{
              // borderRightWidth: (index !== 0 && (index + 1) % 3 === 0) || index === data.length - 1 ? 1 : 0,
              // borderBottomWidth: index + 3 < data.length ? 0 : 1
            }}} className={c.test} key={index}>{item}</div>
            )
          })
          return (
            <Popconfirm
            icon={()=><img src="" alt="" style={{width:0,height:0}}/>
          }
          placement = "left"
          title = {
              () => {
                return (
                  <div style={styles.view}>
                    <div style={styles.header}>操作权限</div>
                    {views}
                  </div>
                )
              }
            } >
            <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF',color:'#2C68FF'}} onClick={()=>detail(text)}>查看详情</div> <
            /Popconfirm>
        )
      }
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'created_at',
    }, {
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

const styles = {
  item: {
    display: 'inline-block',
    width: '33.33%',
    height: 43,
    boxSizing:'border-box',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  view: {
    width: 328,
    flexWrap: 'wrap',
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: '0.857rem',
  },
  header: {
    width: '100%',
    height: 42,
    background: '#FAFAFA',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 33
  }
}

export default AdminView

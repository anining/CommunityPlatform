import React, { useState, useEffect } from 'react'
import { Button, Table, Space, Popconfirm } from 'antd'
import c from '../../styles/view.module.css'
import { managers, managersPermissions } from '../../utils/api'
import good7 from '../../icons/good/good7.png'
import home9 from '../../icons/home/home9.png'
import good40 from '../../icons/good/good40.png'
import { push, transformTime } from "../../utils/util"

function AdminView () {

  return (
    <div className="view">
      <div className={c.container}>
        <RTable />
      </div>
    </div>
  )
}

function RTable () {
  const [data, setData] = useState([])
  const [purview, setPurview] = useState([])
  const [visible, setVisible] = useState([])

  useEffect(() => {
    managers().then(r => {
      const { error, data } = r;
      !error && setData(format(data))
    })
  }, [])

  function detail (id, index) {
    managersPermissions(id).then(r => {
      const { error, data: d } = r;
      if (!error) {
        setPurview(d)
        const localVisible = []
        data.forEach((item, i) => {
          if (index === i) {
            localVisible.push(true)
          } else {
            localVisible.push(false)
          }
        })
        setVisible(localVisible)
      }
    })
  }

  function close () {
    const localVisible = []
    data.forEach((item, i) => {
      localVisible.push(false)
    })
    setVisible(localVisible)
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = transformTime(item.created_at)
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
          purview.forEach((item, index) => {
            views.push(
              <div style={{...styles.item,...{
              borderLeftWidth: index % 3 === 0 ? 1 : 0,
              borderTopWidth: index < 3 ? 1 : 0
            }}} key={index}>{item}</div>
            )
          })
          views.length === 0 && views.push(
            <div style={styles.nullView}>
            <img src={home9} alt="" style={styles.nullImg}/>
          </div>
          )
          return (
            <Popconfirm
            icon = { <img src="" alt="" style={{width:0,height:0}}/>
          }
          visible = { visible[index] }
          placement = "left"
          title = {
              () => {
                return (
                  <div style={styles.view}>
                    <div style={styles.close} onClick={close}>
                      <img src={good40} style={styles.closeImg} alt="" />
                    </div>
                    <div style={styles.header}>操作权限</div>
                    {views}
                  </div>
                )
              }
            } >
            <div className={c.clickText} onClick={()=>detail(text,index)}>查看详情</div> <
            /Popconfirm>
        )
      }
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'time',
    }, {
      title: '操作',
      dataIndex: 'id',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small">
          <div style={{cursor:"wait"}} className={c.clickText} onClick={()=>{}}>修改</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div className={c.clickText} style={{cursor:'wait'}} onClick={()=>{}}>重置密码</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{cursor:'wait'}} className={c.clickText} onClick={()=>{}}>删除</div>
        </Space>
      )
    }
];

return (
  <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search} style={{borderBottom:'none'}}>
          <div className={c.searchL} />
          <div className={c.searchR}>
            <Button icon={
              <img src={good7} alt="" style={{width:14,marginRight:6}} />
            }
              type = "primary"
              size = "small"
              onClick={()=>push('/main/addAdmin')}
              className={c.searchBtn}>新增管理员</Button>
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

const styles = {
  item: {
    display: 'flex',
    width: '33.33%',
    height: 43,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    width: 328,
    display: 'flex',
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
  },
  close: {
    width: '100%',
    height: 33,
    display: 'flex',
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  closeImg: {
    width: 13
  },
  nullView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nullImg: {
    width: 50,
    marginTop: 15
  }
}

export default AdminView

import React, { useState, useEffect } from 'react'
import { Button, Table, Space, Popconfirm } from 'antd'
import c from '../../styles/view.module.css'
import { managers } from '../../utils/api'
import good7 from '../../icons/good/good7.png'
import home9 from '../../icons/home/home9.png'
import good40 from '../../icons/good/good40.png'
import { push, dateFormat, getKey } from "../../utils/util"
import { PERMISSIONS, PERMISSIONS_ARRAY, SCROLL } from "../../utils/config"
import TableComponent from '../../components/TableComponent'

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
	const [pageSize, setPageSize] = useState(10)
	const [loading, setLoading] = useState(true)
	const [current, setCurrent] = useState(1)
  const [purview, setPurview] = useState([])
  const [visible, setVisible] = useState([])

	const get = () => {
		setLoading(true)
    managers("get").then(r => {
      const { error, data } = r;
      !error && setData(format(data));
			setLoading(false)
		}).catch(() => setLoading(false))
	}

  useEffect(() => {
		get()
  }, [])

  function detail (permissions,role, index) {
    setPurview(role === "superuser" ? PERMISSIONS_ARRAY : JSON.parse(permissions))
    setVisible(data.map((item, i) => index === i))
  }

  function change (record) {
    push('/main/edit-admin-system', record)
  }

  function close () {
    setVisible(data.map(()=>false))
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = dateFormat(item.created_at)
    })
    return arr
  }

  const columns = [
    {
      title: 'ID',
			ellipsis: true,
      dataIndex: 'id',
  },
    {
      title: '管理员账号',
			ellipsis: true,
      dataIndex: 'account',
  },
    {
      title: '管理员名称',
			ellipsis: true,
      dataIndex: 'nickname',
  },
    {
      title: '管理员权限',
			ellipsis: true,
      render: (text, record, index) => {
        const { permissions, role } = record
        const views = []
        purview.forEach((item, index) => {
          const title = getKey(item.permission, PERMISSIONS)
          views.push(
            <div style={{...styles.item,...{borderLeftWidth: index % 3 === 0 ? 1 : 0,borderTopWidth: index < 3 ? 1 : 0}}} key={index}>
              {title}
            </div>
          )
        })
        views.length === 0 && views.push(
          <div style={styles.nullView} key="permissions_null_key">
            <img src={home9} alt="" style={styles.nullImg}/>
          </div>
        )

        return (
          <Popconfirm
            icon={<img src="" alt="" style={{width:0,height:0}}/>}
            visible={ visible[index] }
            placement="left"
            title={()=>(
              <div style={styles.view}>
                <div style={styles.close} onClick={close}>
                  <img src={good40} style={styles.closeImg} alt="" />
                </div>
                <div style={styles.header}>操作权限</div>
                {views}
              </div>
            )
          }>
            <div className={c.view_text} onClick={()=>detail(permissions,role,index)}>查看详情</div>
          </Popconfirm>
        )
      }
  },
    {
      title: '创建时间',
			ellipsis: true,
      dataIndex: 'time'
      },
    {
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 226,
			fixed: 'right',
      dataIndex: 'id',
      render: (text, record ) => (
				<Space size="small" className={c.space}>
          <div className={c.clickText} onClick={()=>change(record)}>修改</div>
          <div className={c.line} />
          <div className={c.clickText} style={{cursor:'wait'}} onClick={()=>{}}>重置密码</div>
          <div className={c.line} />
          <div style={{cursor:'wait'}} className={c.clickText} onClick={()=>{}}>删除</div>
        </Space>
      )
      }
];

  return (
    <div className={c.main} style={{marginTop:0}}>
			<div className={c.searchView} style={{marginBottom:0}}>
        <div className={c.search} style={{borderBottom:'none'}}>
          <div className={c.searchL} />
          <div className={c.searchR}>
            <Button icon={
              <img src={good7} alt="" style={{width:14,marginRight:6}} />
            }
              type = "primary"
              size = "small"
              onClick={()=>push('/main/edit-admin-system')}
              className={c.searchBtn}>新增管理员</Button>
          </div>
        </div>
      </div>
			<TableComponent
				scroll={null}
				setPageSize={setPageSize}
				loading={loading}
				setCurrent={setCurrent}
				getDataSource={get}
				columns={columns}
				dataSource={data}
				pageSize={pageSize}
				total={data.length}
				current={current}
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
    paddingBottom: 20
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

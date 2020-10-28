import React, { useState, useEffect } from 'react'
import * as U from 'karet.util'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Menu, Tooltip, Dropdown } from 'antd'
import { styles } from '../styles/modal'
import { DownOutlined } from '@ant-design/icons';
import c from '../styles/view.module.css'

function DropdownPromiseComponent ({ value, view, tooltip = "", fetchName, setValue, initNums = [], placeholder = "请选择" }) {
  const size = 10
  const [visible, setVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [id, setId] = useState()
  const [nums, setNums] = useState([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (!fetchName) {
      setHasMore(false)
      return
    }
    fetchData()
  }, [])

  function fetchData () {
    // fetchData({page,size})
    // fetchName("get", undefined, { page, size }).then(r => {
    //   if (!r.error) {
    //     setData([...data, ...r.data])
    //     setPage(page + 1)
    //     if (r.data.length !== size) {
    //       setHasMore(false)
    //     }
    //   }
    // })
  }

  const menu = (
    <Menu onClick={e=>{
      setId(e.key)
      setValue(e.key)
    }}>
      {
        initNums.map(i => (
          <Menu.Item key={i.id}>
            {i.name}
          </Menu.Item>
        ))
      }
    </Menu>
  );

  const selected = initNums.filter(i => i.id == id)

  return (
    <Dropdown overlay={menu}>
      <Tooltip placement="bottomLeft" color="#F7FAFF" title={tooltip}>
        <Button size="small" onClick={()=>setVisible(true)} className={view?c.dropdown_view:c.dropdownPromise}>
          <div className={c.hiddenText} style={{color:selected.length?"#34374A":"#C4C4C4"}}>
            { selected.length ? selected[0].name : placeholder }
          </div>
          <DownOutlined />
        </Button>
      </Tooltip>
    </Dropdown>
  )
}

export default DropdownPromiseComponent

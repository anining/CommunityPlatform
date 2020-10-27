import React, { useState, useEffect } from 'react'
import * as U from 'karet.util'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Tooltip, Dropdown } from 'antd'
import { styles } from '../styles/modal'
import { DownOutlined } from '@ant-design/icons';
import c from '../styles/view.module.css'

function DropdownPromiseComponent ({ value, view, tooltip = "", fetchName, setValue, initNums = [], placeholder = "请选择" }) {
  const size = 10
  const [visible, setVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [id, setId] = useState(value)
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
    <InfiniteScroll
      style={styles.infiniteScroll}
      next={fetchData}
      dataLength={nums.length}
      hasMore={hasMore}
    >
      {
        initNums.map(i => (
          <div key={i.id} onClick={()=>{
            setId(i.id)
            setValue(i.id)
            setVisible(false)
          }} className={c.dropItem}>
            {i.name}
          </div>
        ))
      }
    </InfiniteScroll>
  )
  const selected = initNums.filter(i => i.id === id)

  return (
    <Dropdown overlay={menu} visible={visible}>
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

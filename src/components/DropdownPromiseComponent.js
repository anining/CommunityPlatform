import React, { useState, useEffect, useRef } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component';
import { Button,  Tooltip, Dropdown } from 'antd'
import { styles } from '../styles/modal'
import { DownOutlined } from '@ant-design/icons';
import c from '../styles/view.module.css'

function DropdownPromiseComponent ({refresh=[], value, view, tooltip = "", fetchName, setValue, initNums = [], placeholder = "请选择" }) {
	const [visible, setVisible] = useState()
  const size = 50
  const [page, setPage] = useState(1)
  const [nums, setNums] = useState(initNums)
  const [hasMore, setHasMore] = useState(true)
  const myRef = useRef(null)

  useEffect(() => {
    if (!fetchName) {
      setHasMore(false)
      return
    }
    fetchData()
  }, [])

  useEffect(()=>{
    if (fetchName) {
      setPage(1)
      fetchData(1,true)
    }
  },refresh)

  function fetchData (current = page,clear = false) {
    fetchName(current,size).then(r=>{
      if(clear) {
        setNums([...r])
      }else {
        setNums([...nums, ...r])
      }
      setPage(page + 1)
      if (r.length !== size) {
        setHasMore(false)
      }
    })
  }

  const menu = (
    <InfiniteScroll
      style={styles.infiniteScroll}
      next={fetchData}
      dataLength={nums.length}
      hasMore={hasMore}
    >
        {
          nums.map(i => (
            <div key={i.id} onClick={()=>{
              setValue(i.id)
							setVisible(false)
              // const ref = document.querySelectorAll(".ant-dropdown")
              // for (let i = 0; i < ref.length; i++) { ref[i].className = 'ant-dropdown ant-dropdown-placement-bottomLeft ant-dropdown-hidden' }
          }} className={c.dropItem}>
              {i.name}
            </div>
          ))
        }
    </InfiniteScroll>
  )

  const selected = nums.filter(i => i.id == value)

  return (
    <Dropdown overlay={menu}>
      <Tooltip placement="bottomLeft" color="#F7FAFF" title={tooltip}>
				<Button size="small" ref={myRef} onClick={()=>setVisible(!visible)} className={view?c.dropdown_view:c.dropdownPromise}>
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

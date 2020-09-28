import React from 'react'
import c from '../styles/edit.module.css'

function SelectComponent ({ click, id, name, placeholder }) {

  return (
    <div onClick={click} className={c.selectC}>
      <div style={{color:id?"rgba(0, 0, 0, 0.85)":"#979BA3"}}>{name||placeholder}</div>
      <div>选择</div>
    </div>
  )
}

export default SelectComponent

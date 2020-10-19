import React from 'react'
import c from '../styles/guide.module.css'
import { push } from '../utils/util';

function Circle ({ i }) {
  const views = [];
  const guides = ["guide1", "guide2", "guide3", "guide4"]
  guides.forEach((item, index) => {
    views.push(
      <div style={{
        height: 8,
        width: 8,
        marginLeft: 4,
        cursor:'pointer',
        marginRight: 4,
        borderRadius: 8,
        background: index !== i ? '#D6D7DB' : '#2C67FF'
      }} onClick={()=>push(item)} key={item}/>
    )
  })

  return <div className={c.circleView}>{views}</div>
}

export default Circle

import React from 'react'
import c from '../styles/guide.module.css'

function Circle ({ i }) {
  const views = [];
  [0, 1, 2, 3].forEach((item, index) => {
    views.push(
      <div style={{
        height: 8,
        width: 8,
        marginLeft: 4,
        marginRight: 4,
        borderRadius: 8,
        background: index !== i ? '#D6D7DB' : '#2C67FF'
      }} key={index}/>
    )
  })

  return <div className={c.circleView}>{views}</div>
}

export default Circle

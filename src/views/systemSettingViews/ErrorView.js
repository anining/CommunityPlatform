import React from 'react'
import { Button } from 'antd'
import c from '../../styles/error.module.css'
import error1 from '../../icons/error/error1.png'
import { push } from "../../utils/util"

function ErrorView () {
  return (
    <div className={c.container}>
      <img src={error1} alt="" className={c.img}/>
      <div className={c.text}>抱歉，你无权访问该页面</div>
      <Button onClick={()=>push('/main/home')} className={c.btn} size="small" type="primary">返回首页</Button>
    </div>
  )
}

export default ErrorView

import React from 'react'
import { Button } from 'antd'
import * as U from 'karet.util'
import good7 from '../icons/good/good7.png'
import c from '../styles/view.module.css'
import { push } from "../utils/util";

function TableHeaderComponent ({small_btn, data, path, text, customize}) {
  const views = [];

  data.forEach(item => {
    const { label, number, icon, id } = item;
    views.push(
      <div className={c.headerItem} key={id}>
        <img src={icon} alt="" className={c.headerItemImg} />
        <div className={c.headerIR}>
          <div className={c.headerNumber}>{number}</div>
          <div>{label}</div>
        </div>
        <div className={c.headerBorder}/>
      </div>
    )
  })

  return (
    <div className={c.header}>
      <div className={c.headerL}>
        {views}
      </div>
      <div>
				{
					customize ? customize:
					<>
						{
							U.when(small_btn,
								<Button className={c.small_btn}>{small_btn}</Button>
							)
						}
						<Rbtn path={path} text={text}/>
					</>
				}
      </div>
    </div>
  )
}

function Rbtn ({ path, text }) {
  if (!path || !text) {
    return null
  }
  return (
    <Button
      icon={<img src={good7} alt="" style={{width:16,marginRight:6}} />
  }
  type = "primary"
  size = "small"
  onClick = {
    () => push(path)
  }
  className={c.headerAddBtn}>{text}
  </Button>
)
}

export default TableHeaderComponent

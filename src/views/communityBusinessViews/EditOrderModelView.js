import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Menu, Dropdown, Button, Upload, message, Radio, Checkbox } from 'antd'
import good5 from '../../icons/good/good5.png'
import good8 from '../../icons/good/good8.png'

function EditOrderModelView () {

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <div>首页 / 社区业务 / <span>下单模型</span></div>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增下单模型</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>模型名称</div>
          </div>
          <Input placeholder="请输入模型名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>排序权重</div>
          </div>
          <Input placeholder="请填写权重数值，默认权重为1" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>模型参数</div>
          </div>
          <div className={c.orderModelView}>
            <div className={c.orderInputView}>
              <Input placeholder="参数名称，如：数量" className={c.orderInput}></Input>
              <Input placeholder="参数提示语，如：请输入数量" className={c.orderInput}></Input>
              <Input placeholder="参数类型，如：text" className={c.orderInput}></Input>
              <Button size="small" danger className={c.orderBtn}>删除</Button>
            </div>
            <div className={c.orderInputView}>
              <Input placeholder="参数名称，如：数量" className={c.orderInput}></Input>
              <Input placeholder="参数提示语，如：请输入数量" className={c.orderInput}></Input>
              <Input placeholder="参数类型，如：text" className={c.orderInput}></Input>
              <Button size="small" danger className={c.orderBtn}>删除</Button>
            </div>
            <div onClick={()=>{}} className={c.orderModelAdd}>
              <img src={good8} alt="" className={c.orderModelAddImg}/>
              <div className={c.orderModelAddText}>添加</div>
            </div>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit}>保存</Button>
            <div className={c.btnTipsView}>
              <div className={c.quitBtn}>放弃编辑</div>
              <div className={c.quitBorder}/>
              <div className={c.saveBtn}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditOrderModelView

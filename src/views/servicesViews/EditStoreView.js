import React from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, Breadcrumb } from 'antd'
import 'react-quill/dist/quill.snow.css';
import good5 from '../../icons/good/good5.png'
import DropdownComponent from "../../components/DropdownComponent";
import { push } from "../../utils/util";

function EditStoreView () {

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/home")}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/store")}>供货商</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增供货商</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增供货商</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>供货商名称</div>
          </div>
          <Input placeholder="请输入供货商名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>供货商账号</div>
          </div>
          <Input placeholder="请输入供货商账号" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div style={{color:'#FF8D30'}}>填写商品进价之后，系统可以核算出每日的收益毛利。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>联系方式</div>
          </div>
          <div style={{width:'29.25%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <DropdownComponent keys={[]} placeholder="联系信息" style={{
              width: '23.931%',
              height: 40,
              marginTop:0,
              marginLeft:0,
              marginBottom:0,
              marginRight:'1.5%',
              color: '#34374A',
            }}/>
            <Input placeholder="请输入供货商联系方式" className={c.itemInput} style={{width:'70.94%'}}></Input>
          </div>
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

export default EditStoreView

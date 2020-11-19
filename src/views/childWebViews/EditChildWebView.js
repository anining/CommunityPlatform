import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import * as U from 'karet.util'
import { Input, Menu, Dropdown, Button, Select, message, Radio,  Breadcrumb } from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import good5 from '../../icons/good/good5.png'
import { DownOutlined } from '@ant-design/icons';
import { push } from "../../utils/util";

function EditChildWebView () {
  const [value, setValue] = useState()
  const [quillValue, setQuillValue] = useState()

  function onChange (e) {
    console.log('radio checked', e.target.value);
    setValue(e.target.value)
  }

  function handleMenuClick (e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        1st menu item
      </Menu.Item>
      <Menu.Item key="2">
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3">
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  const addonAfter = (
    <Select defaultValue=".com" className="select-after">
      <Select.Option value=".com">.com</Select.Option>
      <Select.Option value=".jp">.jp</Select.Option>
      <Select.Option value=".cn">.cn</Select.Option>
      <Select.Option value=".org">.org</Select.Option>
    </Select>
  );

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/home")}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/childWebList")}>分站列表</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>添加站点</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增分站</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>分站名称</div>
          </div>
          <Input placeholder="请输入分站名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>分站域名</div>
          </div>
          <Input placeholder="请输入域名前缀" addonAfter={addonAfter} className="link-input"></Input>
        </div>
        {
          U.ifElse(false,
          <>
            <div className={c.item}>
              <div className={c.itemName}>
                <span>*</span>
                <div className={c.itemText}>分站主账号</div>
              </div>
              <Button type="primary" className={c.itemBtn} style={{marginLeft:0}}>关联用户</Button>
            </div>
            <div className={c.itemTips}>
              <div className={c.itemName} />
              <div style={{color:'#FF8D30'}}>分站站长登录默认密码：a123456    为保证账户安全，请提醒分站站长及时修改密码。</div>
            </div>
          </>,
            <div className={c.item}>
              <div className={c.itemName}>
                <span>*</span>
                <div className={c.itemText}>分站主账号</div>
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'29.25%'}}>
                <div>121212121212</div>
                <Button type="primary" className={c.itemBtn} style={{marginLeft:0,width:122}}>重新关联用户</Button>
              </div>
            </div>
          )
        }
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>联系方式</div>
          </div>
          <div style={{width:'29.25%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <Dropdown overlay={menu}>
              <Button size="small" className={c.dropdownBtn}>
                <div className={c.hiddenText}>
                  联系方式
                </div>
                <DownOutlined />
              </Button>
            </Dropdown>
            <Input placeholder="请输入预留信息" className={c.itemInput} style={{width:'70.94%'}}></Input>
          </div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>站点状态</div>
          </div>
          <Radio.Group onChange={onChange} value={value} className={c.itemGrop} style={{justifyContent:'flex-start'}}>
            <Radio value={2} className={c.itemRadio} style={{width:'33.333%'}}>开启</Radio>
            <Radio value={3} className={c.itemRadio} style={{width:'33.333%'}}>关闭</Radio>
          </Radio.Group>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>关闭的站点，分站相关的站点无法被访问到。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>备注</div>
          </div>
          <ReactQuill className={c.quill} theme="snow" value={quillValue} onChange={setQuillValue}/>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit}>保存</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditChildWebView

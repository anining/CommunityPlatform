import React, { useState } from 'react'
import good8 from '../../icons/good/good8.png'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Button, Dropdown, message, Menu, Checkbox } from 'antd'
import good5 from '../../icons/good/good5.png'

function EditOrderModelView () {

  function handleMenuClick (e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
  );

  return (
    <div className="container">
      <div style={styles.header}>
        <img src={good5} alt="" style={{width:15,marginRight:15}}/>
        <div style={{color:'#979BA3'}}>首页 / 社区业务 / <span style={{color:'#2C68FF'}}>下单模型</span></div>
      </div>
      <div style={styles.main}>
        <h1>新增下单模型</h1>
        <div style={styles.tips}>带“ * ”的项目必须填写。</div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={styles.itemText}>模型名称</div>
          </div>
          <Input placeholder="请输入模型名称" style={styles.itemInput}></Input>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>排序权重</div>
          </div>
          <Input placeholder="请填写权重数值，默认权重为1" style={styles.itemInput}></Input>
        </div>
        <div style={styles.itemTips}>
          <div style={styles.itemName}>
          </div>
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={styles.itemText}>模型参数</div>
          </div>
          <div>
            <div style={{
              marginTop:25,
              display:'flex',
              alignItems:'center'
            }}>
              <Input placeholder="参数名称，如：数量" style={{
                width: 200,
                height:20,
                fontSize: 12,
              }}></Input>
              <Dropdown overlay={menu}>
                <Button size="small" style={styles.dropdown}>
                  参数提示语，如：请输入数量 <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button size="small" style={styles.dropdown}>
                  参数类型，如：text <DownOutlined />
                </Button>
              </Dropdown>
              <Button size="small" danger style={{marginLeft:15,fontSize:12,height:20}}>删除</Button>
            </div>
            <div onClick={()=>{}} style={{
              height:30,
              marginTop:25,
              width:60,
              borderWidth:1,
              borderStyle:'dashed',
              borderColor:'#6B95FF',
              background:'#F0F4FF',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
            }}>
              <img src={good8} alt="" style={{width:15,marginRight:5}}/>
              <div style={{color:'#6B95FF',fontSize:12}}>添加</div>
            </div>
          </div>
        </div>
        <div style={styles.itemTips}>
          <div style={styles.itemName}>
          </div>
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div style={{...styles.item,...{marginTop:50}}}>
          <div style={styles.itemName}>
          </div>
          <div>
            <Button type="primary" style={{width:300,marginLeft:50,fontSize:12}}>保存</Button>
            <div style={styles.btnView}>
              <div style={styles.quitBtn}>放弃编辑</div>
              <div style={styles.saveBtn}>保存</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  saveBtn: {
    color: '#4177FE',
    width: '50%',
    display: 'grid',
    placeItems: 'center'
  },
  quitBtn: {
    color: '#979BA3',
    width: '50%',
    display: 'grid',
    placeItems: 'center',
    borderRightColor: '#D8D8D8',
    borderRightWidth: 1,
    borderRightStyle: 'solid'
  },
  btnView: {
    width: 300,
    fontSize: 12,
    marginLeft: 50,
    marginTop: 15,
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    boxSizing: 'border-box',
    height: '7%',
    marginBottom: '2%',
    width: '100%',
    paddingLeft: '2%',
    paddingRight: '2%',
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
  },
  main: {
    boxSizing: 'border-box',
    paddingTop: '2%',
    minHeight: '50%',
    marginBottom: '2%',
    paddingLeft: '2%',
    paddingRight: '2%',
    background: '#fff',
    paddingBottom: '2%',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 25,
  },
  tips: {
    marginTop: 10,
    marginBottom: 10,
    color: '#FF5730',
    fontSize: 12,
  },
  itemName: {
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemText: {
    color: '#34374A',
    fontWeight: 500,
    marginLeft: 5,
    marginRight: 25,
  },
  itemInput: {
    width: 400,
    fontSize: 12,
  },
  itemBtn: {
    fontSize: 12,
    height: 28,
    marginLeft: 20,
  },
  uploadTips: {
    color: '#FF5730',
    paddingBottom: 5,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  itemTips: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
    color: '#919191',
    fontSize: 12,
  },
  dropdown: {
    marginLeft: 20,
    width: 200,
    height: 20,
    fontSize: 12
  },
}

export default EditOrderModelView

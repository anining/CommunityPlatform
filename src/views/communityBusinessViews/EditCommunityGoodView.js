import React, { useState } from 'react'
import { Input, Button, Upload, message, Radio, Checkbox } from 'antd'
import good5 from '../../icons/good/good5.png'

function EditCommunityGoodView () {

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={good5} alt="" style={{width:15,marginRight:15}}/>
        <div style={{color:'#979BA3'}}>首页 / 社区业务 / <span style={{color:'#2C68FF'}}>社区商品</span></div>
      </div>
      <div style={styles.main}>
        <h1>新增社区商品</h1>
        <div style={{marginTop:15,color:'#FF5730',fontSize:12}}>带“ * ”的项目必须填写。</div>
        <div style={{display:'flex',alignItems:'center',marginTop:35}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={{marginLeft:5,marginRight:25}}>分类名称</div>
          </div>
          <Input placeholder="请输入分类名称" style={{width:400}}></Input>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>排序权重</div>
          </div>
          <Input placeholder="请填写权重数值，默认权重为1" style={{width:400,marginRight:25}}></Input>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:10}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          </div>
          <div style={{color:'#919191',fontSize:12}}>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          </div>
          <div>
            <Button type="primary" style={{width:300,marginLeft:50}}>保存</Button>
            <div style={{width:300,marginLeft:50,marginTop:25,display:'flex',alignItems:'center'}}>
              <div style={{
                color:'#979BA3',
                fontSize:12,
                width:'50%',
                display:'grid',
                placeItems:'center',
                borderRightColor:'#D8D8D8',
                borderRightWidth:1,
                borderRightStyle:'solid'
              }}>放弃编辑</div>
              <div style={{
                color:'#4177FE',
                fontSize:12,
                width:'50%',
                display:'grid',
                placeItems:'center'
              }}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '100%',
  },
  header: {
    height: '12%',
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
    height: '86%',
    marginTop: '2%',
    paddingLeft: '2%',
    paddingRight: '2%',
    overflow: 'auto',
    background: '#fff',
    paddingBottom: 50,
  }
}

export default EditCommunityGoodView

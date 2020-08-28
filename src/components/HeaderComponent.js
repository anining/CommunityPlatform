import React from 'react'
import { Layout } from 'antd'

function HeaderComponent ({ collapsed, toggle }) {

  return (
    <Layout.Header style={{ padding: 0,height:60,background:"#fff",position:'fixed',zIndex:1,width:'100%' }}>
    </Layout.Header>
  )
}

export default HeaderComponent;

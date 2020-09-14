import React, { useState } from 'react'
import { Layout } from 'antd';
import HeaderComponent from './HeaderComponent'
import SiderComponent from './SiderComponent'
import ContentComponent from './ContentComponent'

function MainComponent () {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className='layoutView'>
      <SiderComponent collapsed={collapsed} toggle={()=>setCollapsed(!collapsed)} />
      <Layout>
        <HeaderComponent collapsed={collapsed}/>
        <ContentComponent />
      </Layout>
    </Layout>
  );
}

export default MainComponent;

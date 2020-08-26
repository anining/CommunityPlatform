import React, { useState } from 'react'
import { Layout } from 'antd';
import HeaderComponent from './HeaderComponent'
import SiderComponent from './SiderComponent'
import ContentComponent from './ContentComponent'

function MainComponent () {
  const [collapsed, setCollapsed] = useState(false)

  function toggle () {
    setCollapsed(!collapsed)
  };

  return (
    <Layout style={{height:'100%'}}>
      <SiderComponent collapsed={collapsed} />
      <Layout className="site-layout">
        <HeaderComponent collapsed={collapsed} toggle={toggle}/>
        <ContentComponent />
      </Layout>
    </Layout>
  );
}

export default MainComponent;

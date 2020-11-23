import React, { useState } from 'react'
import { Layout } from 'antd';
import HeaderComponent from './HeaderComponent'
import SiderComponent from './SiderComponent'
import ContentComponent from './ContentComponent'
import { setter, getter } from '../utils/store'

function MainComponent () {
  const [collapsed, setCollapsed] = useState(false)

  return (
		<Layout id="lay" className='layoutView' onClick={() => {
			// setter([["visible", Date.now()]])
		}}>
      <SiderComponent collapsed={collapsed} toggle={()=>setCollapsed(!collapsed)} />
      <HeaderComponent collapsed={collapsed}/>
      <Layout>
        <ContentComponent />
      </Layout>
    </Layout>
  );
}

export default MainComponent;

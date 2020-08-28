import React, { useState } from 'react'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Button, Dropdown, message, Menu, Checkbox } from 'antd'
import good5 from '../../icons/good/good5.png'
import good8 from '../../icons/good/good8.png'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function EditGoodCategoryView () {
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState()
  const [value, setValue] = useState()

  function getBase64 (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function handleChange (info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  function beforeUpload (file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={good5} alt="" style={{width:15,marginRight:15}}/>
        <div style={{color:'#979BA3'}}>首页 / 社区业务 / <span style={{color:'#2C68FF'}}>下单模型</span></div>
      </div>
      <div style={styles.main}>
        <h1>新增下单模型</h1>
        <div style={{marginTop:15,color:'#FF5730',fontSize:12}}>带“ * ”的项目必须填写。</div>
        <div style={{display:'flex',alignItems:'center',marginTop:35}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={{marginLeft:5,marginRight:25}}>模型名称</div>
          </div>
          <Input placeholder="请输入模型名称" style={{width:400}}></Input>
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
            <div style={{marginLeft:5,marginRight:25}}>排序权重</div>
          </div>
          <div>
            <div>
              <div style={{
                marginTop:25,
                display:'flex',
                alignItems:'center'
              }}>
                <Input placeholder="参数名称，如：数量" size="small"/>
                <Dropdown overlay={menu}>
                  <Button size="small" style={{marginLeft:15}}>
                    参数提示语，如：请输入数量 <DownOutlined />
                  </Button>
                </Dropdown>
                <Dropdown overlay={menu}>
                  <Button size="small" style={{marginLeft:15}}>
                    参数类型，如：text <DownOutlined />
                  </Button>
                </Dropdown>
                <Button size="small" danger style={{marginLeft:15}}>删除</Button>
              </div>
              <div style={{
                marginTop:25,
                display:'flex',
                alignItems:'center'
              }}>
                <Input placeholder="参数名称，如：数量" size="small"/>
                <Dropdown overlay={menu}>
                  <Button size="small" style={{marginLeft:15}}>
                    参数提示语，如：请输入数量 <DownOutlined />
                  </Button>
                </Dropdown>
                <Dropdown overlay={menu}>
                  <Button size="small" style={{marginLeft:15}}>
                    参数类型，如：text <DownOutlined />
                  </Button>
                </Dropdown>
                <Button size="small" danger style={{marginLeft:15}}>删除</Button>
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
                <img src={good8} alt="" style={{width:16,marginRight:5}}/>
                <div style={{color:'#6B95FF',fontSize:12}}>添加</div>
              </div>
            </div>
          </div>
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

export default EditGoodCategoryView

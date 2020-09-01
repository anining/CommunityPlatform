import React, { useState } from 'react'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Button, Upload, message, Radio, Dropdown, Menu } from 'antd'
import good5 from '../../icons/good/good5.png'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function EditCardManageView () {
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

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
        <div style={{color:'#979BA3'}}>首页 / 卡密业务 / <span style={{color:'#2C68FF'}}>卡密商品</span></div>
      </div>
      <div style={styles.main}>
        <h1>新增卡密商品</h1>
        <div style={styles.tips}>带“ * ”的项目必须填写。</div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>商品名称</div>
          </div>
          <Input placeholder="请输入商品名称" style={styles.itemInput}></Input>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={styles.itemText}>商品图片</div>
          </div>
          <Input placeholder="请填写图片链接或者上传图片" style={styles.itemInput}></Input>
          <Button type="primary" style={styles.itemBtn}>解析图片</Button>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
          </div>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: 100 }} /> : uploadButton}
          </Upload>
          <div style={styles.uploadTips}>商品图片最多存在1张</div>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>商品分类</div>
          </div>
          <Input placeholder="请填写图片链接或者上传分类" style={styles.itemInput}></Input>
          <Button type="primary" style={styles.itemBtn}>新增分类</Button>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={styles.itemText}>卡密类型</div>
          </div>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1} style={{marginRight:50,fontSize:12,color:'#979BA3'}}>已上架</Radio>
            <Radio value={2} style={{marginRight:50,fontSize:12,color:'#979BA3'}}>已下架</Radio>
            <Radio value={3} style={{marginRight:50,fontSize:12,color:'#979BA3'}}>已上架但关闭下单</Radio>
          </Radio.Group>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={styles.itemText}>卡密模版</div>
          </div>
          <div>
            <div>
              <Button size="small" style={{
                fontsize: 12,
                height: 28,
                marginRight: 20,
                width:70
              }} type="primary">卡号</Button>
              <Button size="small" style={{
                fontsize: 12,
                height: 28,
                marginRight: 20,
                width:70
              }} >卡密</Button>
              <Button size="small" style={{
                fontsize: 12,
                height: 28,
                marginRight: 20,
                width:70
              }} >订单号</Button>
              <Button size="small" style={{
                fontsize: 12,
                height: 28,
                marginRight: 20,
                width:70
              }} >下单时间</Button>
              <Button size="small" style={{
                fontsize: 12,
                height: 28,
                marginRight: 20,
                width:70
              }} >支付时间</Button>
            </div>
          </div>
        </div>
        <div style={styles.itemTips}>
          <div style={styles.itemName}>
          </div>
          <div>点击选项直接插入模版</div>
        </div>
        <div style={styles.itemTips}>
          <div style={styles.itemName}>
          </div>
          <Input.TextArea
            value={value}
            style={{width:400,fontSize:12}}
            onChange={onChange}
            placeholder="卡号: [卡号]"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>目标描述</div>
          </div>
          <Input.TextArea
            value={value}
            style={{width:400,fontSize:12}}
            onChange={onChange}
            placeholder="请输入商品介绍，可以是HTML代码"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>预留方式</div>
          </div>
          <div>
            <Dropdown overlay={menu}>
              <Button size="small" style={{
                marginRight: 20,
                height: 28,
                width:80,
                fontSize: 12
              }}>QQ<DownOutlined />
              </Button>
            </Dropdown>
            <Input placeholder="请输入预留信息" style={{
              width: 300,
              fontSize: 12,
            }}></Input>
          </div>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={styles.itemText}>进价</div>
          </div>
          <Input placeholder="请输入商品进价" style={styles.itemInput}></Input>
        </div>
        <div style={styles.itemTips}>
          <div style={styles.itemName}>
          </div>
          <div>填写商品进价之后，系统可以核算出每日的收益毛利。</div>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>单价</div>
          </div>
          <Input placeholder="请输入商品销售单价" style={styles.itemInput}></Input>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={styles.itemText}>密价</div>
          </div>
          <Input placeholder="请输入商品对接密价" style={styles.itemInput}></Input>
        </div>
        <div style={styles.itemTips}>
          <div style={styles.itemName}>
          </div>
          <div>如果不填写此项目，系统将会使用售价进行对接。</div>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>库存预警</div>
          </div>
          <Input placeholder="请输入值" style={styles.itemInput}></Input>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={styles.itemText}>库存展示</div>
          </div>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1} style={{marginRight:50,fontSize:12,color:'#979BA3'}}>真实库存</Radio>
            <Radio value={2} style={{marginRight:50,fontSize:12,color:'#979BA3'}}>虚拟库存</Radio>
          </Radio.Group>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={styles.itemText}>卡密类型</div>
          </div>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1} style={{marginRight:50,fontSize:12,color:'#979BA3'}}>已上架</Radio>
            <Radio value={2} style={{marginRight:50,fontSize:12,color:'#979BA3'}}>已下架</Radio>
            <Radio value={3} style={{marginRight:50,fontSize:12,color:'#979BA3'}}>已上架但关闭下单</Radio>
          </Radio.Group>
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
        <div style={{...styles.item,...{marginTop:50}}}>
          <div style={styles.itemName}>
          </div>
          <div>
            <Button type="primary" style={{width:300,marginLeft:50,fontSize:12}}>保存</Button>
            <div style={styles.btnView}>
              <div style={styles.quitBtn}>放弃编辑</div>
              <div style={styles.saveBtn}>保存并新增</div>
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
    fontsize: 12,
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
  }
}

export default EditCardManageView

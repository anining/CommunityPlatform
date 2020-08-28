import React, { useState } from 'react'
import { Input, Button, Upload, message, Radio, Checkbox } from 'antd'
import good5 from '../../icons/good/good5.png'
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
        <div style={{color:'#979BA3'}}>首页 / 社区业务 / <span style={{color:'#2C68FF'}}>社区商品</span></div>
      </div>
      <div style={styles.main}>
        <h1>新增社区商品</h1>
        <div style={{marginTop:15,color:'#FF5730',fontSize:12}}>带“ * ”的项目必须填写。</div>
        <div style={{display:'flex',alignItems:'center',marginTop:35}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={{marginLeft:5,marginRight:25}}>商品名称</div>
          </div>
          <Input placeholder="请输入商品名称" style={{width:400}}></Input>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>商品图片</div>
          </div>
          <Input placeholder="请填写图片链接或者上传图片" style={{width:400,marginRight:25}}></Input>
          <Button type="primary">解析图片</Button>
        </div>
        <div style={{
          marginTop:25,
          display:'flex',
          alignItems:'flex-end',
          justifyContent:'flex-start',
        }}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
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
          <div style={{color:'#FF5730',paddingBottom:5}}>商品图片最多存在1张</div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={{marginLeft:5,marginRight:25}}>商品分类</div>
          </div>
          <Input placeholder="请填写图片链接或者上传分类" style={{width:400,marginRight:25}}></Input>
          <Button type="primary">新增分类</Button>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={{marginLeft:5,marginRight:25}}>下单模型</div>
          </div>
          <Input placeholder="请设置下单模型" style={{width:400,marginRight:25}}></Input>
          <Button type="primary">新增模型</Button>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>进价</div>
          </div>
          <Input placeholder="请输入商品进价" style={{width:400,marginRight:25}}></Input>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:10}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          </div>
          <div style={{color:'#919191',fontSize:12}}>填写商品进价之后，系统可以核算出每日的收益毛利。</div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={{marginLeft:5,marginRight:25}}>单价</div>
          </div>
          <Input placeholder="请输入销售商品单价" style={{width:400,marginRight:25}}></Input>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>密价</div>
          </div>
          <Input placeholder="请输入商品进价" style={{width:400,marginRight:25}}></Input>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:10}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          </div>
          <div style={{color:'#919191',fontSize:12}}>如果不填写此项目，系统将会使用售价进行对接。</div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={{marginLeft:5,marginRight:25}}>单位</div>
          </div>
          <Input placeholder="请输入商品的计算单位" style={{width:400,marginRight:25}}></Input>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>最低数量</div>
          </div>
          <Input placeholder="该商品每一单最低多少起下，默认为1" style={{width:400,marginRight:25}}></Input>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>最高数量</div>
          </div>
          <Input placeholder="该商品每一单最高多下多少个，默认为100000" style={{width:400,marginRight:25}}></Input>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>重复下单</div>
          </div>
          <Input placeholder="允许重复下单的数量" style={{width:400,marginRight:25}}></Input>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:10}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          </div>
          <div style={{color:'#919191',fontSize:12}}>如果该商品不允许重复下单， 请填写0或者不填写</div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>批量下单</div>
          </div>
          <Input placeholder="允许批量下单的数量" style={{width:400,marginRight:25}}></Input>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:10}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          </div>
          <div style={{color:'#919191',fontSize:12}}>如果该商品不允许批量下单， 请填写0或者不填写</div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>状态</div>
          </div>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1} style={{marginRight:50}}>已上架</Radio>
            <Radio value={2} style={{marginRight:50}}>已下架</Radio>
            <Radio value={3}>已上架但关闭下单</Radio>
          </Radio.Group>
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
            <div style={{marginLeft:5,marginRight:25}}>状态</div>
          </div>
          <div>
            <Checkbox onChange={onChange}>退单</Checkbox>
            <Checkbox onChange={onChange}>补打</Checkbox>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>目标描述</div>
          </div>
          <Input.TextArea
            value={value}
            style={{width:400}}
            onChange={onChange}
            placeholder="请输入商品介绍，可以是HTML代码"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
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
              }}>保存</div>
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

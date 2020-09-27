import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Menu, Button, Upload, message, Radio, Breadcrumb } from 'antd'
import ReactQuill from 'react-quill';
import good5 from '../../icons/good/good5.png'
import edit1 from '../../icons/edit/edit1.png'
import { MODULES } from "../../utils/config";
import DropdownComponent from "../../components/DropdownComponent";
import {push} from "../../utils/util";

function EditCardGoodView () {
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState()
  const [value, setValue] = useState()
  const [quillValue, setQuillValue] = useState("")

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

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/home")}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/cardGood")}>卡密商品</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增商品</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增卡密商品</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>商品名称</div>
          </div>
          <Input placeholder="请输入商品名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品图片</div>
          </div>
          <Input placeholder="请填写图片链接或者上传图片" className={c.itemInput}></Input>
          <Button type="primary" className={c.itemBtn}>解析图片</Button>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>商品图片</div>
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
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: 100 }} /> :
              <div>
                <img src={edit1} alt="" className={c.uploadImg}/>
                <div className={c.uploadText}>上传图片</div>
              </div>
            }
          </Upload>
          <div className={c.uploadTips}>商品图片最多存在1张</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>商品分类</div>
          </div>
            <DropdownComponent keys={[]} placeholder="请设置商品分类" style={{
              width:"29.25%",
              height:40,
              marginTop:0,
              marginBottom:0,
              marginLeft:0,
              marginRight:0,
              color:'rgba(0,0,0,0.25)'
            }}/>
            <Button type="primary" className={c.itemBtn}>新增分类</Button>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>卡密类型</div>
          </div>
          <Radio.Group onChange={onChange} value={value} className={c.itemGrop}>
            <Radio value={1} className={c.itemRadio}>已上架</Radio>
            <Radio value={2} className={c.itemRadio}>已下架</Radio>
            <Radio value={3} className={c.itemRadio}>已上架但关闭下单</Radio>
          </Radio.Group>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>卡密模版</div>
          </div>
          <div style={{width:'80%'}}>
            <div style={{display:'flex',alignItems:'center'}}>
              <Button className={c.cardModel} style={{background:'#4177FE',color:'#fff'}}>卡号</Button>
              <Button className={c.cardModel}>卡密</Button>
              <Button className={c.cardModel}>订单号</Button>
              <Button className={c.cardModel}>下单时间</Button>
              <Button className={c.cardModel}>支付时间</Button>
            </div>
            <div style={{color:'#919191',fontSize:'0.857rem',marginTop:6,marginBottom:16}}>点击选项直接插入模版</div>
            <Input.TextArea rows={10} style={{height:139,color:'#34374A',width:"36.562%"}}/>
          </div>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>目标描述</div>
          </div>
          <ReactQuill className={c.quill} modules={MODULES} theme="snow" value={quillValue} onChange={setQuillValue}/>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>预留方式</div>
          </div>
          <div style={{width:'29.25%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <DropdownComponent keys={[]} placeholder="预留信息" style={{
              width:"23.931%",
              height:40,
              marginTop:0,
              marginBottom:0,
              marginLeft:0,
              marginRight:'1.5%',
              color:'#34374A'
            }}/>
            <Input placeholder="请输入预留信息" className={c.itemInput} style={{width:'70.94%'}}></Input>
          </div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>进价</div>
          </div>
          <Input placeholder="请输入商品进价" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>填写商品进价之后，系统可以核算出每日的收益毛利。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>单价</div>
          </div>
          <Input placeholder="请输入商品销售单价" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>密价</div>
          </div>
          <Input placeholder="请输入商品对接密价" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>如果不填写此项目，系统将会使用售价进行对接。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>库存预警</div>
          </div>
          <Input placeholder="请输入值" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>库存展示</div>
          </div>
          <Radio.Group onChange={onChange} value={value} className={c.itemGrop} style={{justifyContent:'flex-start'}}>
            <Radio value={2} className={c.itemRadio} style={{width:'33.333%'}}>真实库存</Radio>
            <Radio value={3} className={c.itemRadio} style={{width:'33.333%'}}>虚拟库存</Radio>
          </Radio.Group>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>状态</div>
          </div>
          <Radio.Group onChange={onChange} value={value} className={c.itemGrop}>
            <Radio value={1} className={c.itemRadio} style={{width:'33.333%'}}>已上架</Radio>
            <Radio value={2} className={c.itemRadio} style={{width:'33.333%'}}>已下架</Radio>
            <Radio value={3} className={c.itemRadio} style={{width:'33.333%'}}>已上架但关闭下单</Radio>
          </Radio.Group>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>排序权重</div>
          </div>
          <Input placeholder="请填写权重数值，默认权重为1" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div className={c.item} style={{alignItems:"flex-start"}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>备注</div>
          </div>
          <ReactQuill className={c.quill} modules={MODULES} theme="snow" value={quillValue} onChange={setQuillValue}/>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit}>保存</Button>
            <div className={c.btnTipsView}>
              <div className={c.quitBtn}>放弃编辑</div>
              <div className={c.quitBorder}/>
              <div className={c.saveBtn}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCardGoodView

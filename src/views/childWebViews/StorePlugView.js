import React, { useState, useEffect } from 'react'
import c from '../../styles/edit.module.css'
import cs from '../../styles/childWebSetting.module.css'
import { Input, Switch, Button, Upload, message, Radio, Checkbox, Breadcrumb } from 'antd'
import ReactQuill from 'react-quill';
import edit1 from '../../icons/edit/edit1.png'
import good76 from '../../icons/good/good76.png'
import { goBack, saveSuccess, push } from "../../utils/util";
import { MODULES } from "../../utils/config";
import QRCode from 'qrcode.react'

function StorePlugView () {
  const [pics, setPics] = useState([])
  const [introduction, setIntroduction] = useState("")
  const [imageUrl, setImageUrl] = useState(pics[0])
  const [loading, setLoading] = useState(false)
  const [selected,setSelected] = useState(1)

  const THEMES = [
    {
      id: 1,
      label: '活力红',
      color: '#FF2628',
    },
    {
      id: 2,
      label: '商务蓝',
      color: '#0A90FF',
    },
    {
      id: 3,
      label: '阳光橙',
      color: '#FF531A',
    },
    {
      id: 4,
      label: '生命绿',
      color: '#68C066',
    },
    {
      id: 5,
      label: '尊贵金',
      color: '#E9B968',
    },
  ]

  function save () {

  }

  function parsing () {
    imageUrl && setPics([imageUrl])
  }

  function getBase64 (img, callback) {
    // const reader = new FileReader();
    // reader.addEventListener('load', () => callback(reader.result));
    // reader.readAsDataURL(img);
  }

  function handleChange (info) {
    // if (info.file.status === 'uploading') {
    //   this.setState({ loading: true });
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, imageUrl =>
    //     this.setState({
    //       imageUrl,
    //       loading: false,
    //     }),
    //   );
    // }
  };

  function beforeUpload (file) {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    // return isJpgOrPng && isLt2M;
  }

  return (
    <div className={c.container}>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>基础装饰</div>
          <div className={c.circle} />
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>商标或ICON</div>
          </div>
          <Input onChange={e=>setImageUrl(e.target.value)} value={imageUrl} placeholder="请填写图片链接或者上传图片" className={c.itemInput}></Input>
          <Button type="primary" className={c.itemBtn} onClick={parsing}>解析图片</Button>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
          </div>
          <Upload
            disabled={true}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {pics.length ? <img src={pics[0]} alt="avatar" style={{ width: 100 }} /> :
              <div>
                <img src={edit1} alt="" className={c.uploadImg}/>
                <div className={c.uploadText}>上传图片</div>
              </div>
            }
          </Upload>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div style={{color:'#FF8D30'}}>商品图片最多存在1张；</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>游客模式</div>
          </div>
          <div className={cs.switchView}>
            <Switch defaultChecked className={cs.switch}/>
            <div className={cs.switchText}>当前状态 ： 开启首页轮播图</div>
          </div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
          </div>
          <Input onChange={e=>setImageUrl(e.target.value)} value={imageUrl} placeholder="参数名称，如：数量" className={c.itemInput}></Input>
          <Button type="primary" className={c.itemBtn} onClick={parsing}>解析图片</Button>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
          </div>
          <Upload
            disabled={true}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {pics.length ? <img src={pics[0]} alt="avatar" style={{ width: 100 }} /> :
            <div style={{width:200}}>
                <img src={edit1} alt="" className={c.uploadImg}/>
                <div className={c.uploadText}>上传图片</div>
              </div>
            }
          </Upload>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div style={{color:'#FF8D30'}}>建议大小60px * 60px</div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div style={{color:'#FF8D30'}}>商品图片最多存在5张,超过自动替换第一张图片。</div>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>店铺首页公告</div>
          </div>
          <ReactQuill modules={MODULES} className={c.quill} theme="snow" value={introduction} onChange={e=>setIntroduction(e)}/>
        </div>
        <div className={c.headerT} style={{marginTop:60}}>
          <div style={{zIndex:1}}>模版和主题</div>
          <div className={c.circle} />
        </div>
        <div className={cs.theme}>主题配色</div>
        <div style={{display:'flex',alignItems:'flex-start'}}>
          <div style={{marginRight:18,flexShrink:0}}>选择配色方案：</div>
          {
            THEMES.map(i=>(
              <div className={cs.theme_item} key={i.id} onClick={()=>setSelected(i.id)}>
                {
                  i.id===selected?
                    <img src={good76} alt="" className={cs.theme_radio_true} />:
                    <div className={cs.theme_radio_false} />
                }
                <div className={cs.theme_item_t} style={{borderColor:"#0A90FF",background:i.color}}></div>
                <div className={cs.theme_item_b}>{i.label}</div>
              </div>
            ))
          }
          <div className={cs.theme_look}>
            <QRCode bgColor="#fff" fgColor="#2C68FF" value="http://facebook.github.io/react/" size={124}/>
            <div>手机版扫码预览</div>
          </div>
        </div>
        <div className={c.item} style={{marginTop:0}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button loading={loading} type="primary" onClick={()=>save(true)} className={c.submit}>保存</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StorePlugView

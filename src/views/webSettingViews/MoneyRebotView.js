import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Switch,Input, Button, Upload, message } from 'antd'
import ReactQuill from 'react-quill';
import ImgCrop from 'antd-img-crop';
import good5 from '../../icons/good/good5.png'
import good75 from '../../icons/good/good75.png'
import cs from '../../styles/childWebSetting.module.css'
import edit1 from '../../icons/edit/edit1.png'
import { MODULES } from "../../utils/config";

function MoneyRebotView () {
  const [value, setValue] = useState()
  const [quillValue, setQuillValue] = useState("")
	const [fileList, setFileList] = useState([])
	const [weChatFileList, setWeChatFileList] = useState([])

  async function onPreview (file) {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      })
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  }

  function onChange (e) {
    console.log('radio checked', e);
    // setValue(e.target.value)
  }

  return (
    <div className={c.container}>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>使用加款机器人</div>
          <div className={c.circle} />
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>加款机器人</div>
          </div>
          <div className={cs.switchView}>
            <Switch defaultChecked onChange={onChange} className={cs.switch}/>
            <div className={cs.switchText} style={{color:value?"rgb(44, 104, 255)":"rgb(52, 55, 74)"}}>当前状态 ： 开启加款机器人支付</div>
          </div>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName} style={{width:120}}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>收款二维码</div>
          </div>
          <div className={cs.qr_code}>
            <div className={cs.qr_code_top}>
              <div className={cs.rebot_upload}>
                <div style={{marginRight:25}}>支付宝</div>
								<ImgCrop rotate>
									<Upload
										action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
										listType="picture-card"
										fileList={fileList}
										onChange={({ fileList: newFileList })=> setFileList(newFileList.slice(-1))}
										onPreview={onPreview}
									>
										<div className={cs.upload_qr_code}>
											<img src={good75} alt="" className={c.uploadImg}/>
											<div className={c.uploadText}>上传二维码</div>
										</div>
									</Upload>
								</ImgCrop>
              </div>
              <div className={cs.rebot_upload}>
                <div style={{marginRight:25}}>微信</div>
								<ImgCrop rotate>
									<Upload
										action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
										listType="picture-card"
										fileList={weChatFileList}
										onChange={({ fileList: newFileList })=> setWeChatFileList(newFileList.slice(-1))}
										onPreview={onPreview}
									>
										<div className={cs.upload_qr_code}>
											<img src={good75} alt="" className={c.uploadImg}/>
											<div className={c.uploadText}>上传二维码</div>
										</div>
									</Upload>
								</ImgCrop>
              </div>
            </div>
            <div className={cs.qr_code_bottom}>
              <div>加款API地址：<span style={{color:"#2c68ff"}}>https://www.baidu.com/api/add</span></div>
              <Button type="primary" className={cs.rebot_bottom_btn}>访问</Button>
            </div>
          </div>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName} style={{width:120}}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>充值教程</div>
          </div>
          <ReactQuill modules={MODULES} className={c.quill} theme="snow" value={quillValue} onChange={setQuillValue}/>
        </div>
        <div className={c.headerT} style={{marginTop:40}}>
          <div style={{zIndex:1}}>使用支付宝支付</div>
          <div className={c.circle} />
        </div>
        <Button type="primary" className={cs.path_btn}>申请地址</Button>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>支付宝支付</div>
          </div>
          <div className={cs.switchView}>
            <Switch defaultChecked onChange={onChange} className={cs.switch}/>
            <div className={cs.switchText} style={{color:value?"rgb(44, 104, 255)":"rgb(52, 55, 74)"}}>当前状态 ： 开启支付宝支付</div>
          </div>
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span>*</span>
            <div className={c.itemText}>APPID</div>
          </div>
          <Input maxLength={20} onChange={e=>{}} placeholder="请输入APPID" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span>*</span>
            <div className={c.itemText}>支付宝公钥(RSA2)</div>
          </div>
          <Input maxLength={20} onChange={e=>{}} placeholder="请输入支付宝公钥(RSA2)" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span>*</span>
            <div className={c.itemText}>商户私钥(RSA2)</div>
          </div>
          <Input maxLength={20} onChange={e=>{}} placeholder="请输入商户私钥(RSA2)" className={c.itemInput}></Input>
        </div>
        <div className={c.headerT} style={{marginTop:40}}>
          <div style={{zIndex:1}}>使用微信扫码(H5)支付</div>
          <div className={c.circle} />
        </div>
        <Button type="primary" className={cs.path_btn}>申请地址</Button>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>微信支付</div>
          </div>
          <div className={cs.switchView}>
            <Switch defaultChecked onChange={onChange} className={cs.switch}/>
            <div className={cs.switchText} style={{color:value?"rgb(44, 104, 255)":"rgb(52, 55, 74)"}}>当前状态 ： 开启微信扫码支付</div>
          </div>
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span>*</span>
            <div className={c.itemText}>微信公众号APPID</div>
          </div>
          <Input maxLength={20} onChange={e=>{}} placeholder="请输入微信公众号APPID" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span>*</span>
            <div className={c.itemText}>微信支付商户号</div>
          </div>
          <Input maxLength={20} onChange={e=>{}} placeholder="请输入微信支付商户号" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span>*</span>
            <div className={c.itemText}>微信支付商户密钥</div>
          </div>
          <Input maxLength={20} onChange={e=>{}} placeholder="请输入微信支付商户密钥" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span>*</span>
            <div className={c.itemText}>微信公众号APPSECRET</div>
          </div>
          <Input maxLength={20} onChange={e=>{}} placeholder="请输入微信公众号APPSECRET" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span>*</span>
            <div className={c.itemText}>微信支付指定域名</div>
          </div>
          <Input maxLength={20} onChange={e=>{}} placeholder="请输入微信支付指定域名" className={c.itemInput}></Input>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName} style={{width:120}}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit}>保存</Button>
            <div className={c.btnTipsView} style={{justifyContent:'center'}}>
              <div>上次保存: 202.01.15 15:20:05</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoneyRebotView

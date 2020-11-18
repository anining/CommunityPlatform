import React, { useState, useEffect } from 'react'
import c from '../../styles/edit.module.css'
import { Switch, Input, Button, Upload, message } from 'antd'
import { MODULES } from "../../utils/config";
import ImgCrop from 'antd-img-crop';
import good5 from '../../icons/good/good5.png'
import ReactQuill from 'react-quill';
import good75 from '../../icons/good/good75.png'
import cs from '../../styles/childWebSetting.module.css'
import edit1 from '../../icons/edit/edit1.png'
import {botConfig} from '../../utils/api';
import {beforeUpload, saveSuccess} from '../../utils/util';
import ClipboardJS from 'clipboard'

function MoneyRebotView () {
	const [loading, setLoading] = useState(false)
	const [addFundApi] = useState("https://easydoc.xyz/s/85631950/b7F85hU0/uGLViMRi")
	const [secret, setSecret] = useState()
	const [tutorial, setTutorial] = useState("")
	const [alipayQrcode, setAlipayQrcode] = useState([])
	const [wechatpayQrcode, setWechatpayQrcode] = useState([])

  useEffect(() => {
    botConfig('get').then(r => {
      if (!r.error) {
        const { add_fund_api, alipay_qrcode, secret, tutorial = "", wechatpay_qrcode } = r.data
				setSecret(secret)
				setTutorial(tutorial)
				if(wechatpay_qrcode) {
					setWechatpayQrcode([{
						uid: '-1',
						name: 'image.png',
						status: 'done',
						url: wechatpay_qrcode,
					}])
				}
				if(alipay_qrcode) {
					setAlipayQrcode([{
						uid: '-1',
						name: 'image.png',
						status: 'done',
						url: alipay_qrcode,
					}])
				}
      }
    })
  }, [])

	useEffect(()=>{
		const clipboard = new ClipboardJS('#btn');
		clipboard.on('success', function(e) {
				console.info('Action:', e.action);
				console.info('Text:', e.text);
				console.info('Trigger:', e.trigger);
				e.clearSelection();
		});
		clipboard.on('error', function(e) {
				console.error('Action:', e.action);
				console.error('Trigger:', e.trigger);
		});
		},[])

	const save = () => {
		if(!wechatpayQrcode.length || !alipayQrcode.length) {
			message.warning("请完善信息")
			return
		}
    setLoading(true)
		botConfig('modify', { wechatpay_qrcode: wechatpayQrcode[0].url, tutorial, alipay_qrcode: alipayQrcode[0].url }).then(r => {
      setLoading(false);
      !r.error && saveSuccess(false)
    }).catch(() => {
      setLoading(false)
    })
	}

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
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName} style={{width:120}}> */}
        {/*     <span className={c.white}>*</span> */}
        {/*     <div className={c.itemText}>加款机器人</div> */}
        {/*   </div> */}
        {/*   <div className={cs.switchView}> */}
        {/*     <Switch defaultChecked onChange={onChange} className={cs.switch}/> */}
        {/*     <div className={cs.switchText} style={{color:value?"rgb(44, 104, 255)":"rgb(52, 55, 74)"}}>当前状态 ： 开启加款机器人支付</div> */}
        {/*   </div> */}
        {/* </div> */}
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
										action={file=>beforeUpload(file, alipayQrcode, setAlipayQrcode)}
										listType="picture-card"
										fileList={alipayQrcode}
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
										action={file=>beforeUpload(file, wechatpayQrcode, setWechatpayQrcode)}
										listType="picture-card"
										fileList={wechatpayQrcode}
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
              <div>加款接口：<span style={{color:"#2c68ff"}}>{ addFundApi }</span></div>
							<Button type="primary" onClick={()=>window.open(addFundApi,"_blank")} className={cs.rebot_bottom_btn}>访问</Button>
            </div>
          </div>
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:120}}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>加款密钥</div>
          </div>
					****
					<Button id="btn" type="primary" data-clipboard-text={secret} className={c.itemBtn} onClick={()=>{
						message.success("复制成功")
					}}>点击复制</Button>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName} style={{width:120}}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>充值教程</div>
          </div>
          <ReactQuill className={c.quill} modules={MODULES} theme="snow" value={tutorial} onChange={e=>setTutorial(e)}/>
        </div>
        {/* <div className={c.headerT} style={{marginTop:40}}> */}
        {/*   <div style={{zIndex:1}}>使用支付宝支付</div> */}
        {/*   <div className={c.circle} /> */}
        {/* </div> */}
        {/* <Button type="primary" className={cs.path_btn}>申请地址</Button> */}
        {/* <div className={c.tips}>带“ * ”的项目必须填写。</div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName} style={{width:120}}> */}
        {/*     <span className={c.white}>*</span> */}
        {/*     <div className={c.itemText}>支付宝支付</div> */}
        {/*   </div> */}
        {/*   <div className={cs.switchView}> */}
        {/*     <Switch defaultChecked onChange={onChange} className={cs.switch}/> */}
        {/*     <div className={cs.switchText} style={{color:value?"rgb(44, 104, 255)":"rgb(52, 55, 74)"}}>当前状态 ： 开启支付宝支付</div> */}
        {/*   </div> */}
        {/* </div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName} style={{width:120}}> */}
        {/*     <span>*</span> */}
        {/*     <div className={c.itemText}>APPID</div> */}
        {/*   </div> */}
        {/*   <Input maxLength={20} onChange={e=>{}} placeholder="请输入APPID" className={c.itemInput}></Input> */}
        {/* </div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName} style={{width:120}}> */}
        {/*     <span>*</span> */}
        {/*     <div className={c.itemText}>支付宝公钥(RSA2)</div> */}
        {/*   </div> */}
        {/*   <Input maxLength={20} onChange={e=>{}} placeholder="请输入支付宝公钥(RSA2)" className={c.itemInput}></Input> */}
        {/* </div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName} style={{width:120}}> */}
        {/*     <span>*</span> */}
        {/*     <div className={c.itemText}>商户私钥(RSA2)</div> */}
        {/*   </div> */}
        {/*   <Input maxLength={20} onChange={e=>{}} placeholder="请输入商户私钥(RSA2)" className={c.itemInput}></Input> */}
        {/* </div> */}
        {/* <div className={c.headerT} style={{marginTop:40}}> */}
        {/*   <div style={{zIndex:1}}>使用微信扫码(H5)支付</div> */}
        {/*   <div className={c.circle} /> */}
        {/* </div> */}
        {/* <Button type="primary" className={cs.path_btn}>申请地址</Button> */}
        {/* <div className={c.tips}>带“ * ”的项目必须填写。</div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName} style={{width:120}}> */}
        {/*     <span className={c.white}>*</span> */}
        {/*     <div className={c.itemText}>微信支付</div> */}
        {/*   </div> */}
        {/*   <div className={cs.switchView}> */}
        {/*     <Switch defaultChecked onChange={onChange} className={cs.switch}/> */}
        {/*     <div className={cs.switchText} style={{color:value?"rgb(44, 104, 255)":"rgb(52, 55, 74)"}}>当前状态 ： 开启微信扫码支付</div> */}
        {/*   </div> */}
        {/* </div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName} style={{width:120}}> */}
        {/*     <span>*</span> */}
        {/*     <div className={c.itemText}>微信公众号APPID</div> */}
        {/*   </div> */}
        {/*   <Input maxLength={20} onChange={e=>{}} placeholder="请输入微信公众号APPID" className={c.itemInput}></Input> */}
        {/* </div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName} style={{width:120}}> */}
        {/*     <span>*</span> */}
        {/*     <div className={c.itemText}>微信支付商户号</div> */}
        {/*   </div> */}
        {/*   <Input maxLength={20} onChange={e=>{}} placeholder="请输入微信支付商户号" className={c.itemInput}></Input> */}
        {/* </div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName} style={{width:120}}> */}
        {/*     <span>*</span> */}
        {/*     <div className={c.itemText}>微信支付商户密钥</div> */}
        {/*   </div> */}
        {/*   <Input maxLength={20} onChange={e=>{}} placeholder="请输入微信支付商户密钥" className={c.itemInput}></Input> */}
        {/* </div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName} style={{width:120}}> */}
        {/*     <span>*</span> */}
        {/*     <div className={c.itemText}>微信公众号APPSECRET</div> */}
        {/*   </div> */}
        {/*   <Input maxLength={20} onChange={e=>{}} placeholder="请输入微信公众号APPSECRET" className={c.itemInput}></Input> */}
        {/* </div> */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName} style={{width:120}}> */}
        {/*     <span>*</span> */}
        {/*     <div className={c.itemText}>微信支付指定域名</div> */}
        {/*   </div> */}
        {/*   <Input maxLength={20} onChange={e=>{}} placeholder="请输入微信支付指定域名" className={c.itemInput}></Input> */}
        {/* </div> */}
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName} style={{width:120}}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" onClick={save} loading={loading} className={c.submit}>保存</Button>
            {/* <div className={c.btnTipsView} style={{justifyContent:'center'}}> */}
            {/*   <div>上次保存: 202.01.15 15:20:05</div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoneyRebotView

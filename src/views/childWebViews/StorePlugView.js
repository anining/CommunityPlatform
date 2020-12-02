import React, { useState, useEffect } from 'react'
import ImgCrop from 'antd-img-crop';
import c from '../../styles/edit.module.css'
import { Input, Button, Upload } from 'antd'
import edit1 from '../../icons/edit/edit1.png'
import { beforeUpload, saveSuccess } from "../../utils/util";
import { storeConfig } from "../../utils/api";

function StorePlugView () {
  const [icons, setIcons] = useState([])
  const [imageUrl, setImageUrl] = useState()
  const [banners, setBanners] = useState([])
  const [imageIcon, setImageIcon] = useState()
  const [loading, setLoading] = useState(false)
  // const [selected,setSelected] = useState(1)
  // const [intro, setIntroduction] = useState("")
	const [siteName, setSiteName] = useState()

  const [under_maintenance, setUnder_maintenance] = useState(false) // 店铺维护中
  const [show_goods_under_maintenance, setShow_goods_under_maintenance] = useState(false) // 商品状态
  const [allow_registration, setAllow_registration] = useState(false) // 允许注册
  const [allow_guest, setAllow_guest] = useState(false) // 允许游客
  const [icp, setIcp] = useState("") // 备案信息
  const [announcement, setAnnouncement] = useState("") //维护公告

  useEffect(() => {
    storeConfig('get').then(r => {
      if (!r.error) {
        const { logo, banners, site_name, allow_guest, allow_registration, announcement, icp, show_goods_under_maintenance, under_maintenance } = r.data
				if(logo) {
					setIcons([{
						uid: '-1',
						name: 'image.png',
						status: 'done',
						url: logo,
					}])
				}
				setSiteName(site_name)
				if(banners && banners.length) {
					setBanners(banners.map((i, index) => ({
						uid: index,
						name: 'image.png',
						status: 'done',
						url: i,
					})))
				}
        setAllow_guest(allow_guest)
        setAllow_registration(allow_registration)
        setAnnouncement(announcement)
        setIcp(icp)
        setShow_goods_under_maintenance(show_goods_under_maintenance)
        setUnder_maintenance(under_maintenance)
      }
    })
  }, [])

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
		let body = {
			banners: banners.map(i => i.url),
			site_name: siteName,
			under_maintenance,
			show_goods_under_maintenance,
			allow_registration,
			allow_guest,
			icp,
			announcement
		}
		if(icons.length) {
			body = {...body,...{logo: icons[0].url}}
		}
    setLoading(true)
		storeConfig('modify', body).then(r => {
      setLoading(false)
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

	const onChange = ({ fileList: newFileList }) => {
    setBanners(newFileList)
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
            <div className={c.itemText}>店铺名称</div>
          </div>
          <Input onChange={e=>setSiteName(e.target.value)} value={siteName} placeholder="请填写图片链接或者上传图片" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>商标或ICON</div>
          </div>
          <Input onChange={e=>setImageIcon(e.target.value)} value={imageIcon} placeholder="请填写图片链接或者上传图片" className={c.itemInput}></Input>
					<Button type="primary" className={c.itemBtn} onClick={()=>{
						imageIcon && setIcons([{
														uid: '-1',
														name: 'image.png',
														status: 'done',
														url: imageIcon,
													}])
					}}>解析图片</Button>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
          </div>
					<ImgCrop rotate>
						<Upload
							action={file=>beforeUpload(file, icons, setIcons)}
							listType="picture-card"
							fileList={icons}
							onPreview={onPreview}
							onChange={({fileList}) => setIcons(fileList)}
						>
              <div>
                <img src={edit1} alt="" className={c.uploadImg}/>
                <div className={c.uploadText}>上传图片</div>
              </div>
						</Upload>
					</ImgCrop>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div style={{color:'#FF8D30'}}>商品图片最多存在1张；</div>
        </div>
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName}> */}
        {/*     <span className={c.white}>*</span> */}
        {/*     <div className={c.itemText}>首页轮播图</div> */}
        {/*   </div> */}
        {/*   <div className={cs.switchView}> */}
        {/*     <Switch defaultChecked className={cs.switch}/> */}
        {/*     <div className={cs.switchText}>当前状态 ： 开启首页轮播图</div> */}
        {/*   </div> */}
        {/* </div> */}
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>首页轮播图</div>
          </div>
          <Input onChange={e=>setImageUrl(e.target.value)} value={imageUrl} placeholder="请填写图片链接或者上传图片" className={c.itemInput}></Input>
					<Button type="primary" className={c.itemBtn} onClick={()=>{
						imageUrl && setBanners([...banners.slice(0, 4),{
							uid: Date.now(),
							name: 'image.png',
							status: 'done',
							url: imageUrl
						}])
					}}>解析图片</Button>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
          </div>
					<Upload
						action={file=>beforeUpload(file, banners, setBanners, 5)}
						listType="picture-card"
						fileList={banners}
						onPreview={onPreview}
						onChange={onChange}
					>
						<div>
							<img src={edit1} alt="" className={c.uploadImg}/>
							<div className={c.uploadText}>上传图片</div>
						</div>
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
        {/* <div className={c.item} style={{alignItems:'flex-start'}}> */}
        {/*   <div className={c.itemName}> */}
        {/*     <span className={c.white}>*</span> */}
        {/*     <div className={c.itemText}>店铺首页公告</div> */}
        {/*   </div> */}
        {/*   <ReactQuill modules={MODULES} className={c.quill} theme="snow" value={intro} onChange={e=>setIntroduction(e)}/> */}
        {/* </div> */}
        {/* <div className={c.headerT} style={{marginTop:60}}> */}
        {/*   <div style={{zIndex:1}}>模版和主题</div> */}
        {/*   <div className={c.circle} /> */}
        {/* </div> */}
        {/* <div className={cs.theme}>主题配色</div> */}
        {/* <div style={{display:'flex',alignItems:'flex-start'}}> */}
        {/*   <div style={{marginRight:18,flexShrink:0}}>选择配色方案：</div> */}
        {/*   { */}
        {/*     THEMES.map(i=>( */}
        {/*       <div className={cs.theme_item} key={i.id} onClick={()=>setSelected(i.id)}> */}
        {/*         { */}
        {/*           i.id===selected? */}
        {/*             <img src={good76} alt="" className={cs.theme_radio_true} />: */}
        {/*             <div className={cs.theme_radio_false} /> */}
        {/*         } */}
        {/*         <div className={cs.theme_item_t} style={{borderColor:"#0A90FF",background:i.color}}></div> */}
        {/*         <div className={cs.theme_item_b}>{i.label}</div> */}
        {/*       </div> */}
        {/*     )) */}
        {/*   } */}
        {/*   <div className={cs.theme_look}> */}
        {/*     <QRCode bgColor="#fff" fgColor="#2C68FF" value="http://facebook.github.io/react/" size={124}/> */}
        {/*     <div>手机版扫码预览</div> */}
        {/*   </div> */}
        {/* </div> */}
        <div className={c.item} style={{marginTop:72}}>
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

import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import * as U from 'karet.util'
import { Input, Checkbox, Menu, Button, Upload, Tooltip, message, Radio, Breadcrumb } from 'antd'
import good5 from '../../icons/good/good5.png'
import good46 from '../../icons/good/good46.png'
import good47 from '../../icons/good/good47.png'
import good48 from '../../icons/good/good48.png'
import edit1 from '../../icons/edit/edit1.png'
import DropdownComponent from "../../components/DropdownComponent";
import { push } from "../../utils/util";
import Quill from '../../components/Quill.jsx'

let win

function EditCardGoodView () {
  const [imageUrl, ] = useState()
  const [, ] = useState()
  const [value, setValue] = useState()
  const [quillValue, setQuillValue] = useState("")
  const [has_more, setHasMore] = useState(false)

  function getBase64 (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  window.localClick = function (type, ids) {
    // switch (type) {
    //   case 'tables':
    //     setTags(ids)
    //     setTag_ids(ids.map(i => i.id))
    //     break
    //   case 'good_category_id':
    //     setCommunity_goods_category_id(ids.id)
    //     setCommunity_goods_category_name(ids.name)
    //     break
    //   case 'order-model-id':
    //     setCommunity_param_template_id(ids.id)
    //     setCommunity_param_template_name(ids.name)
    //     break
    //   default:
    //     ;
    // }
    win && win.close()
  }

  window.localJump = function () {
    push("/main/table")
    win && win.close()
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
            <span>*</span>
            <div className={c.itemText}>商品名称</div>
          </div>
          <Input placeholder="请输入商品名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
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
            <div className={c.itemText}>下单模型</div>
          </div>
            <DropdownComponent keys={[]} placeholder="请设置下单模型" style={{
              width:"29.25%",
              height:40,
              marginTop:0,
              marginBottom:0,
              marginLeft:0,
              marginRight:0,
              color:'rgba(0,0,0,0.25)'
            }}/>
            <Button type="primary" className={c.itemBtn}>新增模型</Button>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>单价</div>
          </div>
          <Input type="number" placeholder="请输入商品销售单价" className={c.itemInput}></Input>
        </div>
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName}> */}
        {/*     <span>*</span> */}
        {/*     <div className={c.itemText}>密价</div> */}
        {/*   </div> */}
        {/*   <Input type="number" placeholder="请输入商品对接密价" className={c.itemInput}></Input> */}
        {/* </div> */}
        {/* <div className={c.itemTips}> */}
        {/*   <div className={c.itemName} /> */}
        {/*   <div>如果不填写此项目，系统将会使用售价进行对接。</div> */}
        {/* </div> */}
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>库存预警</div>
          </div>
          <Input placeholder="请输入预警值" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>为商品添加标签可以帮助用户快速找到想要下单的商品</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>卡密类型</div>
          </div>
					<Radio.Group onChange={onChange} value={value} className={c.itemGrop} style={{justifyContent: "flex-start"}}>
						<Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="常规卡 ： 可以添加多条卡密，每条卡密只能出售一次。">
							<Radio value={1} className={c.itemRadio} style={{width:'33.333%'}}>常规卡</Radio>
						</Tooltip>
						<Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="循环卡 ： 可以添加多条卡密，每条卡密只能出售一次。">
							<Radio value={2} className={c.itemRadio} style={{width:'33.333%'}}>循环卡</Radio>
						</Tooltip>
          </Radio.Group>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <div className={c.itemText}>商品标签</div>
          </div>
          <div className={c.tableView}>
            <RTable tags={[]}/>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>为商品添加标签可以帮助用户快速找到想要下单的商品</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>商品图片</div>
          </div>
          <Input placeholder="请填写图片链接或者上传图片" className={c.itemInput}></Input>
          <Button type="primary" className={c.itemBtn}>解析图片</Button>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
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
          <div className={c.uploadTips}>
            <div>商品图片最多存在1张；</div>
            <div>推荐图片大小<span>100*100，200*200</span></div>
          </div>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>商品介绍</div>
          </div>
					<Quill value={quillValue} setValue={setQuillValue} />
        </div>
        <div className={c.hasMore}>
          <Checkbox className={c.hasMoreCheckBox} onChange={e=>setHasMore(e.target.checked)} checked={has_more}>更多设置</Checkbox>
        </div>
        {
          U.when(has_more,(
            <>
              <div className={c.item}>
                <div className={c.itemName}>
                  <span>*</span>
                  <div className={c.itemText}>状态</div>
                </div>
                <Radio.Group onChange={onChange} value={value} className={c.itemGrop}>
                  <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="已上架 ： 用户可以看见并且购买该商品。">
                    <Radio value={1} className={c.itemRadio} style={{width:'33.333%'}}>已上架</Radio>
                  </Tooltip>
                  <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="已上架 ： 用户可以看见并且购买该商品。">
                    <Radio value={2} className={c.itemRadio} style={{width:'33.333%'}}>已下架</Radio>
                  </Tooltip>
                  <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="已上架 ： 用户可以看见并且购买该商品。">
                    <Radio value={3} className={c.itemRadio} style={{width:'33.333%'}}>已上架但关闭下单</Radio>
                  </Tooltip>
                </Radio.Group>
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
                  <span className={c.white}>*</span>
                  <div className={c.itemText}>排序权重</div>
                </div>
                <Input type="number" placeholder="请填写权重数值，默认权重为1" className={c.itemInput}></Input>
              </div>
              <div className={c.itemTips}>
                <div className={c.itemName} />
                <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
              </div>
              <div className={c.item}>
                <div className={c.itemName}>
                  <span className={c.white}>*</span>
                  <div className={c.itemText}>进价</div>
                </div>
                <Input type="number" placeholder="请输入商品进价" className={c.itemInput}></Input>
              </div>
              <div className={c.item}>
                <div className={c.itemName}>
                  <span>*</span>
                  <div className={c.itemText}>加价模版</div>
                </div>
                <DropdownComponent keys={[]} placeholder="百分比加价模版" style={{
                  width:"29.25%",
                  height:40,
                  marginTop:0,
                  marginBottom:0,
                  marginLeft:0,
                  marginRight:0,
                  color:'rgba(0,0,0,0.25)'
                }}/>
              </div>
              <div className={c.item} style={{alignItems:'flex-start'}}>
                <div className={c.itemName}>
                  <span>*</span>
                  <div className={c.itemText}>加价模版</div>
                </div>
                <div className={c.disc_price_view}>
                  <div className={c.disc_price_item}>
                    <img src={good46} alt="" />
                    <div>高级会员</div>
                    <Input placeholder="请输入密价"/>
                  </div>
                  <div className={c.disc_price_item}>
                    <img src={good48} alt="" />
                    <div>钻石会员</div>
                    <Input placeholder="请输入密价"/>
                  </div>
                  <div className={c.disc_price_item}>
                    <img src={good47} alt="" />
                    <div>至尊会员</div>
                    <Input placeholder="请输入密价"/>
                  </div>
                </div>
              </div>
            </>
          ))
        }
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
        <div className={c.item}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView} style={{color:'#FF5730'}}>
            保存商品之后请在“卡密业务 - 卡密管理”为该商品关联卡密
          </div>
        </div>
      </div>
    </div>
  )
}

function RTable ({ tags }) {
  const views = []

  tags.forEach((it ) => {
    const { id: tag_id, name } = it
    views.push(
      <Button key={tag_id} style={{width:'auto'}} className={c.viewTable}>{name}</Button>
    )
  })

  views.push(
    <Button type="primary" key="select" style={{marginLeft:0,marginBottom:tags.length?28:0}} className={c.itemBtn} onClick={()=>{
         win = window.open("/select-table", "_blank", "left=390,top=145,width=1200,height=700")
    }}>{!tags.length?"选择":"重新选择"}</Button>
  )

  return views;
}

export default EditCardGoodView

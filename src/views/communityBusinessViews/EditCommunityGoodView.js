import React, { useState, useEffect } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Tooltip, Button, Upload, message, Radio, Checkbox, Breadcrumb } from 'antd'
import ReactQuill from 'react-quill';
import good5 from '../../icons/good/good5.png'
import edit1 from '../../icons/edit/edit1.png'
import { goBack, saveSuccess, push } from "../../utils/util";
import { communityGoods, communityGood } from "../../utils/api";
import { useHistory } from "react-router-dom";
import { MODULES } from "../../utils/config";

let win

function EditCommunityGoodView () {
  const { state = {} } = useHistory().location
  const { id, name: n, tags: tag_s = [], batch_order: b_o, category_name, weight: w, disc_price: d_p, pics: ps = [], max_order_amount: max_o_a, community_goods_category_id: c_id, community_param_template_id: t_id, min_order_amount: min_o_a, param_template_name, repeat_order: r_o, status: s = "available", unit: u, unit_cost: u_c, unit_price: u_p } = state
  const [name, setName] = useState(n)
  const [insert, setInsert] = useState(id)
  const [status, setStatus] = useState(s)
  const [pics, setPics] = useState(ps)
  const [community_goods_category_id, setCommunity_goods_category_id] = useState(c_id)
  const [community_param_template_id, setCommunity_param_template_id] = useState(t_id)
  const [community_goods_category_name, setCommunity_goods_category_name] = useState(category_name)
  const [community_param_template_name, setCommunity_param_template_name] = useState(param_template_name)
  const [tag_ids, setTag_ids] = useState(tag_s.map(i=>i.id))
  const [tags, setTags] = useState(tag_s)
  const [unit, setUnit] = useState(u)
  const [unit_price, setUnit_price] = useState(u_p)
  const [refundable, setRefundable] = useState(true)
  const [unit_cost, setUnit_cost] = useState(u_c)
  const [disc_price, setDisc_price] = useState(d_p)
  const [min_order_amount, setMin_order_amount] = useState(min_o_a)
  const [max_order_amount, setMax_order_amount] = useState(max_o_a)
  const [repeat_order, setRepeat_order] = useState(r_o)
  const [batch_order, setBatch_order] = useState(b_o)
  const [weight, setWeight] = useState(w)
  const [introduction, setIntroduction] = useState("")
  const [imageUrl, setImageUrl] = useState(pics[0])
  const [loading, setLoading] = useState(false)
  const [recommended, setRecommended] = useState(false)

  window.localClick = function (type, ids) {
    switch (type) {
      case 'tables':
        setTags(ids)
        setTag_ids(ids.map(i => i.id))
        break
      case 'good_category_id':
        setCommunity_goods_category_id(ids.id)
        setCommunity_goods_category_name(ids.name)
        break
      case 'order-model-id':
        setCommunity_param_template_id(ids.id)
        setCommunity_param_template_name(ids.name)
        break
      default:
        ;
    }
    win && win.close()
  }

  window.localJump = function () {
    push("/main/table")
    win && win.close()
  }

  function save (jump) {
    if (!name || !pics.length || !community_param_template_id || !community_goods_category_id || !unit_price || !tag_ids.length || !unit) {
      message.warning("请完善信息")
      return
    }
    if (weight > 32767 || weight < -32768) {
      message.warning("权重值超出范围")
      return
    }
    let body = {recommended, provider_goods: { provider_type: 'internal', goods_id: 1 }, pics, community_goods_category_id, community_param_template_id, tag_ids, refundable }
      body = { ...body, ...{ name } }
      body = { ...body, ...{ unit_price } }
      body = { ...body, ...{ unit } }
      body = { ...body, ...{ status } }
      body = { ...body, ...{ unit_cost } }
      body = { ...body, ...{ disc_price } }
      body = { ...body, ...{ min_order_amount } }
      body = { ...body, ...{ max_order_amount } }
      body = { ...body, ...{ repeat_order } }
      body = { ...body, ...{ batch_order } }
      body = { ...body, ...{ weight } }
      body = { ...body, ...{ introduction } }
    const promise = communityGoods(insert ? "modify" : 'add', id, undefined, body)
    promise.then(r => {
      setInsert(jump)
      setLoading(false)
      if (!r.error) {
        saveSuccess(jump)
        setName(undefined)
        setStatus("available")
        setPics([])
        setCommunity_param_template_id(undefined)
        setCommunity_goods_category_id(undefined)
        setTag_ids([])
        setTags([])
        setUnit(undefined)
        setUnit_price(undefined)
        setRefundable(true)
        setUnit_cost(undefined)
        setDisc_price(undefined)
        setMax_order_amount(undefined)
        setMin_order_amount(undefined)
        setRepeat_order(undefined)
        setBatch_order(undefined)
        setWeight(undefined)
        setIntroduction("");
        setImageUrl(undefined)
      }
    }).catch(e => {
      setInsert(jump)
      setLoading(false)
    })
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
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/home")}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/communityGood")}>社区业务</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>社区商品</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增社区商品</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品名称</div>
          </div>
          <Input maxLength={40} placeholder="请输入商品名称" onChange={e=>setName(e.target.value)} value={name} className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品图片</div>
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
          <div className={c.uploadTips}>商品图片最多存在1张</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品分类</div>
          </div>
            <div onClick={()=>{
               win = window.open("/select-good-category", "_blank", "left=390,top=145,width=1200,height=700")
            }} className={c.itemSelect}>
              <div className={c.itemSelectP} style={{color:community_goods_category_name?"rgba(0, 0, 0, 0.85)":"rgba(0,0,0,0.25)"}}>{community_goods_category_name?community_goods_category_name:'请设置商品分类'}</div>
              <div>选择</div>
            </div>
            <Button type="primary" className={c.itemBtn} onClick={()=>{
              push('/main/editGoodCategory')
            }}>新增分类</Button>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>下单模型</div>
          </div>
            <div onClick={()=>{
               win = window.open("/select-order-model", "_blank", "left=390,top=145,width=1200,height=700")
            }} className={c.itemSelect}>
              <div className={c.itemSelectP} style={{color:community_param_template_name?"rgba(0, 0, 0, 0.85)":"rgba(0,0,0,0.25)"}}>{community_param_template_name?community_param_template_name:'请设置下单模型'}</div>
              <div>选择</div>
            </div>
            <Button type="primary" className={c.itemBtn} onClick={()=>{
              push('/main/editOrderModel')
            }}>新增模型</Button>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品标签</div>
          </div>
          <div className={c.tableView}>
            <RTable tags={tags}/>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>为商品添加标签可以帮助用户快速找到想要下单的商品</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>进价</div>
          </div>
          <Input type="number" onChange={e=>setUnit_cost(e.target.value)} value={unit_cost} placeholder="请输入商品进价" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>填写商品进价之后，系统可以核算出每日的收益毛利。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>单价</div>
          </div>
          <Input type="number" onChange={e=>setUnit_price(e.target.value)} value={unit_price} placeholder="请输入商品销售单价" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>密价</div>
          </div>
          <Input type="number" onChange={e=>setDisc_price(e.target.value)} value={disc_price} placeholder="请输入商品对接密价" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>如果不填写此项目，系统将会使用售价进行对接。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>单位</div>
          </div>
          <Input maxLength={20} value={unit} onChange={e=>setUnit(e.target.value)} placeholder="请输入商品的计算单位" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>最低数量</div>
          </div>
          <Input type="number" onChange={e=>setMin_order_amount(e.target.value)} value={min_order_amount} placeholder="该商品每一单最低多少起下，默认为0" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>最高数量</div>
          </div>
          <Input type="number" placeholder="该商品每一单最高多下多少个，默认为0" onChange={e=>setMax_order_amount(e.target.value)} value={max_order_amount} className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>重复下单</div>
          </div>
          <Input type="number" onChange={e=>setRepeat_order(e.target.value)} value={repeat_order} placeholder="允许重复下单的数量" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>如果该商品不允许重复下单， 请填写0或者不填写</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>批量下单</div>
          </div>
          <Input type="number" onChange={e=>setBatch_order(e.target.value)} value={batch_order} placeholder="允许批量下单的数量" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>如果该商品不允许批量下单， 请填写0或者不填写</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>状态</div>
          </div>
          <Radio.Group onChange={e=>setStatus(e.target.value)} value={status} className={c.itemGrop}>
            <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="已上架 ： 用户可以看见并且购买该商品。">
              <Radio value="available" className={c.itemRadio}>已上架</Radio>
            </Tooltip>
            <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="已下架 ： 已下架。">
              <Radio value="paused" className={c.itemRadio}>已下架</Radio>
            </Tooltip>
            <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="已上架但关闭下单 ： 已上架但关闭下单。">
              <Radio value="unavailable" className={c.itemRadio}>已上架但关闭下单</Radio>
            </Tooltip>
          </Radio.Group>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>排序权重</div>
          </div>
          <Input type="number" onChange={e=>setWeight(e.target.value)} value={weight} placeholder="请填写权重数值，默认权重为1" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>推荐</div>
          </div>
          <Radio.Group onChange={e=>setRecommended(e.target.value)} value={recommended} className={c.itemGrop} style={{justifyContent:'flex-start'}}>
            <Radio value={false} className={c.itemRadio} style={{width:'33.333%'}}>关闭</Radio>
            <Radio value={true} className={c.itemRadio} style={{width:'33.333%'}}>开启</Radio>
          </Radio.Group>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>用户权限</div>
          </div>
          <div className={c.itemCheckView}>
            <Checkbox onChange={e=>{
              setRefundable(e.target.checked)
            }} checked={refundable} className={c.checkbox}>退单</Checkbox>
          </div>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>目标描述</div>
          </div>
          <ReactQuill modules={MODULES} className={c.quill} theme="snow" value={introduction} onChange={e=>setIntroduction(e)}/>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button loading={loading} type="primary" onClick={()=>save(true)} className={c.submit}>保存</Button>
            <div className={c.btnTipsView}>
              <div className={c.quitBtn} onClick={goBack}>放弃编辑</div>
              <div className={c.quitBorder}/>
              <div className={c.saveBtn} onClick={()=>save(false)}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RTable ({ tags }) {
  const views = []

  tags.forEach((it, i) => {
    const { id: tag_id, name } = it
    views.push(
      <Button key={tag_id} style={{width:'auto'}} className={c.viewTable}>{name}</Button>
    )
  })

  views.push(
    <Button type="primary" key="select" style={{marginLeft:0,marginBottom:28}} className={c.itemBtn} onClick={()=>{
         win = window.open("/select-table", "_blank", "left=390,top=145,width=1200,height=700")
    }}>{!tags.length?"选择":"重新选择"}</Button>
  )

  return views;
}

export default EditCommunityGoodView

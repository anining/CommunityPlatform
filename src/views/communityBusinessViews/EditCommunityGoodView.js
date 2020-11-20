import React, { useState, useEffect } from 'react'
import * as U from 'karet.util'
import ImgCrop from 'antd-img-crop';
import * as L from "partial.lenses"
import * as R from 'kefir.ramda'
import c from '../../styles/edit.module.css'
import oc from '../../styles/oc.module.css'
import { Input, Tooltip, Button, Upload, message, Radio, Checkbox, Breadcrumb } from 'antd'
import ReactQuill from 'react-quill';
import good5 from '../../icons/good/good5.png'



import edit1 from '../../icons/edit/edit1.png'
import { saveSuccess, push, beforeUpload } from "../../utils/util";
import { communityGoods, communityGoodsCategories } from "../../utils/api";
import { useHistory } from "react-router-dom";
import { MODULES } from "../../utils/config";
import DropdownPromiseComponent from '../../components/DropdownPromiseComponent'

let win

function EditCommunityGoodView () {
  const { state = {} } = useHistory().location
  const { id, ext_prvd_goods_id, ext_prvd_id, params, provider_type, padj_id, name: n, prices: pr_s = [], supp_goods_id, refundable: re = false, tags: tag_s = [], batch_order: b_o=false,  weight: w, intro: i_td = "",  pics: ps = [], max_order_amount: max_o_a, ctg_id: c_id,  min_order_amount: min_o_a,  repeatable: r_o=false, status: s = "available", unit: u, unit_cost: u_c } = state
  const [name, setName] = useState(n)
  const [ctg_id, setCtgId] = useState(c_id)
  const [status, setStatus] = useState(s)
	const [pics, setPics] = useState(ps.map(i => ({
		uid: '-1',
		name: 'image.png',
		status: 'done',
		url: i.replace(/!yile/g,""),
	})))
  const [tags, setTags] = useState(tag_s)
  const [tag_ids, setTag_ids] = useState(tag_s.map(i => i.id))
  const [min_order_amount, setMin_order_amount] = useState(min_o_a)
  const [max_order_amount, setMax_order_amount] = useState(max_o_a)
  const [weight, setWeight] = useState(w)
  const [intro, setIntroduction] = useState(i_td)
  const [repeatable, ] = useState(r_o)
  const [batch_order, setBatch_order] = useState(Boolean(b_o))
  const [recommended, setRecommended] = useState(false)
  const [refundable, setRefundable] = useState(re)
  const [unit_cost, ] = useState(u_c)
  const [unit, setUnit] = useState(u)
  const [prices, ] = useState(Boolean(padj_id))
  const [unit_price, ] = useState(pr_s[0])
  const [factors, setFactors] = useState(pr_s)
  const [dockingTarget, ] = useState(padj_id)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [has_more, setHasMore] = useState(false)
  const [marks, ] = useState([])

  const setPriceAt = i => R.pipe(
    e => L.set([i], +e.target.value, factors),
    setFactors,
  )

  window.localClick = function (type, ids) {
    switch (type) {
      case 'tables':
        setTags(ids)
        setTag_ids(ids.map(i => i.id))
        break
      default:
    }
    win && win.close()
  }

	window.localTable = function () {
		win && win.close()
		push("/main/label")
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

  useEffect(() => {
    if (dockingTarget) {
      const values = marks.filter(i => i.id === dockingTarget)
			if(values && values[0]) {
				const { type, factors } = values[0]
				let localValues = [0, 0, 0, 0];
				for (let j = 0; j < 4; j++) {
					if (type === "absolute") {
						localValues[j] = (+factors[j] || 0) + (+unit_cost || 0)
					} else {
						localValues[j] = ((+factors[j] || 0) + 100) / 100 * (+unit_cost || 0)
					}
				}
				localValues[0]= unit_price || 0
				setFactors(localValues)
			}
    }
  }, [dockingTarget, marks, unit_cost, unit_price])

  function getGoodsSummaries(page,size) {
    return communityGoodsCategories("get",undefined,{page,size}).then(r => {
      if (!r.error) {
        return r.data
      }
      return []
    }).catch(()=>[])
  }

  function save (jump) {
    if (!name || !ctg_id || !unit_price) {
      message.warning("请完善信息")
      return
    }
    if (weight > 32767 || weight < -32768) {
      message.warning("权重值超出范围")
      return
    }
    let body = {
      name,
      ctg_id,
      status,
			supp_goods: provider_type==="supplier" ? { provider_type, goods_id: supp_goods_id } : { provider_type, ext_prvd_goods_id, ext_prvd_id, params },
      tag_ids,
      prices: factors,
			unit: unit || "个",
      refundable,
      recommended,
      repeatable,
      min_order_amount: min_order_amount || 1,
      max_order_amount: max_order_amount || 10000,
      weight: weight || 1,
			pics: pics.map(i => i.url),
			padj_id: dockingTarget,
			unit_cost,
      batch_order,
      intro,
    }
    if( prices ) {
      body = {...body,...{padj_id: dockingTarget}}
    }
    setLoading(true)
    const promise = communityGoods(id ? "modify" : 'add', id, undefined, body)
    promise.then(r => {
      setLoading(false)
      if (!r.error) {
        // if (!jump) {
        //   h.replace('/main/editCommunityGood')
        // }
        saveSuccess(jump)
      }
    }).catch(() => {
      // if (!jump) {
      //   h.replace('/main/editCommunityGood')
      // }
      setLoading(false)
    })
  }

  function parsing () {
		imageUrl && setPics([{
										uid: '-1',
										name: 'image.png',
										status: 'done',
										url: imageUrl,
									}])
  }

	const localParams = params ? JSON.parse(params) : []

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/home")}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/goods-community")}>社区业务</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>社区商品</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>{id?"修改":"新增"}商品信息</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写带。如果要修改商品价格请通过“商品列表 -  修改价格”操作。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品名称</div>
          </div>
          <Input maxLength={40} placeholder="请输入商品名称" onChange={e=>setName(e.target.value)} value={name} className={c.itemInput}/>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品分类</div>
          </div>
          <DropdownPromiseComponent placeholder="请选择商品分类" fetchName={getGoodsSummaries} value={ctg_id} setValue={setCtgId}/>
					<Button type="primary" className={c.itemBtn} onClick={()=>{
						push('/main/edit-category-community')
					}}>新增分类</Button>
        </div>
				<div className={c.item} style={{alignItems:'flex-start'}}>
					<div className={c.itemName}>
            <span className={c.white}>*</span>
						<div className={c.itemText}>下单参数</div>
					</div>
					<div className={oc.edit_view}>
						{
							localParams.map((i, index)=>{
								return <div key={index} style={{width:"100%"}} className={oc.basic_msg_text_edit}><div>参数{index+1}</div><div className={oc.basic_msg_text_edit_name}>{i.name}:</div><div>{i.placeholder}</div></div>
						})
						}
					</div>
					<Button type="primary" disabled={true} style={{width:120}} className={c.itemBtn} onClick={()=>{
						push('/main/editGoodCategory')
					}}>同步下单参数</Button>
				</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>单位</div>
          </div>
          <Input maxLength={20} value={unit} onChange={e=>setUnit(e.target.value)} placeholder="请输入商品的计算单位" className={c.itemInput}></Input>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>商品标签</div>
          </div>
          <div className={c.tableView}>
            <RTable win={win} tags={tags}/>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>建议为商品添加标签；用户可以通过你添加的标签来查找商品。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>商品图片</div>
          </div>
          <Input onChange={e=>setImageUrl(e.target.value)} value={imageUrl} placeholder="请填写图片链接或者上传图片" className={c.itemInput}></Input>
          <Button type="primary" className={c.itemBtn} onClick={parsing}>解析图片</Button>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
          </div>
					<ImgCrop rotate>
						<Upload
							action={file=>beforeUpload(file, pics, setPics)}
							listType="picture-card"
							fileList={pics}
							onPreview={onPreview}
							onChange={({fileList}) => setPics(fileList)}
						>
              <div>
                <img src={edit1} alt="" className={c.uploadImg}/>
                <div className={c.uploadText}>上传图片</div>
              </div>
						</Upload>
					</ImgCrop>
          <div className={c.uploadTips}>
            <div>商品图片最多存在1张；</div>
            <div>推荐图片大小<span>100*100，200*200</span></div>
          </div>
          {/* <div className={c.uploadTips}>商品图片最多存在1张</div> */}
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>商品介绍</div>
          </div>
          <ReactQuill modules={MODULES} className={c.quill} theme="snow" value={intro} onChange={e=>setIntroduction(e)}/>
        </div>
        <div className={c.hasMore}>
          <Checkbox className={c.hasMoreCheckBox} onChange={e=>setHasMore(e.target.checked)} checked={has_more}>更多设置</Checkbox>
        </div>
        {
          U.when(has_more,(
            <>
              <div className={c.item}>
                <div className={c.itemName}>
                  <span className={c.white}>*</span>
                  <div className={c.itemText}>状态</div>
                </div>
                <Radio.Group onChange={e=>setStatus(e.target.value)} value={status} className={c.itemGrop}>
                  <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="已上架 ： 用户可以看见并且购买该商品。">
                    <Radio value="available" className={c.itemRadio}>已上架</Radio>
                  </Tooltip>
                  <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="已下架 ： 用户不可以看见并且购买该商品。">
                    <Radio value="unavailable" className={c.itemRadio}>已下架</Radio>
                  </Tooltip>
                  <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="维护中 ： 用户可以看见但是不能购买该商品。">
                    <Radio value="paused" className={c.itemRadio}>维护中</Radio>
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
              <div className={c.item} style={{marginTop:0}}>
                <div className={c.itemName}>
                  <span style={{color:'#fff'}}>*</span>
                  <div className={c.itemText}>自助退款</div>
                </div>
                <Radio.Group value={refundable} onChange={e=>setRefundable(e.target.value)} className={c.itemGrop} style={{justifyContent:'flex-start'}}>
                  <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="允许自助退款：用户可以对这个商品对应的订单发起一次退款申请。">
                    <Radio value={true} className={c.itemRadio} style={{width:'33.333%'}}>允许自助退款</Radio>
                  </Tooltip>
                  <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="不允许自助退款：用户不可以对这个商品对应的订单发起退款申请。">
                    <Radio value={false} className={c.itemRadio} style={{width:'33.333%'}}>不允许自助退款</Radio>
                  </Tooltip>
                </Radio.Group>
              </div>
              <div className={c.item}>
                <div className={c.itemName}>
                  <span className={c.white}>*</span>
                  <div className={c.itemText}>最低下单</div>
                </div>
                <Input type="number" onChange={e=>setMin_order_amount(e.target.value)} value={min_order_amount} placeholder="该商品每一单最低多少起下，默认为1" className={c.itemInput}></Input>
              </div>
              <div className={c.item}>
                <div className={c.itemName}>
                  <span className={c.white}>*</span>
                  <div className={c.itemText}>最高下单</div>
                </div>
                <Input type="number" placeholder="该商品每一单最高多下多少个，默认为10000" onChange={e=>setMax_order_amount(e.target.value)} value={max_order_amount} className={c.itemInput}></Input>
              </div>
              <div className={c.item}>
                <div className={c.itemName}>
                  <span className={c.white}>*</span>
                  <div className={c.itemText}>重复下单</div>
                </div>
                <Radio.Group value={recommended} onChange={e=>setRecommended(e.target.value)} className={c.itemGrop} style={{justifyContent:'flex-start'}}>
                  <Radio value={false} className={c.itemRadio} style={{width:'33.333%'}}>不允许重复下单</Radio>
                  <Radio value={true} className={c.itemRadio} style={{width:'33.333%'}}>允许重复下单</Radio>
                </Radio.Group>
              </div>
              <div className={c.itemTips}>
                <div className={c.itemName} />
                <div>重复订单指用户在下单模型内填写的所有数据都相同。</div>
              </div>
              <div className={c.item}>
                <div className={c.itemName}>
                  <span className={c.white}>*</span>
                  <div className={c.itemText}>批量下单</div>
                </div>
                <Radio.Group value={batch_order} onChange={e=>setBatch_order(e.target.value)} className={c.itemGrop} style={{justifyContent:'flex-start'}}>
                  <Radio value={false} className={c.itemRadio} style={{width:'33.333%'}}>不允许批量下单</Radio>
                  <Radio value={true} className={c.itemRadio} style={{width:'33.333%'}}>允许批量下单</Radio>
                </Radio.Group>
              </div>
              <div className={c.itemTips}>
                <div className={c.itemName} />
                <div>单次批量下单上限50。</div>
              </div>
            </>
          ))
        }
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button loading={loading} type="primary" onClick={()=>save(true)} className={c.submit}>保存商品</Button>
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

export default EditCommunityGoodView

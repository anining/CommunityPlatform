import React, { useState, useEffect } from 'react'
import * as U from 'karet.util'
import * as L from "partial.lenses"
import * as R from 'kefir.ramda'
import c from '../../styles/edit.module.css'
import { Input, Tooltip, Button, Upload, message, Radio, Checkbox, Breadcrumb } from 'antd'
import ReactQuill from 'react-quill';
import good5 from '../../icons/good/good5.png'
import good46 from '../../icons/good/good46.png'
import good47 from '../../icons/good/good47.png'
import ImgCrop from 'antd-img-crop';
import good48 from '../../icons/good/good48.png'
import edit1 from '../../icons/edit/edit1.png'
import { beforeUpload, saveSuccess, push } from "../../utils/util";
import { communityGoods,  cmntPadjs, communityGoodsCategories } from "../../utils/api";
import { useHistory } from "react-router-dom";
import { MODULES } from "../../utils/config";
import DropdownPromiseComponent from '../../components/DropdownPromiseComponent'

let win

function ImpCommunityGoodView () {
  const { state = {} } = useHistory().location
  const h = useHistory()
	const { params, ext_prvd_id, provide_name, p_goods_id, p_name, p_price, p_min_order_amount, p_max_order_amount, p_pics, p_intro= "", provider_type, p_ctg_id, p_unit } = state

	const [pics, setPics] = useState(p_pics.map(i => ({
		uid: '-1',
		name: 'image.png',
		status: 'done',
		url: i.replace(/!yile/g,""),
	})))
  const [ctg_id, setCtgId] = useState(p_ctg_id)
  const [dockingTarget, setDockingTarget] = useState()
  const [unit_cost, setUnit_cost] = useState(p_price)
  const [unit_price, ] = useState(p_price)
  const [factors, setFactors] = useState([p_price])
  const [name, setName] = useState(p_name)
  const [unit, setUnit] = useState(p_unit)
  const [intro, setIntroduction] = useState(p_intro)
  const [status, setStatus] = useState("paused")
  const [weight, setWeight] = useState()
  const [refundable, setRefundable] = useState(false)
  const [min_order_amount, setMin_order_amount] = useState(p_min_order_amount)
  const [max_order_amount, setMax_order_amount] = useState(p_max_order_amount)
  const [repeatable, setRepeatable] = useState(false)
  const [batch_order, setBatch_order] = useState(false)
  const [recommended, ] = useState(false)
  const [tag_ids, setTag_ids] = useState([])

  // // const [community_param_template_id, setCommunity_param_template_id] = useState(ptpl_id)
  // const [prices, setPrices] = useState(Boolean(padj_id))

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [tags, setTags] = useState([])
  const [marks, setMarks] = useState([])
  const [has_more, setHasMore] = useState(false)

  // const [selectedProviders, setSelectedProviders] = useState()

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
        ;
    }
    win && win.close()
  }

	window.localTable = function () {
		win && win.close()
		push("/main/label")
	}

  // window.localJump = function () {
  //   push("/main/table")
  //   win && win.close()
  // }

  // function getProviders (page,size) {
  //   return providerSummaries(page,size).then(r => {
  //     if (!r.error) {
  //       return r.data.map(i => ({ id: i.id, name: i.nickname }))
  //     }
  //     return []
  //   }).catch(()=> [])
  // }

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

  function getCmntPadjs (page,size) {
    return cmntPadjs("get", undefined, {page, size}).then(r => {
      if (!r.error) {
        setMarks(r.data)
        return r.data
      }
      return []
    }).catch(()=> [])
  }

  useEffect(() => {
    if (dockingTarget) {
      const values = marks.filter(i => i.id === dockingTarget)
      const { type, factors } = values[0]
			console.log(type, factors)
      let localValues = [0, 0, 0, 0];
      for (let j = 0; j < 4; j++) {
        if (type === "absolute") {
          localValues[j] = ((+factors[j] || 0) + (+unit_cost || 0)).toFixed(6)
        } else {
          localValues[j] = (((+factors[j] || 0) + 100) / 100 * (+unit_cost || 0)).toFixed(6)
        }
      }
      setFactors(localValues)
    }
  }, [dockingTarget, marks, unit_cost])

  // function getParamTemplates(page,size) {
  //   return communityParamTemplates("get",undefined,{page,size}).then(r => {
  //     if (!r.error) {
  //       return r.data
  //     }
  //     return []
  //   }).catch(()=>[])
  // }

  function getGoodsSummaries(page,size) {
    return communityGoodsCategories("get",undefined,{page,size}).then(r => {
      if (!r.error) {
        return r.data
      }
      return []
    }).catch(()=>[])
  }

  // function getGoodCategories(page,size) {
  //   if (selectedProviders) {
  //     return goodsSummaries(selectedProviders,page,size).then(r => {
  //       if (!r.error) {
  //         return r.data
  //       }
  //       return []
  //     }).catch(()=>[])
  //   }
  //   return new Promise((resolve,reject)=>resolve([]))
  // }

  function save (jump) {
    if (!name) {
      message.warning("请输入商品名称!")
      return
    }
    if (!ctg_id) {
      message.warning("请选择商品分类!")
      return
    }
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
      status,
			supp_goods: provider_type==="supplier" ? { provider_type, goods_id: p_goods_id } : { provider_type, ext_prvd_goods_id: p_goods_id, ext_prvd_id, params },
      ctg_id,
      tag_ids,
			prices: dockingTarget ? factors : [unit_price,0,0,0],
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
    setLoading(true)
    const promise = communityGoods('add', undefined, undefined, body)
    promise.then(r => {
      setLoading(false)
      if (!r.error) {
        saveSuccess(jump)
      }
    }).catch(() => {
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
          <div style={{zIndex:1}}>从{provide_name || "供应商"}导入商品</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写带。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品分类</div>
          </div>
          <DropdownPromiseComponent placeholder="请选择商品分类" fetchName={getGoodsSummaries} value={ctg_id} setValue={setCtgId}/>
					<Button type="primary" className={c.itemBtn} onClick={()=>push('/main/edit-category-community')}>新增分类</Button>
        </div>
				<div className={c.item}>
					<div className={c.itemName}>
						<span className={c.white}>*</span>
						<div className={c.itemText}>调价模版</div>
					</div>
					<DropdownPromiseComponent placeholder="请选择调价模版" value={dockingTarget} fetchName={getCmntPadjs} setValue={setDockingTarget}/>
				</div>
				<div className={c.itemTips}>
					<div className={c.itemName} />
					<div>当系统获取到这个商品在供应商的价格变化信息时,会根据选择的模版配置同步调整这个商品的单价和统一密价</div>
				</div>
				<div className={c.item}>
					<div className={c.itemName}>
						<span className={c.white}>*</span>
						<div className={c.itemText}>进价</div>
					</div>
					<Input type="number" disabled={true} onChange={e=>setUnit_cost(e.target.value)} value={unit_cost} placeholder="请输入商品进价" className={c.itemInput}></Input>
				</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>单价</div>
          </div>
          <Input onChange={setPriceAt(0)} value={factors[0]} placeholder="请输入商品销售单价" className={c.itemInput}></Input>
        </div>
				<div className={c.item} style={{alignItems:'flex-start'}}>
					<div className={c.itemName}>
						<span className={c.white}>*</span>
						<div className={c.itemText}>统一密价</div>
					</div>
					<div className={c.disc_price_view}>
						<div className={c.disc_price_item}>
							<img src={good46} alt="" />
							<div>高级会员</div>
							<Input value={factors[1]} onChange={setPriceAt(1)} placeholder="请输入密价"/>
						</div>
						<div className={c.disc_price_item}>
							<img src={good48} alt="" />
							<div>钻石会员</div>
							<Input value={factors[2]} onChange={setPriceAt(2)} placeholder="请输入密价"/>
						</div>
						<div className={c.disc_price_item}>
							<img src={good47} alt="" />
							<div>至尊会员</div>
							<Input value={factors[3]} onChange={setPriceAt(3)} placeholder="请输入密价"/>
						</div>
					</div>
				</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品名称</div>
          </div>
          <Input maxLength={40} placeholder="请输入商品名称" onChange={e=>setName(e.target.value)} value={name} className={c.itemInput}/>
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
            <RTable tags={tags}/>
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
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName}> */}
        {/*     <span className={c.white}>*</span> */}
        {/*     <div className={c.itemText}>商品来源</div> */}
        {/*   </div> */}
        {/*   <DropdownPromiseComponent value={provider_type} placeholder="请选择商品来源" initNums={[{name:"供货商",id:"supplier"}]} setValue={setProvider_type}/> */}
        {/* </div> */}
				{/* <div className={c.item} style={{alignItems:'flex-start'}}> */}
					{/* <div className={c.itemName}> */}
        {/*     <span className={c.white}>*</span> */}
						{/* <div className={c.itemText}>下单参数</div> */}
					{/* </div> */}
					{/* <div className={oc.edit_view}> */}
						{/* {/1* { *1/} */}
						{/* {/1* 	(sel.tags || []).map(i=><Button className={oc.tags_btn} key={i.id}>{i.name}</Button>) *1/} */}
						{/* {/1* } *1/} */}
						{/* <div className={oc.basic_msg_text}><div>参数1</div><div>下单链接:</div>http:'sdsdsdsds</div> */}
						{/* <div className={oc.basic_msg_text}><div>参数1</div><div>下单链接:</div>http:'sdsdsdsds</div> */}
					{/* </div> */}
					{/* <Button type="primary" style={{width:120}} className={c.itemBtn} onClick={()=>{ */}
						{/* push('/main/editGoodCategory') */}
					{/* }}>同步下单参数</Button> */}
				{/* </div> */}

        {/* { */}
        {/*   U.when(provider_type==="supplier",( */}
        {/*     <div className={c.item}> */}
        {/*       <div className={c.itemName}> */}
        {/*         <span>*</span> */}
        {/*         <div className={c.itemText}>供货商</div> */}
        {/*       </div> */}
        {/*       <DropdownPromiseComponent placeholder="请选择供货商" value={selectedProviders} fetchName={getProviders} setValue={setSelectedProviders}/> */}
        {/*     </div> */}
        {/*   )) */}
        {/* } */}
        {/* { */}
        {/*   U.when(provider_type!=="internal" && provider_type,( */}
        {/*     <div className={c.item}> */}
        {/*       <div className={c.itemName}> */}
        {/*         <span>*</span> */}
        {/*         <div className={c.itemText}>对接目标</div> */}
        {/*       </div> */}
        {/*       <DropdownPromiseComponent placeholder="请选择对接目标" initNums={[]} setValue={setDockingTarget}/> */}
        {/*     </div> */}
        {/*   )) */}
        {/* } */}
        {/* { */}
        {/*   U.when(provider_type,( */}
        {/*     <div className={c.item}> */}
        {/*       <div className={c.itemName}> */}
        {/*         <span>*</span> */}
        {/*         <div className={c.itemText}>关联商品</div> */}
        {/*       </div> */}
        {/*       <DropdownPromiseComponent placeholder="请选择关联商品" fetchName={getGoodCategories} value={goods_id} refresh={[selectedProviders]} setValue={setGoods_id}/> */}
        {/*       {/1* <DropdownPromiseComponent tooltip={tooltips?tooltips.name:""} placeholder="请选择关联商品" initNums={goods} setValue={setGoods_id}/> *1/} */}
        {/*     </div> */}
        {/*   )) */}
        {/* } */}
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName}> */}
        {/*     <span>*</span> */}
        {/*     <div className={c.itemText}>下单模型</div> */}
        {/*   </div> */}
        {/*   <DropdownPromiseComponent placeholder="请选择下单模型" fetchName={getParamTemplates} value={community_param_template_id} setValue={setCommunity_param_template_id}/> */}
        {/*     <Button type="primary" className={c.itemBtn} onClick={()=>{ */}
        {/*       push('/main/editOrderModel') */}
        {/*     }}>新增模型</Button> */}
        {/* </div> */}
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
                  <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="已下架 ： 用户不可以看见并且不能购买该商品。">
                    <Radio value="paused" className={c.itemRadio}>已下架</Radio>
                  </Tooltip>
                  <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="维护中 ： 用户可以看见但是不能购买该商品。">
                    <Radio value="unavailable" className={c.itemRadio}>维护中</Radio>
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
                <Radio.Group value={repeatable} onChange={e=>setRepeatable(e.target.value)} className={c.itemGrop} style={{justifyContent:'flex-start'}}>
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

export default ImpCommunityGoodView

import React, { useState } from 'react'
import { Button, Checkbox, Input } from 'antd'
import guide1 from '../../icons/guide/guide1.png'
import guide2 from '../../icons/guide/guide2.png'
import guide3 from '../../icons/guide/guide3.png'
import { h } from '../../utils/history'

function Guide () {
  const [guideId, setGuideId] = useState(0)

  function submit () {
    if (guideId === 3) {
      const history = h.get();
      history.push('/main')
    } else {
      setGuideId(guideId + 1)
    }
  }

  return (
    <div style={styles.container}>
      <Title guideId={guideId}/>
      <div style={styles.content}>
        <Context guideId={guideId}/>
      </div>
      <div style={styles.footer}>
        <Button type="primary" style={styles.btn} onClick={submit}>{guideId===3?"完成":"下一步"}</Button>
        <div style={{color:"#6F717E",fontSize:12,marginBottom:'3%'}} onClick={()=>{
          const history = h.get();
          history.push('/main')
        }}>稍后设置</div>
        <Circle guideId={guideId} />
      </div>
    </div>
  )
}

function Title ({ guideId }) {
  const obj = [
    {
      text: '请选择您的业务类型',
      minText: ["我们将会根据您的选择，为您定制您的管理系统。", "您可以通过“系统设置 - 业务配置”来修改这些信息。"]
    },
    {
      text: '自定义首页仪表盘',
      minText: ["定制首页仪表盘信息，只展示你关注的数据。", "您可以在“系统设置 - 首页仪表盘”来修改这些信息。"]
    },
    {
      text: '开通服务',
      minText: ["开通免费的增值服务", "您可以在“增值服务”列表开通更多服务或者关闭某项服务，同时也可以查看到服务相关的详细数据。"]
    },
    {
      text: '请修改您的登录密码',
      minText: ["你是第一次登陆，为了您的账户安全，建议您修改密码。 ", "您也可以通过“系统设置 - 修改密码”来重新设置密码。"]
    }
  ]
  return (
    <div style={styles.text}>
      <div style={{color:'#34374A',fontSize:17}}>{obj[guideId].text}</div>
      <div style={styles.minText}>
        <div>{obj[guideId].minText[0]}</div>
        <div>{obj[guideId].minText[1]}</div>
      </div>
    </div>
  )
}

function Context ({ guideId }) {
  const [selects, setSelects] = useState([])
  const views = [];
  const data = [
    {
      label: "全部业务",
      icon: guide1,
      id: 111,
    },
    {
      label: "卡密业务",
      icon: guide3,
      id: 222,
    },
    {
      label: '社区业务',
      icon: guide2,
      id: 333,
    }
  ]
  const data2 = [
    {
      label: "一键对接商品",
      tips: "开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。",
      price: 0
    },
    {
      label: "串货服务",
      tips: "开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。",
      price: 0
    },
    {
      label: "供货商服务",
      tips: "开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。",
      price: 5
    },
    {
      label: "微信通知服务",
      tips: "开通服务之后，提供特定的数据之后，您可以一键将站外的商品，对接到本系统中。",
      price: 5
    },
  ]
  const data3 = [
    {
      id: 234,
      label: '服务1',
    },
    {
      id: 235,
      label: '服务2',
    },
    {
      id: 236,
      label: '服务3',
    },
    {
      id: 238,
      label: '服务4',
    }
  ]

  function submit () {
    console.log("submit")
  }

  function onChange (e, id) {
    const localSelects = [...selects]
    if (e.target.checked) {
      setSelects([...localSelects, id])
    } else {
      localSelects.splice(localSelects.findIndex(item => item === id), 1)
      setSelects(localSelects)
    }
  }

  switch (guideId) {
    case 0:
      data.forEach((item, index) => {
        const { label, icon, id } = item;
        views.push(
          <div style={styles.firstItem} key={id}>
            <div style={styles.first}>
              <img src={icon} alt="" style={{width:80,marginBottom:15}}/>
              <div style={{color:'#333649',fontSize:12}}>{label}</div>
              <Checkbox onChange={(e)=>onChange(e,id)} style={styles.firstCheckBox} />
            </div>
          </div>
        )
      });
      break;
    case 1:
      data3.forEach(item => {
        const { label, id } = item
        views.push(
          <div style={styles.secondItem} key={id}>
            <Checkbox onChange={(e)=>onChange(e,id)} style={{marginRight:15}}/>
            <div style={{color:selects.includes(id)?"#2C68FF":'#333649',fontSize:12}}>{label}</div>
        </div>
        )
      });
      break;
    case 2:
      data2.forEach((item, index) => {
        const { label, tips, price } = item;
        views.push(
          <div style={styles.threeItem}>
            <div style={styles.second}>
              <div style={{color:'#34374A',fontSize:13,alignSelf:'flex-start'}}>{label}</div>
              <div style={{fontSize:12,color:'#6F717E',marginTop:15,marginBottom:15}}>{tips}</div>
              <Button type="primary" onClick={submit} style={styles.submitBtn}>开通服务</Button>
              <div style={{fontSize:12}}>收费模式:
                <span style={{color:'#FF5730',marginLeft:5}}>{price?`${price}元/永久`:"免费使用"}</span>
              </div>
            </div>
        </div>
        )
      });
      break;
    default:
      views.push(
        <div style={{textAlign:'center',width:'100%'}}>
          <Input.Password placeholder="请在这里输入新密码" style={{width:250}}/>
        </div>
      )
  }

  return views
}

function Circle ({ guideId }) {
  const views = [];
  [0, 1, 2, 3].forEach((item, index) => {
    views.push(
      <div style={{
        height: 8,
        width: 8,
        marginLeft: 3,
        marginRight: 3,
        borderRadius: 8,
        background: guideId===index?'#2C67FF':'#D6D7DB'
      }} key={index}/>
    )
  })

  return <div style={styles.circleView}>{views}</div>
}

const styles = {
  container: {
    boxSizing: 'border-box',
    height: '100%',
    minHeight: 700,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '9%',
    paddingBottom: '7%'
  },
  firstCheckBox: {
    position: 'absolute',
    right: '10%',
    top: '5%',
  },
  submitBtn: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 12
  },
  first: {
    width: '65%',
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    boxShadow: '0px 12px 48px 16px rgba(44,103,255,0.03),0px 9px 28px 0px rgba(44,103,255,0.05),0px 6px 16px -8px rgba(44,103,255,0.08)',
    borderColor: 'rgba(44,103,255,1)',
    borderStyle: 'solid',
    paddingTop: 25,
    paddingBottom: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  second: {
    width: '80%',
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderWidth: 1,
    boxShadow: '0px 12px 48px 16px rgba(44,103,255,0.03),0px 9px 28px 0px rgba(44,103,255,0.05),0px 6px 16px -8px rgba(44,103,255,0.08)',
    borderColor: 'rgba(44,103,255,1)',
    borderStyle: 'solid',
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  firstItem: {
    boxSizing: 'border-box',
    width: '33.333%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  threeItem: {
    boxSizing: 'border-box',
    width: '25%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondItem: {
    boxSizing: 'border-box',
    width: '33.333%',
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleView: {
    display: 'flex',
    alignItems: 'center'
  },
  circle: {
    height: 8,
    width: 8,
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 8,
    background: '#2C67FF'
  },
  btn: {
    height: 30,
    width: 250
  },
  minText: {
    color: '#6F717E',
    fontSize: 12,
  },
  text: {
    height: 80,
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    width: '70%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  footer: {
    height: 100,
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}

export default Guide

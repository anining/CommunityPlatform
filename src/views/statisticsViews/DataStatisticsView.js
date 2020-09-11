import React from 'react'
import c from '../../styles/edit.module.css'
import cs from '../../styles/business.module.css'
import statistics1 from '../../icons/edit/edit1.png'

function DataStatisticsView () {
  const views = []
  const data = [
    {
      title: '资金统计',
      child: [
        [
          {
            label: '总销售额',
            num: '123,456',
            icon: statistics1
          },
          {
            label: '今日销售额',
            num: '123,456',
            icon: statistics1
          },
        ],
        [
          {
            label: '总毛利',
            num: '123,456',
            icon: statistics1
          },
          {
            label: '今日毛利',
            num: '123,456',
            icon: statistics1
          },
        ],
        [
          {
            label: '今日充值金额',
            num: '123,456',
            icon: statistics1
          },
          {
            label: '今日充值笔数',
            num: '123,456',
            icon: statistics1
          },
        ],
        [
          {
            label: '今日退款金额',
            num: '123,456',
            icon: statistics1
          },
          {
            label: '今日退款笔数',
            num: '123,456',
            icon: statistics1
          },
        ],
      ]
    },
    {
      title: '商品订单统计',
      child: [
        [
          {
            label: '订单总数',
            num: '123,456',
            icon: statistics1
          },
          {
            label: '今日订单',
            num: '123,456',
            icon: statistics1
          },
        ],
        [
          {
            label: '待处理订单',
            num: '123,456',
            icon: statistics1
          },
        ],
        [
          {
            label: '申请退款',
            num: '123,456',
            icon: statistics1
          },
        ],
        [
          {
            label: '申请补单',
            num: '123,456',
            icon: statistics1
          },
        ],
        [
          {
            label: '异常订单',
            num: '123,456',
            icon: statistics1
          },
        ],
      ]
    },
    {
      title: '用户统计',
      child: [
        [
          {
            label: '用户总数',
            num: '123,456',
            icon: statistics1
          },
          {
            label: '今日新增',
            num: '123,456',
            icon: statistics1
          },
        ],
        [
          {
            label: '付费转化率',
            num: '123,456',
            icon: statistics1
          },
        ],
      ]
    },
    {
      title: '网站访问统计',
      child: [
        [
          {
            label: '今日主页PV',
            num: '123,456',
            icon: statistics1
          },
        ],
        [
          {
            label: '今日主页UV',
            num: '123,456',
            icon: statistics1
          },
        ],
      ]
    }
  ]

  data.forEach((item, index) => {
    const { title, child } = item
    views.push(
      <div className={c.headerT} key={index} style={{marginBottom:24}}>
        <div style={{zIndex:1}}>{title}</div>
        <div className={c.circle} />
      </div>
    )
    const items = []
    child.forEach((it, i) => {
      if (it.length === 1) {
        const { label, num, icon } = it[0]
        items.push(
          <div className={cs.bOIView}>
            <div className={cs.bIText}>
              <img src={icon} alt="" />
              <div className={cs.bLabel}>{label}</div>
            </div>
            <div className={cs.bNum}>¥{num}</div>
          </div>
        )
      } else {
        const { label, num, icon } = it[0]
        const { label: l, num: n, icon: ic } = it[1]
        items.push(
          <div className={cs.bTIView}>
            <div className={cs.bTIViewL}>
              <div className={cs.bIText}>
                <img src={icon} alt="" />
                <div className={cs.bLabel}>{label}</div>
              </div>
              <div className={cs.bNum}>¥{num}</div>
            </div>
            <div className={cs.bLine} />
            <div className={cs.bTIViewR}>
              <div className={cs.bIText}>
                <img src={ic} alt="" />
                <div className={cs.bLabel}>{l}</div>
              </div>
              <div className={cs.bNum}>¥{n}</div>
            </div>
          </div>
        )
      }
    })
    views.push(
      <div key={Math.random()} className={cs.bView}>
      {items}
      <div className={cs.bDetail}>查看详情</div>
      </div>
    )
  })

  return (
    <div className={c.container}>
      <div className={c.main} style={{
        marginTop:0,
        marginBottom:24,
        paddingBottom:0
      }}>
        {views}
      </div>
    </div>
  )
}

export default DataStatisticsView

import good42 from '../icons/good/good42.png'
import good43 from '../icons/good/good43.png'
import good44 from '../icons/good/good44.png'
import good49 from '../icons/good/good49.png'
import good50 from '../icons/good/good50.png'
import good51 from '../icons/good/good51.png'
import good52 from '../icons/good/good52.png'
import good35 from '../icons/good/good35.png'
import good34 from '../icons/good/good34.png'
import good32 from '../icons/good/good32.png'
import good53 from '../icons/good/good53.png'
import good56 from '../icons/good/good56.png'
import good69 from '../icons/good/good69.png'
import good70 from '../icons/good/good70.png'
import good71 from '../icons/good/good71.png'
import good72 from '../icons/good/good72.png'
import good73 from '../icons/good/good73.png'
import good77 from '../icons/good/good77.png'

const DEVELOPER = "Production"
const API_URL = DEVELOPER === "Production" ? "https://beta-omnivstore.prismslight.com/mng" : "https://test-omnivstore.prismslight.com/mng"
const JUMP_DELAY = 500
const MODULES = {
  toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image'],

        [{ 'header': 1 }, { 'header': 2 }], // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
        [{ 'direction': 'rtl' }], // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'] // remove formatting button
    ]
}
const PERMISSIONS = {
  orderlog: "订单记录",
  citecfg: "站点管理",
  usermng: "用户管理",
  capitalflow: "资金流水",
  valueaddedsrv: "增值服务",
  tagmng: '标签管理',
  statistics: '统计信息',
  subcitemng: '分站管理',
  cmntbiz: '社区业务',
  cardbiz: '卡密业务'
}
const TEM_TYPE = {
  "absolute": {
    label: '固定加价',
  },
  "relative": {
    label: '百分比加价',
  }
}
const PERMISSIONS_ARRAY = [{ "permission": "orderlog" }, { "permission": "citecfg" }, { "permission": "usermng" }, { "permission": "capitalflow" }, { "permission": "valueaddedsrv" }, { "permission": "tagmng" }, { "permission": "statistics" }, { "permission": "subcitemng" }, { "permission": "cmntbiz" }, { "permission": "cardbiz" }];
const PERMISSION = ["orderlog", "citecfg", "usermng", "capitalflow", "valueaddedsrv", "tagmng", "statistics", "subcitemng", "cmntbiz", "cardbiz"];
const GOODS_STATUS = {
  available: {
    status: "processing",
    text: '已上架',
    src: good43
  },
  paused: {
    status: "warning",
    text: '维护中',
    src: good42
  },
  unavailable: {
    status: "default",
    text: '已下架',
    src: good44
  },
  a: {
    color: "#353535",
    text: '允许退款',
    src: good49
  },
  b: {
    color: "#FF4D4F",
    text: '不允许退款',
    src: good50
  },
  c: {
    color: "#FF4D4F",
    text: '推荐',
    src: good51
  },
  d: {
    color: "#FF4D4F",
    text: '已下架',
    src: good52
  },
  e: {
    color: "#FF4D4F",
    text: '已下架',
    src: good53
  },
}

const CARDS_STATUS = {
  a: {
    color: "#FF4D4F",
    text: '已出售',
    src: good56
  }
}

const USER_STATUS = {
  banned: {
    color: "#FF4D4F",
    text: '封禁',
    src: good70
  },
  normal: {
    color: "#FF4D4F",
    text: '解封',
    src: good69
  }
}

const USER_RANK = {
  "0": {
    src: good77,
    label: "普通用户"
  },
  "1": {
    src: good73,
    label: "高级用户"
  },
  "2": {
    src: good72,
    label: "钻石用户"
  },
  "3": {
    src: good71,
    label: "至尊用户"
  }
}

const REFUND_STATUS = {
  "-": {
		status: "default",
    text: '-',
  },
  refunding: {
		status: "warning",
    text: '退款中',
  },
  refunded: {
		status: "default",
    text: '已退款',
  },
  rejected: {
		status: "error",
    text: '已拒绝',
  }
}
const PROVIDER_TYPE = {
  supplier: {
    color: "#FF4D4F",
    text: '供货商',
  },
  external_provider: {
    color: "#FF4D4F",
    text: '外部供货商',
  }
}
const SCROLL = {x:"120%"}
const CONSUMPTION_TYPE = {
	charge: {
		color: "#52C41A",
		text: '充值',
		// textColor: '#2C68FF',
	},
	refund: {
		color: "#FF4D4F",
		text: '退款',
		// textColor: '#FF8D30',
	},
	add_fund: {
		color: "#52C41A",
		text: '系统加款',
		// textColor: '#FF4D4F',
	},
	sub_fund: {
		color: "#FF4D4F",
		text: '系统减款',
		// textColor: '#FF4D4F',
	},
	consumed_by_cmnt: {
		color: "#595959",
		text: '购买社区商品',
	},
	consumed_by_card: {
		color: "#595959",
		text: '购买卡密商品',
	}
}
const CARD_STATUS = [
	{
		color: "#FF8D30",
		text: '待发货',
		icon: good32,
	},
	{
		color: "#595959",
		text: '已完成',
		icon: good34,
	},
	{
		color: "#FF8D30",
		text: '异常',
		icon: good35,
	}
]
const COMMUNITY_ORDER_STATUS = {
	pending: {
		status: "warning",
		text: '待处理',
	},
	processing: {
		status: "processing",
		text: '进行中',
	},
	completed: {
		status: "success",
		text: '已完成',
	},
	// {
	//   color: "#FF8D30",
	//   text: '异常',
	// },
	closed: {
		color: "rgba(0, 0, 0, 0.25)",
		text: '已结束',
	}
}
const COMMUNITY_AFTER_STATUS = {
	completed: {
		color: "#595959",
		text: '-',
	},
	processing: {
		color: "#FF8D30",
		text: '退款中',
	},
	pending: {
		color: "#595959",
		text: '已退款',
	}
}
const COMMUNITY_SYNC_STATUS = {
	pending: {
		status: "processing",
		text: '待处理',
	},
	failed: {
		status: "processing",
		text: '已失败',
	},
	up_to_date: {
		status: "processing",
		text: '已更新',
	},
	updating: {
		status: "processing",
		text: '更新中',
	},
	out_of_date: {
		status: "processing",
		text: '已过期',
	},
	stopped: {
		status: "processing",
		text: '已停止',
	}
}

export { COMMUNITY_SYNC_STATUS, COMMUNITY_AFTER_STATUS, COMMUNITY_ORDER_STATUS, CARD_STATUS, CONSUMPTION_TYPE, REFUND_STATUS, SCROLL, PROVIDER_TYPE, PERMISSION, TEM_TYPE, PERMISSIONS_ARRAY, USER_STATUS, USER_RANK, CARDS_STATUS, GOODS_STATUS, API_URL, PERMISSIONS, DEVELOPER, JUMP_DELAY, MODULES }

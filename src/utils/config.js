import good42 from '../icons/good/good42.png'
import good43 from '../icons/good/good43.png'
import good44 from '../icons/good/good44.png'
import good49 from '../icons/good/good49.png'
import good50 from '../icons/good/good50.png'
import good51 from '../icons/good/good51.png'
import good52 from '../icons/good/good52.png'
import good53 from '../icons/good/good53.png'
import good56 from '../icons/good/good56.png'
import good69 from '../icons/good/good69.png'
import good70 from '../icons/good/good70.png'
import good71 from '../icons/good/good71.png'
import good72 from '../icons/good/good72.png'
import good73 from '../icons/good/good73.png'
import good77 from '../icons/good/good77.png'

const DEVELOPER = "Production"
const API_URL = DEVELOPER === "test" ? "https://test-omnivstore.prismslight.com/mng" : "http://192.168.1.36:8000/mng"
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
    color: "#2C68FF",
    text: '已上架',
    src: good43
  },
  unavailable: {
    color: "#FF8D30",
    text: '已关闭订单',
    src: good42
  },
  paused: {
    color: "#FF4D4F",
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
  a: {
    color: "#FF4D4F",
    text: '封禁',
    src: good70
  },
  b: {
    color: "#FF4D4F",
    text: '解封',
    src: good69
  }
}

const USER_RANK = {
  "0": {
    src: good77,
    label:"普通用户"
  },
  "1": {
    src: good73,
    label:"高级用户"
  },
  "2": {
    src: good72,
    label:"钻石用户"
  },
  "3": {
    src: good71,
    label:"至尊用户"
  }
}

export { PERMISSION, TEM_TYPE, PERMISSIONS_ARRAY, USER_STATUS, USER_RANK, CARDS_STATUS, GOODS_STATUS, API_URL, PERMISSIONS, DEVELOPER, JUMP_DELAY, MODULES }

import good42 from '../icons/good/good42.png'
import good43 from '../icons/good/good43.png'
import good44 from '../icons/good/good44.png'

const DEVELOPER = "Production"
const API_URL = DEVELOPER === "Production" ? "https://test-omnivstore.prismslight.com/mng" : "http://192.168.1.36:8000/mng"
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
  commbiz: '社区业务',
  cardbiz: '卡密业务'
}
const GOODS_STATUS = {
  available: {
    color: "#2C68FF",
    text: '已上架',
    src: good43
  },
  unavailable: {
    color: "#FF8D30",
    text: '已关闭订单',
    src: good44
  },
  paused: {
    color: "#FF4D4F",
    text: '已下架',
    src: good42
  }
}

export { GOODS_STATUS, API_URL, PERMISSIONS, DEVELOPER, JUMP_DELAY, MODULES }

import {h} from "./history";
import * as qiniu from "qiniu-js";
import * as R from "kefir.ramda";
import CryptoJS from "crypto-js";
import {message} from "antd";
import {JUMP_DELAY} from "./config";
import {setter} from "./store";

function saveSuccess(jump = true, path, state) {
  const history = h.get();
  message.success("操作成功");
  if (jump) {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      if (path) {
        history.push(path, state);
      } else {
        history.goBack();
      }
    }, JUMP_DELAY);
  }
}

function regexNumber (e, float) {
  const regex = /[^\d]/g;
  const floatRegex = /[^\d.]/g;

  if (float) {
    return e.replace(floatRegex, "");
  }
  return e.replace(regex, "");
}

function deleteBeforAfterSpace (str) {
  const regex = /(^\s*)|(\s*$)/g;

  return str.replace(regex, "");
}

function decrypt (ciphertext) {
  const bytes  = CryptoJS.AES.decrypt(ciphertext, "U2FsdGVkX19AlbWGMgKH3wEYQBFool5SeSev64DypXU");
  return bytes.toString(CryptoJS.enc.Utf8);
}

function push(path, state, setKeys) {
  const history = h.get();
	try {
		const p = path.split("/");
		const v = p[p.length -1].split("-");
		(v.length && setKeys) && setter([ ["selectedKeys", v] ]);
		history.push(path, state, setKeys);
	} catch (e) {
		console.log(e);
		history.push(path, state, setKeys);
	}
}

function goBack() {
  const history = h.get();
  history.goBack();
}

function transformTime(old_time) {
  return `${old_time.slice(0, 10)} ${old_time.slice(11, 19)}`;
}

function getKey(k, ks) {
  if (!R.has(k)(ks)) {
    k = R.keys(ks)[0];
  }
  return R.prop(k)(ks);
}

//html剔除富文本标签，留下纯文本
function getSimpleText(html) {
  const re1 = new RegExp("<.+?>", "g");
  const msg = html.replace(re1, "");
  return msg;
}

function dateFormat(date, format="yyyy-MM-dd HH:mm:ss") {
  date = new Date(date);
  const o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "H+": date.getHours(), //hour+8小时
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

function _if(value, callback, elseCallBack) {
  try {
    if (value && typeof callback === "function") {
      return callback(value);
    } else {
      if (elseCallBack && typeof elseCallBack === "function") {
        return elseCallBack();
      }
    }
  } catch (e) {
    return null;
  }
}

function getPath(path, obj, defaultValue) {
  try {
    let ret = obj;
    path.forEach((keyName) => {
      ret = ret[keyName];
    });
    if (ret || typeof ret === "number") {
      return ret;
    } else {
      return defaultValue;
    }
  } catch (e) {
    return defaultValue;
  }
}

function _toFixed (number, num = 2) {
  try {
    return Number(number).toFixed(num);
  } catch (e) {
    return 0;
  }
}

function utf16to8(str) {
	let out, i, len, c;
	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) {
					out += str.charAt(i);
			} else if (c > 0x07FF) {
					out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
					out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
					out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			} else {
					out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
					out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
	}
	return out;
}

/*
 * Interfaces:
 * b64 = base64encode(data);
 * data = base64decode(b64);
 */
const base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const safe64 = function(base64) {
		base64 = base64.replace(/\+/g, "-");
		base64 = base64.replace(/\//g, "_");
		return base64;
};

function base64encode(str) {
	let out, i, len;
	let c1, c2, c3;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
			c1 = str.charCodeAt(i++) & 0xff;
			if (i === len) {
					out += base64EncodeChars.charAt(c1 >> 2);
					out += base64EncodeChars.charAt((c1 & 0x3) << 4);
					out += "==";
					break;
			}
			c2 = str.charCodeAt(i++);
			if (i === len) {
					out += base64EncodeChars.charAt(c1 >> 2);
					out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
					out += base64EncodeChars.charAt((c2 & 0xF) << 2);
					out += "=";
					break;
			}
			c3 = str.charCodeAt(i++);
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
			out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
}

/**
 * 上传凭证算法实现参考
 * 请注意External Resources项中引用的第三方CryptoJS库
 */
const genUpToken = function(accessKey="UEF0xvCcLO8bBKHD1R_JNJlTQsdSWbI3BBUo7tzN", secretKey="pm-lYjawA4M74YP1L_uA8ThqEMQ00SVR94ld5V0u", putPolicy={"scope":"yizhou-img","deadline":2605708420}) {
	//SETP 2
	let put_policy = JSON.stringify(putPolicy);
	console && console.log("put_policy = ", put_policy);

	//SETP 3
	let encoded = base64encode(utf16to8(put_policy));
	console && console.log("encoded = ", encoded);

	//SETP 4
	let hash = CryptoJS.HmacSHA1(encoded, secretKey);
	let encoded_signed = hash.toString(CryptoJS.enc.Base64);

	//SETP 5
	let upload_token = accessKey + ":" + safe64(encoded_signed) + ":" + encoded;
	return upload_token;
};

function parseDomain (str) {
    if (!str) return "";
    if (str.indexOf("://") !== -1) {}
    str = str.substr(str.indexOf("://") + 3);
    const topLevel = ["com", "net", "org", "gov", "edu", "mil", "biz", "name", "info", "mobi", "pro", "travel", "museum", "int", "areo", "post", "rec"];
    const domains = str.split(".");
    if (domains.length <= 1) return str;
    if (!isNaN(domains[domains.length - 1])) return str;
    let i = 0;
    // eslint-disable-next-line eqeqeq,no-const-assign
    while (i < topLevel.length && topLevel[i] !== domains[domains.length - 1]) i++;
    // eslint-disable-next-line eqeqeq
    if (i !== topLevel.length) {
        return domains[domains.length - 2] + "." + domains[domains.length - 1];
    } else {
        i = 0;
        while (i < topLevel.length && topLevel[i] !== domains[domains.length - 2]) i++;
        if (i === topLevel.length) return domains[domains.length - 2] + "." + domains[domains.length - 1]; else return domains[domains.length - 3] + "." + domains[domains.length - 2] + "." + domains[domains.length - 1];
    }
}

function quillUpload(file) {
	return new Promise((resolve, rejected) => {
		const fileName = Date.now()+ ".png";

		const observer = {
			complete(){
				resolve(`http://yzimg.gu126.cn/${fileName}`)
			}
		};
		const config = {
			useCdnDomain: true,
			region: qiniu.region.z2
		}
		const putExtra = {
			fname: Date.now().toString(),
			params: {},
			mimeType: ["image/png"]
		}
		const observable = qiniu.upload(file, fileName, genUpToken(), putExtra, config)
		observable.subscribe(observer) // 上传开始
		// const subscription = observable.subscribe(observer) // 上传开始
		// subscription.unsubscribe() // 上传取消
	})
}

function beforeUpload(file, fileList, setFileList, more = 1) {
	const fileName = Date.now()+ ".png";

	const observer = {
		complete(){
			if( more === 1 ) {
				setFileList([ {
					"uid": Date.now(),
					"name": "image.png",
					"status": "done",
					"url":`http://yzimg.gu126.cn/${fileName}`,
				} ]);
			}else {
				setFileList([...fileList.slice(0, more-1),{
					uid: Date.now(),
					name: 'image.png',
					status: 'done',
					url:`http://yzimg.gu126.cn/${fileName}`,
				}])
			}
		}
	}
	const config = {
		useCdnDomain: true,
		region: qiniu.region.z2
	}
	const putExtra = {
		fname: Date.now().toString(),
		params: {},
		mimeType: ["image/png"]
	}
	const observable = qiniu.upload(file, fileName, genUpToken(), putExtra, config)
	observable.subscribe(observer) // 上传开始
	// const subscription = observable.subscribe(observer) // 上传开始
	// subscription.unsubscribe() // 上传取消

	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
}

function isUrl (url) {
   return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(url);
}

// 定时器方案
function _throttle (fn, wait) {
  let timer = null;

  return function () {
    let context = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
          fn.apply(context, args);
          timer = null;
      }, wait);
    }
  };
}

// 防抖函数
function _debounce (func, wait) {
    // 立即执行版本
    let timerId = null;
    let flag = true;
    return function () {
        clearTimeout(timerId);
        if (flag) {
            func.apply(this, arguments);
            flag = false;
        }
        timerId = setTimeout(() => {
            flag = true;
        }, wait);
    };
}

export {_debounce, _throttle, quillUpload, deleteBeforAfterSpace, regexNumber, parseDomain, isUrl, beforeUpload, genUpToken, decrypt, dateFormat, getSimpleText, getKey, saveSuccess, transformTime, goBack, push, _if, getPath, _toFixed};

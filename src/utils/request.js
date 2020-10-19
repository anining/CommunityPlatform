import { API_URL, DEVELOPER } from './config'
import { message } from 'antd'
import { getter } from '../utils/store'
import { push } from './util';

const ERROR_MSG = {
  "incorrect_user_or_password": "账号或者密码错误",
  "tag_exists": "重复的标签名称",
  "token_expired": "登录过期"
}

function parameterTransform (method, key, parameter) {
  if (method === 'DELETE' || method === 'POST' || method === 'PUT' || method === "PATCH") {
    return API_URL + key;
  }
  let parameterString = API_URL + key + '?';
  for (const param in parameter) {
    if (parameter.hasOwnProperty(param)) {
      parameterString += param + '=' + parameter[param] + '&';
    }
  }
  return parameterString.slice(0, -1);
}

async function transformFetch (method, url, data = {}) {
  try {
    const POST_DATA = JSON.stringify(data);
    let HEADER = {};
    const { authorization } = getter(['authorization']);
    authorization.get() && (HEADER = Object.assign(HEADER, { authorization: authorization.get() }));
    const request = { method, headers: new Headers(HEADER) };
    (method === 'POST' || method === 'PUT' || method === 'PATCH') && (request.body = POST_DATA);
    return new Promise(async (resolve, reject) => {
      try {
        const FETCH_DATA = await fetch(parameterTransform(method, url, data), request);
        const DATA_TEXT = await FETCH_DATA.text();
        const localDate = DEVELOPER === 'Production' ? JSON.parse(DATA_TEXT) : JSON.parse(DATA_TEXT)
        const { error } = localDate
        if (FETCH_DATA.status === 422) {
          message.error("参数错误")
          resolve({ error: "参数错误" });
        } else {
          if (error) {
            if (error in ERROR_MSG) {
              message.error(ERROR_MSG[error])
            } else {
              message.error(localDate.msg || error || "请求错误")
            }
            if (error === "token_expired") {
              push('/login')
            }
          }
          resolve(localDate);
        }
      } catch (e) {
        reject()
        message.error("网络错误")
      }
    })
  } catch (e) {
    message.error("请求失败")
  }
};

export { transformFetch }

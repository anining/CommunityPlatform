import { API_URL, DEVELOPER } from './config'
import { message } from 'antd'
import { getter } from '../utils/store'

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
    let HEADER = {
      // 'x-uaid': UA_ID,
      // 'x-timestamp': TIME_STAMP,
      // 'x-signature': CryptoJS.HmacSHA256(((method === 'GET' || method === 'DELETE') ? buildStr(formatDataRet) : POST_DATA) + '.' + TIME_STAMP, PRIVATE_KEY).toString(),
    };
    const { authorization } = getter(['authorization']);
    authorization.get() && (HEADER = Object.assign(HEADER, { authorization: authorization.get() }));
    const request = { method, headers: new Headers(HEADER) };
    (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') && (request.body = POST_DATA);
    return new Promise(async (resolve, reject) => {
      try {
        const FETCH_DATA = await fetch(parameterTransform(method, url, data), request);
        const DATA_TEXT = await FETCH_DATA.text();
        const localDate = DEVELOPER === 'Production' ? JSON.parse(DATA_TEXT) : JSON.parse(DATA_TEXT);
        if (localDate.error) {
          message.error(localDate.msg || localDate.error || "请求失败")
        }
        // if ('error' in localDate) {
        //   if (localDate.error === TokenInvalid) {
        //     N.replace('VerificationStackNavigator');
        //   }
        resolve(localDate);
        // } else {
        //   resolve({ error: 999, msg: '请求失败' });
        // }
      } catch (e) {
        console.log(e);
        message.error("请求失败")
      }
    })
  } catch (e) {
    console.log(e);
    message.error("请求失败")
  }
};

export { transformFetch }

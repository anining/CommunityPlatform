import { message } from 'antd'
import { API_URL } from "./config";
import { clear, getter } from "../utils/store";
import axios from 'axios'
import PGHelper, { gte, lte } from 'postgrest-api-helper';

const linkClient = () => {};
const axiosInstance = axios.create({});
const helper = new PGHelper(axiosInstance);
const onlyEq = ["id", "supplier_id", "created_at", "updated_at", "merchant_id", "type", "status", "refundable", "ctg_id"]
const ERROR_MSG = {
  '28P01': "账号或者密码错误",
  '23505': "重复的名称",
  'JWSError (JSONDecodeError "Not valid base64url")': "登录过期",
  // incorrect_old_password: "原密码错误",
  // account_exists: "账号已存在"
}
const ERROR_STATUS = {
  "401": "登录过期"
}

function recursion(f, arrays) {
	const [i] = arrays
	if (arrays.length) {
    if (i === "start_from") {
      return recursion(f.and(gte("created_at:start_from"),lte("created_at:end_with")), arrays.slice(1))
    }
    if (i === "end_with") {
      return recursion(f, arrays.slice(1))
    }
		return recursion(f[onlyEq.includes(i) ? "eq" : "like"](i), arrays.slice(1))
	}

	return f
}

const afterRequest = (resolved, rejected, response) => {
  try {
    const [e, r] = response
    if(e) {
      const { status, data } = e.response
      console.log(status, data)
      const { code, message: m } = data
      if (status in ERROR_STATUS) {
        message.error(ERROR_STATUS[status])
        clear()
      } else {
        if (code in ERROR_MSG || m in ERROR_MSG) {
          message.error(ERROR_MSG[code] || ERROR_MSG[m])
        } else {
          console.log(e.response)
          message.error("服务器维护中,请稍后再试!")
        }
      }
      rejected({error: code || m, data: null})
    }else {
      resolved({error: null,data: r.data, total: r.headers["content-range"].split("/")[1]})
    }
  } catch (error) {
    rejected({error: "请求超时", data: null})
  }
}

function customizeFetch (method, url, data={}, id, sorter = []) {
	const {authorization} = getter(['authorization'])
	const api = API_URL + url

	switch(method) {
		case "GET":
			const {page, size} = data
			const templateTable = {...data}
			delete templateTable.page
			delete templateTable.size

			return new Promise((resolved, rejected) => {
        recursion(helper.get(api).setQueries(data).pagination(page, size, true).order(...sorter.map(i => `${i.field}.${i.order === "ascend" ? "asc" : "desc"}`)).addHeader('authorization', authorization.get()), Object.keys(templateTable)).then(r => afterRequest(resolved, rejected, r))
			})
		case "POST":
			return new Promise((resolved, rejected) => {
				helper.post(api).addHeader('authorization', authorization.get()).setBody(data).then(r => afterRequest(resolved, rejected, r))
			})
		case "PATCH":
			return new Promise((resolved, rejected) => {
				helper.patch(api).setQueries({id}).in("id").addHeader('authorization', authorization.get()).setBody(data).then(r => afterRequest(resolved, rejected, r))
			})
		case "DELETE":
			return new Promise((resolved, rejected) => {
				helper.delete(api).setQueries({id: data}).in('id').addHeader('authorization', authorization.get()).then(r => afterRequest(resolved, rejected, r))
			})
		default:
	}
}

export {linkClient, customizeFetch};

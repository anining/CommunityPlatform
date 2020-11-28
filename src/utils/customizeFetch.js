import {message} from 'antd'
import {API_URL} from "./config";
import {clear, getter} from "../utils/store";
import axios from 'axios'
import PGHelper, { not, and, or, eq, gt } from 'postgrest-api-helper';
import { like, _in } from 'postgrest-api-helper'
import {push} from '../utils/util'

const linkClient = () => {};
const axiosInstance = axios.create({});
const helper = new PGHelper(axiosInstance);
const onlyEq = ["id", "created_at", "updated_at", "merchant_id", "type", "status", "refundable", "ctg_id"]
const ERROR_MSG = {
  'Forbidden': "账号或者密码错误",
  'Conflict': "重复的标签名称",
  'Unauthorized': "登录过期",
  // invalid_token: "登录过期",
  // incorrect_old_password: "原密码错误",
  // account_exists: "账号已存在"
}

function recursion(f, arrays) {
	const [i] = arrays
	if(arrays.length) {
		return recursion(f[onlyEq.includes(i) ? "eq" : "like"](i), arrays.slice(1))
	}
	return f
}

const afterRequest = (resolved, rejected, response) => {
	const [i, r] = response
	if(i) {
		const {statusText} = i.response
		if (statusText in ERROR_MSG) {
			message.error(ERROR_MSG[statusText])
		} else {
			console.log(statusText)
			message.error("服务器维护中,请稍后再试!")
		}
		if (statusText === "Unauthorized") {
			clear()
		}
		rejected({error: i.message, data: null})
	}else {
		resolved({error: null,data: r.data})
	}
}

function customizeFetch (method, url, data={}, id) {
	const {authorization} = getter(['authorization'])
	const api = API_URL + url

	switch(method) {
		case "GET":
			const {page, size} = data
			const templateTable = {...data}
			delete templateTable.page
			delete templateTable.size

			return new Promise((resolved, rejected) => {
				recursion(helper.get(api).setQueries(data).pagination(page, size, true).addHeader('authorization', authorization.get()), Object.keys(templateTable)).then(r => afterRequest(resolved, rejected, r))
			})
		case "POST":
			return new Promise((resolved, rejected) => {
				helper.post(api).addHeader('authorization', authorization.get()).setBody(data).then(r => afterRequest(resolved, rejected, r))
			})
		case "PATCH":
			return new Promise((resolved, rejected) => {
				helper.patch(api).setQueries({id}).eq("id").addHeader('authorization', authorization.get()).setBody(data).then(r => afterRequest(resolved, rejected, r))
			})
		case "DELETE":
			return new Promise((resolved, rejected) => {
				helper.delete(api).setQueries({id: data}).in('id').addHeader('authorization', authorization.get()).then(r => afterRequest(resolved, rejected, r))
			})
		default:
	}
}

export {linkClient, customizeFetch};

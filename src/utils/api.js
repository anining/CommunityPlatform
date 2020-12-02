import {customizeFetch} from "./customizeFetch";
import { transformFetch } from './request'

// 卖家登录
export function login (account, password) {
	return customizeFetch("POST", "/rpc/merchant_login", {account, password})
}

// 社区商品分类
export function communityGoodsCategories (type, cid, table, body) {
  switch (type) {
    case "get":
			return customizeFetch("GET", "/verbose_cmnt_ctgs", table)
    case "add":
			return customizeFetch("POST", "/cmnt_ctgs", body)
    case "modify":
			return customizeFetch("PATCH", "/cmnt_ctgs", body, cid)
    default:
			return customizeFetch("DELETE", "/cmnt_ctgs", body)
  }
}

// 对接目标
export function docking (type, gid, table, body) {
  switch (type) {
    case "get":
			return customizeFetch("GET", "/verbose_ext_prvds", table)
    case "add":
			return customizeFetch("POST", "/ext_prvds", body)
    case "modify":
			return customizeFetch("PATCH", "/ext_prvds", body, gid)
    default:
			return customizeFetch("DELETE", "/ext_prvds", body)
  }
}

// 社区商品
export function communityGoods (type, gid, table, body) {
  switch (type) {
    case "get":
      return customizeFetch("GET", "/verbose_cmnt_goods", table)
    case "add":
      return customizeFetch("POST", "/cmnt_goods", body);
    case "modify":
      return customizeFetch("PATCH", "/cmnt_goods", body, gid);
    default:
			return customizeFetch("DELETE", "/cmnt_goods", body);
  }
}

// 社区调价模板
export function cmntPadjs (type, pid, table, body) {
  switch (type) {
    case "get":
      return customizeFetch("GET", "/verbose_cmnt_padjs", table)
    case "add":
      return customizeFetch("POST", "/cmnt_padjs", body)
    default:
      return customizeFetch("DELETE", "/cmnt_padjs", body)
  }
}

// 客服
export function customerServices (type, cid, table, body) {
  switch (type) {
    case "get":
      return customizeFetch("GET", "/customer_services", table)
    case "delete":
      return customizeFetch("DELETE", "/customer_services", body)
    case "modify":
      return customizeFetch("PATCH", "/customer_services", body, cid);
    default:
      return customizeFetch("POST", "/customer_services", body);
  }
}

// 获取登录日志
export function loginlogs (page, size, manager_id, start_from, end_with, sorter) {
  let data = { page, size }
  if (end_with) {
		data = { ...data, ...{end_with} }
  }
  if (start_from) {
		data = { ...data, ...{start_from} }
  }
  if (manager_id) {
		data = { ...data, ...{ merchant_id: manager_id } }
  }
  return customizeFetch("GET", "/oplogs", data, undefined, sorter)
}

// 标签分组
export function tagGroups (type, gid, body) {
  switch (type) {
    case "get":
      return customizeFetch("GET", "/tag_groups")
    case "add":
      return customizeFetch("POST", "/tag_groups", body)
    default:
      return customizeFetch("DELETE", "/tag_groups", gid)
  }
}

// 标签
export function tags (type, tid, body) {
  switch (type) {
    case "get":
      return customizeFetch("GET", "/tags")
    case "add":
      return customizeFetch("POST", "/tags", body)
    default:
      return customizeFetch("DELETE", "/tags", tid)
  }
}

//用户
export function users (type, cid, table, body) {
  switch (type) {
    case "get":
			return customizeFetch("GET", "/verbose_customers", table)
    case "add":
			return customizeFetch("POST", "/customers", body)
    case "modify":
			return customizeFetch("PATCH", "/customers", body, cid)
    default:
			return customizeFetch("DELETE", "/customers", body)
  }
}

// 公告
export function announcements (type, cid, table, body) {
  switch (type) {
    case "get":
      return customizeFetch("GET", "/announcements", table)
    case "delete":
      return customizeFetch("DELETE", "/announcements", body)
    default:
      return customizeFetch("POST", "/announcements", body);
  }
}

// 供货商
export function providers (type, id, table, body) {
  switch (type) {
    case "get":
      return customizeFetch("GET", "/suppliers", table);
    case "add":
      return customizeFetch("POST", "/suppliers", body);
    case "modify":
      return customizeFetch("PATCH", "/suppliers", body, id);
    default:
      return customizeFetch("DELETE", "/suppliers", body);
  }
}

// 供货商商品摘要
export function goodsSummaries (body) {
  return customizeFetch("GET", "/verbose_supp_goods", body)
}

// 店铺设置
export function storeConfig (type, body) {
  switch (type) {
    case "get":
      return customizeFetch("POST", "/rpc/store_configs")
    default:
      return customizeFetch("POST", "/rpc/set_store_configs", body)
  }
}




















// 用户加减款
export function usersBalances (id, amount) {
	return transformFetch("POST", `/users/${id}/balances`, {amount});
}
// 获取用户的社区商品密价列表
export function communityDiscPrices (page, size, uid, goods_id, goods_name, goods_category_id) {
  let data = { page, size }
  if (goods_id) {
    data = { ...data, ...{ goods_id } }
  }
  if (goods_name) {
    data = { ...data, ...{ goods_name } }
  }
  if (goods_category_id) {
    data = { ...data, ...{ ctg_id: goods_category_id } }
  }
  return transformFetch("GET", `/users/${uid}/cmnt-user-prices`, data)
}

// 设置用户的商品密价(社区/卡密)
export function addDiscPrices (user_id, goods_id, price) {
  return transformFetch("PUT", `/cmnt-user-prices`, { user_id, goods_id, price })
}

// 删除用户的商品密价(社区/卡密)
export function deleteDiscPrices (did) {
  return transformFetch("DELETE", `/cmnt-user-prices/${did}`)
}

// 当前管理员信息
export function currentManager () {
  return transformFetch("GET", "/current-manager");
}

// 修改密码
export function password (old_password, new_password) {
  return transformFetch("PUT", "/password", { old_password, new_password })
}

// 管理员
export function managers (type, mid, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/managers")
    case "add":
      return transformFetch("POST", "/managers", body);
    case "modify":
      return transformFetch("PUT", `/managers/${mid}`, body);
    default:
      // return transformFetch("DELETE", `/community-goods-categories/${cid}`);
  }
}

// 权限列表
export function permissions () {
  return transformFetch("GET", "/permissions")
}

// 获取社区订单列表
export function communityGoodsOrders (page, size, id, refund_status, search_user_account, search_goods_name, community_goods_category_id, status, start_from, end_with) {
  let data = { page, size }
  if (id) {
    data = { ...data, ...{ id } }
  }
  if (refund_status) {
    data = { ...data, ...{ refund_status } }
  }
  if (search_user_account) {
    data = { ...data, ...{ user_account: search_user_account } }
  }
  if (search_goods_name) {
    data = { ...data, ...{ goods_name: search_goods_name } }
  }
  if (community_goods_category_id) {
    data = { ...data, ...{ ctg_id: community_goods_category_id } }
  }
  if (status) {
    data = { ...data, ...{ status } }
  }
  if (start_from) {
    data = { ...data, ...{ start_from } }
  }
  if (end_with) {
    data = { ...data, ...{ end_with } }
  }
  return transformFetch("GET", "/cmnt-orders", data)
}

// 获取社区订单历程
export function orderHis (order_id) {
  return transformFetch("GET", "/cmnt-order-histories", { order_id })
}

// 商户主动退款
export function refundAccept (id,amount) {
  return transformFetch("PUT", `/cmnt-orders/${id}/refund/accept`, { amount })
}

//供货商结算
export function paySettle (id) {
  return transformFetch("PUT", `/supps/${id}/settle`)
}

// 获取用户资金流水列表
export function balanceChanges (page, size, start_from, end_with) {
  let data = { page, size }
  if (start_from) {
    data = { ...data, ...{ start_from } }
  }
  if (end_with) {
    data = { ...data, ...{ end_with } }
  }
  return transformFetch("GET", "/balance-changes", data)
}

// 获取价格历史列表
export function priceHistories (goods_type, goods_id) {
  return transformFetch("GET", "/cmnt-price-histories", {goods_id, goods_type})
}

// 获取对接目标统计数据
export function extPrvdStat () {
	return transformFetch("GET", `/ext-prvd-stat`);
}

// 获取对接目标的商品列表
export function extPrvdsGoods (id) {
	return transformFetch("GET", `/ext-prvds/${id}/goods`);
}

// 获取对接目标的商品明细
export function extPrvdsGood (id,gid) {
	return transformFetch("GET", `/ext-prvds/${id}/goods/${gid}`);
}

// 获取对接目标统计数据
export function extPrvdStats () {
	return transformFetch("GET", `/ext-prvd-stat`);
}

// 批量修改订单备注
export function orderComments (ids, comment) {
	return transformFetch("PUT", `/cmnt-order-comments?${ids}`, {ids, comment});
}

// 获取社区订单统计信息
export function ordersStat () {
	return transformFetch("GET", `/cmnt-orders-stat`);
}

// 获取社区商品统计信息
export function goodsStat () {
	return transformFetch("GET", `/cmnt-goods-stat`);
}

// 修改社区商品价格
export function goodsPrice (goods_id, unit_cost, prices, padj_id = null) {
	console.log(padj_id)
	return transformFetch("POST", `/cmnt-goods/${goods_id}/price?goods_id=${goods_id}`, {unit_cost, prices, padj_id});
}

// 批量重新同步社区订单
export function orderSync (ids) {
	return transformFetch("PATCH", `/cmnt-order-sync-status?${ids}`);
}

// 加款机器人设置
export function botConfig (type, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/add-fund-bot-config")
    default:
      return transformFetch("PUT", "/add-fund-bot-config", body)
  }
}

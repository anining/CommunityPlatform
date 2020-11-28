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
			return customizeFetch("GET", "/cmnt_ctgs", table)
    case "add":
			return customizeFetch("POST", "/cmnt_ctgs", body)
    case "add":
      // return transformFetch("POST", "/cmnt-ctgs", body);
    case "modify":
      // return transformFetch("PUT", `/cmnt-ctgs/${cid}`, body);
    default:
      // return transformFetch("DELETE", `/cmnt-ctgs?${body}`);
  }
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

// 获取登录日志
export function loginlogs (page, size, manager_id, start_from, end_with) {
  let data = { page, size }
  if (end_with) {
    data = { ...data, ...{ end_with } }
  }
  if (start_from) {
    data = { ...data, ...{ start_from } }
  }
  if (manager_id) {
    data = { ...data, ...{ manager_id } }
  }
  return transformFetch("GET", "/loginlogs", data)
}

// 社区下单模型
export function communityParamTemplates (type, pid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/cmnt-ptpls", table)
    case "add":
      return transformFetch("POST", "/cmnt-ptpls", body)
    case "modify":
      return transformFetch("PUT", `/cmnt-ptpls/${pid}`, body)
    default:
      return transformFetch("DELETE", `/cmnt-ptpls?${body}`)
  }
}

// 供货商摘要
export function providerSummaries () {
  return transformFetch("GET", "/supp-summaries")
}

// 供货商商品摘要
export function goodsSummaries (id) {
  return transformFetch("GET", `/supps/${id}/goods-summaries`)
}

// 社区商品
export function communityGoods (type, gid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/cmnt-goods", table)
    case "add":
      return transformFetch("POST", "/cmnt-goods", body);
    case "modify":
      return transformFetch("PUT", `/cmnt-goods/${gid}`, body);
    case "modifys":
      return transformFetch("PATCH", `/cmnt-goods?${table}`, body);
    default:
      //   return transformFetch("DELETE", `/community-goods?${body}`);
  }
}

// 社区调价模板
export function cmntPadjs (type, pid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/cmnt-padjs", table)
    case "add":
      return transformFetch("POST", "/cmnt-padjs", body)
    default:
      // return transformFetch("PUT", `/cmnt-padjs/${pid}`, body)
  }
}

// 标签分组
export function tagGroups (type, gid, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/tag-groups")
    case "add":
      return transformFetch("POST", "/tag-groups", body)
    default:
      return transformFetch("DELETE", `/tag-groups/${gid}`)
  }
}

// 标签
export function tags (type, tid, body) {
  switch (type) {
    case "add":
      return transformFetch("POST", "/tags", body)
    default:
      return transformFetch("DELETE", `/tags/${tid}`)
  }
}

// 获取用户列表
export function users (page, size, account, status) {
  let data = { page, size }
  if (account) {
    data = { ...data, ...{ account } }
  }
  if (status) {
    data = { ...data, ...{ status } }
  }
  return transformFetch("GET", "/users", data)
}

// 添加用户
export function addUsers (account, lv, status) {
  return transformFetch("POST", "/users", { account, lv, status })
}

// 批量修改用户信息
export function updateUsers (lv, body) {
  return transformFetch("PATCH", "/users?" + body, lv)
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

// 店铺设置
export function storeConfig (type, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/store-config")
    default:
      return transformFetch("PUT", "/store-config", body)
  }
}

// 公告
export function announcements (type, cid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/announcements", table)
    default:
      return transformFetch("POST", "/announcements", body);
  }
}

// 客服
export function customerServices (type, cid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/customer-services")
    default:
      return transformFetch("POST", "/customer-services", body);
  }
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

// 供货商
export function providers (type, id, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/supps", table);
    case "add":
      return transformFetch("POST", "/supps", body);
    case "modify":
      return transformFetch("PUT", `/supps/${id}`, body);
    default:
      // return transformFetch("DELETE", `/community-goods-categories/${cid}`);
  }
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

// 对接目标
export function docking (type, gid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/ext-prvds", table)
    case "add":
      return transformFetch("POST", "/ext-prvds", body);
    case "modify":
      return transformFetch("PUT", `/ext-prvds/${gid}`, body);
    // case "modifys":
    //   return transformFetch("PATCH", `/cmnt-goods?${table}`, body);
    default:
        return transformFetch("DELETE", `/ext-prvds?${body}`);
  }
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

// 供货商商品明细
export function suppGood (id) {
	return transformFetch("GET", `/supp-goods/${id}`);
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

// 批量删除社区商品
export function delGoods (ids) {
	return transformFetch("DELETE", `/cmnt-goods?${ids}`);
}

// 用户加减款
export function usersBalances (id, amount) {
	return transformFetch("POST", `/users/${id}/balances`, {amount});
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

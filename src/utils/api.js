import { transformFetch } from './request'

// 卖家登录
export function login (account, password) {
  return transformFetch("POST", "/login", { account, password })
}

// 修改密码
export function password (old_password, new_password) {
  return transformFetch("PUT", "/password", { old_password, new_password })
}

// 权限列表
export function permissions () {
  return transformFetch("GET", "/permissions")
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

// 当前管理员信息
export function currentManager () {
  return transformFetch("GET", "/current-manager");
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

// 社区商品分类
export function communityGoodsCategories (type, cid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/community-goods-categories", table)
    case "add":
      return transformFetch("POST", "/community-goods-categories", body);
    case "modify":
      return transformFetch("PUT", `/community-goods-categories/${cid}`, body);
    default:
      return transformFetch("DELETE", `/community-goods-categories?${body}`);
  }
}

// 社区下单模型
export function communityParamTemplates (type, pid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/community-param-templates", table)
    case "add":
      return transformFetch("POST", "/community-param-templates", body)
    case "modify":
      return transformFetch("PUT", `/community-param-templates/${pid}`, body)
    default:
      return transformFetch("DELETE", `/community-param-templates?${body}`)
  }
}

// 社区商品
export function communityGoods (type, gid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/community-goods", table)
    case "add":
      return transformFetch("POST", "/community-goods", body);
    case "modify":
      return transformFetch("PUT", `/community-goods/${gid}`, body);
    case "modifys":
      return transformFetch("PATCH", `/community-goods?${table}`, body);
    default:
      //   return transformFetch("DELETE", `/community-goods?${body}`);
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
export function addUsers (account, password, status, email) {
  let data = { account }
  if (password) {
    data = { ...data, ...{ password } }
  }
  if (status) {
    data = { ...data, ...{ status } }
  }
  if (email) {
    data = { ...data, ...{ email } }
  }
  return transformFetch("POST", "/users", data)
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
    data = { ...data, ...{ goods_category_id } }
  }
  return transformFetch("GET", `/users/${uid}/community-disc-prices`, data)
}

// 设置用户的商品密价(社区/卡密)
export function addDiscPrices (user_id, goods_id, goods_type, disc_price) {
  return transformFetch("PUT", `/disc-prices`, { user_id, goods_id, goods_type, disc_price })
}

// 删除用户的商品密价(社区/卡密)
export function deleteDiscPrices (did) {
  return transformFetch("DELETE", `/disc-prices/${did}`)
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
    case "add":
      return transformFetch("POST", "/announcements", body);
      // case "modify":
      //   return transformFetch("PATCH", `/community-goods-categories/${cid}`, body);
    default:
      // return transformFetch("DELETE", `/community-goods-categories/${cid}`);
  }
}

// 客服
export function customerServices (type, cid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/customer-services")
    case "add":
      return transformFetch("POST", "/customer-services", body);
      // case "modify":
      //   return transformFetch("PATCH", `/customer-services/${cid}`, body);
    default:
      // return transformFetch("DELETE", `/community-goods-categories/${cid}`);
  }
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

// 获取社区商品
export function communityGood (gid) {
  return transformFetch("GET", `/community-goods/${gid}`)
}

// 获取社区订单列表
export function communityGoodsOrders (page, size, id, search_user_account, search_goods_name, community_goods_category_id, status, start_from, end_with) {
  let data = { page, size }
  if (id) {
    data = { ...data, ...{ id } }
  }
  if (search_user_account) {
    data = { ...data, ...{ search_user_account } }
  }
  if (search_goods_name) {
    data = { ...data, ...{ search_goods_name } }
  }
  if (community_goods_category_id) {
    data = { ...data, ...{ community_goods_category_id } }
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
  return transformFetch("GET", "/community-goods-orders", data)
}

// 设置用户的定价类型
export function usersPricingType (uid, community_pricing, card_pricing) {
  let data = {}
  if (community_pricing) {
    data = { ...data, ...{ community_pricing } }
  }
  if (card_pricing) {
    data = { ...data, ...{ card_pricing } }
  }
  return transformFetch("PATCH", `/users/${uid}/pricing-type`, data)
}

// 获取价格历史列表
export function priceHistories (goods_type, goods_id) {
  return transformFetch("GET", "/price-histories")
}

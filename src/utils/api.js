import { transformFetch } from './request'

// 卖家登录
export function login (account, password) {
  return transformFetch("POST", "/login", { account, password })
}

// 修改密码
export function password (old_password, new_password) {
  return transformFetch("PUT", "/password", { old_password, new_password })
}

// 社区商品分类
export function communityGoodsCategories (type, cid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/community-goods-categories", table)
    case "add":
      return transformFetch("POST", "/community-goods-categories", body);
    case "modify":
      return transformFetch("PATCH", `/community-goods-categories/${cid}`, body);
    default:
      return transformFetch("DELETE", `/community-goods-categories/${cid}`);
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
      return transformFetch("PATCH", `/community-param-templates/${pid}`, body)
    default:
      return transformFetch("DELETE", `/community-param-templates/${pid}`)
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
      return transformFetch("PATCH", `/community-goods/${gid}`, body);
    default:
      return transformFetch("DELETE", `/community-goods/${gid}`);
  }
}

// 管理员列表
export function managers () {
  return transformFetch("GET", "/managers")
}

// 管理员权限列表
export function managersPermissions (manager_id) {
  return transformFetch("GET", `/managers/${manager_id}/permissions`, { manager_id })
}

// 新增管理员
export function addManagers (account, nickname, permissions) {
  return transformFetch("POST", "/managers", { account, nickname, permissions })
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

// 权限列表
export function permissions () {
  return transformFetch("GET", "/permissions")
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

// 店铺设置
export function storeConfig (type, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/store-config")
    default:
      return transformFetch("PUT", "/store-config", body)
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
  let data = { account, status }
  if (password) {
    data = { ...data, ...{ password } }
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
export function addDiscPrices (user_id, goods_id, goods_type = "community", disc_price) {
  return transformFetch("PUT", `/disc-prices`, { user_id, goods_id, goods_type, disc_price })
}

// 删除用户的商品密价(社区/卡密)
export function deleteDiscPrices (did) {
  return transformFetch("DELETE", `/disc-prices/${did}`)
}

// 获取社区商品订单
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

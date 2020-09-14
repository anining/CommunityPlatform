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
export function loginlogs (page, size) {
  return transformFetch("GET", "/loginlogs", { page, size })
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

// 社区商品
export function communityGoods (type, gid, table, body) {
  switch (type) {
    // case "get":
    //   return transformFetch("GET", "/community-goods-categories", table)
    case "add":
      return transformFetch("POST", "/community-goods", body);
      // case "modify":
      //   return transformFetch("PATCH", `/community-goods-categories/${gid}`, body);
      // default:
      //   return transformFetch("DELETE", `/community-goods-categories/${gid}`);
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

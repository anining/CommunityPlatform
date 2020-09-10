import { transformFetch } from './request'

// 登录
export function login (account, password) {
  return transformFetch("POST", "/login", { account, password })
}

// 管理员列表
export function managers () {
  return transformFetch("GET", "/managers")
}

// 权限列表
export function permissions () {
  return transformFetch("GET", "/permissions")
}

// 管理员权限列表
export function managersPermissions (manager_id) {
  return transformFetch("GET", `/managers/${manager_id}/permissions`, { manager_id })
}

// 新增管理员
export function addManagers (account, nickname, permissions) {
  return transformFetch("POST", "/managers", { account, nickname, permissions })
}

// 修改密码
export function password (old_password, new_password) {
  return transformFetch("PUT", "/password", { old_password, new_password })
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

// 获取社区商品分类
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

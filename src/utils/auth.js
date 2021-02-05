import Cookies from 'js-cookie'

const TokenKey = 'chengbei_token'
const AdminTokenKey = 'chengbei_admintoken'
const UserInfo = 'chengbei_user'
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getUserInfo() {
  return Cookies.getJSON(UserInfo)
}
export function setUserInfo(user) {
  return Cookies.set(UserInfo, user)
}
export function removeUserInfo() {
  return Cookies.remove(UserInfo)
}
export function getAdminToken() {
  return Cookies.get(AdminTokenKey)
}
export function setAdminToken(admintoken) {
  return Cookies.set(AdminTokenKey, admintoken)
}
export function removeAdminToken() {
  return Cookies.remove(AdminTokenKey)
}

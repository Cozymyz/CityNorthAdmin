import request from '@utils/request'

export function adminlogin(adminName, adminPassword) {
  return request({
    url: 'admin/login',
    method: 'post',
    params: { adminName, adminPassword }
  })
}

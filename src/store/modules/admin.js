import { adminlogin } from '@/api/admin'
import { getAdminToken, setAdminToken, removeAdminToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
const getDefaultState = () => {
  return {
    admintoken: getAdminToken()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, admintoken) => {
    state.admintoken = admintoken
  },
  REMOVE_TOKEN: (state, admintoken) => {
    removeAdminToken()
    Object.assign(state, getDefaultState())
  },
  SET_ADMININFO: (state, data) => {
    state.adminInfo = data
  }
}

const actions = {
  adminlogin({ commit }, adminInfo) {
    const { login_adminname, login_password } = adminInfo
    return new Promise((resolve, reject) => {
      adminlogin(login_adminname, login_password)
        .then(response => {
          const { data } = response
          console.log(response)
          if (data.message === 400) {
            reject(400)
          } else if (data.message === 200) {
            commit('SET_TOKEN', data.token)
            setAdminToken(data.token)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

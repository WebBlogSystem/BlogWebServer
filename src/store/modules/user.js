import { sstorage } from '../storage'
import userApi from '@/api/userApi'

const state = {
  // 登录用户信息
  userInfo: {},
  otherInfo: {},
  // 1添加博文 2博客管理 3标签管理显示 1个人资料
  leftCurrent: '1'
}

// getters
const getters = {
}

// actions
const actions = {
  deleteUser ({ commit, state }, param) {
    userApi.deleteUser(param).then(
      (response) => {
        var data = response.data
        if (data.islogin) {
          if (data.flag) {
            param.success()
          } else {
            param.actionError(data.info)
          }
        } else {
          param.fail()
        }
      }
    )
  },
  getUserByUserId ({ commit, state }, param) {
    userApi.getUser(param).then(
      (response) => {
        var data = response.data
        if (data.flag) {
          param.success(data.res)
        } else {
          param.fail(data.info)
        }
      }
    )
  },
  getUsers ({ commit, state }, param) {
    userApi.getUsers(param).then(
      (response) => {
        var data = response.data
        if (data.islogin) {
          if (data.flag) {
            param.success(data.res)
          } else {
            param.actionError(data.info)
          }
        } else {
          param.fail()
        }
      }
    )
  }
}

// mutations
const mutations = {
  setLeftCurrent (state, current) {
    state.leftCurrent = current
  },
  setUserInfo (state, userInfo) {
    sstorage.setItem('user', JSON.stringify(userInfo))
    state.userInfo = userInfo
  },
  setOtherUser (state, userInfo) {
    state.otherInfo = userInfo
  },
  reset (state) {
    state.userInfo = {}
    state.otherInfo = {}
    state.leftCurrent = '1'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

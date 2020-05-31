import { sstorage } from '../storage'
import adminApi from '@/api/adminApi'

const state = {
  // 登录用户信息
  adminInfo: {},
  // 1.文章和评论审核 2.审核历史记录 3.修改密码
  leftCurrent: '1-1'
}

// getters
const getters = {
}

// actions
const actions = {
  deleteEssay ({ commit, state }, param) {
    adminApi.deleteEssay(param).then(function (response) {
      var data = response.data
      if (data.islogin) {
        if (data.flag) {
          data = data.res
          param.success()
        } else {
          param.actionError(data.info)
        }
      } else {
        param.fail()
      }
    })
  },
  getEssays ({ commit, state }, param) {
    adminApi.getEssays(param).then(function (response) {
      var data = response.data
      if (data.islogin) {
        if (data.flag) {
          data = data.res
          param.success(data)
        } else {
          param.actionError(data.info)
        }
      } else {
        param.fail()
      }
    })
  },
  setPassword ({ commit, state }, param) {
    adminApi.setPassword(param).then((response) => {
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
    })
  },
  setCommentFlag ({ commit, state }, param) {
    adminApi.setCommentFlag(param).then((response) => {
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
    })
  },
  setEssayFlag ({ commit, state }, param) {
    adminApi.setEssayFlag(param).then((response) => {
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
    })
  },
  adminLogin ({ commit, state }, param) {
    adminApi.adminLogin(param).then((response) => {
      var data = response.data
      if (data.flag) {
        param.success(data.res)
      } else {
        param.fail(data.info)
      }
    })
  }
}

// mutations
const mutations = {
  setAdminInfo (state, adminInfo) {
    sstorage.setItem('admin', JSON.stringify(adminInfo))
    state.adminInfo = adminInfo
  },
  setLeftCurrent (state, leftCurrent) {
    state.leftCurrent = leftCurrent
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

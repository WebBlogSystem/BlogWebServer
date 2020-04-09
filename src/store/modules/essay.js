import essayApi from '@/api/essayApi'
import ViewUI from 'view-design'

const state = {
  // EssayList模块样式: 0主页文章列表  1个人中心 2 其他用户文章列表
  essayListFrom: 0
}

// getters
const getters = {
}

// actions
const actions = {
  getEssayHistorys ({ commit, state }, param) {
    essayApi.getEssayHistorys(param).then(function (response) {
      var data = response.data
      if (data.islogin) {
        if (data.flag) {
          data = data.res
          param.success(data)
        } else {
          ViewUI.Message.error(data.info)
        }
      } else {
        param.fail()
      }
    })
  },
  getEssaysWithoutCheck ({ commit, state }, param) {
    essayApi.getEssaysWithoutCheck(param).then(function (response) {
      var data = response.data
      if (data.islogin) {
        if (data.flag) {
          data = data.res
          param.success(data)
        } else {
          ViewUI.Message.error(data.info)
        }
      } else {
        param.fail()
      }
    })
  }
}

// mutations
const mutations = {
  setEssayListFrom (state, essayListFrom) {
    state.essayListFrom = essayListFrom
  },
  reset (state) {
    state.essayListFrom = 0
    state.essayList = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

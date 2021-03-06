import cateApi from '@/api/cateApi'

const state = {
}

// getters
const getters = {
}

// actions
const actions = {
  getCatesByEssay ({ commit, state }, param) {
    cateApi.getCatesByEssayId(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        param.success(data)
      } else {
        param.fail(data.info)
      }
    })
  }
}

// mutations
const mutations = {
  setCateList (state, cateList) {
    state.cateList = cateList
  },
  setUserId (state, userId) {
    state.userId = userId
  },
  reset (state) {
    state.cateList = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

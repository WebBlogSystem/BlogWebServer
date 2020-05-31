export default {
  getUserInfo ({ state, commit }) {
    commit('updateUserInfo', {})
    var res = {
      name: '2222',
      id: '0000'
    }
    commit('updateUserInfo', res)
    return res
  }
}

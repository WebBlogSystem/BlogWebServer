import axios from './networkAxios'

export default {
  getUser (param) {
    return axios.post('/user/getUserByUserId', {
      userId: param.userId
    })
  },
  getUsers (param) {
    return axios.post("/admin/getUsers", {
      page: param.page
    })
  },
  deleteUser (param) {
    return axios.post("/admin/deleteUserByUserId", {
      userId: param.userId
    })
  }
}

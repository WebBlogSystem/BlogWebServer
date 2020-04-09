import axios from './networkAxios'

export default {
  getUser (param) {
    return axios.post('/user/getUserByUserId', {
      userId: param.userId
    })
  }
}

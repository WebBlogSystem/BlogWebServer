import axios from './networkAxios'
export default {
  getEssay (param) {
    return axios.post('/user/getEssayByEssayId', {
      essayId: param.essayId
    })
  },
  getEssaysWithoutCheck (param) {
    return axios.post("/admin/getEssays", {
      page: param.page,
    })
  },
  getEssayHistorys (param) {
    return axios.post("/admin/getEssayHistorys", {
      page: param.page,
      search: param.search
    })
  }
}

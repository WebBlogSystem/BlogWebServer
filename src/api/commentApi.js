import axios from "./networkAxios"

export default {
  getCommentWithoutCheck (param) {
    return axios.post("/admin/getComments", {
      page: param.page,
      flag: param.flag
    })
  },
  getCommentHistorys (param) {
    return axios.post("/admin/getCommentsHistorys", {
      page: param.page,
      search: param.search
    })
  }
}

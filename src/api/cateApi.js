import axios from "./networkAxios"

export default {
  getCatesByEssayId (param) {
    return axios.post("/user/getCatesByEssayId", {
      essayId: param.essayId
    })
  }
}

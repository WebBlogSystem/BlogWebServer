import axios from './networkAxios'

export default {
  adminLogin (admin) {
    return axios.post('/admin/login', {
      username: admin.username,
      password: admin.password
    })
  },
  setEssayFlag (essay) {
    return axios.post('/admin/setEssayFlag', {
      essayId: essay.essayId,
      flag: essay.flag,
      checkmsg: essay.checkmsg
    })
  },
  setCommentFlag (essay) {
    return axios.post('/admin/setCommentFlag', {
      commentId: essay.commentId,
      flag: essay.flag,
      checkmsg: essay.checkmsg
    })
  },
  deleteEssay (param) {
    return axios.post('/admin/deleteEssayByEssayId', {
      essayId: param.essayId
    })
  },
  setPassword (admin) {
    return axios.post('/admin/setPassword', {
      adminId: admin.adminId,
      oldPassword: admin.oldPassword,
      newPassword: admin.newPassword
    })
  },
  getEssays (param) {
    return axios.post("/admin/getEssays", {
      page: param.page,
      flag: param.flag
    })
  }
}

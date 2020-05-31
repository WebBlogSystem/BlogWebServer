<template>
    <div class="userManage">
        <Table border stripe :columns="userHeader" :data="userList">
            <template slot-scope="{ row }" slot="username">
                <strong><avatar :imgId="row.imgid"></avatar>{{ row.username}}</strong>
            </template>
            <template slot-scope="{row,index}" slot="action">
                <Button type="primary" size="large" stype="margin-rightL: 5px" @click="show(row,index)">查看</Button>
                <Button type="error" size="large" @click="remove(row,index)">删除</Button>
            </template>
        </Table>
        <Page :current="page" :total="totalCount" @on-change="getNextPage" simple />
    </div>
</template>
<script>
import avatar from "@/components/utils/Avatar"
export default {
    created () {
        this.getUsers(1)
        this.$store.commit("admin/setLeftCurrent", "4-1")
        this.$store.commit("switchLoading", !1)
    },
    components: {
        avatar
    },
    methods: {
        getNextPage (page) {
            this.getUsers(page)
        },
        getUsers (page) {
            var _this = this
            var userParam = {
                page,
                success: (userList) => {
                    console.log(userList)
                    _this.page = userList.currentPage
                    _this.totalCount = userList.totalCount
                    _this.userList = userList.list
                    this.$store.commit("switchLoading", !1)
                },
                actionError: (info) => {
                    this.$store.commit("switchLoading", !1)
                    _this.$Message.eroor(info)
                },
                fail: () => {
                    _this.$router.push("/")
                }
            }
            this.$store.dispatch("user/getUsers", userParam)
        },
        show (user, index) {
            console.log(user)
            var content = '用户名: ' + user.username + '<br>邮箱: ' + user.mail + '<br>性别：' + user.sex + '<br>激活状态: ' + (user.status === 1 ? '已激活' : '未激活') + '<br>剩余活跃值：' + user.point + '<br>累计活跃值：' + user.sumpoints + '<br>个人简介: <div style="word-wrap:break-word;word-break:normal">' + user.intro + '</div>'
            console.log(content)
            this.$Modal.info({
                title: "用户详情",
                content
            })
        },
        remove (user, index) {
            this.$store.commit("switchLoading", !0)
            var userParam = {
                userId: user.id,
                success: () => {
                    this.userList.splice(index, 1)
                    if (this.userList.length) {
                        this.getNextPage(this.page)
                    } else {
                        if (this.page !== 1) {
                            this.getNextPage(this.page - 1)
                        } else {
                            this.$store.commit("switchLoading", !1)
                        }
                    }
                },
                fail: () => {
                    this.$router.push("/")
                },
                actionError: (info) => {
                    this.$store.commit("switchLoading", !1)
                    this.$Message.error(info)
                }
            }
            this.$store.dispatch("user/deleteUser", userParam)
        }
    },
    data () {
        return {
            page: 1,
            totalCount: 0,
            userHeader: [
                {
                    title: "用户名",
                    slot: "username"
                },
                {
                    title: "邮箱",
                    key: "mail"
                },
                {
                    title: "性别",
                    key: "sex"
                },
                {
                    title: "激活状态",
                    key: "status"
                },
                {
                    title: "剩余活跃值",
                    key: "point"
                },
                {
                    title: "累计活跃值",
                    key: "sumpoints"
                },
                {
                    title: "操作",
                    slot: "action",
                    align: "center"
                }
            ],
            userList: []
        }
    }
}
</script>

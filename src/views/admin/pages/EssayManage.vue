<template>
    <div class="essayManage">
        <Table border stripe :columns="essayHeader" :data="getEssayList">
            <template slot-scope="{ row }" slot="title">
                <strong>{{row.title}}</strong>
            </template>
            <template slot-scope="{row,index}" slot="action">
                <Button type="primary" size="large" stype="margin-rightL: 5px" @click="show(row,index)">查看</Button>
                <Button type="error" size="large" @click="remove(row,index)">删除</Button>
            </template>
        </Table>
        <Page :current="page" :total="totalCount" @on-change="getNextPage" simple />
        <div v-if="showEssayDetail">
            <Modal v-model="showEssayDetail" :styles="{ top: '5px' }" :width="40" @on-cancel="cancelDetail" @on-ok="cancelDetail">
                <div>
                    作者: <span>{{currentEssay.user.username}}</span>
                </div>
                <div>
                    <span class="mr10">标签:</span><Tag color="#57a3f3" class="mr10" v-for="(cate, index) in cateListOfEssay" :key="index" type="border">{{cate.name}}</Tag>
                </div>
                <div v-if="content.html">
                    <editor v-model="content"></editor>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
import editor from "@/components/editor/Editor"
export default {
    created () {
        this.getEssays(1)
        this.$store.commit("admin/setLeftCurrent", "5-1")
        this.$store.commit("switchLoading", !1)
    },
    computed: {
        getEssayList () {
            return this.essayList.map(item => item.essay)
        }
    },
    components: {
        editor
    },
    data () {
        return {
            currentEssay: {},
            showEssayDetail: !1,
            page: 1,
            totalCount: 0,
            essayHeader: [
                {
                    title: "文章标题",
                    slot: "title"
                },
                {
                    title: "拥有标签数量",
                    key: "catenums"
                },
                {
                    title: "审核状态",
                    key: "flag"
                },
                {
                    title: "审核信息",
                    key: "checkmsg"
                },
                {
                    title: "最后创建或修改的时间",
                    key: "createtime"
                },
                {
                    title: "操作",
                    slot: "action"
                }
            ],
            essayList: [],
            cateListOfEssay: [],
            content: {
                txt: "",
                html: "",
                isEditable: false
            }
        }
    },
    methods: {
        getCatesOfEssay (essayId) {
            var _this = this
            var cateParam = {
                essayId,
                success: (cateList) => {
                    _this.cateListOfEssay = cateList
                }
            }
            this.$store.dispatch("cate/getCatesByEssay", cateParam)
        },
        cancelDetail () {
            this.cateListOfEssay = []
            this.showEssayDetail = !1
            this.content.txt = ""
            this.content.html = ""
            this.currentEssay = {}
        },
        show (essay, index) {
            this.currentEssay = this.essayList[index]
            this.content.txt = essay.msg
            this.content.html = essay.htmlmsg
            this.showEssayDetail = !0
            this.getCatesOfEssay(essay.id)
        },
        remove (essay, index) {
            var _this = this
            this.$store.commit("switchLoading", !0)
            var essayParam = {
                essayId: essay.id,
                success: () => {
                    _this.essayList.splice(index, 1)
                    if (_this.essayList.length) {
                        _this.getEssays(_this.page)
                    } else {
                        if (_this.page !== 1) {
                            _this.getEssays(_this.page - 1)
                        } else {
                            _this.$store.commit("switchLoading", !1)
                        }
                    }
                },
                actionError: (info) => {
                    _this.$store.commit("switchLoading", !1)
                    _this.$Message.error(info)
                },
                fail: () => {
                    _this.$router.push("/")
                }
            }
            this.$store.dispatch("admin/deleteEssay", essayParam)
        },
        getNextPage (page) {
            this.getEssays(page)
        },
        getEssays (page) {
            var _this = this
            var essayParam = {
                page,
                flag: 1,
                success: (essayList) => {
                    _this.page = essayList.currentPage
                    _this.totalCount = essayList.totalCount
                    _this.essayList = essayList.list
                    _this.$store.commit("switchLoading", !1)
                },
                actionError: (info) => {
                    _this.$store.commit("switchLoading", !1)
                    _this.$Message.error(info)
                },
                fail: () => {
                    _this.$store.push("/")
                }
            }
            this.$store.dispatch("admin/getEssays", essayParam)
        }
    }
}
</script>

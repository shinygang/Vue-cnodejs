<template>
    <div>
        <nv-head page-type="用户信息" :fix-head="true" :show-menu="false" :need-add="true" ></nv-head>
        <section class="userinfo">
            <img class="u-img" :src="user.avatar_url" /><br/>
            <span class="u-name" v-text="user.loginname"></span>
            <div class="u-bottom">
                <span class="u-time" v-text="getLastTimeStr(user.create_at, false)"></span>
                <span class="u-score">积分：{{user.score}}</span>
            </div>
        </section>
        <section class="topics">
            <ul class="user-tabs">
                <li class="item br" :class='{"selected":selectItem === 1}' @click="changeItem(1)">最近回复</li>
                <li class="item" :class='{"selected":selectItem === 2}' @click="changeItem(2)">最新发布</li>
            </ul>
            <div class="message" v-for="item in currentData">
                <section class="user">
                    <router-link class="head" :to="{name:'user',params:{loginname:item.author.loginname}}">
                        <img :src="item.author.avatar_url" />
                    </router-link>
                    <router-link class="info" :to="{name:'topic',params:{id:item.id}}">
                        <div class="t-title">{{item.title}}</div>
                        <span class="cl mt12">
                            <span class="name">{{item.author.loginname}}</span>
                        </span>
                        <span class="cr mt12">
                            <span class="name" v-text="getLastTimeStr(item.last_reply_at, true)"></span>
                        </span>
                    </router-link>
                </section>
            </div>
            <div class="no-data" v-show="currentData.length === 0">
                <i class="iconfont icon-empty">&#xe60a;</i>
                暂无数据!
            </div>
        </section>
    </div>
</template>
<script>
    import $ from 'webpack-zepto';
    import utils from '../libs/utils.js';
    import nvHead from '../components/header.vue';

    export default {
        data() {
            return {
                user: {},
                currentData: [],
                selectItem: 1
            };
        },
        mounted() {
            this.getUser();
        },
        methods: {
            // 切换tab
            changeItem(idx) {
                this.selectItem = idx;
                this.currentData = idx === 1 ? this.user.recent_replies : this.user.recent_topics;
            },
            getLastTimeStr(date, friendly) {
                return utils.getLastTimeStr(date, friendly);
            },
            getUser() {
                let loginname = this.$route.params.loginname;
                if (!loginname) {
                    this.$alert('缺少用户名参数');
                    this.$router.push({
                        path: '/'
                    });
                    return false;
                }
                $.get('https://cnodejs.org/api/v1/user/' + loginname, (d) => {
                    if (d && d.data) {
                        let data = d.data;
                        this.user = data;
                        if (data.recent_replies.length > 0) {
                            this.currentData = data.recent_replies;
                        } else {
                            this.currentData = data.recent_topics;
                            this.selectItem = 2;
                        }
                    }
                });
            }
        },
        watch: {
            // 切换页面
            '$route' (to, from) {
                this.getUser();
            }
        },
        components: {
            nvHead
        }
    };
</script>

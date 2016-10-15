<template>
    <div>
        <!-- 全局header -->
        <nv-head :page-type="getTitleStr(searchKey.tab)"
                ref="head"
                :fix-head="true"
                :need-add="true">
        </nv-head>

        <section id="page">
            <!-- 首页列表 -->
            <ul class="posts-list">
                <li v-for="item in topics">
                    <router-link :to="{name:'topic',params:{id:item.id}}">
                    <h3 v-text="item.title"
                            :class="getTabInfo(item.tab, item.good, item.top, true)"
                            :title="getTabInfo(item.tab, item.good, item.top, false)">
                    </h3>
                    <div class="content">
                        <img class="avatar" :src="item.author.avatar_url" />
                        <div class="info">
                            <p>
                                <span class="name">
                                    {{item.author.loginname}}
                                </span>
                                <span class="status" v-if="item.reply_count > 0">
                                    <b>{{item.reply_count}}</b>
                                    /{{item.visit_count}}
                                </span>
                            </p>
                            <p>
                                <time>{{item.create_at | getLastTimeStr(true)}}</time>
                                <time>{{item.last_reply_at | getLastTimeStr(true)}}</time>
                            </p>
                        </div>
                    </div>
                    </router-link>
                </li>
            </ul>
        </section>
        <nv-top></nv-top>
    </div>
</template>

<script>
    import $ from 'webpack-zepto';
    import utils from '../libs/utils.js';
    import nvHead from '../components/header.vue';
    import nvTop from '../components/backtotop.vue';

    export default {
        filters: {
            getLastTimeStr(time, isFromNow) {
                return utils.getLastTimeStr(time, isFromNow);
            }
        },
        data() {
            return {
                scroll: true,
                topics: [],
                searchKey: {
                    page: 1,
                    limit: 20,
                    tab: 'all',
                    mdrender: true
                },
                searchDataStr: ''
            };
        },
        mounted() {
            console.log('mounted-topic');
            if (this.$route.query && this.$route.query.tab) {
                this.searchKey.tab = this.$route.query.tab;
            }
            this.getTopics();

            // 滚动加载
            $(window).on('scroll', () => {
                utils.throttle(this.getScrollData, 300);
            });
        },
        methods: {
            // 获取title文字
            getTitleStr(tab) {
                let str = '';
                switch (tab) {
                    case 'share':
                        str = '分享';
                        break;
                    case 'ask':
                        str = '问答';
                        break;
                    case 'job':
                        str = '招聘';
                        break;
                    case 'good':
                        str = '精华';
                        break;
                    default:
                        str = '全部';
                        break;
                }
                return str;
            },
            // 获取不同tab的样式或者标题
            getTabInfo(tab, good, top, isClass) {
                return utils.getTabInfo(tab, good, top, isClass);
            },
            // 获取主题数据
            getTopics() {
                let params = $.param(this.searchKey);
                $.get('https://cnodejs.org/api/v1/topics?' + params, (d) => {
                    this.scroll = true;
                    if (d && d.data) {
                        this.topics = d.data;
                    }
                });
            },
            // 滚动加载数据
            getScrollData() {
                if (this.scroll) {
                    let totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                    if ($(document).height() <= totalheight + 200) {
                        this.scroll = false;
                        this.searchKey.limit += 20;
                        this.getTopics();
                    }
                }
            }
        },
        watch: {
            // 切换页面
            '$route' (to, from) {
                // 页面切换移除之前记录的数据集
                if (sessionStorage.tab) {
                    sessionStorage.removeItem('topics');
                    sessionStorage.removeItem('searchKey');
                    sessionStorage.removeItem('tab');
                }

                const toName = to.name;
                const fromName = from.name;
                // 如果跳转非列表页面则关闭滚动加载事件
                if (toName !== 'list') {
                    $(window).off('scroll');

                    // 如果跳转到详情页面，则记录关键数据
                    // 方便从详情页面返回到该页面的时候继续加载之前位置的数据
                    if (toName === 'topic') {
                        // 当前滚动条位置
                        sessionStorage.scrollTop = $(window).scrollTop();
                        // 当前页面主题数据
                        sessionStorage.topics = JSON.stringify(this.topics);
                        // 查询参数
                        sessionStorage.searchKey = JSON.stringify(this.searchKey);
                        // 当前tab
                        sessionStorage.tab = to.query.tab || 'all';
                    }
                }

                // 如果是当前页面切换分类的情况
                if (fromName === 'list') {
                    if (to.query && to.query.tab) {
                        this.searchKey.tab = to.query.tab;
                    }
                    this.searchKey.limit = 20;
                    this.getTopics();
                } else if (fromName === 'topic') {
                    console.log('router-topic');
                    // 如果从详情返回并且之前存有对应的查询条件和参数
                    // 则直接渲染之前的数据
                    if (sessionStorage.searchKey && sessionStorage.tab === this.searchKey.tab) {
                        this.topics = JSON.parse(sessionStorage.topics);
                        this.searchKey = JSON.parse(sessionStorage.searchKey);
                        this.$nextTick(() => $(window).scrollTop(sessionStorage.scrollTop));
                    }
                }

                // 隐藏导航栏
                this.$refs.head.show = false;
            }
        },
        components: {
            nvHead,
            nvTop
        }
    };
</script>
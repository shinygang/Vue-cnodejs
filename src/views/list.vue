<template>
    <!-- 全局header -->
    <nv-head :page-type="searchKey.tab | getTitleStr"
            fix-head="true"
            :need-add="true"
            :show-menu.sync="showMenu">
    </nv-head>
    
    <section id="page">
        <!-- 首页列表 -->
        <ul class="posts-list">
            <li v-for="item in topics"
                    v-link="{name:'topic',params:{id:item.id}}">

                <h3 v-text="item.title"
                        :class="item.tab | getTabClassName item.good item.top"
                        :title="item.tab | getTabStr item.good item.top">
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
                            <time>
                                {{item.create_at | getLastTimeStr true}}
                            </time>
                            <time>
                                {{item.last_reply_at | getLastTimeStr true}}
                            </time>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </section>
    <nv-top></nv-top>
</template>

<script>
    export default {
        data (){
            return {
                showMenu: false,
                scroll:true,
                topics:[],
                searchKey:{
                    page:1,
                    limit:20,
                    tab:'all',
                    mdrender:true
                },
                searchDataStr:''
            }
        },
        route:{
            data (transition){
                let query = transition.to.query,tab = query.tab || 'all';

                //记录首次加载的查询条件
                if(this.searchDataStr == ""){
                    this.searchDataStr = JSON.stringify(this.searchKey);
                }
                //如果从左侧切换分类，则清空查询条件
                if(transition.from.name === "list"){
                    //this.searchKey.page = 1;
                    this.searchKey.limit = 20;
                    this.searchKey = JSON.parse(this.searchDataStr);
                }


                //如果从详情返回并且typeid一样才去sessionStorge
                if(sessionStorage.searchKey && transition.from.name === "topic"
                    && sessionStorage.tab == tab){
                    this.topics = JSON.parse(sessionStorage.topics);
                    this.searchKey = JSON.parse(sessionStorage.searchKey);
                    this.$nextTick(()=> $(window).scrollTop(sessionStorage.scrollTop));
                }
                else{
                    //页面初次加载获取的数据
                    this.searchKey.tab = query.tab;
                    this.getTopics();
                }
                this.showMenu = false;

                //滚动加载
                $(window).on('scroll', () => {
                    this.getScrollData();
                });

            },
            deactivate (transition){
                $(window).off('scroll');
                if(transition.to.name === "topic"){
                    sessionStorage.scrollTop = $(window).scrollTop();
                    sessionStorage.topics = JSON.stringify(this.topics);
                    sessionStorage.searchKey = JSON.stringify(this.searchKey);
                    sessionStorage.tab = transition.from.query.tab || 'all';
                }
                else{
                    sessionStorage.removeItem("topics");
                    sessionStorage.removeItem("searchKey");
                    sessionStorage.removeItem("tab");
                }
                transition.next();
            }
        },
        methods:{
            getTopics (searchKey){
                let params = $.param(this.searchKey);
                $.get('https://cnodejs.org/api/v1/topics?'+params,(d)=> {
                    this.scroll = true;
                    if(d && d.data){
                        this.topics = d.data;
                        // if(this.searchKey.page == 0){
                        //     this.topics = d.data;
                        // }
                        // else{
                        //     this.topics = this.topics.concat(d.data);
                        // }
                    }
                })
            },
            //滚动加载数据
            getScrollData (){
                if(this.scroll){
                    let totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                    if ($(document).height() <= totalheight + 200) {
                        this.scroll = false;
                        this.searchKey.limit += 20;
                        this.getTopics();
                    }
                }
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "nvTop":require('../components/backtotop.vue')
        }
    }
</script>

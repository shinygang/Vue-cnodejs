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
    module.exports = {
        data: function(){
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
            data:function(transition){
                var _self = this,query = transition.to.query,tab = query.tab || 'all';

                //记录首次加载的查询条件
                if(_self.searchDataStr == ""){
                    _self.searchDataStr = JSON.stringify(_self.searchKey);
                }
                //如果从左侧切换分类，则清空查询条件
                if(transition.from.name === "house-list"){
                    //_self.searchKey.page = 1;
                    _self.searchKey.limit = 20;
                    _self.searchKey = JSON.parse(_self.searchDataStr);
                }


                //如果从详情返回并且typeid一样才去sessionStorge
                if(sessionStorage.searchKey && transition.from.name === "topic"  
                    && sessionStorage.tab == tab){
                    _self.topics = JSON.parse(sessionStorage.topics);
                    _self.searchKey = JSON.parse(sessionStorage.searchKey);
                    setTimeout(function(){
                        $(window).scrollTop(sessionStorage.scrollTop);
                    },100);
                }
                else{
                    //页面初次加载获取的数据
                    _self.searchKey.tab = query.tab;
                    _self.getTopics();
                }
                _self.showMenu = false;

                //滚动加载
                $(window).on('scroll', function() {
                    _self.getScrollData();
                });

            },
            deactivate:function(transition){
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
            getTopics:function(searchKey){
                var _self = this
                    , params = $.param(_self.searchKey);
                $.get('https://cnodejs.org/api/v1/topics?'+params,function(d){
                    _self.scroll = true;
                    if(d && d.data){
                        _self.topics = d.data;
                        // if(_self.searchKey.page == 0){
                        //     _self.topics = d.data;
                        // }
                        // else{
                        //     _self.topics = _self.topics.concat(d.data);
                        // }
                    }
                })
            },
            //滚动加载数据
            getScrollData:function(){
                var _self = this;
                if(_self.scroll){
                    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                    if ($(document).height() <= totalheight + 200) {
                        _self.scroll = false;
                        _self.searchKey.limit += 20;
                        _self.getTopics();
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


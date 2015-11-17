<template>
    <nv-head page-type="主题" 
            :show-menu.sync="showMenu" 
            :need-add="true" 
            fix-head="true"></nv-head>
    <div id="page" class="page markdown-body" v-class="show-menu:showMenu">
        <h2 class="title" v-text="topic.title"></h2>
        <section class="user">
            <img class="head" :src="topic.author.avatar_url" />
            <div class="info">
                <span class="cl">
                    <span class="name">{{topic.author.loginname}}</span>
                    <span class="name">
                        发布于:{{topic.create_at | getLastTimeStr true}}</span>
                </span>
                <span class="cr">
                    <span class="tab" :class="{'good':topic.good || topic.top}"
                            v-text="topic.tab | getTabStr topic.good topic.top"></span>
                    <span class="name">{{topic.visit_count}}次浏览</span>
                </span>
            </div>
        </section>
        <section class='topic_content' v-html="topic.content"></section>
        <section class="reply_num">
            {{topic.reply_count}} 回复
        </section>
        <section class="reply-list">
            <ul>
                <li v-for="item in topic.replies">
                    <section class="user">
                        <img class="head" :src="item.author.avatar_url" 
                            v-link="{name:'user',params:{loginname:item.author.loginname}}"/>
                        <div class="info">
                            <span class="cl">
                                <span class="name" v-text="item.author.loginname"></span>
                                <span class="name">
                                    <span></span>
                                    发布于:{{item.create_at | getLastTimeStr true}}</span>
                            </span>
                            <span class="cr">
                                <span class="iconfont icon" 
                                    :class="{'uped':isUps(item.ups)}" 
                                    @click="upReply(item)">&#xe608;</span>
                                {{item.ups.length}}
                                <span class="iconfont icon" @click="addReply(item.id)">&#xe609;</span>
                            </span>
                        </div>
                    </section>
                    <div class="reply_content" v-html="item.content"></div>
                    <nv-reply :topic.sync="topic" 
                            :topic-id="topicId" 
                            :reply-id="item.id" 
                            :reply-to="item.author.loginname"
                            :show.sync="curReplyId"
                            v-if="userId && curReplyId === item.id"></nv-reply>
                </li>
            </ul>
        </section>
        <nv-reply :topic.sync="topic" :topic-id="topicId" :reply-id="" v-if="userId"></nv-reply>
</template>
<script>
    require('../assets/scss/detail.scss');
    require('../assets/scss/github-markdown.css');
    var $ = require('webpack-zepto');

    module.exports = {
        data: function(){
            var _self = this;
            return {
                showMenu: false,    //是否展开左侧菜单
                topic:{},           //主题
                topicId:'',
                curReplyId:'',
                userId:localStorage.userId || '',
                /*弱提示*/
                alert: {
                    txt: '',
                    show: false,
                    hideFn:function(){
                        var timer;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            _self.alert.show = false;
                        }, 1000);
                    }
                }
            }
        },
        route:{
            data:function(transition){
                var _self = this;
                //隐藏左侧展开菜单
                _self.showMenu = false;

                //获取url传的tab参数
                _self.topicId=transition.to.params.id;

                //加载主题数据
                var _self = this;
                $.get('/api/v1/topic/'+_self.topicId,function(d){
                    if(d && d.data){
                        _self.topic = d.data;
                    }
                });
            }
        },
        methods:{
            isUps:function(ups){
                var _self = this;
                return $.inArray(_self.userId,ups) >= 0;
            },
            addReply:function(id){
                this.curReplyId = id;
                var _self = this;
                if(!_self.userId){
                    _self.$route.router.go('/login?redirect='+encodeURIComponent(this.$route.path));
                }
            },
            upReply:function(item){
                var _self = this;
                if(!_self.userId){
                    _self.$route.router.go('/login?redirect='+encodeURIComponent(this.$route.path));
                }
                else{
                    $.ajax({
                        type:'POST',
                        url:'/api/v1/reply/'+item.id+'/ups',
                        data:{accesstoken:localStorage.token},
                        dataType: 'json',
                        success:function(res){
                            if(res.success){
                                if(res.action == "down"){
                                    var index = $.inArray(_self.userId, item.ups);
                                    item.ups.splice(index,1);
                                }
                                else{
                                    item.ups.push(_self.userId);
                                }
                            }
                        },
                        error:function(res){
                            var error = JSON.parse(res.responseText);
                            _self.alert.txt = error.error_msg;
                            _self.alert.show = true;
                            _self.alert.hideFn();
                            return false;
                        }
                    });
                }
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "nvAlert":require('../components/nvAlert.vue'),
            "nvReply":require('../components/reply.vue')
        }
    }
</script>

<template>
    <nv-head page-type="主题" 
            :show-menu.sync="showMenu" 
            :need-add="true" 
            fix-head="true">
    </nv-head>

    <div id="page" 
            v-class="show-menu:showMenu" 
            v-if="topic.title">
        
        <h2 class="topic-title" v-text="topic.title"></h2>
        
        <section class="author-info">
            <img class="avatar" :src="topic.author.avatar_url" />
            <div class="col">
                <span>{{topic.author.loginname}}</span>
                <time>
                    发布于:{{topic.create_at | getLastTimeStr true}}
                </time>
            </div>
            <div class="right">
                <span class="tag" 
                        :class="topic.tab|getTabClassName item.good item.top">
                        {{topic.tab|getTabStr topic.good topic.top}}
                </span>
                <span class="name">{{topic.visit_count}}次浏览</span>
            </div>
        </section>

        <section class='markdown-body topic-content' v-html="topic.content">
            
        </section>

        <h3 class="topic-reply">
            <strong>{{topic.reply_count}}</strong> 回复
        </h3>

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
    </div>
    <div class='no-data' v-if="noData">
        <i class="iconfont icon-empty">&#xe60a;</i>
        该话题不存在!
    </div>
</template>
<script>
    require('../assets/scss/iconfont/iconfont.css');
    require('../assets/scss/github-markdown.css');
    var $ = require('webpack-zepto');

    module.exports = {
        data: function(){
            var _self = this;
            return {
                showMenu: false,    //是否展开左侧菜单
                topic:{},           //主题
                noData:false,
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
                $.get('https://cnodejs.org/api/v1/topic/'+_self.topicId,function(d){
                    if(d && d.data){
                        _self.topic = d.data;
                    }
                    else{
                        _self.noData = true;
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
                        url:'https://cnodejs.org/api/v1/reply/'+item.id+'/ups',
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

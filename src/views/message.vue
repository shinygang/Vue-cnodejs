<template>
    <nv-head page-type="消息" fix-head="true" :show-menu.sync="showMenu"></nv-head>
    <div class="page markdown-body" v-for="item in message.has_read_messages">
        <section class="user">
            <img class="head" :src="item.author.avatar_url" />
            <div class="info">
                <span class="cl">
                    <span class="name">{{item.author.loginname}}</span>
                    <span class="name" v-if="item.type==='at'">在回复中@了您</span>
                    <span class="name" v-if="item.type==='reply'">回复了您的话题</span>
                </span>
                <span class="cr">
                    <span class="name">{{item.reply.create_at | getLastTimeStr true}}</span>
                </span>
            </div>
        </section>
        <div class="reply_content" v-html="item.reply.content"></div>
        <div class="topic-title" v-link="{name:'topic',params:{id:item.topic.id}}">
            话题：{{item.topic.title}}
        </div>
    </div>
</template>
<script>
    require('../assets/scss/detail.scss');
    require('../assets/scss/github-markdown.css');
    var $ = require('webpack-zepto');

    module.exports = {
        data: function(){
            return {
                showMenu: false,
                token:localCache.token || '',
                message:[]
            }
        },
        route:{
            data:function(transition){
                var _self = this;
                $.get('/api/v1/messages?accesstoken='+_self.token,function(d){
                    if(d && d.data){
                        _self.message = d.data;
                    }
                });
            }
        },
        components:{
            "nvHead":require('../components/header.vue')
        }
    }
</script>

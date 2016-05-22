<template>
    <nv-head page-type="消息" fix-head="true" :show-menu.sync="showMenu"
            :message-count="message.hasnot_read_messages.length" :need-add="true" ></nv-head>
    <div class="page" >
        <ul class="tabs">
            <li class="item br" :class='{"selected":selectItem === 2}' @click="changeItem(2)">已读消息</li>
            <li class="item" :class='{"selected":selectItem === 1}' @click="changeItem(1)">
                未读消息
                <i class="iconfont read" v-show="message.hasnot_read_messages.length > 0"
                    @click="markall">&#xe60c;</i>
            </li>
        </ul>
        <div class="message markdown-body" v-for="item in currentData">
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
        <div class="no-data" v-show="noData">
            <i class="iconfont icon-empty">&#xe60a;</i>
            暂无数据!
        </div>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                showMenu: false,
                selectItem:2,
                token:localStorage.token || '',
                message:{},
                noData:false,
                currentData:[]
            }
        },
        route:{
            data (transition){
                let _self = this;
                $.get('https://cnodejs.org/api/v1/messages?accesstoken='+_self.token,function(d){
                    if(d && d.data){
                        _self.message = d.data;
                        if(d.data.hasnot_read_messages.length > 0){
                            _self.currentData = d.data.hasnot_read_messages;
                        }
                        else{
                            _self.currentData = d.data.has_read_messages;
                            _self.selectItem = 2;
                        }
                        _self.noData = _self.currentData.length === 0 ? true : false;
                    }
                    else{
                        _self.noData = true;
                    }
                });
            }
        },
        methods:{
            //切换tab
            changeItem (idx){
                this.selectItem = idx;
                this.currentData = idx ===1?this.message.hasnot_read_messages:this.message.has_read_messages;
                this.noData = this.currentData.length === 0 ? true : false;
            },
            //标记所有为已读
            markall (){
                $.post('https://cnodejs.org/api/v1/message/mark_all',{accesstoken:localStorage.token},
                    function(d){
                    if(d && d.success){
                        window.location.reload();
                    }
                })
            }
        },
        components:{
            "nvHead":require('../components/header.vue')
        }
    }
</script>

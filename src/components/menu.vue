<template>
    <section id="sideBar" class="nav-list" :class="{'show':showMenu}">
        <user-info></user-info>
        <section class="list-ul">
            <router-link class="icon-quanbu iconfont item" :to="{'name':'list',query:{tab:'all'}}">全部</router-link>
            <router-link class="icon-hao iconfont item" :to="{'name':'list',query:{tab:'good'}}">精华</router-link>
            <router-link class="icon-fenxiang iconfont item" :to="{'name':'list',query:{tab:'share'}}">分享</router-link>
            <router-link class="icon-wenda iconfont item" :to="{'name':'list',query:{tab:'ask'}}">问答</router-link>
            <router-link class="icon-zhaopin iconfont item" :to="{'name':'list',query:{tab:'job'}}">招聘</router-link>
            <router-link class="icon-xiaoxi iconfont item line" :to="{'name':'message'}">消息</router-link>
            <router-link class="icon-about iconfont item" :to="{'name':'about'}">关于</router-link>
        </section>
    </section>
</template>
<script>
    export default {
        replace: true,
        props: ['showMenu', 'pageType', 'nickName', 'profileUrl'],
        components: {
            'userInfo': require('./user-info.vue')
        }
    };
</script>

<style lang="scss">
    /*侧边栏*/
    
    .nav-list {
        position: fixed;
        top: 0;
        bottom: 0;
        left: -200px;
        width: 200px;
        background-color: #fff;
        color: #313131;
        transition: all .3s ease;
        z-index: 99;
        &.show {
            transform: translateX(200px);
        }
    }
    /*侧边栏列表*/
    
    .list-ul {
        margin: 0 24px;
        border-top: 1px solid #d4d4d4;
        overflow: hidden;
        padding-top: 9%;
        .item {
            display: block;
            font-size: 14px;
            font-weight: 200;
            padding: 9% 0;
            text-align: left;
            text-indent: 1px;
            line-height: 15px;
            color: #313131;
            font-weight: 700;
            &:last-child {
                margin-bottom: 50px;
            }
            &:before {
                color: #2c3e50;
            }
        }
        .line {
            border-top: 1px solid #d4d4d4;
        }
    }
</style>
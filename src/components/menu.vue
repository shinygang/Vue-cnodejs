<template>
    <section id="sideBar" class="nav-list" :class="{'show':showMenu}">
        <user-info></user-info>
        <ul class="list-ul">
            <li class="icon-quanbu iconfont" v-link="{'name':'list',query:{tab:'all'}}">全部</li>
            <li class="icon-hao iconfont" v-link="{name:'list',query:{tab:'good'}}">精华</li>
            <li class="icon-fenxiang iconfont" v-link="{name:'list',query:{tab:'share'}}">分享</li>
            <li class="icon-wenda iconfont" v-link="{name:'list',query:{tab:'ask'}}">问答</li>
            <li class="icon-zhaopin iconfont" v-link="{name:'list',query:{tab:'job'}}">招聘</li>
            <li class="icon-xiaoxi iconfont line" v-link="{name:'message'}" class="line">消息</li>
            <li class="icon-about iconfont" v-link="{name:'about'}">关于</li>
        </ul>
    </section>
</template>
<script>
    export default {
        replace:true,
        props: ['showMenu','pageType','nickName','profileUrl'],
        components:{
            'userInfo':require('./user-info.vue')
        }
    }
</script>

<style lang="sass">
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
    &.show{
        transform: translateX(200px);
    }
}

/*侧边栏列表*/
.list-ul {
    margin: 0 24px;
    border-top: 1px solid #d4d4d4;
    overflow: hidden;
    padding-top: 9%;
    li {
        font-size: 14px;
        font-weight: 200;
        padding: 9% 0;
        text-align: left;
        text-indent: 1px;
        line-height: 15px;
        color: #7f8c8d;
        &:last-child {
            margin-bottom: 50px;
        }
        &:before{
            color: #2c3e50;
        }
    }

    .line{
        border-top: 1px solid #d4d4d4;
    }
    a {
        display: block;
        color: #313131;
    }
}
</style>
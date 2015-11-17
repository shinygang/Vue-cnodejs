<template>
    <div class="page-cover" 
            v-if="showMenu&&fixHead" 
            @click="showMenus">
    </div>
    <header :class="{'show':showMenu&&fixHead,'fix-header':fixHead,'no-fix':!fixHead}" id="hd">
        <div class="nv-toolbar">
            <div class="toolbar-nav" 
                    @click="openMenu"
                    v-if="fixHead">
            </div>
            <span v-text="pageType"></span>
            <i class="num" v-show="messageCount"> {{messageCount}}</i>
        </div>
    </header>
    <nv-menu :show-menu="showMenu" 
            :page-type="pageType" 
            :nick-name="nickname" 
            :profile-url="profileimgurl"
            v-if="fixHead" ></nv-menu>
</template>

<script>
    var utils = require('../libs/utils'),       //加载公用函数
        $ = require('webpack-zepto');

    module.exports={
        replace:true,
        props: ['pageType','fixHead','showMenu','messageCount'],
        data: function(){
            return {
                nickname: '',
                profileimgurl: ''
            }
        },
        methods: {
            openMenu: function(){
                $("html, body, #page").addClass("scroll-hide");
                this.showMenu=!this.showMenu;
            },
            showMenus:function(){
                this.showMenu=!this.showMenu;
                $("html, body, #page").removeClass("scroll-hide");
            }
        },
        components:{
            'nvMenu':require('./menu.vue')
        }
    }
</script>
<style>
#hd {
    border-bottom: 1px solid #e8e8e8;
    &.fix-header {
        width: 100%;
        background-color: rgba(255, 255, 255, 0.95);
        position: fixed;
        top: 0;
        left: 0;
        transition: all .3s ease;
        box-shadow: 0 0 4px rgba(0,0,0,0.25);
        z-index: 6;
    }
    &.no-fix {
        width: 100%;
        background-color: #fff;
        overflow: hidden;
    }
    &.show {
        transform: translateX(200px);
    }
}
.nv-toolbar {
    width: 100%;
    height: 44px;
    display:-webkit-box;
    -webkit-box-align:center;

    
    .toolbar-nav {
        width: 49px;
        height: 44px;
        position: absolute;
        background: url("../assets/images/components/nav_icon.png") no-repeat center center;
        background-size: 19px 16px;
        margin: 0;
        z-index: 1;
        top: 0;
        left: 0;
    }
    
    &>span {
        display: block;
        text-align: center;
        height: 100%;
        line-height: 44px;
        font-size: 16px;
        width: 100%;
        position: relative;  
        z-index: 0;
    }
    .num {
        background-color: #80bd01;
        color: #fff;
        width: 20px;
        height: 20px;
        line-height: 20px;
        vertical-align: middle;
        text-align: center;
        border-radius: 50%;
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 10;
    }
}
.scroll-hide{
    height: 100%;
    overflow: hidden;
}
</style>
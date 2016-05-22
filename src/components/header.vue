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
            <i class="num" v-if="messageCount > 0"> {{messageCount}}</i>
            <i v-if="needAdd" v-show="!messageCount || messageCount <= 0"
                class="iconfont add-icon" v-link="{name:'add'}">&#xe60f;</i>
        </div>
    </header>
    <nv-menu :show-menu="showMenu"
            :page-type="pageType"
            :nick-name="nickname"
            :profile-url="profileimgurl"
            v-if="fixHead" ></nv-menu>
</template>

<script>
    import utils from '../libs/utils'       //加载公用函数

    export default {
        replace:true,
        props: ['pageType','fixHead','showMenu','messageCount','needAdd'],
        data (){
            return {
                nickname: '',
                profileimgurl: ''
            }
        },
        methods: {
            openMenu (){
                $("html, body, #page").addClass("scroll-hide");
                this.showMenu=!this.showMenu;
            },
            showMenus (){
                this.showMenu=!this.showMenu;
                $("html, body, #page").removeClass("scroll-hide");
            }
        },
        components:{
            'nvMenu':require('./menu.vue')
        }
    }
</script>

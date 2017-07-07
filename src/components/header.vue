<template>
    <div>
        <div class="page-cover" v-if="show&&fixHead" @click="showMenus">
        </div>
        <header :class="{'show':show&&fixHead,'fix-header':fixHead,'no-fix':!fixHead}" id="hd">
            <div class="nv-toolbar">
                <div class="toolbar-nav" @click="openMenu" v-if="fixHead">
                </div>
                <span v-text="pageType"></span>
                <i class="num" v-if="messageCount > 0"> {{messageCount}}</i>
                <router-link to="/add">
                    <i v-if="needAdd" v-show="!messageCount || messageCount <= 0" class="iconfont add-icon">&#xe60f;</i>
                </router-link>
            </div>
        </header>
        <nv-menu :show-menu="show" :page-type="pageType" :nick-name="nickname" :profile-url="profileimgurl" v-if="fixHead"></nv-menu>
    </div>
</template>

<script>
import $ from 'webpack-zepto';

export default {
    replace: true,
    props: {
        pageType: String,
        fixHead: Boolean,
        messageCount: Number,
        scrollTop: 0,
        needAdd: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            nickname: '',
            profileimgurl: '',
            show: false
        };
    },
    methods: {
        openMenu() {
            // $('html, body, #page').addClass('scroll-hide');
            $('body').css('overflow', 'hidden');
            this.show = !this.show;
        },
        showMenus() {
            this.show = !this.show;
            $('body').css('overflow', 'auto');
            // $('html, body, #page').removeClass('scroll-hide');
        }
    },
    components: {
        'nvMenu': require('./menu.vue')
    }
};
</script>

<template>
<div class="iconfont icon-top" v-show="show" @click="goTop">&#xe611;</div>
</template>
<script>
    import $ from 'webpack-zepto';
    export default {
        replace: true,
        data() {
            return {
                show: false
            };
        },
        mounted() {
            $(window).on('scroll', () => {
                if ($(window).scrollTop() > 100) {
                    this.show = true;
                } else {
                    this.show = false;
                }
            });
        },
        beforeDestory() {
            $(window).off('scroll');
        },
        methods: {
            goTop() {
                $(window).scrollTop(0);
                this.show = false;
            }
        }
    };
</script>
<style>
    .icon-top {
        position: fixed;
        right: 10px;
        bottom: 80px;
        font-size: 50px;
        z-index: 9999;
        color: #42b983;
    }
</style>
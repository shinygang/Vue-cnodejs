<template>
<div class="iconfont icon-top" v-show="show" @click="goTop">&#xe611;</div>
</template>
<script>
    module.exports={
        replace:true,
        data: function(){
            return {
                show: false,
            }
        },
        ready: function(){
            var _self = this;
            $(window).on('scroll', function() {
                if($(window).scrollTop() > 100){
                    _self.show = true;
                }
            });
        },
        beforeDestory:function(){
            $(window).off('scroll');
        },
        methods:{
            goTop:function(){
                $(window).scrollTop(0);
                this.show = false;
            }
        }
    }
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
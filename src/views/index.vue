<template>
    <!-- 全局header -->
    <div>
        <img class="index" src="../assets/images/index.png">
    </div>
</template>
<script>
    require('../assets/scss/iconfont/iconfont.css');
    require('../assets/scss/CV.scss');
    require('../assets/scss/github-markdown.css');
    module.exports = {
        ready:function(){
            var _self = this;
            setTimeout(function(){
                _self.$route.router.go({ name: 'list'});
            },2000);
        }
    }
</script>
<style>
    .index{
        width: 100%;
        background-color: #fff;
        margin-top: 40%;
    }
</style>


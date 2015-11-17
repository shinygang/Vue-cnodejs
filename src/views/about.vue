<template>
    <nv-head page-type="关于" fix-head="true" :need-add="true" ></nv-head>
    <ul class="ainfo">
        <li>
            <div class="v-title">关于项目</div>
            <div class="v-info">该项目是基于Cnodejs的api，采用vue.js重写的webapp。</div>
        </li>
        <li>
            <div class="v-title">源码地址</div>
            <div class="v-info">
                <a href="https://github.com/shinygang/Vue-cnodejs">
                https://github.com/shinygang/Vue-cnodejs</a>
            </div>
        </li>
        <li>
            <div class="v-title">意见反馈</div>
            <div class="v-info">
                <a href="https://github.com/shinygang/Vue-cnodejs/issues">
                发表意见或者提需求</a>
            </div>
        </li>
        <li>
            <div class="v-title">当前版本</div>
            <div class="v-info">V 1.0 beta。</div>
        </li>
    </ul>
</template>
<script>
    module.exports = {
        components:{
            "nvHead":require('../components/header.vue')
        }
    }
</script>
<style>
    .ainfo{
        width: 100%;
        list-style: none;
        margin-top: 50px;
        li{
            padding: 15px;
            border-bottom: solid 1px #d4d4d4;
            line-height: 1.5;

            .v-title{
                font-weight: bold;
                margin-bottom: 5px;
                color:#000;
            }
            .v-info{
                color: #626262;
                font-size:13px;
            }
        }
    }
</style>
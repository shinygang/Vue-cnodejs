<template>
    <div v-show="show" id="wxloading" class="wx_loading">
        <div class="wx_loading_inner">
            <i class="wx_loading_icon"></i>{{showTxt}}...
        </div>
    </div>
</template>
<script>
    export default {
        replace:true,
        props: ['showTxt',"show"]
    }
</script>
<style lang="sass">
    .wx_loading {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0);
        .wx_loading_inner {
            text-align: center;
            background-color: rgba(0, 0, 0, 0.5);
            color: #ffffff;
            position: fixed;
            top: 50%;
            left: 50%;
            margin-left: -70px;
            margin-top: -48px;
            width: 150px;
            border-radius: 6px;
            font-size: 14px;
            padding: 58px 0 10px 0;
            .wx_loading_icon {
                position: absolute;
                top: 15px;
                left: 50%;
                margin-left: -16px;
                width: 24px;
                height: 24px;
                border: 2px solid #fff;
                border-radius: 24px;
                -webkit-animation: gif 1s infinite linear;
                animation: gif 1s infinite linear;
                clip: rect(0 auto 12px 0);
                @keyframes gif {
                    0% {
                        -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                    }
                }
                @-webkit-keyframes gif {
                    0% {
                        -webkit-transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                    }
                }
            }
        }
    }
</style>
<template>
    <nv-head page-type="登录">
    </nv-head>
    <section class="page-body">
        <label>
            <input class="txt" type="text" placeholder="Access Token" v-model="token" maxlength="36">
        </label>
        <label>
            <button type="button" @click="logon">登录</button>
        </label>
    </section>
    <nv-alert :content="alert.txt" :show="alert.show"></nv-alert>
</template>

<script>
    var $ = require('webpack-zepto');
    module.exports = {
        data: function () {
            var self = this;
            return {
                token: '',
                /*弱提示*/
                alert: {
                    txt: '',
                    show: false,
                    hideFn:function(){
                        var timer;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            self.alert.show = false;
                        }, 1000);
                    }
                }
            }
        },
        methods: {
            logon: function(){
                var self = this;
                if(self.token == ''){
                    var text = "令牌格式错误,应为36位UUID字符串";
                    self.alert.txt = text;
                    self.alert.show = true;
                    self.alert.hideFn();
                    return false;
                }
                $.ajax({
                    type:'POST',
                    url:'https://cnodejs.org/api/v1/accesstoken',
                    data:{accesstoken:self.token},
                    dataType: 'json',
                    success:function(res){
                        localStorage.loginname = res.loginname;
                        localStorage.avatar_url = res.avatar_url;
                        localStorage.userId = res.id;
                        localStorage.token = self.token;
                        //e44d5f6d-6648-4eb8-96e3-e1bfb34f3635
                        var redirect = decodeURIComponent(self.$route.query.redirect);
                        self.$route.router.go(redirect);
                    },
                    error:function(res){
                        var error = JSON.parse(res.responseText);
                        self.alert.txt = error.error_msg;
                        self.alert.show = true;
                        self.alert.hideFn();
                        return false;
                    }
                })
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "nvAlert":require('../components/nvAlert.vue')
        }
    }
</script>
<style>
    .login-no a {
        display: block;
        color: #313131;
    }
    .login-thr {
        margin: 68px 0 53px;
        border-top: 1px solid #dcdcdc;
        position: relative;
        p {
            padding: 0 8px;
            background-color: #80bd01;
            color: #fff;
            font-size: 12px;
            position: absolute;
            top: -8px;
            left: 50%;
            margin-left: -50px;
        }
    }
    .txt{
        padding: 12px 0;
        border:none;
        border-bottom: 1px solid #4fc08d;
        background-color: transparent;
        display: block;
        -webkit-box-flex: 1;
        font-size: 14px;
        color: #313131;
    }

.page-body {
    padding: 50px 15px;
   
    label{
        width: 100%;
        margin-top: 15px;
        display: -webkit-box;
        position: relative;
    }
    button {
        width: 100%;
        height: 42px;
        border-radius: 3px;
        color: #fff;
        font-size: 16px;
        -webkit-box-flex: 1;
        display: block;
        background-color: #4fc08d;
        border: none;
        border-bottom: 2px solid #3aa373;
        text-align: center;
    }
    .reg-email {
        line-height: 42px;
    }
}
</style>
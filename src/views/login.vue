<template>
    <nv-head page-type="登录">
    </nv-head>
    <section class="page-body">
        <div class="label">
            <input class="txt" type="text" placeholder="Access Token" v-model="token" maxlength="36">
        </div>
        <div class="label">
            <a class="button">选择二维码图片</a>
            <input class="file" type="file" id="file_upload" @change="readPic"
                accept="image/*" capture="camera"/>
            <a class="button" @click="logon">登录</a>
        </div>
    </section>
    <nv-alert :content="alert.txt" :show="alert.show"></nv-alert>
    <nv-loading :show="loading.show" :show-txt="loading.showTxt"></nv-loading>
</template>

<script>
    import {qrcode}  from '../libs/llqrcode'

    let browser = {
        versions: function() {
            let u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
            };
        }(),
    }
    export default {
        data () {
            let self = this;
            return {
                token: '',
                /*弱提示*/
                alert: {
                    txt: '',
                    show: false,
                    hideFn:function(){
                        let timer;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            self.alert.show = false;
                        }, 1000);
                    }
                },
                loading:{
                    show:false,
                    showTxt:'二维码识别中'
                }
            }
        },
        methods: {
            logon (){
                let self = this;
                if(self.token == ''){
                    let text = "令牌格式错误,应为36位UUID字符串";
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
                        let redirect = decodeURIComponent(self.$route.query.redirect || '/');
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
            },
            readPic (e){
                let self = this;
                let file = e.currentTarget.files[0];//  this is my image
                let reader = new FileReader();

                reader.onload = function (e) {
                    let dataURL = reader.result;

                    let base64 = dataURL.split('base64,');
                    let param = { "img": base64[1] };

                    self.loading.show = true;
                    if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
                        $.post('http://m.yueqingwang.com/common.ashx', param, function (d) {
                            self.loading.show = false;
                            if(d == "qrcode error"){
                                self.token = "";
                                let text = "二维码图片不清晰";
                                self.alert.txt = text;
                                self.alert.show = true;
                                self.alert.hideFn();
                                return false;
                            }
                            else{
                                self.token = d;
                            }
                        });
                    }
                    else{
                        qrcode.decode(dataURL);
                        qrcode.callback = function (data) {
                            self.loading.show = false;
                            self.token = data;
                        }
                    }
                }
                reader.readAsDataURL(file);
            },
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "nvAlert":require('../components/nvAlert.vue'),
            "nvLoading":require('../components/loading.vue')
        }
    }
</script>
<style lang="sass">

.page-body {
    padding: 50px 15px;

    .label{
        display: inline-block;
        width: 100%;
        margin-top: 15px;
        position: relative;
        left: 0;
        top: 0;

        .txt{
            padding: 12px 0;
            border:none;
            border-bottom: 1px solid #4fc08d;
            background-color: transparent;
            width: 100%;
            font-size: 14px;
            color: #313131;
        }
        .button {
            display: inline-block;
            width: 48%;
            height: 42px;
            line-height: 42px;
            border-radius: 3px;
            color: #fff;
            font-size: 16px;
            background-color: #4fc08d;
            border: none;
            border-bottom: 2px solid #3aa373;
            text-align: center;
            vertical-align: middle;
        }
        .button:first-child{
            margin-right: 2%;
        }
        .file{
            position: absolute;
            top: 0;
            left: 0;
            height: 42px;
            width: 48%;
            outline: medium none;
            filter:alpha(opacity=0);
            -moz-opacity:0;
            opacity:0;
        }
    }
}
</style>
<template>
    <div class="user-info">
        <!-- 未登录 -->
        <ul class="login-no" v-if="!loginname">
            <li class="login" @click="goEnter"><a >登录</a></li>
        </ul>
        <!-- 已登录 -->
        <div class="login-yes" v-if="loginname">
            <div class="avertar"><img v-if="avatar_url" :src="avatar_url"></div>
            <div class="info">
                <p v-if="loginname" v-text="loginname"></p>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports={
        replace:true,
        data: function() {
            return {
                loginname: localStorage.loginname || "",
                avatar_url: localStorage.avatar_url || ""
            }
        },
        methods:{
            goEnter: function(){
                var link = '/login?redirect='+ encodeURIComponent(this.$route.path);
                this.$route.router.go(link);
            }
        }
    }
</script>

<style>
    /*侧边栏用户信息区域*/
    .user-info {
        padding: 15px;
        font-size: 15px;
        color: #313131;
    }

    /*未登录*/
    .login-no {
        overflow: hidden;
        margin: 8px 9px;
        &>li {
            float: right;
            height: 24px;
            line-height: 24px;
            padding-left: 34px;
            position: relative;
            &:before {
                width: 24px;
                height: 24px;
                content: '';
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        .login {
            float: left;
            &:before {
              background: url("../assets/images/components/login_icon.png") no-repeat left center;
              background-size: 24px 24px;
            }
        }
    }

    /*已登录*/
    .login-yes {
        height: 100%;
        background: url("../assets/images/components/go_next_icon.png") no-repeat right center;
        background-size: 6px 10px;
        overflow: hidden;
        position: relative;
        .avertar {
            width: 40px;
            height: 40px;
            background: url("../assets/images/components/user.png") no-repeat center center;
            background-size: 40px 40px;
            border-radius: 20px;
            overflow: hidden;
            float: left;
            &>img {
                width: 40px;
                height: 40px;
                display: block;
            }
        }
        .info {
            margin-left: 10px;
            overflow: hidden;
            float: left;
        }
        p {
            width: 85px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 12px;
            line-height: 12px;
            line-height: 40px;
            &.lh20 {
                line-height: 20px;
            }
        }
        &:after {
            display: block;
            background: url("../assets/images/components/go_icon.png") no-repeat center right;
            background-size: 7px 7px;
        }
    }
</style>
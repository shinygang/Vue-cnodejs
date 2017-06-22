<template>
  <div class="user-info">
    <!-- 未登录 -->
    <div class="login-no" v-if="!userInfo.loginname">
      <router-link class="login" :to="{ path: '/login', query: { redirect: redirect }}">登录</router-link>
    </div>
    <!-- 已登录 -->
    <router-link class="login-yes" v-if="userInfo.loginname" tag="div"
      :to="{ path: '/user', query: { loginname: userInfo.loginname }}">
      <div class="avertar">
        <img v-if="userInfo.avatar_url" :src="userInfo.avatar_url">
      </div>
      <div class="info">
        <p v-if="userInfo.loginname" v-text="userInfo.loginname"></p>
      </div>
    </router-link>
  </div>
</template>
<script>
import mixin from '../mixin/common.js'
export default {
  mixins: [mixin],
  data () {
    return {
      userInfo: this.$store.state.user || {},
      redirect: encodeURIComponent(this.$route.path)
    }
  }
}
</script>
<style lang="postcss">
.user-info {
  padding: 15px;
  font-size: 15px;
  color: #313131;
}

.login-no {
  overflow: hidden;
  margin: 8px 9px;
  .login {
    height: 24px;
    line-height: 24px;
    padding-left: 34px;
    position: relative;
    color: #666;
    &:before {
      width: 24px;
      height: 24px;
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      background: url("../assets/images/components/login_icon.png") no-repeat left center;
      background-size: 24px 24px;
    }
  }
}

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

.userinfo {
  margin-top:45px;
  width: 100%;
  background-color: $colore7;
  text-align: center;
  height: 180px;
  .u-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 15px;
    display: inline-block;
  }
  .u-name {
    color: #000;
  }
  .u-bottom {
    background-color: $colore7;
    width: 100%;
    margin-top: 20px;
    .u-time {
      width: 50%;
      float: left;
      padding-left: 10px;
    }
    .u-score {
      width: 50%;
      float: left;
      text-align: right;
      padding-right: 10px;
      color: $color80;
    }
  }
}

.message {
  background-color:#fff;
  padding: 5px;
  border-bottom: solid 1px $colord4;
}

.user-tabs {
  width: 100%;
  height: 40px.2;
  list-style: none;
  border-bottom: solid 1px $colord4;
  position: relative;
  .item {
    width: 50%;
    padding: 10px.5 0;
    float: left;
    font-size: 16;
    text-align: center;
    font-weight: bold;
  }
  .read {
    font-size: $gap*5;
    color: $color80;
    position: absolute;
    right: $gap*1;
    top: $gap*1.5;
    font-weight: bold;
  }
  .br {
    border-right: solid 1px $colord4;
  }
  .selected {
    color: $red;
    border-bottom: solid 2px $red;
  }
}

.icon-empty {
  font-size: 10px5;
  color:$colord4;
  display: block;
}

</style>


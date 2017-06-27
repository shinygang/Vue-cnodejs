<template>
  <div class="login-page">
    <nv-head page-type="登录">
    </nv-head>
    <section class="page-body">
      <div class="label">
        <input class="txt" type="text" placeholder="Access Token" v-model="token" maxlength="36">
      </div>
      <div class="label">
        <a class="button" @click="logon">登录</a>
      </div>
    </section>
  </div>
</template>

<script>
import nvHead from '../components/header.vue';
import {fetchPost} from '../util/fetch.js'
import { mapActions } from 'vuex'
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      token: ''
    };
  },
  methods: {
    ...mapActions({
      SET_USER: 'SET_LOGINUSER'
    }),
    logon () {
      if (this.token === '') {
        this.$alert('令牌格式错误,应为36位UUID字符串');
        return false;
      }

      fetchPost('/accesstoken', {accesstoken: this.token})
      .then((res)=>{
        if (res.success) {
          let user = {
            loginname: res.loginname,
            avatar_url: res.avatar_url,
            userId: res.id,
            token: this.token
          }
          this.SET_USER(user);
          Cookies.set('user', JSON.stringify(user))
          window.sessionStorage.user = JSON.stringify(user)
          let redirect = decodeURIComponent(this.$route.query.redirect || '/')
          this.$router.push({path:redirect})
        } else {
          this.$alert(res.error_msg);
        }
      })
      .catch((error)=>{
        this.$alert(error);
      })
    }
  },
  components: {
    nvHead
  }
};
</script>
<style lang="postcss">
.page-body {
  padding: 50px 15px;
  min-height: 400px;
  background-color: #fff;
  .label {
    display: inline-block;
    width: 100%;
    margin-top: 15px;
    position: relative;
    left: 0;
    top: 0;
    .txt {
      padding: 12px 0;
      border: none;
      border-bottom: 1px solid #4fc08d;
      background-color: transparent;
      width: 100%;
      font-size: 14px;
      color: #313131;
    }
    .button {
      display: inline-block;
      width: 99%;
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
    .file {
      position: absolute;
      top: 0;
      left: 0;
      height: 42px;
      width: 48%;
      outline: medium none;
      opacity: 0;
    }
  }
}
</style>

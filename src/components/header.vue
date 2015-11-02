<template>
<div class="navbar">
  <div class="navbar-inner">
    <div class="container">
      <a class="brand" href="/">
          <img src="//dn-cnodestatic.qbox.me/public/images/cnodejs_light.svg">
      </a>
      <form id="search_form" class="navbar-search" action="/search">
        <input type="text" id="q" name="q" class="search-query span3" value="">
      </form>
      <ul class="nav pull-right">
        <li><a v-link="{name:'home'}">首页</a></li>
        <li>
            <a v-link="{name:'myMessage'}">
              未读消息
            </a>
        </li>
        <li><a v-link="{name:'getstart'}" >新手入门</a></li>
        <li><a v-link="{name:'api'}" >API</a></li>
        <li><a v-link="{name:'about'}" target="">关于</a></li>
        <li><a v-link="{name:'setting'}" v-show="!isLogin">注册</a></li>
        <li><a v-link="{name:'signup'}"  v-show="!isLogin">登录</a></li>
        <li><a v-link="{name:'signin'}"  v-show="isLogin">设置</a></li>
        <li>
          <a v-link="{name:'signout'}" data-method="post" rel="nofollow"  v-show="isLogin">退出</a>
        </li>
      </ul>
      <a class="btn btn-navbar" id="responsive-sidebar-trigger">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
    </div>
  </div>
</div>
</template>
<script>
  module.exports={
      replace:true,
      prop:['mesNum',"isLogin"]
  }
</script>
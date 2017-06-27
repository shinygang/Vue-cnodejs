<template>
  <div>
    <div class="page-cover" v-if="show&&fixHead" @click="show = !show">
    </div>
    <header :class="{'show':show&&fixHead,'fix-header':fixHead,'no-fix':!fixHead}" id="hd">
      <div class="nv-toolbar">
        <div class="toolbar-nav" @click="show = !show" v-if="fixHead">
        </div>
        <span v-text="pageType"></span>
        <i class="num" v-if="messageCount > 0"> {{messageCount}}</i>
        <router-link to="/add">
          <i v-if="needAdd" v-show="!messageCount || messageCount <= 0" class="iconfont add-icon">&#xe60f;</i>
        </router-link>
      </div>
    </header>
    <nv-menu :show-menu="show" :page-type="pageType" :nick-name="nickname" :profile-url="profileimgurl" v-if="fixHead"></nv-menu>
  </div>
</template>

<script>
export default {
  replace: true,
  props: {
    pageType: String,
    fixHead: Boolean,
    messageCount: Number,
    needAdd: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      nickname: '',
      profileimgurl: '',
      show: false
    }
  },
  watch: {
    show (val) {
      if (!val) {
        document.body.className = ''
        document.getElementById('page') ? document.getElementById('page').className = '' : ''
      } else {
        document.body.className = 'scroll-hide'
        document.getElementById('page') ? document.getElementById('page').className = 'scroll-hide' : ''
      }
    }
  },
  components: {
    'nvMenu': require('./menu.vue')
  }
}
</script>

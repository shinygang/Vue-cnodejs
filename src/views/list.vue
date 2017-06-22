<template>
  <div>
    <!-- 全局header -->
    <nv-head :page-type="getTitleStr(tab)" ref="head" :fix-head="true" :need-add="true">
    </nv-head>

    <section id="page">
      <!-- 首页列表 -->
      <ul class="posts-list">
        <li v-for="item in topics" :key="item.id">
          <router-link :to="'/topic/' + item.id">
            <h3 v-text="item.title" :class="getTabInfo(item.tab, item.good, item.top, true)" :title="getTabInfo(item.tab, item.good, item.top, false)">
            </h3>
            <div class="content">
              <img class="avatar" :src="item.author.avatar_url" />
              <div class="info">
                <p>
                  <span class="name">
                    {{item.author.loginname}}
                  </span>
                  <span class="status" v-if="item.reply_count > 0">
                    <b>{{item.reply_count}}</b>
                    /{{item.visit_count}}
                  </span>
                </p>
                <p>
                  <time>{{item.create_at | getLastTimeStr(true)}}</time>
                  <time>{{item.last_reply_at | getLastTimeStr(true)}}</time>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
    <nv-top></nv-top>
  </div>
</template>

<script>
require('../assets/css/iconfont.css');
require('../assets/css/all.css');

import {getLastTimeStr, getTabInfo} from '../util/utils.js'
import nvHead from '../components/header.vue'
import nvTop from '../components/backtotop.vue'

export default {
  filters: {
    getLastTimeStr(time, isFromNow) {
      return getLastTimeStr(time, isFromNow);
    }
  },
  data() {
    return {
      tab: this.$store.state.activeType,
      topics: this.$store.getters.activeTopics
    }
  },
  computed: {
    page () {
      console.log(this.$store.state.list)
      return Number(this.$store.state.route.params.page) || 1
    }
  },
  methods: {
    // 获取title文字
    getTitleStr(tab) {
      let str = '';
      switch (tab) {
        case 'share':
          str = '分享';
          break;
        case 'ask':
          str = '问答';
          break;
        case 'job':
          str = '招聘';
          break;
        case 'good':
          str = '精华';
          break;
        default:
          str = '全部';
          break;
      }
      return str;
    },
    // 获取不同tab的样式或者标题
    getTabInfo(tab, good, top, isClass) {
      return getTabInfo(tab, good, top, isClass);
    }
  },

  components: {
    nvHead,
    nvTop
  }
}
</script>

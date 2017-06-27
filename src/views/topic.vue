<template>
  <div>
    <nv-head page-type="主题" :show-menu="showMenu" :need-add="true" :fix-head="true">
    </nv-head>
    <div id="page" :class="{'show-menu':showMenu}" v-if="topic && topic.author">
      <h2 class="topic-title" v-text="topic.title"></h2>
      <section class="author-info">
        <img class="avatar" :src="topic.author.avatar_url" />
        <div class="col">
          <span>{{topic.author.loginname}}</span>
          <time>
            发布于:{{topic.create_at | getLastTimeStr(true)}}
          </time>
        </div>
        <div class="right">
          <span class="tag" :class="getTabInfo(topic.tab, topic.good, topic.top, true)" v-text="getTabInfo(topic.tab, topic.good, topic.top, false)">
          </span>
          <span class="name">{{topic.visit_count}}次浏览</span>
        </div>
      </section>
      <section class='markdown-body topic-content' v-html="topic.content">
      </section>
      <h3 class="topic-reply">
        <strong>{{topic.reply_count}}</strong> 回复
      </h3>
      <section class="reply-list">
        <ul>
          <li v-for="(item, idx) in topic.replies">
            <section class="user">
              <router-link :to="'/user/' + item.author.loginname">
                <img class="head" :src="item.author.avatar_url" />
              </router-link>
              <div class="info">
                <span class="cl">
                  <span class="name" v-text="item.author.loginname"></span>
                  <span class="name mt10">
                    <span></span>
                    发布于:{{item.create_at | getLastTimeStr(true)}}</span>
                </span>
                <span class="cr">
                  <span class="iconfont icon" :class="{'uped':isUps(item.ups)}" @click="upReply(item, idx)">&#xe608;</span>
                  {{item.ups.length}}
                  <span class="iconfont icon" @click="addReply(item.id)">&#xe609;</span>
                </span>
              </div>
            </section>
            <div class="reply_content" v-html="item.content"></div>
            <nv-reply :topic="topic" :topic-id="topicId" :reply-id="item.id" :reply-to="item.author.loginname" :show="curReplyId" @close="hideItemReply" v-if="userInfo.userId && curReplyId === item.id"></nv-reply>
          </li>
        </ul>
      </section>
      <nv-top></nv-top>
      <nv-reply v-if="userInfo.userId" :topic="topic" :topic-id="topicId">
      </nv-reply>
    </div>

    <div class='no-data' v-if="noData">
      <i class="iconfont icon-empty">&#xe60a;</i>
      该话题不存在!
    </div>
  </div>
</template>
<script>
require('../assets/css/markdown.css')

import { getTabInfo, getLastTimeStr } from '../util/utils.js'
import nvHead from '../components/header.vue'
import nvReply from '../components/reply.vue'
import nvTop from '../components/backtotop.vue'
import { mapGetters, mapActions } from 'vuex'
import {fetchPost} from '../util/fetch.js'
import mixin from '../mixin/common.js'

export default {
  data() {
    return {
      showMenu: false, // 是否展开左侧菜单
      noData: false,
      topicId: '',
      curReplyId: '',
      userInfo: this.$store.state.loginUser
    }
  },
  mixins: [mixin],
  computed: {
    topic () {
      this.noData = !this.$store.state.topics[this.$route.params.id].title
      return this.$store.state.topics[this.$route.params.id]
    }
  },
  asyncData ({ store, route: { params: { id }}}) {
    return store.dispatch('FETCH_TOPIC', { id })
  },
  mounted () {
    // 隐藏左侧展开菜单
    this.showMenu = false
    // 获取url传的tab参数
    this.topicId = this.$route.params.id
  },
  filters: {
    getLastTimeStr(time, ago) {
      return getLastTimeStr(time, ago)
    }
  },
  methods: {
    ...mapActions({
      SET_TOPIC: 'SET_TOPIC'
    }),
    getTabInfo (tab, good = false, top, isClass) {
      return getTabInfo(tab, good, top, isClass)
    },
    isUps (ups) {
      return this.userInfo.userId && ups.indexOf(this.userInfo.userId) >= 0
    },
    addReply (id) {
      if (!this.userInfo.userId) {
        window.location.href = '/login?redirect=' + encodeURIComponent(this.$route.path)
      } else {
        this.curReplyId = id
      }
    },
    hideItemReply () {
      this.curReplyId = ''
    },
    upReply (item, idx) {
      if (!this.userInfo.userId) {
        this.$router.push({
          path: '/login?redirect=' + encodeURIComponent(this.$route.path)
        })
      } else {
        fetchPost(`/reply/${item.id}/ups`, `accesstoken=${this.userInfo.token}`).then((res) => {
          if (res.success) {
            if (res.action === 'down') {
              let index = item.ups.indexOf(this.userInfo.userId)
              item.ups.splice(index, 1)
            } else {
              item.ups.push(this.userInfo.userId)
            }
          } else {
            this.$alert(res.error_msg)
          }
        })
      }
    }
  },
  components: {
    nvHead,
    nvReply,
    nvTop
  }
}
</script>

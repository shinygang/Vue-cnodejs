<template>
  <div class="iconfont icon-top" v-show="show" @click="goTop">
    &#xe611;</div>
</template>
<script>
export default {
  replace: true,
  data() {
    return {
      show: false
    };
  },
  mounted() {
    window.onscroll = () => {
      const scrolltop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrolltop > 100) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  beforeDestory() {
    window.removeEventListener('scroll')
  },
  methods: {
    goTop() {
      window.scroll(0, 0)
      this.show = false;
    }
  }
};
</script>
<style lang="postcss">
.icon-top {
  position: fixed;
  right: 10px;
  bottom: 80px;
  font-size: 50px;
  z-index: 9999;
  color: #42b983;
}
</style>

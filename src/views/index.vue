<template>
  <div>
    <img class="index" src="../assets/images/index.png">
  </div>
</template>

<script>


export default {
  mounted() {
    setTimeout(() => {
      this.$router.push({
        path: '/all/1'
      })
    }, 100)
  }
}
</script>
<style lang="postcss">
    .index {
      width: 100%;
      background-color: #fff;
      margin-top: 40%;
    }
</style>

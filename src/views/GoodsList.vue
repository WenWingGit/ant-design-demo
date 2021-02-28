<template>
  <div>
    商品列表
    <hr>
    <button @click="showToast">显示自定义Toast</button>
  </div>
</template>

<script>
  export default {
    name: "GoodsList",
    methods: {
      showToast() {
        this.$sx_toast('我现在显示自定义Toast啦')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
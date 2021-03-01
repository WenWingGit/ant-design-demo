<template>
  <div class="toast" v-show="toastShow">
    {{toastText}}
  </div>
</template>

<script>
  export default {
    name: "Tips",
    
  }
</script>

<style scoped>
div{
  font-size: 40px;
  color: red;
}
</style>
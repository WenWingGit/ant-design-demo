<template>
  <div id="app">
    <a-layout class="layout">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo">后台管理系统</div>
        <a-menu theme="dark" mode="inline" :selected-keys="currentPath">
          <template v-for="menu in menuList">
            <a-menu-item :key="menu.path">
              <router-link :to="menu.path">
                <a-icon :type="menu.iconName" />
                <span>{{ menu.title }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>


<script>
export default {
  name: "App",
  components: {},
  computed: {
    menuList() {
      let menuList = this.$router.options.routes
        .filter((r) => r.meta && r.meta.menuBar)
        .sort((a, b) => a.meta.sortNo - b.meta.sortNo)
        .map((r) => ({
          path: r.path,
          title: r.meta.title,
          iconName: r.meta.iconName,
        }));
      return menuList;
    },
    currentPath() {
      console.log(this.$route.path)
      return [this.$route.path]
    }
  },
  mounted() {},
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
}
.logo {
  margin: 16px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
}
</style>
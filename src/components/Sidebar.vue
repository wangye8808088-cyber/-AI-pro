<template>
  <el-aside
    class="sidebar-aside"
    :width="isCollapsed ? '64px' : '264px'"
  >
    <el-menu
      :collapse="isCollapsed"
      :collapse-transition="true"
      default-active="2"
      class="menu-style"
    >
      <div class="brand">
        <el-image
          style="width: 50px; height: 50px; margin-right: 10px"
          :src="iconUrl"
          alt="logo"
        />
        <div v-show="!isCollapsed" class="info-card">
          <h1 class="brand-title">心理健康AI助手</h1>
          <p class="brand-subtitle">管理后台</p>
        </div>
      </div>
      <el-menu-item
        @click="selectMenu"
        v-for="item in router.options.routes[0].children"
        :key="item.path"
        :index="item.path"
      >
        <el-icon>
          <!-- 动态组件：动态组件就是“活”的（它像一个变色龙，可以根据你的指令随时变成任何组件） -->
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/admin";

const router = useRouter();
const getadminStore = useAdminStore();
const iconUrl = new URL("@/assets/images/机器人.png", import.meta.url).href;

const isCollapsed = computed(() => getadminStore.isCollapsed);
// 利用点击事件获取此处组件的所有数据，之后利用路径的拼接跳转到对应的路由
const selectMenu = (key) => {
  const currentRoute = router.options.routes[0];
  router.push(`${currentRoute.path}/${key.index}`);
};
</script>

<style lang="scss" scoped>
.sidebar-aside {
  transition: width 0.32s var(--mh-ease-out, ease-out);
}

.menu-style {
  height: 100%;
  border-right: none;
  background: var(--hs-cream-mid, #231f1b) !important;

  :deep(.el-menu-item) {
    margin: 4px 8px;
    border-radius: 14px;
    color: var(--hs-text-muted, #8a7a6c);
    transition:
      background 0.22s ease,
      color 0.22s ease,
      transform 0.22s var(--mh-ease-out, ease-out);
  }

  :deep(.el-menu-item:hover) {
    transform: translateX(4px);
    background: rgba(249, 115, 22, 0.10) !important;
    color: var(--hs-text, #ede8e1) !important;
  }

  :deep(.el-menu-item.is-active) {
    background: linear-gradient(
      90deg,
      rgba(249, 115, 22, 0.18),
      rgba(249, 115, 22, 0.06)
    ) !important;
    color: var(--hs-orange, #f97316) !important;
    font-weight: 600;
  }

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    background-color: var(--hs-cream-mid, #231f1b);
    border-bottom: 1px solid var(--hs-border, #38322b);
    .info-card {
      .brand-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
        color: var(--hs-text, #ede8e1);
      }
      .brand-subtitle {
        font-size: 14px;
        color: var(--hs-text-muted, #8a7a6c);
      }
    }
  }
}
</style>

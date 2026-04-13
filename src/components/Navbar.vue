<template>
  <div class="navbar">
    <div class="flex-box">
      <el-button @click="handleCollapse">
        <el-icon>
          <Expand />
        </el-icon>
      </el-button>
      <p class="page-title" :key="route.path">{{ route.meta.title }}</p>
    </div>
    <div class="flex-box">
      <!-- 下拉菜单组件 -->
      <el-dropdown @command="handleCommand">
        <div class="flex-box">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <p>admin</p>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <!-- 具名插槽 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from "@/stores/admin";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox } from "element-plus";
import { logout } from "@/api/admin";

const router = useRouter();
const route = useRoute();

const getadminStore = useAdminStore();

const handleCommand = (command) => {
  console.log(command);
  if (command === "logout") {
    ElMessageBox.confirm("确定退出登录吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      // 确认退出登录
      logout().then(() => {
        // 清除缓存
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        // 跳转登录页
        router.push("/auth/login");
      });
    });
  }
};

const handleCollapse = () => {
  getadminStore.toggleCollapsed();
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: var(--hs-cream, #fffbf7);
  box-shadow: 0 1px 0 rgba(234, 88, 12, 0.06);
  border-bottom: 1px solid rgba(254, 215, 170, 0.4);
  .flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-title {
    margin-left: 20px;
    font-size: 26px;
    font-weight: 800;
    color: var(--hs-text, #292524);
    letter-spacing: -0.02em;
    animation: title-in 0.4s var(--mh-ease-out, ease-out) both;
  }

  @keyframes title-in {
    from {
      opacity: 0;
      transform: translateX(-8px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .navbar .page-title {
    animation: none;
  }
}
</style>

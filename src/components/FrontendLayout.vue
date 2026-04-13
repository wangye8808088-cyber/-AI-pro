<template>
  <div class="frontend-layout">
    <header class="navbar-container">
      <div class="brand-section">
        <el-image
          style="width: 50px; height: 50px"
          :src="iconUrl"
          alt="品牌logo"
          class="brand-logo"
        />
        <h1 class="brand-name">心理健康 AI 助手</h1>
      </div>
      <nav class="nav-section" aria-label="主导航">
        <!-- 嵌套路由下 to="/" 会匹配所有子路径，高亮必须用路径精确判断 -->
        <router-link
          to="/"
          class="nav-link"
          :class="{ 'nav-link--active': navActive.home }"
          >首页</router-link
        >
        <router-link
          to="/consulation"
          class="nav-link"
          :class="{ 'nav-link--active': navActive.consult }"
          v-if="isLoggedIn"
          @mouseenter="prefetchConsultation"
          >AI咨询</router-link
        >
        <router-link
          to="/emotion-diary"
          class="nav-link"
          :class="{ 'nav-link--active': navActive.diary }"
          v-if="isLoggedIn"
          @mouseenter="prefetchEmotionDiary"
          >情绪日记</router-link
        >
        <router-link
          to="/knowledge"
          class="nav-link"
          :class="{ 'nav-link--active': navActive.knowledge }"
          @mouseenter="prefetchKnowledge"
          >知识库</router-link
        >
        <button
          type="button"
          class="logout-btn"
          v-if="isLoggedIn"
          @click="handleLogout"
        >
          退出登录
        </button>
        <template v-else>
          <router-link to="/auth/login" class="nav-link">登录</router-link>
          <router-link to="/auth/register" class="nav-link nav-link--cta">
            <el-button type="primary" round>注册</el-button>
          </router-link>
        </template>
      </nav>
    </header>
    <main class="main-content">
      <!-- 交叉过渡时旧页与新页同时在 DOM；旧页 leave 阶段仍占位会把新页顶到视口下方，故用壳层 + 绝对定位脱离文档流 -->
      <div class="route-transition-root">
        <router-view v-slot="{ Component }">
          <transition name="page-fade">
            <div class="route-page-shell" :key="route.fullPath">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </div>
    </main>
    <footer class="footer-container">
      <div class="footer-bottom">
        <p>&copy; 2026 心理健康AI助手. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { logout } from "@/api/admin";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const iconUrl = new URL("@/assets/images/机器人.png", import.meta.url).href;

const isLoggedIn = ref(false);

/** 前台子路由并列在 `/` 下，不能用 router-link 默认 active（会把 `/` 当成所有子路径的父匹配） */
const navActive = computed(() => {
  const p = route.path;
  return {
    home: p === "/" || p === "",
    consult: p === "/consulation",
    diary: p === "/emotion-diary",
    knowledge: p.startsWith("/knowledge"),
  };
});

let consultationPreloaded = false;
let emotionDiaryPreloaded = false;
let knowledgePreloaded = false;

function prefetchConsultation() {
  if (consultationPreloaded) return;
  consultationPreloaded = true;
  void import("@/views/consultation.vue");
}

function prefetchEmotionDiary() {
  if (emotionDiaryPreloaded) return;
  emotionDiaryPreloaded = true;
  void import("@/views/emotionDiary.vue");
}

function prefetchKnowledge() {
  if (knowledgePreloaded) return;
  knowledgePreloaded = true;
  void import("@/views/frontendKnowledge.vue");
}

// 登出
const handleLogout = () => {
  logout().then(() => {
    // 清除缓存
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    // 跳转到登录页面
    router.push("/auth/login");
  });
};

function syncAuth() {
  isLoggedIn.value = localStorage.getItem("token") !== null;
}

onMounted(() => {
  syncAuth();
});

watch(
  () => route.fullPath,
  () => {
    syncAuth();
  }
);
</script>

<style scoped lang="scss">
.frontend-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    var(--hs-cream, #fffbf7) 0%,
    #ffffff 40%,
    var(--hs-cream-mid, #fef3e8) 100%
  );

  .navbar-container {
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 12px clamp(16px, 4vw, 32px);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    background: rgba(255, 251, 247, 0.96);
    backdrop-filter: blur(14px);
    border: none;
    border-bottom: 1px solid rgba(254, 215, 170, 0.5);
    border-radius: 0;
    box-shadow: 0 1px 0 rgba(41, 37, 36, 0.04);
    animation: nav-in 0.65s var(--mh-ease-out, ease-out) both;

    @keyframes nav-in {
      from {
        opacity: 0;
        transform: translateY(-12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .brand-section {
      display: flex;
      align-items: center;
      gap: 12px;

      .brand-logo {
        border-radius: 16px;
        box-shadow: var(--hs-shadow-soft, var(--mh-shadow-soft));
        transition: transform 0.25s var(--mh-ease-out, ease-out);
      }

      .brand-logo:hover {
        transform: scale(1.04);
      }

      .brand-name {
        font-size: 1.25rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--mh-slate-900, #0f172a);
      }
    }

    .nav-section {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px 28px;

      .nav-link {
        position: relative;
        color: var(--mh-slate-600, #475569);
        font-size: 15px;
        font-weight: 500;
        padding: 6px 0;
        cursor: pointer;
        transition: color 0.2s ease;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(
            90deg,
            var(--mh-teal-500),
            var(--mh-teal-400)
          );
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.28s var(--mh-ease-out, ease-out);
        }

        &:hover {
          color: var(--mh-teal-600, #3d8a7a);
        }

        &:hover::after {
          transform: scaleX(1);
        }
      }

      .nav-link--active {
        color: var(--mh-teal-600, #3d8a7a);
        font-weight: 600;

        &::after {
          transform: scaleX(1);
        }
      }

      .nav-link--cta::after {
        display: none;
      }

      .logout-btn {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 999px;
        color: var(--mh-slate-600, #475569);
        font-size: 14px;
        font-weight: 500;
        padding: 8px 18px;
        cursor: pointer;
        transition:
          background 0.2s ease,
          border-color 0.2s ease,
          color 0.2s ease,
          box-shadow 0.2s ease;
      }

      .logout-btn:hover {
        background: #fff;
        border-color: var(--mh-teal-400, #5eb3a2);
        color: var(--mh-teal-600, #3d8a7a);
        box-shadow: 0 4px 14px rgba(61, 138, 122, 0.15);
      }
    }
  }

  .main-content {
    flex: 1;
    width: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .route-transition-root {
    position: relative;
    flex: 1;
    width: 100%;
    min-height: 0;
  }

  .route-page-shell {
    width: 100%;
  }

  /* 正在离开的页面不再占据纵向空间，避免与进入页上下叠出一屏空白 */
  .route-page-shell.page-fade-leave-active {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
    pointer-events: none;
  }

  .route-page-shell.page-fade-enter-active {
    position: relative;
    z-index: 2;
  }

  .footer-container {
    background: linear-gradient(
      135deg,
      var(--hs-footer, #1c1917) 0%,
      #292524 100%
    );
    color: rgba(255, 251, 247, 0.9);
    padding: 24px 0;
    margin-top: auto;
    border-top: 1px solid rgba(251, 146, 60, 0.2);

    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      text-align: center;
      font-size: 14px;
      letter-spacing: 0.02em;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .frontend-layout .navbar-container {
    animation: none;
  }
}
</style>

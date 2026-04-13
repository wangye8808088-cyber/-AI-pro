<template>
  <div class="auth-layout">
    <div class="left-section mh-anim-gradient">
      <div class="left-shimmer mh-anim-shimmer" aria-hidden="true" />
      <div class="orb orb--1" aria-hidden="true" />
      <div class="orb orb--2" aria-hidden="true" />
      <div class="content">
        <h2 class="title mh-anim-fade-up">心理AI助手</h2>
        <p class="text mh-anim-fade-up" style="animation-delay: 0.12s">
          温暖陪伴，随时倾听你的心声
        </p>
        <div class="robot mh-anim-float mh-anim-fade-up" style="animation-delay: 0.22s">
          <el-image
            style="width: 90px; height: 90px"
            :src="iconUrl"
            alt="心理AI助手"
          />
        </div>
      </div>
    </div>
    <div class="right-section">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
/*
- 作用 ：创建一个新的 URL 对象
- 参数 ：
- 第一个参数：相对路径 @/assets/images/robot-fill.png
- 第二个参数：基础 URL import.meta.url
- 返回值 ：一个 URL 对象，包含完整的资源路径
*/
const iconUrl = new URL("@/assets/images/robot-fill.png", import.meta.url).href;
</script>

<style scoped lang="scss">
.auth-layout {
  display: flex;
  min-height: 100vh;

  .left-section {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-width: 0;
    height: 100vh;
    background: linear-gradient(
      125deg,
      #c2410c 0%,
      #ea580c 38%,
      #fb923c 72%,
      #f97316 100%
    );
    background-size: 200% 200%;
  }

  .mh-anim-gradient {
    animation: mh-gradient-shift 16s ease infinite;
  }

  .mh-anim-float {
    animation: mh-float 5s ease-in-out infinite;
  }

  .mh-anim-fade-up {
    animation: mh-fade-up 0.7s var(--mh-ease-out, ease-out) both;
  }

  .left-shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 45%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.12),
      transparent
    );
    pointer-events: none;
  }

  .mh-anim-shimmer {
    animation: mh-shimmer 7s ease-in-out infinite;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(48px);
    opacity: 0.4;
    pointer-events: none;
    animation: orb-float 12s ease-in-out infinite;
  }

  .orb--1 {
    width: 200px;
    height: 200px;
    background: rgba(232, 197, 71, 0.4);
    top: 12%;
    left: 8%;
  }

  .orb--2 {
    width: 180px;
    height: 180px;
    background: rgba(233, 213, 255, 0.5);
    bottom: 15%;
    right: 10%;
    animation-delay: -4s;
  }

  @keyframes orb-float {
    0%,
    100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(16px, -20px);
    }
  }

  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px;

    .title {
      margin-bottom: 16px;
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #fff;
    }

    .text {
      margin-bottom: 28px;
      max-width: 420px;
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.92);
      text-align: center;
    }

    .robot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.28);
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.06) 100%
      );
      box-shadow:
        0 20px 45px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.35);
    }
  }

  .right-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-width: 0;
    height: 100vh;
    padding: 32px 20px;
    background: linear-gradient(
      180deg,
      var(--hs-cream, #fffbf7) 0%,
      #ffffff 45%,
      var(--hs-peach, #ffedd5) 100%
    );
  }
}

@media (max-width: 900px) {
  .auth-layout {
    flex-direction: column;
  }

  .auth-layout .left-section,
  .auth-layout .right-section {
    height: auto;
    min-height: 40vh;
  }

  .auth-layout .right-section {
    flex: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .auth-layout .orb {
    animation: none;
  }

  .auth-layout .mh-anim-shimmer {
    animation: none;
  }
}
</style>

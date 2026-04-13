<template>
  <div class="home-container mh-anim-gradient">
    <div class="hero-blob hero-blob--a" aria-hidden="true" />
    <div class="hero-blob hero-blob--b" aria-hidden="true" />
    <div class="content">
      <div class="text">
        <h2 class="title">
          <span
            class="title-line mh-anim-fade-up"
            style="animation-delay: 0.05s"
            >一次温暖的对话</span
          >
          <br />
          <span
            class="highlight-text mh-anim-fade-up"
            style="animation-delay: 0.15s"
            >化孤独为慰藉</span
          >
        </h2>
        <p class="description mh-anim-fade-up" style="animation-delay: 0.28s">
          每个深夜，每个焦虑时刻，我们都在这里。不必独自承受，让心与心的链接温暖您的每一天
        </p>
        <div class="hero-actions mh-anim-fade-up" style="animation-delay: 0.4s">
          <el-button
            size="large"
            type="primary"
            round
            class="hero-btn hero-btn--primary"
            @mouseenter="prefetchConsultation"
            @click="goConsult"
          >
            开始倾诉，获得陪伴
          </el-button>
          <el-button
            size="large"
            round
            class="hero-btn hero-btn--ghost"
            @mouseenter="prefetchEmotionDiary"
            @click="goDiary"
          >
            记录心情，释放感情
          </el-button>
        </div>
      </div>
      <div class="robot-wrap mh-anim-fade-up" style="animation-delay: 0.32s">
        <div class="robot-ring" aria-hidden="true" />
        <div class="robot mh-anim-float">
          <el-image
            class="robot-image"
            style="width: 150px; height: 150px"
            :src="iconUrl"
            alt="机器人"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const iconUrl = new URL("@/assets/images/robot-fill.png", import.meta.url).href;

let consultationPreloaded = false;
let emotionDiaryPreloaded = false;

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

const goConsult = () => {
  prefetchConsultation();
  router.push("/consulation");
};

const goDiary = () => {
  prefetchEmotionDiary();
  router.push("/emotion-diary");
};
</script>

<style scoped lang="scss">
.home-container {
  position: relative;
  overflow: hidden;
  color: #fff;
  padding: clamp(3rem, 8vw, 5.5rem) 24px;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    125deg,
    #ea580c 0%,
    #fb923c 32%,
    #f97316 55%,
    #c2410c 100%
  );
  background-size: 220% 220%;
}

.mh-anim-gradient {
  animation: mh-gradient-shift 14s ease infinite;
}

.mh-anim-float {
  animation: mh-float 5s ease-in-out infinite;
}

.mh-anim-fade-up {
  animation: mh-fade-up 0.75s var(--mh-ease-out, ease-out) both;
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.45;
  pointer-events: none;
  animation: blob-drift 18s ease-in-out infinite;
}

.hero-blob--a {
  width: 320px;
  height: 320px;
  background: rgba(254, 215, 170, 0.55);
  top: -80px;
  right: 8%;
}

.hero-blob--b {
  width: 280px;
  height: 280px;
  background: rgba(233, 213, 255, 0.45);
  bottom: -60px;
  left: 5%;
  animation-delay: -6s;
}

@keyframes blob-drift {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-24px, 18px) scale(1.06);
  }
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: clamp(24px, 5vw, 56px);
  max-width: 1100px;
}

.text {
  flex: 1 1 320px;
  max-width: 520px;
}

.title {
  font-size: clamp(2rem, 4.5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

.highlight-text {
  color: var(--mh-gold, #e8c547);
  text-shadow: 0 0 40px rgba(232, 197, 71, 0.35);
}

.description {
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.92);
  max-width: 480px;
}

.hero-actions {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.hero-btn--primary {
  border: none;
  font-weight: 600;
  transition:
    transform 0.22s var(--mh-ease-out, ease-out),
    box-shadow 0.22s ease;
}

.hero-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.2);
}

.hero-btn--ghost {
  --el-button-bg-color: rgba(255, 255, 255, 0.12);
  --el-button-border-color: rgba(255, 255, 255, 0.45);
  --el-button-text-color: #fff;
  font-weight: 600;
  backdrop-filter: blur(8px);
  transition:
    transform 0.22s var(--mh-ease-out, ease-out),
    background 0.22s ease,
    border-color 0.22s ease;
}

.hero-btn--ghost:hover {
  transform: translateY(-2px);
  --el-button-bg-color: rgba(255, 255, 255, 0.2);
  --el-button-border-color: rgba(255, 255, 255, 0.65);
}

.robot-wrap {
  position: relative;
  flex: 0 0 auto;
}

.robot-ring {
  position: absolute;
  inset: -18px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.22);
  animation: ring-pulse 3.2s ease-in-out infinite;
}

@keyframes ring-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.06);
    opacity: 0.45;
  }
}

.robot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.25);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.22) 0%,
    rgba(255, 255, 255, 0.06) 100%
  );
  box-shadow:
    0 22px 50px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.robot-image {
  border-radius: 24px;
}

@media (prefers-reduced-motion: reduce) {
  .hero-blob {
    animation: none;
  }

  .robot-ring {
    animation: none;
  }

  .mh-anim-gradient {
    animation: none;
  }
}
</style>

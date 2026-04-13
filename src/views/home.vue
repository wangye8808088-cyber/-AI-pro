<template>
  <div class="home-page">
    <!-- ═══ HERO ══════════════════════════════════════════════════ -->
    <section class="home-hero mh-anim-gradient" aria-label="首屏介绍">
      <div class="hero-blob hero-blob--a" aria-hidden="true" />
      <div class="hero-blob hero-blob--b" aria-hidden="true" />
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-badge mh-anim-fade-up" style="animation-delay: 0s">
            <span class="badge-dot" aria-hidden="true"></span>
            AI 心理陪伴服务
          </div>
          <h1 class="hero-title">
            <span class="title-line mh-anim-fade-up" style="animation-delay: 0.05s">一次温暖的对话</span>
            <br />
            <span class="highlight-text mh-anim-fade-up" style="animation-delay: 0.15s">化孤独为慰藉</span>
          </h1>
          <p class="hero-desc mh-anim-fade-up" style="animation-delay: 0.28s">
            每个深夜，每个焦虑时刻，我们都在这里。<br />
            不必独自承受，让心与心的链接温暖您的每一天
          </p>
          <div class="hero-actions mh-anim-fade-up" style="animation-delay: 0.4s">
            <button
              class="btn btn-primary"
              @mouseenter="prefetchConsultation"
              @click="goConsult"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              开始倾诉，获得陪伴
            </button>
            <button
              class="btn btn-ghost"
              @mouseenter="prefetchEmotionDiary"
              @click="goDiary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              记录心情，释放感情
            </button>
          </div>
        </div>
        <div class="hero-visual mh-anim-fade-up" style="animation-delay: 0.32s">
          <div class="robot-ring" aria-hidden="true"></div>
          <div class="robot-circle mh-anim-float">
            <el-image
              class="robot-image"
              :src="iconUrl"
              alt="AI助手机器人"
              style="width: 150px; height: 150px"
            />
          </div>
        </div>
      </div>
      <!-- scroll hint -->
      <div class="scroll-hint mh-anim-fade-up" style="animation-delay: 0.8s" aria-hidden="true">
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- ═══ STATS STRIP ══════════════════════════════════════════ -->
    <section class="stats-strip" aria-label="数据概览">
      <div class="section-inner">
        <div
          class="stat-item reveal reveal-up"
          v-for="(s, si) in stats"
          :key="s.label"
          :style="{ '--stagger': si }"
        >
          <span class="stat-num">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- ═══ FEATURES ════════════════════════════════════════════ -->
    <section class="section features-section" aria-labelledby="features-title">
      <div class="section-inner">
        <div class="section-header reveal reveal-up">
          <h2 id="features-title" class="section-title">我们能为你做什么？</h2>
          <p class="section-sub">三大核心服务，伴随你每一个心情时刻</p>
        </div>
        <div class="features-grid">
          <article
            v-for="(feat, fi) in features"
            :key="feat.id"
            class="feature-card reveal reveal-up"
            :class="`feature-card--${feat.id}`"
            :style="{ '--stagger': fi + 1 }"
            @click="feat.action"
            role="button"
            tabindex="0"
            @keydown.enter="feat.action"
            :aria-label="feat.title"
          >
            <div class="fc-icon" aria-hidden="true" v-html="feat.icon"></div>
            <div class="fc-body">
              <h3 class="fc-title">{{ feat.title }}</h3>
              <p class="fc-desc">{{ feat.desc }}</p>
            </div>
            <div class="fc-arrow" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══ HOW IT WORKS ════════════════════════════════════════ -->
    <section class="section how-section" aria-labelledby="how-title">
      <div class="section-inner">
        <div class="section-header reveal reveal-up">
          <h2 id="how-title" class="section-title">三步开启心灵之旅</h2>
          <p class="section-sub">简单、安全、随时可用</p>
        </div>
        <div class="steps-list">
          <div
            class="step-item reveal reveal-up"
            v-for="(step, i) in steps"
            :key="i"
            :style="{ '--stagger': i + 1 }"
          >
            <div class="step-num" aria-hidden="true">{{ i + 1 }}</div>
            <div class="step-icon" v-html="step.icon" aria-hidden="true"></div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
          <div class="steps-connector" aria-hidden="true"></div>
        </div>
      </div>
    </section>

    <!-- ═══ WHY US ═══════════════════════════════════════════════ -->
    <section class="section why-section" aria-labelledby="why-title">
      <div class="section-inner why-inner">
        <div class="why-text">
          <h2 id="why-title" class="section-title why-title reveal reveal-left">为什么选择宁渡？</h2>
          <ul class="why-list">
            <li
              v-for="(point, pi) in whyPoints"
              :key="point.title"
              class="why-item reveal reveal-left"
              :style="{ '--stagger': pi + 1 }"
            >
              <span class="why-icon" aria-hidden="true" v-html="point.icon"></span>
              <div>
                <strong class="why-item-title">{{ point.title }}</strong>
                <p class="why-item-desc">{{ point.desc }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="why-card reveal reveal-right" aria-hidden="true">
          <div class="wc-top">
            <div class="wc-avatar">
              <el-image :src="iconUrl" style="width: 44px; height: 44px" alt="" />
            </div>
            <div class="wc-meta">
              <span class="wc-name">宁渡AI助手</span>
              <span class="wc-status">
                <span class="status-dot"></span>在线服务中
              </span>
            </div>
          </div>
          <div class="wc-bubble">
            你好！我是宁渡。今天感觉怎么样？无论什么时候，我都在这里陪伴你 🌿
          </div>
          <div class="wc-input-mock">
            <span>说说你的心情…</span>
            <div class="wc-send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA BANNER ══════════════════════════════════════════ -->
    <section class="cta-section" aria-label="行动召唤">
      <div class="section-inner cta-inner reveal reveal-up">
        <h2 class="cta-title">准备好了吗？</h2>
        <p class="cta-sub">立即注册，免费开始你的心灵对话</p>
        <div class="cta-actions">
          <button class="btn btn-cta-primary" @click="goRegister">免费注册</button>
          <button class="btn btn-cta-ghost" @click="goKnowledge">浏览知识库</button>
        </div>
        <p class="cta-note">无需信用卡 · 随时可用 · 隐私保护</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const iconUrl = new URL("@/assets/images/robot-fill.png", import.meta.url).href;

let consultationPreloaded = false;
let emotionDiaryPreloaded = false;

// ── scroll reveal ──────────────────────────────────────────────
let revealObserver = null;
onMounted(() => {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
});
onUnmounted(() => {
  revealObserver?.disconnect();
});

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

const goConsult = () => { prefetchConsultation(); router.push("/consulation"); };
const goDiary = () => { prefetchEmotionDiary(); router.push("/emotion-diary"); };
const goRegister = () => router.push("/auth/register");
const goKnowledge = () => router.push("/knowledge");

// ── Static data ────────────────────────────────────────────────
const stats = [
  { value: "10,000+", label: "注册用户" },
  { value: "50,000+", label: "AI 咨询次数" },
  { value: "30,000+", label: "情绪日记" },
  { value: "200+",    label: "心理知识文章" },
];

const chatSvg = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
const heartSvg = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const bookSvg = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;

const features = [
  {
    id: "chat",
    icon: chatSvg,
    title: "AI 心理咨询",
    desc: "与宁渡 AI 助手进行流式对话，获得专业导向的情绪支持与心理疏导，随时随地倾诉。",
    action: goConsult,
  },
  {
    id: "diary",
    icon: heartSvg,
    title: "情绪日记",
    desc: "每日记录心情波动，AI 自动分析情绪趋势，帮助你了解自己、接纳自己。",
    action: goDiary,
  },
  {
    id: "knowledge",
    icon: bookSvg,
    title: "心理知识库",
    desc: "200+ 篇专业心理健康文章，涵盖焦虑、压力、人际关系等主题，随时自助学习。",
    action: goKnowledge,
  },
];

const userSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
const starSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const lockSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
const clockSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

const steps = [
  {
    icon: userSvg,
    title: "注册账号",
    desc: "一分钟快速注册，填写基础信息即可开始使用全部功能。",
  },
  {
    icon: chatSvg,
    title: "开始对话",
    desc: "选择 AI 咨询或情绪日记，向宁渡倾诉你的感受与困扰。",
  },
  {
    icon: heartSvg,
    title: "获得洞察",
    desc: "AI 实时分析情绪状态，给出个性化建议，陪你走向心理健康。",
  },
];

const whyPoints = [
  {
    icon: clockSvg,
    title: "7×24 小时在线",
    desc: "深夜、凌晨、任何你需要的时刻，宁渡都不会缺席。",
  },
  {
    icon: lockSvg,
    title: "隐私安全保护",
    desc: "所有对话数据加密存储，严格遵守隐私保护规范，完全匿名可用。",
  },
  {
    icon: starSvg,
    title: "专业导向支持",
    desc: "基于心理学知识库训练，提供有温度、有依据的情绪支持。",
  },
  {
    icon: bookSvg,
    title: "持续自助学习",
    desc: "配合知识库文章，帮助你在日常中主动构建心理韧性。",
  },
];
</script>

<style scoped lang="scss">
/* ── tokens ───────────────────────────────────────── */
$orange: #f97316;
$orange-dark: #c2410c;
$orange-light: rgba(249,115,22,0.35);
$text-main: #ede8e1;
$text-muted: #8a7a6c;
$text-light: #6b5e54;
$bg-section: #231f1b;
$radius: 16px;
$ease-out: cubic-bezier(0.16, 1, 0.3, 1);

/* ── page wrapper ─────────────────────────────────── */
.home-page {
  background: #1c1814;
}

/* ── shared section ───────────────────────────────── */
.section {
  padding: clamp(3.5rem, 7vw, 5.5rem) 24px;
}
.section-inner {
  max-width: 1100px;
  margin: 0 auto;
}
.section-header {
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
}
.section-title {
  font-size: clamp(1.6rem, 3.5vw, 2.25rem);
  font-weight: 800;
  color: $text-main;
  letter-spacing: -0.03em;
  margin-bottom: 0.6rem;
}
.section-sub {
  font-size: 1.05rem;
  color: $text-muted;
}

/* ── buttons ──────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.22s $ease-out, box-shadow 0.22s ease, background 0.22s ease, border-color 0.22s ease;
  &:hover { transform: translateY(-2px); }
  &:active { transform: translateY(0); }
}
.btn-primary {
  background: #fff;
  color: $orange;
  box-shadow: 0 4px 18px rgba(255,255,255,0.3);
  &:hover { box-shadow: 0 10px 28px rgba(0,0,0,0.15); }
}
.btn-ghost {
  background: rgba(255,255,255,0.12);
  color: #fff;
  border: 1.5px solid rgba(255,255,255,0.45);
  backdrop-filter: blur(8px);
  &:hover { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.65); }
}
.btn-cta-primary {
  background: $orange;
  color: #fff;
  box-shadow: 0 6px 22px rgba($orange, 0.45);
  &:hover { background: $orange-dark; box-shadow: 0 10px 30px rgba($orange, 0.5); }
}
.btn-cta-ghost {
  background: transparent;
  color: #fff;
  border: 1.5px solid rgba(255,255,255,0.5);
  &:hover { background: rgba(255,255,255,0.1); }
}

/* ── hero ─────────────────────────────────────────── */
.home-hero {
  position: relative;
  overflow: hidden;
  color: #fff;
  padding: clamp(4rem, 9vw, 6rem) 24px clamp(5rem, 10vw, 7rem);
  background: linear-gradient(125deg, #ea580c 0%, #fb923c 32%, #f97316 55%, #c2410c 100%);
  background-size: 220% 220%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mh-anim-gradient { animation: mh-gradient-shift 14s ease infinite; }
.mh-anim-float    { animation: mh-float 5s ease-in-out infinite; }
.mh-anim-fade-up  { animation: mh-fade-up 0.75s $ease-out both; }

.hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.45;
  pointer-events: none;
  animation: blob-drift 18s ease-in-out infinite;
}
.hero-blob--a { width: 320px; height: 320px; background: rgba(254,215,170,.55); top: -80px; right: 8%; }
.hero-blob--b { width: 280px; height: 280px; background: rgba(233,213,255,.45); bottom: -60px; left: 5%; animation-delay: -6s; }

.hero-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: clamp(24px, 5vw, 56px);
  max-width: 1100px;
  width: 100%;
}
.hero-text { flex: 1 1 320px; max-width: 520px; }

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.18);
  border: 1px solid rgba(255,255,255,0.32);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 50px;
  margin-bottom: 1.2rem;
  backdrop-filter: blur(6px);
  .badge-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 8px #4ade80;
    animation: pulse-dot 2s ease-in-out infinite;
  }
}

.hero-title {
  font-size: clamp(2rem, 4.5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}
.title-line { display: inline-block; }
.highlight-text {
  display: inline-block;
  color: #e8c547;
  text-shadow: 0 0 40px rgba(232,197,71,.35);
}
.hero-desc {
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255,255,255,.92);
  margin-bottom: 0;
}
.hero-actions {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.hero-visual { position: relative; flex: 0 0 auto; }
.robot-ring {
  position: absolute;
  inset: -18px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,.22);
  animation: ring-pulse 3.2s ease-in-out infinite;
}
.robot-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px; height: 260px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,.25);
  background: linear-gradient(145deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.06) 100%);
  box-shadow: 0 22px 50px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.35);
}
.robot-image { border-radius: 24px; }

/* scroll hint */
.scroll-hint {
  position: relative;
  z-index: 1;
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}
.scroll-arrow {
  width: 24px; height: 24px;
  border-right: 2px solid rgba(255,255,255,.6);
  border-bottom: 2px solid rgba(255,255,255,.6);
  transform: rotate(45deg);
  animation: bounce-down 1.8s ease-in-out infinite;
}

/* ── stats strip ──────────────────────────────────── */
.stats-strip {
  background: $orange;
  padding: 1.8rem 24px;
  .section-inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1.2rem 2rem;
  }
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-num {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
}
.stat-label {
  font-size: 0.85rem;
  color: rgba(255,255,255,.8);
  font-weight: 500;
}

/* ── features ─────────────────────────────────────── */
.features-section { background: #1c1814; }
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.feature-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 1.8rem;
  border-radius: $radius;
  border: 1.5px solid #38322b;
  background: #231f1b;
  cursor: pointer;
  transition: transform 0.22s $ease-out, box-shadow 0.22s ease, border-color 0.22s ease;
  outline: none;
  &:hover, &:focus-visible {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba($orange,.15);
    border-color: rgba($orange, 0.5);
  }
  &:focus-visible { box-shadow: 0 0 0 3px rgba($orange,.4); }
}
.feature-card--chat  .fc-icon { background: rgba(249,115,22,0.14); color: $orange; }
.feature-card--diary .fc-icon { background: rgba(219,39,119,0.14); color: #f472b6; }
.feature-card--knowledge .fc-icon { background: rgba(59,130,246,0.14); color: #60a5fa; }

.fc-icon {
  flex-shrink: 0;
  width: 56px; height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fc-body { flex: 1; }
.fc-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: $text-main;
  margin-bottom: 6px;
}
.fc-desc {
  font-size: 0.9rem;
  color: $text-muted;
  line-height: 1.65;
}
.fc-arrow {
  flex-shrink: 0;
  color: $text-light;
  margin-top: 2px;
  transition: color 0.2s ease, transform 0.2s ease;
  .feature-card:hover & {
    color: $orange;
    transform: translateX(3px);
  }
}

/* ── how it works ─────────────────────────────────── */
.how-section { background: $bg-section; }
.steps-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
}
.steps-connector {
  display: none;
}
.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}
.step-num {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: $orange;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba($orange,.4);
}
.step-icon {
  width: 64px; height: 64px;
  border-radius: 18px;
  background: #2a2520;
  box-shadow: 0 4px 20px rgba(0,0,0,.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: $orange;
}
.step-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: $text-main;
}
.step-desc {
  font-size: 0.9rem;
  color: $text-muted;
  line-height: 1.65;
  max-width: 240px;
}

/* ── why us ───────────────────────────────────────── */
.why-section { background: #1c1814; }
.why-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: clamp(2rem, 6vw, 5rem);
}
.why-text { flex: 1 1 300px; }
.why-title { text-align: left; margin-bottom: 1.8rem; }
.why-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 20px; }
.why-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}
.why-icon {
  flex-shrink: 0;
  width: 44px; height: 44px;
  border-radius: 12px;
  background: rgba(249,115,22,0.14);
  color: $orange;
  display: flex;
  align-items: center;
  justify-content: center;
}
.why-item-title {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  color: $text-main;
  margin-bottom: 3px;
}
.why-item-desc {
  font-size: 0.875rem;
  color: $text-muted;
  line-height: 1.6;
}

/* mock chat card */
.why-card {
  flex: 0 1 360px;
  background: #231f1b;
  border: 1.5px solid #38322b;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0,0,0,.35);
}
.wc-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.wc-avatar {
  width: 48px; height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(249,115,22,0.14);
  display: flex;
  align-items: center;
  justify-content: center;
}
.wc-meta { display: flex; flex-direction: column; gap: 3px; }
.wc-name { font-size: 0.95rem; font-weight: 700; color: $text-main; }
.wc-status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  color: #16a34a;
  font-weight: 500;
  .status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 6px #4ade80;
    animation: pulse-dot 2s ease-in-out infinite;
  }
}
.wc-bubble {
  background: #2a2520;
  border-radius: 0 14px 14px 14px;
  padding: 12px 16px;
  font-size: 0.9rem;
  color: $text-muted;
  line-height: 1.65;
  margin-bottom: 16px;
}
.wc-input-mock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2a2520;
  border: 1.5px solid #38322b;
  border-radius: 50px;
  padding: 10px 10px 10px 16px;
  font-size: 0.85rem;
  color: $text-light;
}
.wc-send {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: $orange;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── CTA banner ───────────────────────────────────── */
.cta-section {
  padding: clamp(4rem, 8vw, 6rem) 24px;
  background: linear-gradient(125deg, #ea580c 0%, #f97316 60%, #c2410c 100%);
  background-size: 200% 200%;
  animation: mh-gradient-shift 14s ease infinite;
  text-align: center;
  color: #fff;
}
.cta-inner { max-width: 640px; }
.cta-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 0.6rem;
}
.cta-sub {
  font-size: 1.05rem;
  color: rgba(255,255,255,.88);
  margin-bottom: 2rem;
}
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-bottom: 1.2rem;
}
.cta-note {
  font-size: 0.82rem;
  color: rgba(255,255,255,.65);
}

/* ── keyframes ────────────────────────────────────── */
@keyframes mh-gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}
@keyframes mh-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}
@keyframes mh-fade-up {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes blob-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(-24px, 18px) scale(1.06); }
}
@keyframes ring-pulse {
  0%, 100% { transform: scale(1); opacity: .9; }
  50%       { transform: scale(1.06); opacity: .45; }
}
@keyframes bounce-down {
  0%, 100% { transform: rotate(45deg) translate(0, 0); opacity: .7; }
  50%       { transform: rotate(45deg) translate(4px, 4px); opacity: 1; }
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: .5; transform: scale(.85); }
}

/* ── responsive ───────────────────────────────────── */
@media (max-width: 640px) {
  .hero-inner { flex-direction: column; }
  .robot-circle { width: 180px; height: 180px; }
  .robot-ring { inset: -12px; }
  .why-inner { flex-direction: column; }
  .why-card { width: 100%; }
  .why-title { text-align: center; }
  .why-list { align-items: flex-start; }
}

/* ── reduced motion ───────────────────────────────── */
/* ── scroll reveal ────────────────────────────────────────────── */
.reveal {
  opacity: 0;
  transition:
    opacity 0.7s $ease-out,
    transform 0.7s $ease-out;
  transition-delay: calc(var(--stagger, 0) * 100ms);
}
.reveal-up    { transform: translateY(36px); }
.reveal-left  { transform: translateX(-36px); }
.reveal-right { transform: translateX(36px); }

.reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* ── reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hero-blob, .robot-ring, .mh-anim-gradient, .cta-section,
  .mh-anim-float, .scroll-arrow, .badge-dot, .status-dot { animation: none; }

  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>

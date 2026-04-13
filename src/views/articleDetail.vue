<template>
  <div class="articleDetail-container">
    <div class="header-section">
      <div class="header-content">
        <button class="back-btn" @click="router.back()" aria-label="返回">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          返回
        </button>
        <div class="header-title-wrap">
          <el-image :src="iconUrl" style="width: 52px; height: 52px"></el-image>
          <h1>知识文章详情</h1>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="diary-card">
        <p class="article-title">文章信息</p>
        <div class="sub-title">
          <el-tag size="large" class="category-tag">{{
            articleDetail.categoryName
          }}</el-tag>
          <div class="flex-box">
            <el-icon><List /></el-icon>
            <span>{{
              dayjs(articleDetail.updateAt).format("YYYY-MM-DD")
            }}</span>
          </div>
        </div>
        <h1 class="article-title">{{ articleDetail.title }}</h1>
        <div class="summary-content" v-if="articleDetail.summary">
          <p>{{ articleDetail.summary }}</p>
        </div>
        <div class="flex-box" :style="{ marginTop: '20px' }">
          <div class="item flex-box">
            <el-icon><Avatar /></el-icon>
            <span>{{ articleDetail.authorName }}</span>
          </div>
          <div class="item flex-box">
            <el-icon><Platform /></el-icon>
            <span>{{ articleDetail.readCount }}</span>
          </div>
        </div>
      </div>
      <div class="diary-card">
        <div class="title">正文内容</div>
        <div
          class="content-wrapper"
          v-html="formatContent(articleDetail.content)"
        ></div>
        <div
          class="tags-content"
          v-if="articleDetail.tagArray && articleDetail.tagArray.length"
        >
          <h4 class="tags-title">相关标签</h4>
          <div class="tags-list">
            <el-tag
              v-for="tag in articleDetail.tagArray"
              :key="tag"
              type="info"
              effect="light"
              class="tags-item"
              >{{ tag }}</el-tag
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getKnowledgeDetail } from "@/api/frontend";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { dayjs } from "element-plus";
const router = useRouter();
const props = defineProps({
  id: String,
});

const articleDetail = ref({});

const formatContent = (content) => {
  if (!content) return "";

  // 基本的HTML清理和格式化
  let formatted = content
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  return formatted;
};

onMounted(() => {
  getKnowledgeDetail(props.id).then((res) => {
    articleDetail.value = res;
  });
});
const iconUrl = new URL("@/assets/images/book.png", import.meta.url).href;
</script>

<style lang="scss" scoped>
$orange: #f97316;
$ease-out: cubic-bezier(0.16, 1, 0.3, 1);

.articleDetail-container {
  background: #1c1814;

  .flex-box {
    display: flex;
    align-items: center;
    .item {
      margin-right: 20px;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.875rem;
      color: #8a7a6c;
    }
  }

  /* ── header ── */
  .header-section {
    background: linear-gradient(135deg, #ea580c 0%, #fb923c 45%, #a78bfa 100%);
    background-size: 200% 200%;
    animation: detail-header-shift 14s ease infinite;
    color: white;
    padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem);

    .header-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 860px;
      margin: 0 auto;
      animation: mh-fade-up 0.6s var(--mh-ease-out, ease-out) both;
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.35);
      color: #fff;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 7px 14px;
      border-radius: 50px;
      cursor: pointer;
      backdrop-filter: blur(6px);
      transition: background 0.2s ease, border-color 0.2s ease;
      align-self: flex-start;
      &:hover { background: rgba(255, 255, 255, 0.28); }
    }

    .header-title-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      h1 { font-size: clamp(1.3rem, 2.5vw, 1.75rem); font-weight: 800; letter-spacing: -0.02em; }
    }
  }

  @keyframes detail-header-shift {
    0%, 100% { background-position: 0% 50%; }
    50%       { background-position: 100% 50%; }
  }

  /* ── content ── */
  .content {
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
    padding: clamp(16px, 3vw, 24px);
    box-sizing: border-box;

    .diary-card {
      margin-bottom: 20px;
      background: #231f1b;
      border-radius: 16px;
      padding: clamp(16px, 3vw, 24px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      border: 1.5px solid #38322b;
      transition: box-shadow 0.28s ease;

      &:hover { box-shadow: 0 12px 32px rgba(249, 115, 22, 0.12); }

      .title {
        margin-bottom: 16px;
        font-size: 1.1rem;
        font-weight: 700;
        color: #ede8e1;
        display: flex;
        align-items: center;
        gap: 8px;
        &::before {
          content: '';
          display: inline-block;
          width: 4px; height: 18px;
          background: $orange;
          border-radius: 2px;
        }
      }

      .sub-title {
        margin-top: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      .article-title {
        font-size: clamp(1.3rem, 3vw, 1.75rem);
        font-weight: 800;
        color: #ede8e1;
        margin-top: 20px;
        margin-bottom: 12px;
        line-height: 1.3;
        letter-spacing: -0.02em;
      }

      .summary-content {
        background: rgba(249, 115, 22, 0.10);
        border-left: 4px solid $orange;
        padding: 12px 16px;
        border-radius: 0 10px 10px 0;
        color: #8a7a6c;
        font-size: 0.95rem;
        line-height: 1.7;
      }

      .content-wrapper {
        font-size: 0.95rem;
        color: #c8bcb0;
        line-height: 1.8;

        :deep(p) { margin-bottom: 12px; }
        :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
          margin: 20px 0 10px;
          color: #ede8e1;
          font-weight: 700;
        }
        :deep(h2) {
          font-size: 1.15rem;
          border-bottom: 2px solid #38322b;
          padding-bottom: 6px;
        }
        :deep(h3) { font-size: 1rem; }
        :deep(ul), :deep(ol) { padding-left: 20px; margin-bottom: 12px; }
        :deep(li) { margin-bottom: 6px; }
        :deep(strong) { color: #ede8e1; }
      }

      .tags-content {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid #38322b;
        .tags-title {
          margin-bottom: 12px;
          font-size: 0.875rem;
          font-weight: 700;
          color: #c8bcb0;
        }
        .tags-list { display: flex; flex-wrap: wrap; gap: 8px; }
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .articleDetail-container .header-section { animation: none; }
  .articleDetail-container .header-section .header-content { animation: none; }
}
</style>

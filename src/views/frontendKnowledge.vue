<template>
  <div class="knowledge-container">
    <div class="header-section">
      <div class="header-content">
        <el-image :src="iconUrl" style="width: 60px; height: 60px"></el-image>
        <h1>知识库</h1>
      </div>
    </div>
    <div class="content">
      <!-- 左侧菜单 -->
      <div class="recommend-section">
        <div class="section-title">推荐阅读</div>
        <div class="recommend-list">
          <div
            v-for="item in recommendList"
            :key="item.id"
            class="recommend-item"
            @click="goToArticle(item.id)"
          >
            <h4>{{ item.title }}</h4>
            <p class="read-count">
              <el-icon><Histogram /></el-icon>
              阅读量 {{ item.readCount }}
            </p>
          </div>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="article-list">
        <div
          v-for="item in articleList"
          :key="item.id"
          class="article-item"
          @click="goToArticle(item.id)"
        >
          <el-image
            style="width: 240px; height: 150px"
            :src="getImage(item.coverImage)"
          ></el-image>
          <div class="info">
            <div class="title">
              <h3>{{ item.title }}</h3>
              <el-tag Plain type="primary">{{ item.categoryName }}</el-tag>
            </div>
            <div :style="{ marginTop: '10px' }">
              <div class="flex-box">
                <el-icon><Avatar /></el-icon>
                <span>{{ item.authorName }}</span>
              </div>
              <div class="flex-box">
                <el-icon><List /></el-icon>
                <span>{{ dayjs(item.updateAt).format("YYYY-MM-DD") }}</span>
              </div>
            </div>
            <div :style="{ marginTop: '10px' }">
              <div class="flex-box">
                <el-icon><Platform /></el-icon>
                <span>观看人数{{ item.readCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-pagination
        style="margin-top: 25px"
        :page-size="pagination.size"
        layout="prev, pager, next"
        :total="pagination.total"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script setup>
import iconUrl from "@/assets/images/book.png";
import { getKnowledgeList } from "@/api/frontend";
import { ref, onMounted, reactive } from "vue";
import { dayjs } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

// 获取阅读列表
const recommendList = ref([]);

// 右侧列表数据
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});

const articleList = ref([]);

// 获取列表数据
const getPageList = () => {
  const params = {
    sortField: "publishedAt",
    sortDirection: "desc",
    ...pagination,
  };
  getKnowledgeList(params).then((res) => {
    articleList.value = res.records;
    pagination.total = res.total;
  });
};

// 获取封面图片
const getImage = (url) => {
  return url
    ? "http://159.75.169.224:1235" + url
    : "https://file.itndedu.com/psychology_ai.png";
};

// 分页
const handleChange = (page) => {
  pagination.currentPage = page;
  getPageList();
};

// 跳转到详情
const goToArticle = (id) => {
  router.push(`/knowledge/article/${id}`);
};

onMounted(() => {
  // 获取推荐阅读列表
  const params = {
    sortField: "readCount",
    sortDirection: "desc",
    currentPage: 1,
    size: 5,
  };
  getPageList();
  getKnowledgeList(params).then((res) => {
    recommendList.value = res.records;
  });
});
</script>

<style lang="scss" scoped>
$orange: #f97316;
$ease-out: cubic-bezier(0.16, 1, 0.3, 1);

.knowledge-container {
  background: #1c1814;

  .flex-box {
    display: flex;
    align-items: center;
    span { margin-left: 8px; font-size: 0.875rem; color: #8a7a6c; }
  }

  /* ── header ── */
  .header-section {
    position: relative;
    overflow: hidden;
    background: linear-gradient(125deg, #ea580c 0%, #fb923c 40%, #a78bfa 100%);
    background-size: 200% 200%;
    animation: knowledge-header-shift 14s ease infinite;
    color: white;
    padding: clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 3rem);

    .header-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      max-width: 1100px;
      margin: 0 auto;
      animation: mh-fade-up 0.65s var(--mh-ease-out, ease-out) both;

      h1 { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; letter-spacing: -0.02em; }
    }
  }

  @keyframes knowledge-header-shift {
    0%, 100% { background-position: 0% 50%; }
    50%       { background-position: 100% 50%; }
  }

  /* ── main layout ── */
  .content {
    display: flex;
    gap: 20px;
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    padding: clamp(16px, 3vw, 24px);
    box-sizing: border-box;
  }

  /* ── sidebar ── */
  .recommend-section {
    flex-shrink: 0;
    width: 260px;
    background: #231f1b;
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
    padding: 18px;
    align-self: flex-start;
    border: 1px solid #38322b;
    transition: box-shadow 0.28s ease;

    &:hover { box-shadow: 0 12px 32px rgba(249, 115, 22, 0.12); }

    .section-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #ede8e1;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 2px solid rgba(249,115,22,0.25);
      display: flex;
      align-items: center;
      gap: 6px;

      &::before {
        content: '';
        display: inline-block;
        width: 4px; height: 14px;
        background: $orange;
        border-radius: 2px;
      }
    }

    .recommend-list {
      display: flex;
      flex-direction: column;
      gap: 4px;

        .recommend-item {
        border-left: 3px solid #38322b;
        padding: 8px 10px;
        cursor: pointer;
        border-radius: 0 8px 8px 0;
        transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s $ease-out;

        &:hover {
          background: rgba(249, 115, 22, 0.06);
          border-left-color: $orange;
          transform: translateX(3px);
        }

        h4 { font-size: 0.85rem; color: #c8bcb0; font-weight: 500; line-height: 1.4; }

        .read-count {
          margin-top: 6px;
          font-size: 0.75rem;
          color: #6b5e54;
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }
  }

  /* ── article list ── */
  .article-list {
    flex: 1;
    min-width: 0;

    .article-item {
      background: #231f1b;
      border-radius: 14px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      padding: 16px;
      margin-bottom: 16px;
      display: flex;
      gap: 16px;
      cursor: pointer;
      border: 1.5px solid #38322b;
      transition: transform 0.28s $ease-out, box-shadow 0.28s ease, border-color 0.22s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 40px rgba(249, 115, 22, 0.12);
        border-color: rgba(249,115,22,0.4);
      }

      :deep(.el-image) {
        flex-shrink: 0;
        border-radius: 10px;
        overflow: hidden;
        object-fit: cover;
      }

      .info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;

        .title {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          flex-wrap: wrap;

          h3 {
            font-size: 1rem;
            font-weight: 600;
            color: #ede8e1;
            line-height: 1.4;
          }
        }
      }
    }
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    padding: 8px 0 32px;
  }
}

/* ── responsive ── */
@media (max-width: 768px) {
  .knowledge-container .content {
    flex-direction: column;
  }
  .knowledge-container .recommend-section {
    width: 100%;
  }
  .knowledge-container .article-list .article-item {
    flex-direction: column;
    :deep(.el-image) { width: 100% !important; height: 180px !important; }
  }
}

@media (prefers-reduced-motion: reduce) {
  .knowledge-container .header-section { animation: none; }
  .knowledge-container .header-section .header-content { animation: none; }
  .knowledge-container .recommend-list .recommend-item:hover { transform: none; }
  .knowledge-container .article-list .article-item:hover { transform: none; }
}
</style>

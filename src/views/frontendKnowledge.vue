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
.knowledge-container {
  background: linear-gradient(
    135deg,
    var(--hs-cream, #fffbf7) 0%,
    #fffdfb 50%,
    var(--hs-lilac, #ede9fe) 100%
  );
  .flex-box {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
  .header-section {
    position: relative;
    overflow: hidden;
    background: linear-gradient(
      125deg,
      #ea580c 0%,
      #fb923c 40%,
      #a78bfa 100%
    );
    background-size: 200% 200%;
    animation: knowledge-header-shift 14s ease infinite;
    color: white;
    padding: 48px;
    .header-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: mh-fade-up 0.65s var(--mh-ease-out, ease-out) both;
    }
  }

  @keyframes knowledge-header-shift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  .content {
    display: flex;
    gap: 20px;
    margin: 0 auto;
    width: 1200px;
    padding: 20px;
    .recommend-section {
      width: 280px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      padding: 15px;
      height: 400px;
      border: 1px solid rgba(148, 163, 184, 0.12);
      transition: box-shadow 0.28s ease;
      &:hover {
        box-shadow: 0 12px 32px rgba(234, 88, 12, 0.1);
      }
      .section-title {
        font-size: 12;
        font-weight: 600;
        color: #374151;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .recommend-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .recommend-item {
          border-left: 4px solid #f59e0b;
          padding-left: 10px;
          cursor: pointer;
          border-radius: 0 8px 8px 0;
          padding-top: 8px;
          padding-bottom: 8px;
          transition:
            background 0.22s ease,
            transform 0.22s var(--mh-ease-out, ease-out);
          &:hover {
            background: rgba(245, 158, 11, 0.08);
            transform: translateX(4px);
          }
          .read-count {
            margin-top: 15px;
            font-size: 12px;
            color: #6b7280;
            display: flex;
            align-items: center;
            gap: 10px;
          }
        }
      }
    }
    .article-list {
      flex: 1;
      .article-item {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        padding: 15px;
        margin-bottom: 20px;
        display: flex;
        cursor: pointer;
        border: 1px solid rgba(148, 163, 184, 0.1);
        transition:
          transform 0.28s var(--mh-ease-out, ease-out),
          box-shadow 0.28s ease;
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.1);
        }
        .info {
          margin-left: 20px;
          .title {
            display: flex;
            align-items: center;
            gap: 10px;
          }
        }
      }
    }
  }
  .pagination-wrapper {
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .knowledge-container .header-section {
    animation: none;
  }

  .knowledge-container .header-section .header-content {
    animation: none;
  }

  .knowledge-container .recommend-list .recommend-item:hover {
    transform: none;
  }

  .knowledge-container .article-list .article-item:hover {
    transform: none;
  }
}
</style>

<template>
  <div class="emotionDiary-container">
    <div class="header-section">
      <div class="header-content">
        <el-image :src="iconUrl" style="width: 60px; height: 60px"></el-image>
        <h1>情绪日志</h1>
      </div>
    </div>
    <div class="content">
      <!-- 情绪评分 -->
      <div class="diary-card">
        <div class="title">今日情绪评分</div>
        <div class="section">
          <p>您今天的整体情绪状态如何？(1-10分)</p>
          <div class="rate">
            <el-rate
              v-model="diaryForm.moodScore"
              :texts="emotionStatus"
              show-texts
              :max="10"
              size="large"
            ></el-rate>
          </div>
        </div>
      </div>
      <!-- 主要情绪 -->
      <div class="diary-card">
        <div class="title">主要情绪</div>
        <div class="emotion-grid">
          <div
            v-for="emotion in emotionDptions"
            :key="emotion.name"
            :class="{ selected: emotion.name === diaryForm.dominantEmotion }"
            class="emotion-card"
            @click="selectEmotion(emotion.name)"
          >
            <el-image
              :src="emotion.url"
              style="width: 50px; height: 50px"
            ></el-image>
            <div class="emotion-name">{{ emotion.name }}</div>
          </div>
        </div>
      </div>
      <!-- 详细记录 -->
      <div class="diary-card">
        <div class="title">详细记录</div>
        <div class="detail-form">
          <div class="form-group">
            <div class="form-label">情绪触发因素</div>
            <el-input
              v-model="diaryForm.emotionTriggers"
              placeholder="今天什么事情影响了你的情绪？"
              type="textarea"
              :rows="3"
              maxLength="1000"
              show-word-limit
            ></el-input>
          </div>
          <div class="form-group">
            <div class="form-label">今日感想</div>
            <el-input
              v-model="diaryForm.diaryContent"
              placeholder="写下您今天的想法，感受或发生的有趣事情..."
              type="textarea"
              :rows="5"
              maxLength="2000"
              show-word-limit
            ></el-input>
          </div>
          <!-- 生活指标 -->
          <div class="life-indicators">
            <div class="indicator-group">
              <div class="form-label">睡眠质量</div>
              <el-select v-model="diaryForm.sleepQuality" placeholder="请选择">
                <el-option label="很差" :value="1"></el-option>
                <el-option label="较差" :value="2"></el-option>
                <el-option label="一般" :value="3"></el-option>
                <el-option label="良好" :value="4"></el-option>
                <el-option label="优秀" :value="5"></el-option>
              </el-select>
            </div>
            <div class="indicator-group">
              <div class="form-label">压力水品</div>
              <el-select v-model="diaryForm.stressLevel" placeholder="请选择">
                <el-option label="很低" :value="1"></el-option>
                <el-option label="较低" :value="2"></el-option>
                <el-option label="中等" :value="3"></el-option>
                <el-option label="较高" :value="4"></el-option>
                <el-option label="很高" :value="5"></el-option>
              </el-select>
            </div>
          </div>
          <div class="action-buttons">
            <el-button @click="resetForm">重置</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dayjs } from "element-plus";
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import { addEmotionDiary } from "@/api/frontend";

// 情绪评分
const emotionStatus = [
  "绝望崩溃",
  "消沉抑郁",
  "焦虑烦躁",
  "低落不悦",
  "平静淡然",
  "轻松惬意",
  "愉悦舒心",
  "欢欣满足",
  "兴奋欣喜",
  "极致幸福",
];

// 情绪选项
const emotionDptions = [
  {
    name: "开心",
    url: new URL("@/assets/images/开心.png", import.meta.url).href,
  },
  {
    name: "平静",
    url: new URL("@/assets/images/平静.png", import.meta.url).href,
  },
  {
    name: "焦虑",
    url: new URL("@/assets/images/焦虑.png", import.meta.url).href,
  },
  {
    name: "悲伤",
    url: new URL("@/assets/images/悲伤.png", import.meta.url).href,
  },
  {
    name: "兴奋",
    url: new URL("@/assets/images/兴奋.png", import.meta.url).href,
  },
  {
    name: "疲惫",
    url: new URL("@/assets/images/疲惫.png", import.meta.url).href,
  },
  {
    name: "惊讶",
    url: new URL("@/assets/images/惊讶.png", import.meta.url).href,
  },
  {
    name: "困惑",
    url: new URL("@/assets/images/困惑.png", import.meta.url).href,
  },
];

// 选择主要情绪
const selectEmotion = (emotion) => {
  diaryForm.dominantEmotion = emotion;
};

const diaryForm = reactive({
  diaryDate: dayjs().format("YYYY-MM-DD"),
  moodScore: null,
  dominantEmotion: "",
  emotionTriggers: "",
  diaryContent: "",
  sleepQuality: null,
  stressLevel: null,
});

// 重置表单
const resetForm = () => {
  Object.assign(diaryForm, {
    diaryDate: dayjs().format("YYYY-MM-DD"),
    moodScore: null,
    dominantEmotion: "",
    emotionTriggers: "",
    diaryContent: "",
    sleepQuality: null,
    stressLevel: null,
  });
};

// 提交表单
const submit = () => {
  console.log(diaryForm);
  if (!diaryForm.moodScore) {
    ElMessage.error("请选择情绪评分");
    return;
  }
  addEmotionDiary(diaryForm).then(() => {
    ElMessage.success("提交成功");
    resetForm();
  });
};

const iconUrl = new URL("@/assets/images/like.png", import.meta.url).href;
</script>

<style lang="scss" scoped>
$orange: #f97316;
$ease-out: cubic-bezier(0.16, 1, 0.3, 1);

.emotionDiary-container {
  background: #1c1814;

  /* ── header ── */
  .header-section {
    position: relative;
    overflow: hidden;
    background: linear-gradient(125deg, #fb7185 0%, #fb923c 45%, #f97316 100%);
    background-size: 200% 200%;
    animation: diary-header-shift 12s ease infinite;
    color: white;
    padding: clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 3rem);

    .header-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      max-width: 860px;
      margin: 0 auto;
      animation: mh-fade-up 0.65s var(--mh-ease-out, ease-out) both;
      h1 { font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 800; letter-spacing: -0.02em; }
    }
  }

  @keyframes diary-header-shift {
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
  }

  /* ── card ── */
  .diary-card {
    margin-bottom: 20px;
    background: #231f1b;
    border-radius: 16px;
    padding: clamp(16px, 3vw, 24px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    border: 1.5px solid #38322b;
    transition: transform 0.28s $ease-out, box-shadow 0.28s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 14px 34px rgba(249, 115, 22, 0.12);
    }

    .title {
      margin-bottom: 20px;
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

    .section {
      margin-bottom: 20px;
      p { font-size: 0.925rem; color: #8a7a6c; margin-bottom: 14px; }
    }

    /* ── emotion grid ── */
    .emotion-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .emotion-card {
        padding: 14px 18px;
        border: 2px solid #38322b;
        border-radius: 14px;
        text-align: center;
        cursor: pointer;
        background: #2a2520;
        min-width: 80px;
        transition:
          border-color 0.22s ease,
          background 0.22s ease,
          transform 0.22s $ease-out,
          box-shadow 0.22s ease;

        .emotion-name {
          margin-top: 8px;
          font-size: 0.8rem;
          color: #c8bcb0;
          white-space: nowrap;
        }

        &:hover {
          border-color: rgba(249,115,22,0.4);
          box-shadow: 0 8px 20px rgba(249, 115, 22, 0.12);
          transform: translateY(-2px);
        }

        &.selected {
          border-color: $orange;
          background: rgba(249,115,22,0.14);
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(249, 115, 22, 0.2);
        }
      }
    }

    /* ── detail form ── */
    .detail-form {
      .form-label {
        margin: 12px 0 6px;
        font-size: 0.875rem;
        font-weight: 600;
        color: #c8bcb0;
      }

      .form-group { margin-bottom: 16px; }

      .life-indicators {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        .indicator-group { flex: 1 1 160px; }
      }

      .action-buttons {
        margin-top: 32px;
        display: flex;
        gap: 12px;
      }
    }
  }
}

@media (max-width: 600px) {
  .emotionDiary-container .diary-card .emotion-grid .emotion-card {
    padding: 10px 12px;
    min-width: 68px;
  }
  .emotionDiary-container .diary-card .detail-form .life-indicators {
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .emotionDiary-container .header-section { animation: none; }
  .emotionDiary-container .header-section .header-content { animation: none; }
  .emotionDiary-container .diary-card:hover { transform: none; }
  .emotionDiary-container .emotion-grid .emotion-card:hover,
  .emotionDiary-container .emotion-grid .emotion-card.selected { transform: none; }
}
</style>

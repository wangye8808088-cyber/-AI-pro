<template>
  <div class="ds-layout" :class="{ 'sb-collapsed': sidebarCollapsed }">

    <!-- ════════════ SIDEBAR ════════════ -->
    <aside class="ds-sidebar">

      <!-- sidebar header -->
      <div class="sb-head">
        <div class="sb-brand">
          <div class="sb-avatar">
            <el-image :src="iconUrl" style="width: 22px; height: 22px" alt="logo" />
          </div>
          <span class="sb-brand-name">宁渡 AI</span>
        </div>
        <button
          class="sb-toggle"
          @click="sidebarCollapsed = !sidebarCollapsed"
          :title="sidebarCollapsed ? '展开侧栏' : '折叠侧栏'"
          aria-label="折叠侧栏"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- new chat btn -->
      <button
        class="sb-new-btn"
        @click="createNewFrontendSession"
        title="新对话"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        <span class="sb-btn-text">新对话</span>
      </button>

      <!-- session list -->
      <div class="sb-sessions">
        <div class="sb-section-label">最近对话</div>
        <div
          v-for="session in sessionList"
          :key="session.id"
          class="sb-session-item"
          :class="{ active: currentSession?.sessionId === 'session_' + session.id }"
          @click="handleSessionClick(session)"
          :title="session.sessionTitle"
        >
          <svg class="sb-session-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span class="sb-session-title">{{ session.sessionTitle }}</span>
          <button
            class="sb-session-del"
            @click.stop="handleDeleteSession(session.id)"
            title="删除"
            aria-label="删除会话"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
        <div class="sb-empty" v-if="sessionList.length === 0">暂无历史对话</div>
      </div>

      <!-- emotion bottom card -->
      <div class="sb-emotion-card">
        <div class="ec-row">
          <div
            class="ec-score"
            :class="{
              'ec-score--warn': currentEmotion.isNegative,
            }"
          >{{ currentEmotion.emotionScore }}</div>
          <div class="ec-info">
            <span class="ec-label">情绪指数</span>
            <span class="ec-status" :class="{ warn: currentEmotion.isNegative }">
              {{ currentEmotion.isNegative ? "需要关注" : "状态良好" }}
            </span>
          </div>
          <div class="ec-dots">
            <span
              v-for="dot in 3"
              :key="dot"
              class="ec-dot"
              :class="{ active: getIntensityClass(currentEmotion.emotionScore) >= dot }"
            ></span>
          </div>
        </div>
        <p class="ec-suggestion" v-if="currentEmotion.suggestion">
          {{ currentEmotion.suggestion }}
        </p>
        <div
          class="ec-risk"
          v-if="currentEmotion.isNegative && currentEmotion.riskLevel > 1"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {{ currentEmotion.riskDescription }}
        </div>
      </div>
    </aside>

    <!-- ════════════ MAIN CHAT ════════════ -->
    <main class="ds-main">

      <!-- ─── Dappled Light (decorative, aria-hidden) ─── -->
      <div class="dl-root" aria-hidden="true">
        <!-- SVG filter: organic wind turbulence for leaf movement -->
        <svg class="dl-defs" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="dl-wind" x="-30%" y="-30%" width="160%" height="160%"
              color-interpolation-filters="linearRGB">
              <feTurbulence type="fractalNoise" numOctaves="3" seed="4" result="turb">
                <animate attributeName="baseFrequency"
                  dur="22s" calcMode="spline"
                  values="0.009 0.006;0.017 0.013;0.007 0.004;0.014 0.010;0.009 0.006"
                  keyTimes="0;0.25;0.5;0.75;1"
                  keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
                  repeatCount="indefinite"/>
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="turb"
                xChannelSelector="R" yChannelSelector="G">
                <animate attributeName="scale"
                  dur="22s" calcMode="spline"
                  values="35;65;90;52;35"
                  keyTimes="0;0.25;0.5;0.75;1"
                  keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
                  repeatCount="indefinite"/>
              </feDisplacementMap>
            </filter>
          </defs>
        </svg>

        <!-- Layer 1 : organic light blobs (dappled leaf patches) -->
        <div class="dl-leaves"></div>

        <!-- Layer 2 : diagonal warm light beams -->
        <div class="dl-beams-wrap">
          <div class="dl-beams"></div>
        </div>

        <!-- Layer 3 : corner ambient glow -->
        <div class="dl-glow"></div>
      </div>
      <!-- ─── /Dappled Light ─── -->

      <!-- top bar -->
      <div class="ds-topbar">
        <!-- 折叠时显示展开按钮，展开时占位保持三列平衡 -->
        <div class="ds-topbar-left">
          <button
            v-if="sidebarCollapsed"
            class="ds-topbar-toggle"
            @click="sidebarCollapsed = false"
            title="展开侧栏"
            aria-label="展开侧栏"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>

        <span class="ds-session-title">
          {{ currentSession?.sessionTitle || "新对话" }}
        </span>

        <div class="ds-topbar-right">
          <button
            class="ds-new-chat"
            @click="createNewFrontendSession"
            title="新建会话"
            aria-label="新建会话"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            新对话
          </button>
        </div>
      </div>

      <!-- messages -->
      <div class="ds-messages" ref="messagesRef">

        <!-- welcome screen -->
        <div class="ds-welcome" v-if="messages.length === 0">
          <div class="dw-avatar">
            <el-image :src="iconUrl" style="width: 52px; height: 52px" alt="宁渡" />
          </div>
          <h2 class="dw-title">你好，我是宁渡</h2>
          <p class="dw-sub">
            <span class="dw-typewriter">{{ typingText }}</span><span
              class="dw-cursor"
              :class="{ 'dw-cursor--blink': !isTypingActive }"
              aria-hidden="true"
            >|</span>
          </p>
          <div class="dw-chips">
            <button class="dw-chip" @click="userMessage = '我最近压力有点大，想聊聊'">压力有点大</button>
            <button class="dw-chip" @click="userMessage = '我睡眠不太好，怎么办？'">睡眠不好</button>
            <button class="dw-chip" @click="userMessage = '我感觉很焦虑，想倾诉一下'">感到焦虑</button>
          </div>
        </div>

        <!-- message rows -->
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="ds-msg-row"
          :class="msg.senderType === 1 ? 'row-user' : 'row-ai'"
        >
          <!-- ai avatar -->
          <div class="ds-msg-avatar" v-if="msg.senderType === 2">
            <el-image :src="iconUrl" style="width: 20px; height: 20px" alt="AI" />
          </div>

          <div class="ds-msg-body">
            <div class="ds-msg-bubble">
              <!-- typing indicator -->
              <div v-if="msg.senderType === 2 && isAiTying && !msg.content" class="ds-typing">
                <span></span><span></span><span></span>
              </div>
              <!-- error -->
              <div v-else-if="msg.isError" class="ds-msg-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {{ msg.content }}
              </div>
              <!-- ai markdown -->
              <MarkdownRenderer
                v-else-if="msg.senderType === 2 && !msg.isError"
                :content="msg.content"
                :isAiMessage="true"
              />
              <!-- user text -->
              <p v-else-if="msg.content" v-html="formatMessageCount(msg.content)"></p>
            </div>
            <div class="ds-msg-time">
              {{ msg.senderType === 2 && isAiTying ? "正在输入…" : msg.createAt }}
            </div>
          </div>

          <!-- user avatar -->
          <div class="ds-msg-avatar ds-msg-avatar--user" v-if="msg.senderType === 1">
            <el-image :src="iconUrl2" style="width: 20px; height: 20px" alt="用户" />
          </div>
        </div>
      </div>

      <!-- input -->
      <div class="ds-input-area">
        <div class="ds-input-card">
          <el-input
            v-model="userMessage"
            placeholder="和宁渡说说心里话…"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 6 }"
            :disabled="isAiTying"
            @keydown.enter="handleKeyDown"
            class="ds-textarea"
            resize="none"
          />
          <button
            class="ds-send-btn"
            :class="{ active: userMessage.trim() && userMessage.length <= 500 }"
            :disabled="!userMessage.trim() || userMessage.length > 500 || isAiTying"
            @click="sendMessage"
            aria-label="发送"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <div class="ds-input-hint">
          <span>Enter 发送 · Shift+Enter 换行</span>
          <span :class="{ 'hint-warn': userMessage.length > 450 }">{{ userMessage.length }}/500</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { DEFAULT_LLM_MODEL } from "@/config/llmModels";
import {
  startSession,
  getSessionList,
  deleteSession,
  getSessionDetail,
  getSessionEmotion,
} from "@/api/frontend";
import MarkdownRenderer from "@/components/MarkdownRenderer.vue";
import { fetchEventSource } from "@microsoft/fetch-event-source";

// ── sidebar & scroll ────────────────────────────────────
const sidebarCollapsed = ref(false);
const messagesRef = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
    }
  });
};

// ── 欢迎页打字机效果 ──────────────────────────────────────
const typingPhrases = [
  "您贴心的 AI 心理健康助手，今天感觉怎么样？",
  "倾诉烦恼，让内心更轻盈一点",
  "睡眠不好、焦虑、压力大？我来陪你",
  "无论何时，这里都是你的安全空间",
  "用温暖与科学，守护你的心理健康",
];

const typingText = ref("");
const isTypingActive = ref(true);
let _typingTimer = null;

const startTypewriter = () => {
  let phraseIdx = 0;

  const typeOut = () => {
    const phrase = typingPhrases[phraseIdx];
    let i = 0;
    isTypingActive.value = true;

    const tick = () => {
      i++;
      typingText.value = phrase.slice(0, i);
      if (i < phrase.length) {
        _typingTimer = setTimeout(tick, 75);
      } else {
        // 全部打完 → 停顿 3 秒后删除
        isTypingActive.value = false;
        _typingTimer = setTimeout(deleteOut, 3000);
      }
    };
    tick();
  };

  const deleteOut = () => {
    const phrase = typingPhrases[phraseIdx];
    let i = phrase.length;
    isTypingActive.value = true;

    const tick = () => {
      i--;
      typingText.value = phrase.slice(0, i);
      if (i > 0) {
        _typingTimer = setTimeout(tick, 35);
      } else {
        // 删完 → 切换到下一条
        phraseIdx = (phraseIdx + 1) % typingPhrases.length;
        isTypingActive.value = false;
        _typingTimer = setTimeout(typeOut, 400);
      }
    };
    tick();
  };

  typeOut();
};

onUnmounted(() => {
  clearTimeout(_typingTimer);
});

const iconUrl = new URL("@/assets/images/robot-fill.png", import.meta.url).href;
const iconUrl1 = new URL("@/assets/images/like.png", import.meta.url).href;
const iconUrl2 = new URL("@/assets/images/users.png", import.meta.url).href;

// 新建会话
const createNewFrontendSession = () => {
  // 清空消息列表
  messages.value = [];
  // 重置情绪花园数据
  currentEmotion.value = {
    primaryEmotion: "中性",
    emotionScore: 50,
    isNegative: false,
    riskLevel: 0,
    suggestion: "情绪状态平稳",
    improvementSuggestions: [],
  };
  // 创建一个新的会话对象
  const newSession = {
    sessionId: `temp_${Date.now()}`,
    status: "TEMP",
    sessionTitle: "新对话",
  };
  currentSession.value = newSession;
};

// 定义一个当前会话对象
const currentSession = ref(null);
const sessionList = ref([]);

// 定义对话消息
const messages = ref([]);
// 定义用户输入的消息
const userMessage = ref("");
// 定义AI是否正在回复
const isAiTying = ref(false);

// 情绪花园
const currentEmotion = ref({
  primaryEmotion: "中性",
  emotionScore: 50,
  isNegative: false,
  riskLevel: 0,
  suggestion: "情绪状态平稳",
  improvementSuggestions: [],
});

const loadSessionEmotion = (sessionId) => {
  // 确保sessionID格式正确
  const id = sessionId.toString().startsWith("session_")
    ? sessionId
    : `session_${sessionId}`;

  getSessionEmotion(id).then((res) => {
    currentEmotion.value = res;
  });
};

const getIntensityClass = (score) => {
  if (score >= 61) {
    return 3;
  }
  if (score >= 31) {
    return 2;
  }
  return 1;
};

const getRiskTest = (level) => {
  switch (level) {
    case 0:
      return "正常";
    case 1:
      return "关注";
    case 2:
      return "预警";
    case 3:
      return "危机";
    default:
      return "正常";
  }
};

// 处理用户按下Enter键
const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    // 发送消息逻辑
    e.preventDefault();
    sendMessage();
  }
};

// 用户发送消息
const sendMessage = () => {
  if (!userMessage.value.trim()) return;

  if (isAiTying.value) {
    ElMessage.error("AI助手正在回复中，请稍后");
    return;
  }

  const message = userMessage.value.trim();
  userMessage.value = "";

  // 如果没有会话或者是临时会话的化，需要创建一个新的会话
  if (currentSession.value.status === "TEMP") {
    startNewSession(message);
  } else {
    // 继续现有会话
    messages.value.push({
      id: Date.now(),
      senderType: 1,
      content: message,
      createAt: new Date().toISOString(),
    });
    scrollToBottom();
    startAIResopnse(currentSession.value.sessionId, message);
  }
};

const startNewSession = (message) => {
  // 创建新的绘画参数
  const sessionParams = {
    initialMessage: message,
    model: DEFAULT_LLM_MODEL,
  };
  if (currentSession.value.sessionTitle === "新对话") {
    sessionParams.sessionTitle = `宁渡AI助手 - ${new Date().toLocaleString()}`;
  } else {
    // 如果历史会话记录
    sessionParams.sessionTitle = currentSession.value.sessionTitle;
  }
  // 调用开始会话接口
  startSession(sessionParams).then((res) => {
    // 将后端返回的数据转为前端会话格式
    const sessionData = {
      sessionId: res.sessionId,
      status: res.status,
      sessionTitle: sessionParams.sessionTitle,
    };
    // 如果当前是临时会话，更细数据
    if (currentSession.value && currentSession.value.status === "TEMP") {
      // 更新为正式会话
      Object.assign(currentSession.value, sessionData);
    } else {
      // 否则，创建一个新的会话
      currentSession.value = sessionData;
    }
    // 更新会话列表
    getSessionPage();

    // 添加初始用户信息
    messages.value.push({
      id: Date.now(),
      senderType: 1,
      content: message,
      createAt: new Date().toISOString(),
    });

    // 流式对话
    startAIResopnse(currentSession.value.sessionId, message);
  });
};

const startAIResopnse = (sessionId, userMessage) => {
  // 防止重复发送
  if (isAiTying.value) {
    ElMessage.error("AI助手正在回复中，请稍后");
    return;
  }
  isAiTying.value = true;

  const aiMessage = {
    id: `ai_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    senderType: 2,
    content: "",
    createAt: new Date().toISOString(),
  };
  messages.value.push(aiMessage);

  // 调用流式接口
  const ctrl = new AbortController(); // 用来终止fetch请求
  fetchEventSource("/api/psychological-chat/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Token: localStorage.getItem("token"),
      Accept: "text/event-stream",
    },
    body: JSON.stringify({
      sessionId,
      userMessage,
      model: DEFAULT_LLM_MODEL,
    }),
    signal: ctrl.signal, // 用来终止fetch请求
    onopen: (response) => {
      console.log(response);
      if (response.headers.get("Content-Type") !== "text/event-stream") {
        ElMessage.error("AI助手回复失败，请稍后重试");
      }
    },
    onmessage: (event) => {
      const raw = event.data.trim();
      if (!raw) return;
      const eventName = event.event;
      // 当前会话AI消息
      const aiMessage = messages.value[messages.value.length - 1];

      if (eventName === "done") {
        isAiTying.value = false;
        ctrl.abort(); // 终止fetch请求
        // 加载会话情绪分析
        loadSessionEmotion(currentSession.value.sessionId);
        return;
      }
      const payload = JSON.parse(raw);
      const ok = String(payload.code) === "200";
      if (ok && payload.data && payload.data.content) {
        aiMessage.content += payload.data.content;
        scrollToBottom();
      } else if (!ok) {
        // 错误回复显示
        handleError(payload.message || "AI助手回复失败，请稍后重试");
      }
    },
    onerror: (err) => {
      handleError(err || "AI助手回复失败，请稍后重试");
      throw err;
    },
    onclose: () => {
      // 开始情绪分析
      loadSessionEmotion(currentSession.value.sessionId);
    },
  });
};

// 错误处理函数
const handleError = (error) => {
  // 当前会话的AI消息
  const aiMessage = messages.value[messages.value.length - 1];
  if (aiMessage) {
    aiMessage.content = "AI回复失败，请重试";
  }
  isAiTying.value = false;
  ElMessage.error("AI回复失败，请重试");
};

const getSessionPage = () => {
  getSessionList({ pageNum: 1, pageSize: 10 }).then((res) => {
    sessionList.value = res.records;
  });
};
// 获取会话数据
const handleSessionClick = (session) => {
  currentSession.value = session;
  // 获取会话详情
  getSessionDetail(session.id).then((res) => {
    messages.value = res;
  });
  // 加载会话情绪分析
  loadSessionEmotion(session.id);
  // 更新当前会话对象的数据
  const sessionData = {
    sessionId: "session_" + session.id,
    status: "ACTIVE",
    sessionTitle: session.sessionTitle,
  };
  currentSession.value = sessionData;
};

const handleDeleteSession = (sessionId) => {
  deleteSession(sessionId).then((res) => {
    ElMessage.success("会话删除成功");
    getSessionPage();
  });
};

// 处理简单的换行逻辑
const formatMessageCount = (message) => {
  return message.replace(/\n/g, "<br>");
};

onMounted(() => {
  getSessionPage();
  createNewFrontendSession();
  startTypewriter();
});
</script>

<style scoped lang="scss">
/* ── tokens ────────────────────────────────────── */
$sb-w: 260px;
$orange: #f97316;
$orange-dark: #c2410c;
$orange-light: rgba(249, 115, 22, 0.35);
$bg: #1c1814;
$sidebar-bg: #231f1b;
$border: #38322b;
$text: #ede8e1;
$muted: #8a7a6c;
$ease: cubic-bezier(0.16, 1, 0.3, 1);

/* ── root layout ────────────────────────────────── */
.ds-layout {
  display: flex;
  width: 100%;
  height: calc(100vh - 74px);
  overflow: hidden;
  background: $bg;
  position: relative;
}

/* ════════════════════════════════════════════════
   SIDEBAR
   ════════════════════════════════════════════════ */
.ds-sidebar {
  width: $sb-w;
  flex-shrink: 0;
  height: 100%;
  background: $sidebar-bg;
  border-right: 1px solid $border;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s $ease, opacity 0.3s ease;
}

.ds-layout.sb-collapsed .ds-sidebar {
  width: 0;
  opacity: 0;
  pointer-events: none;
}

/* ── sidebar header ── */
.sb-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 14px 12px;
  flex-shrink: 0;
}
.sb-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  white-space: nowrap;
}
.sb-avatar {
  width: 34px; height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #fb923c, #f59e0b);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.3);
}
.sb-brand-name {
  font-size: 1rem;
  font-weight: 700;
  color: $text;
  letter-spacing: -0.02em;
}
.sb-toggle {
  width: 32px; height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: $muted;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.18s ease, color 0.18s ease;
  &:hover { background: #2e2822; color: $text; }
}

/* ── new chat btn ── */
.sb-new-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 12px 12px;
  padding: 9px 14px;
  border-radius: 10px;
  border: 1.5px solid $border;
  background: #2a2520;
  color: $text;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  flex-shrink: 0;
  &:hover {
    border-color: rgba($orange, 0.5);
    background: rgba($orange, 0.1);
    box-shadow: 0 4px 14px rgba($orange, 0.08);
  }
  svg { color: $orange; flex-shrink: 0; }
}
.sb-btn-text { white-space: nowrap; }

/* ── session list ── */
.sb-sessions {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
  scrollbar-width: thin;
  scrollbar-color: rgba($orange, 0.2) transparent;
}
.sb-section-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 6px 8px 4px;
}
.sb-session-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.18s ease;
  &:hover {
    background: #2e2822;
    .sb-session-del { opacity: 1; }
  }
  &.active { background: rgba($orange, 0.12); }
}
.sb-session-icon { flex-shrink: 0; color: $muted; }
.sb-session-title {
  flex: 1;
  font-size: 0.84rem;
  color: #c8bcb0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sb-session-del {
  flex-shrink: 0;
  opacity: 0;
  width: 24px; height: 24px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.18s ease, background 0.18s ease;
  &:hover { background: rgba(239, 68, 68, 0.18); }
}
.sb-empty {
  font-size: 0.8rem;
  color: #9ca3af;
  text-align: center;
  padding: 20px 0;
}

/* ── emotion bottom card ── */
.sb-emotion-card {
  margin: 8px 12px 14px;
  padding: 12px 14px;
  background: linear-gradient(135deg, #2a2118, #2e2614);
  border-radius: 12px;
  border: 1px solid rgba(245, 158, 11, 0.22);
  flex-shrink: 0;
}
.ec-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.ec-score {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #fb923c, #f59e0b);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &.ec-score--warn { background: linear-gradient(135deg, #f87171, #ef4444); }
}
.ec-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ec-label { font-size: 0.72rem; color: #9ca3af; font-weight: 500; }
.ec-status {
  font-size: 0.8rem;
  font-weight: 700;
  color: #d97706;
  &.warn { color: #ef4444; }
}
.ec-dots {
  display: flex;
  gap: 3px;
  .ec-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #3d3530;
    transition: background 0.2s ease;
    &.active { background: $orange; }
  }
}
.ec-suggestion {
  font-size: 0.78rem;
  color: #7a6e65;
  line-height: 1.5;
  margin: 0;
}
.ec-risk {
  margin-top: 8px;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 0.75rem;
  color: #e09840;
  background: rgba(180, 83, 9, 0.18);
  border-radius: 8px;
  padding: 7px 10px;
  svg { flex-shrink: 0; margin-top: 1px; }
}

/* ── expand button (sidebar collapsed) ── */

/* ════════════════════════════════════════════════
   MAIN AREA
   ════════════════════════════════════════════════ */
.ds-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: $bg;
  position: relative; // needed for absolute dl-root
}

/* ════════════════════════════════════════════════
   DAPPLED LIGHT  (jackyzha0/sunlit inspired)
   — pure CSS + SVG, no JS, pointer-events: none
   ════════════════════════════════════════════════ */
.dl-root {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  mix-blend-mode: screen; // screen works better on dark backgrounds
  isolation: isolate;
}
.dl-defs {
  position: absolute;
  width: 0; height: 0;
  overflow: hidden;
  pointer-events: none;
}

// ── Layer 1 : organic light patches (dappled leaves) ──────
.dl-leaves {
  position: absolute;
  // extend beyond edges so displacement filter doesn't clip
  inset: -15%;
  width: 130%; height: 130%;
  // Multiple overlapping radial blobs simulate leaf-filtered sunlight
  background-image:
    radial-gradient(ellipse 380px 320px at 88%  8%, rgba(255, 185, 60, 0.42) 0%, transparent 62%),
    radial-gradient(ellipse 260px 190px at 58% 28%, rgba(255, 200, 80, 0.28) 0%, transparent 58%),
    radial-gradient(ellipse 170px 260px at 97% 42%, rgba(255, 175, 55, 0.35) 0%, transparent 55%),
    radial-gradient(ellipse 210px 150px at 72% 70%, rgba(255, 195, 72, 0.22) 0%, transparent 60%),
    radial-gradient(ellipse 140px 180px at 32% 62%, rgba(255, 185, 65, 0.18) 0%, transparent 58%),
    radial-gradient(ellipse 100px 130px at 18% 85%, rgba(255, 170, 50, 0.14) 0%, transparent 65%);
  filter: url(#dl-wind) blur(14px);
  opacity: 0.9;
  animation: dl-billow 20s ease-in-out infinite;

  // Firefox: feDisplacementMap is CPU-heavy, disable the displacement filter
  @-moz-document url-prefix() {
    filter: blur(14px);
  }
}

// ── Layer 2 : diagonal warm light beams ───────────────────
.dl-beams-wrap {
  position: absolute;
  inset: 0;
  top: -35%;
  height: 175%;
  animation: dl-sway 14s ease-in-out infinite;
  transform-origin: top right;
}
.dl-beams {
  width: 100%; height: 100%;
  transform-origin: top right;
  // matrix3d creates 3D perspective illusion (wall at an angle)
  transform: matrix3d(
    0.74, -0.055, 0, 0.00055,
    0,    1,      0, 0,
    0,    0,      1, 0,
    0,    0,      0, 1
  );
  background: repeating-linear-gradient(
    202deg,
    transparent            0px,
    transparent            80px,
    rgba(255, 190, 60, 0.12) 80px,
    rgba(255, 205, 78, 0.07) 160px
  );
  filter: blur(10px);
}

// ── Layer 3 : corner ambient glow ─────────────────────────
.dl-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 65% 50% at 92%  2%, rgba(255, 185, 55, 0.18) 0%, transparent 68%),
    radial-gradient(ellipse 35% 25% at 100% 65%, rgba(255, 165, 45, 0.10) 0%, transparent 75%);
}

// ── Animations ────────────────────────────────────────────
@keyframes dl-billow {
  0%   { transform: perspective(1200px) rotateX(0deg)     rotateY(0deg)    scale(1);    }
  20%  { transform: perspective(1200px) rotateX(0.7deg)   rotateY(2.2deg)  scale(1.03); }
  47%  { transform: perspective(1200px) rotateX(-2.8deg)  rotateY(-1.6deg) scale(0.97); }
  73%  { transform: perspective(1200px) rotateX(1.2deg)   rotateY(-0.9deg) scale(1.04); }
  100% { transform: perspective(1200px) rotateX(0deg)     rotateY(0deg)    scale(1);    }
}
@keyframes dl-sway {
  0%   { transform: rotate(-1.3deg);  }
  28%  { transform: rotate(0.7deg);   }
  60%  { transform: rotate(-0.5deg);  }
  100% { transform: rotate(-1.3deg);  }
}

// ── Topbar / messages stay above light layer ──────────────
.ds-topbar,
.ds-messages,
.ds-input-area {
  position: relative;
  z-index: 1;
}

// ── Accessibility ─────────────────────────────────────────
@media (prefers-reduced-motion: reduce) {
  .dl-leaves     { animation: none; }
  .dl-beams-wrap { animation: none; }
}
@media (prefers-contrast: high) {
  .dl-root { display: none !important; }
}

/* ── top bar（三列等宽，标题永远居中）── */
.ds-topbar {
  height: 54px;
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr; // 左占位 | 中标题 | 右按钮
  align-items: center;
  padding: 0 clamp(12px, 2vw, 24px);
  background: rgba(26, 22, 18, 0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid $border;
}
.ds-topbar-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.ds-topbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.ds-topbar-toggle {
  width: 34px; height: 34px;
  border-radius: 8px;
  border: 1px solid $border;
  background: transparent;
  color: $muted;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s ease, color 0.18s ease;
  &:hover { background: #2e2822; color: $text; }
}
.ds-session-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: $text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  padding: 0 8px;
}
.ds-new-chat {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  border: 1.5px solid $border;
  background: #2a2520;
  color: $muted;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
  &:hover { border-color: rgba($orange, 0.5); color: $orange; }
}

/* ── messages ── */
.ds-messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 24px clamp(16px, 4vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  scrollbar-width: thin;
  scrollbar-color: rgba($orange, 0.25) transparent;
}

/* welcome screen */
.ds-welcome {
  margin: auto;
  text-align: center;
  max-width: 480px;
  padding: 40px 20px;
}
.dw-avatar {
  width: 80px; height: 80px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(251,146,60,.22), rgba(245,158,11,.14));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 8px 24px rgba($orange, 0.12);
}
.dw-title {
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 800;
  color: $text;
  letter-spacing: -0.03em;
  margin-bottom: 10px;
}
.dw-sub {
  font-size: 0.95rem;
  color: $muted;
  line-height: 1.6;
  margin-bottom: 28px;
  min-height: 1.6em; // 防止打字机切换时高度抖动
}
.dw-typewriter { vertical-align: baseline; }
.dw-cursor {
  display: inline-block;
  margin-left: 1px;
  color: $orange;
  font-weight: 300;
  line-height: 1;
  vertical-align: baseline;
  // 打字时常亮，停顿时闪烁
  &.dw-cursor--blink {
    animation: cursor-blink 0.9s step-end infinite;
  }
}
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
.dw-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.dw-chip {
  padding: 8px 16px;
  border-radius: 50px;
  border: 1.5px solid $border;
  background: #2a2520;
  color: #c0b4a8;
  font-size: 0.84rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
  &:hover { border-color: rgba($orange, 0.5); background: rgba($orange, 0.12); color: $orange; }
}

/* message rows */
.ds-msg-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 820px;
  width: 100%;

  &.row-user {
    flex-direction: row-reverse;
    align-self: flex-end;

    // 让 body 收缩至内容宽度，气泡不撑满整行
    .ds-msg-body {
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .ds-msg-bubble {
      display: inline-block;
      background: linear-gradient(135deg, $orange, #f59e0b);
      color: #fff;
      border-radius: 18px 4px 18px 18px;
      box-shadow: 0 4px 16px rgba($orange, 0.25);
    }
    .ds-msg-time { text-align: right; }
  }

  &.row-ai {
    align-self: flex-start;
    .ds-msg-bubble {
      background: #2a2520;
      color: $text;
      border-radius: 4px 18px 18px 18px;
      border: 1px solid $border;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
  }
}
.ds-msg-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fb923c, #f59e0b);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba($orange, 0.25);

  &.ds-msg-avatar--user {
    background: linear-gradient(135deg, #6b7280, #4b5563);
    box-shadow: 0 3px 10px rgba(107, 114, 128, 0.2);
  }
}
.ds-msg-body { flex: 1; min-width: 0; }
.ds-msg-bubble {
  padding: 12px 16px;
  font-size: 0.93rem;
  line-height: 1.7;
  word-break: break-word;
  animation: msg-in 0.35s $ease both;
}
@keyframes msg-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: none; }
}
.ds-msg-time {
  font-size: 0.72rem;
  color: #5e5048;
  margin-top: 5px;
  padding: 0 4px;
}
.ds-msg-error {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ef4444;
  font-size: 0.875rem;
}

/* typing indicator */
.ds-typing {
  display: flex;
  gap: 5px;
  padding: 6px 2px;
  span {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #4a3e35;
    animation: ds-bounce 1.4s ease-in-out infinite;
    &:nth-child(2) { animation-delay: 0.18s; }
    &:nth-child(3) { animation-delay: 0.36s; }
  }
}
@keyframes ds-bounce {
  0%, 80%, 100% { transform: translateY(0); background: #4a3e35; }
  40%           { transform: translateY(-8px); background: $orange; }
}

/* ── input area ── */
.ds-input-area {
  flex-shrink: 0;
  padding: 12px clamp(16px, 4vw, 32px) 16px;
  background: rgba(22, 18, 14, 0.95);
  backdrop-filter: blur(14px);
  border-top: 1px solid $border;
}
.ds-input-card {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  background: #272219;
  border: 1.5px solid $border;
  border-radius: 14px;
  padding: 10px 10px 10px 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  max-width: 820px;
  margin: 0 auto;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus-within {
    border-color: $orange-light;
    box-shadow: 0 0 0 3px rgba($orange, 0.08), 0 2px 12px rgba(0,0,0,0.06);
  }
}
.ds-textarea {
  flex: 1;
  :deep(.el-textarea__inner) {
    border: none !important;
    box-shadow: none !important;
    padding: 0;
    background: transparent;
    font-size: 0.93rem;
    line-height: 1.6;
    resize: none;
    color: $text;
    &::placeholder { color: #5e5048; }
  }
}
.ds-send-btn {
  flex-shrink: 0;
  width: 38px; height: 38px;
  border-radius: 10px;
  border: none;
  background: #3d3530;
  color: #5e5048;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s $ease;

  &.active {
    background: $orange;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba($orange, 0.35);
    &:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba($orange, 0.4); }
    &:active { transform: none; }
  }
}
.ds-input-hint {
  max-width: 820px;
  margin: 6px auto 0;
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: #5e5048;
  padding: 0 4px;
  .hint-warn { color: #f87171; }
}

/* ── responsive ── */
@media (max-width: 768px) {
  .ds-layout { flex-direction: column; }
  .ds-sidebar {
    width: 100% !important;
    height: auto;
    border-right: none;
    border-bottom: 1px solid $border;
    max-height: 280px;
  }
  .ds-layout.sb-collapsed .ds-sidebar {
    width: 100% !important;
    max-height: 0;
    opacity: 0;
  }
  .ds-main { height: calc(100dvh - 340px); min-height: 400px; }
}

@media (prefers-reduced-motion: reduce) {
  .ds-sidebar { transition: none; }
  .ds-msg-bubble { animation: none; }
  .ds-typing span { animation: none; }
  .ds-send-btn.active:hover { transform: none; }
}
</style>

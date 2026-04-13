import { createApp } from "vue";
import * as Sentry from "@sentry/vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
/* 在 Element 主题之后加载，便于覆盖 CSS 变量与全局样式 */
import "./style.css";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

// 与官方一致：createApp(App) 后立即 init；DSN 优先读 .env.local，缺省时用兜底（避免改 env 后未重启 dev 导致完全不初始化）
const SENTRY_DSN_FALLBACK =
  "https://a5b4caf0971d27eece50950f9c1c8e52@o4511211516657664.ingest.us.sentry.io/4511211519410176";
const sentryDsn =
  import.meta.env.VITE_SENTRY_DSN?.trim() || SENTRY_DSN_FALLBACK;

Sentry.init({
  app,
  dsn: sentryDsn,
  environment: import.meta.env.MODE,
  sendDefaultPii: false,
  attachProps: false,
  integrations: [Sentry.browserTracingIntegration({ router })],
  tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
});

if (import.meta.env.DEV) {
  window.__SENTRY_TEST__ = () => {
    Sentry.captureException(new Error("Sentry 手动测试"));
  };
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus).use(router).use(pinia).mount("#app");

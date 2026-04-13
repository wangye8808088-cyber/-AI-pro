/**
 * 轻量埋点：业务自定义事件 + 可选上报到自建接口。
 *
 * 常见扩展方式（任选其一，不必全做）：
 * 1) 自建：后端提供 POST 接口，设置 VITE_ANALYTICS_ENDPOINT，本模块用 sendBeacon 上报 JSON。
 * 2) 友盟 Web：按官方文档在 index.html 引入脚本，在 track() 内调用 _czc.push（需改本文件）。
 * 3) Google Analytics 4：加载 gtag，在 track() 内 gtag('event', name, props)。
 *
 * 注意：不要上报密码、聊天正文、日记内容等敏感字段。
 */

const ENDPOINT = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();

function sendPayload(payload) {
  if (!ENDPOINT) return;
  try {
    const json = JSON.stringify(payload);
    const blob = new Blob([json], { type: "application/json" });
    if (navigator.sendBeacon?.(ENDPOINT, blob)) {
      return;
    }
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}

/**
 * @param {string} event 事件名，建议 project_module_action，如 login_success
 * @param {Record<string, unknown>} [props] 自定义维度，禁止放 PII/用户输入原文
 */
export function track(event, props = {}) {
  const payload = {
    event,
    props,
    path: typeof window !== "undefined" ? window.location.pathname : "",
    ts: Date.now(),
  };
  if (import.meta.env.DEV) {
    console.debug("[analytics]", payload);
  }
  sendPayload(payload);
}

/** 路由切换后调用，统计「到了哪一页」 */
export function trackPageView(to) {
  track("page_view", {
    route_name: to.name ?? "",
    path: to.path,
    title: typeof to.meta?.title === "string" ? to.meta.title : "",
  });
}

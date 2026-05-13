import React from "react";

/**
 * 捕获子组件树内的渲染错误，避免整页白屏且看不到原因。
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      const msg = this.state.error?.message || String(this.state.error);
      return (
        <div
          style={{
            padding: 24,
            fontFamily: "system-ui, sans-serif",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.5
          }}
        >
          <h1 style={{ fontSize: 18, marginBottom: 12 }}>页面加载出错（已拦截白屏）</h1>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: 12,
              background: "#fff1f0",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ffccc7"
            }}
          >
            {msg}
          </pre>
          <p style={{ fontSize: 13, marginTop: 16, color: "#555" }}>
            请同时打开浏览器开发者工具：按 <strong>F12</strong>（Mac 可试 <strong>Cmd + Option + I</strong>）→
            点选「<strong>控制台 / Console</strong>」标签 → 看红色报错，把完整内容发给我便于继续修。
          </p>
          <p style={{ fontSize: 13, marginTop: 8, color: "#555" }}>
            若怀疑本地缓存数据损坏，可在控制台粘贴执行：
            <code style={{ display: "block", marginTop: 8, padding: 8, background: "#f5f5f5", borderRadius: 6 }}>
              localStorage.removeItem(&quot;dtp_user_v2&quot;);localStorage.removeItem(&quot;dglp_favorites_v1&quot;);location.reload();
            </code>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

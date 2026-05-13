import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { UserDataProvider } from "./context/UserDataContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  document.body.innerHTML =
    "<p style=\"padding:24px;font-family:system-ui\">找不到 id 为 root 的节点。请打开项目里的 index.html，确认 body 内有 &lt;div id=&quot;root&quot;&gt;&lt;/div&gt;</p>";
} else {
  ReactDOM.createRoot(rootElement).render(
    <ErrorBoundary>
      <React.StrictMode>
        <BrowserRouter>
          <UserDataProvider>
            <App />
          </UserDataProvider>
        </BrowserRouter>
      </React.StrictMode>
    </ErrorBoundary>
  );
}

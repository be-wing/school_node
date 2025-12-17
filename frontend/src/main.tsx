// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // アプリケーションのメインコンポーネントをインポート
import './index.css';// グローバルなCSSスタイルをインポート

// index.htmlの id="root" 要素を取得
const rootElement = document.getElementById('root');

if (rootElement) {
  // Reactアプリケーションのルートを作成し、HTML要素にマウント（接続）する
  ReactDOM.createRoot(rootElement).render(
    // <React.StrictMode> は開発時の厳密なチェックを有効にする
    <React.StrictMode>
      <App /> {/* メインアプリケーションコンポーネントをレンダリング */}
    </React.StrictMode>,
  );
}
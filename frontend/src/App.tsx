// App.tsx
import React, { useState, useEffect, use } from 'react';
// import PostForm from './PostForm'; // 後で作成
import PostList from './PostList';


// バックエンドのAPIベースURLを定義
//http://localhost:3000/api/list
const API_BASE_URL = 'http://localhost:3000/api';

function App() {
  // 投稿リスト全体を管理するState
  const [posts, setPosts] = useState<Post[]>([]); 
  // ロード中かどうかを示すState
  const [isLoading, setIsLoading] = useState(true);

// ===============================================
// FR-01: 投稿一覧の取得 (Read) ロジック
// ===============================================
const fetchPosts = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/list`);
    if(!response.ok) {
      throw new Error('投稿の取得に失敗しました');
    }
    const data = await response.json();
    // 取得したデータをStateにセット
    setPosts(data.data);
  }catch (error) {
    console.error('Error fetching posts:', error);
  }finally {
    setIsLoading(false);
  }
}

useEffect(() => {
  fetchPosts();
}, []);

  // ライフサイクル処理や非同期処理 (APIからデータを読み込む処理など)
  useEffect(() => {
    // 掲示板データ取得APIを呼び出すロジック (FR-01)
  }, []);

  // 新規投稿処理 (FR-02)
  // const handleAddPost = async (name, content) => { ... }

  return (
    <div className="app-container">
      {/* <PostForm onAddPost={handleAddPost} /> */}
      {/* <PostList posts={posts} /> */}
      <h1>掲示板アプリケーション</h1>
      <h2>投稿一覧</h2>
      {isLoading ? (
        <p>投稿を読み込み中...</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}

export default App;
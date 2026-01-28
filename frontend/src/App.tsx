import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * 【ステップ1】データの型定義
 * サーバーから取得する記事データの形を定義します
 */
interface Post {
  id: number;
  name: string;
  content: string;
  date?: string;
}

const App: React.FC = () => {
  // --- 状態管理 (State) ---
  const [posts, setPosts] = useState<Post[]>([]);       // 記事一覧用
  const [name, setName] = useState('');                 // 名前入力用
  const [content, setContent] = useState('');           // 内容入力用
  const [editId, setEditId] = useState<number | null>(null); // 編集対象ID管理用

  const API_BASE = 'http://localhost:3000/api';

  /**
   * 【ステップ2】記事一覧の取得関数
   * 役割：APIからデータを取得して setPosts で状態を更新する
   */
  const getPosts = async () => {
    // TODO: ここに fetch を使った取得処理を記述
  };

  /**
   * 起動時の実行処理
   */
  useEffect(() => {
    getPosts();
  }, []);

  /**
   * 【ステップ3・6】フォーム送信・リセット処理
   * 役割：新規保存、または編集内容の更新を行い、フォームをリセットする
   */
  const handleSubmit = async () => {
    // TODO: 保存（add または edit）の通信処理を記述
  };

  const resetForm = () => {
    // TODO: フォームの入力値と editId を初期化する処理を記述
  };

  /**
   * 【ステップ4】削除処理
   * 役割：指定されたIDの記事をサーバーから削除する
   */
  const handleDelete = async (id: number) => {
    // TODO: 削除の通信処理を記述
  };

  /**
   * 【ステップ5】編集モード開始処理
   * 役割：選ばれた記事の内容をフォームにセットし、editIdを更新する
   */
  const startEdit = (post: Post) => {
    // TODO: 各Stateに値をセットする処理を記述
  };

  return (
    <div id="root">
      <h1>簡易掲示板</h1>

      {/* 入力エリア */}
      <div className="input-container">
        <h3>{editId ? '📝 記事を編集' : '✉️ 新規投稿'}</h3>
        
        <div className="form-group">
          <label>名前</label>
          <input 
            className="input-field"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="お名前"
          />
        </div>

        <div className="form-group">
          <label>内容</label>
          <textarea 
            className="input-field"
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="メッセージを入力してください"
          />
        </div>
        
        <div className="button-group">
          <button className="btn-primary" onClick={handleSubmit}>
            {editId ? '更新を保存' : '投稿する'}
          </button>
          {editId && (
            <button className="btn-cancel" onClick={resetForm}>キャンセル</button>
          )}
        </div>
      </div>

      {/* 表示エリア */}
      <h2>記事一覧</h2>
      <div className="posts-list">
        {posts.length === 0 ? (
          <p className="no-posts">記事はまだありません。</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <span className="post-id">#{post.id}</span>
                <strong className="post-name">{post.name}</strong>
              </div>
              <p className="post-content">{post.content}</p>
              <small className="post-date">{post.date}</small>
              <div className="post-actions">
                <button className="btn-edit" onClick={() => startEdit(post)}>編集</button>
                <button className="btn-delete" onClick={() => handleDelete(post.id)}>削除</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
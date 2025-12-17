import React from 'react';

// 実際のバックエンドのデータ構造と一致させる必要があります
interface Post {
  id: number;
  name: string;
  content: string;
  date: string; // フォーマット済みの日付文字列
}

// PostList コンポーネントが受け取る Props の型定義
interface PostListProps {
  posts: Post[]; // 投稿オブジェクトの配列
  // 今回の要件にはありませんが、更新/削除のハンドラもここに渡すことがあります
  // onDelete: (id: number) => void;
  // onEdit: (id: number, newContent: string) => void;
}

// PostItem コンポーネント: 個々の投稿を表示するためのサブコンポーネント
const PostItem: React.FC<Post> = ({ id, name, content, date }) => (
  <li key={id} className="post-item">
    <div className="post-meta">
      <span className="post-author">投稿者: {name}</span>
      <span className="post-date">投稿日時: {date}</span>
    </div>
    <div className="post-content">
      {content}
    </div>
    <div className="post-actions">
        {/* FR-03, FR-04 の機能ボタンは後で追加 */}
        <button className="btn-edit" disabled>編集 (ID: {id})</button>
        <button className="btn-delete" disabled>削除</button>
    </div>
  </li>
);

// 個々の投稿を表示するためのサブコンポーネント
const PostList: React.FC<PostListProps> = ({ posts }) => {
    // 1. 投稿データが存在しない場合の処理
    if (posts.length === 0) {
        return <p>まだ投稿がありません。最初の投稿をしてみましょう！</p>;
    }
    console.log('Rendering PostList with posts:', posts);
    return (
        <ul className="post-list">
        {posts.map(post => (
            <PostItem 
                key={post.id}
                id={post.id}
                name={post.name}
                content={post.content}
                date={post.date}
            />
        ))}
        </ul>
    );
}

export default PostList ;
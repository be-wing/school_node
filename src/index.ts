// src/index.ts
import express, { Request, Response } from 'express';
import * as path from 'path';
import { read_data, write_data, getFormattedDate, Post } from './data/util';
import sanitizeHtml from 'sanitize-html';
import cors from 'cors';

const app = express();
const PORT = 3000;
const BASE_URL = '/api';

// ----------------------------------------------------
// 2. CORSミドルウェアを適用
// 開発環境では全てのオリジンからのアクセスを許可するため、cors() を引数なしで呼び出す
// ----------------------------------------------------
app.use(cors()); 

// JSONリクエストボディを解析するためのミドルウェア
app.use(express.json());

// XSS対策用の設定 (全てのHTMLタグを除去)
const sanitizeOptions = {
    allowedTags: [],
    allowedAttributes: {}
};

// ----------------------------------------------------
// ミドルウェア設定
// ----------------------------------------------------
// 静的ファイル配信 (publicディレクトリ)
app.use('/', express.static(path.join(__dirname, '..', 'frontend', 'dist')));
// JSONリクエストボディのパース
app.use(express.json());




// ----------------------------------------------------
// APIエンドポイント (CRUD)
// ----------------------------------------------------


// FR-01: 投稿一覧表示 API (GET /list)
app.get(`${BASE_URL}/list`, (req: Request, res: Response) => {
    try {
        const posts = read_data();
        res.json({ status: 'success', data: posts });
    } catch (error) {
        console.error('Error fetching list:', error);
        res.status(500).json({ status: 'error', message: '投稿の取得に失敗しました。' });
    }
});


// FR-02: 新規投稿追加 API (POST /add)
app.post(`${BASE_URL}/add`, (req: Request, res: Response) => {
    console.log('Received /add request with body:', req.body);
    const { name, content } = req.body;


    if (!name || !content) {
        return res.status(400).json({ status: 'error', message: '名前と内容の両方が必須です。' });
    }


    try {
        const posts = read_data();
        const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;
        const newId = maxId + 1;


        // 新規投稿の作成
        const formattedDate = getFormattedDate(); // 'Y-m-d H:i:s' 形式の日付取得
       
        const newPost: Post = {
            id: newId,
            name: sanitizeHtml(name.toString(), sanitizeOptions),
            content: sanitizeHtml(content.toString(), sanitizeOptions),
            date: formattedDate
        };
       
        posts.unshift(newPost);


        if (!write_data(posts)) {
            return res.status(500).json({
                status: 'error',
                message: '投稿データの保存に失敗しました。'
            });
        }
       
        res.status(201).json({ status: 'success', data: newPost });


    } catch (error) {
        console.error('Error adding new post:', error);
        res.status(500).json({
            status: 'error',
            message: 'サーバーで予期せぬエラーが発生しました。'
        });
    }
});


// FR-03: 投稿削除 API (POST /delete)
app.post(`${BASE_URL}/delete`, (req: Request, res: Response) => {
    const { id } = req.body;


    if (typeof id !== 'number' || id <= 0) {
        return res.status(400).json({
            status: 'error',
            message: '有効なIDを指定してください。'
        });
    }


    try {
        let posts = read_data();
        const initialLength = posts.length;
       
        posts = posts.filter(post => post.id !== id);


        if (posts.length === initialLength) {
            return res.status(404).json({
                status: 'error',
                message: `ID ${id} の投稿が見つかりませんでした。`
            });
        }
       
        if (!write_data(posts)) {
            return res.status(500).json({
                status: 'error',
                message: '投稿データの削除に失敗しました。'
            });
        }
       
        res.json({ status: 'success', data: { id: id } });


    } catch (error) {
        console.error(`Error deleting post ID ${id}:`, error);
        res.status(500).json({
            status: 'error',
            message: 'サーバーで予期せぬエラーが発生しました。'
        });
    }
});


// FR-04: 投稿内容更新 API (POST /edit)
app.post(`${BASE_URL}/edit`, (req: Request, res: Response) => {
    const { id, name, content } = req.body;


    if (typeof id !== 'number' || id <= 0 || (!name && !content)) {
        return res.status(400).json({
            status: 'error',
            message: '有効なIDと、更新する名前または内容が必要です。'
            });
    }


    try {
        const posts = read_data();
        const postIndex = posts.findIndex(p => p.id === id);


        if (postIndex === -1) {
            return res.status(404).json({
                status: 'error',
                message: `ID ${id} の投稿が見つかりませんでした。`
            });
        }


        const existingPost = posts[postIndex];


        if (name) {
            existingPost.name = sanitizeHtml(name.toString(), sanitizeOptions);
        }
        if (content) {
            existingPost.content = sanitizeHtml(content.toString(), sanitizeOptions);
        }
       
        posts[postIndex] = existingPost;


        if (!write_data(posts)) {
            return res.status(500).json({
                status: 'error',
                message: '投稿データの更新に失敗しました。'
            });
        }
       
        res.json({ status: 'success', data: existingPost });


    } catch (error) {
        console.error(`Error editing post ID ${id}:`, error);
        res.status(500).json({
            status: 'error',
            message: 'サーバーで予期せぬエラーが発生しました。'
        });
    }
});


// ----------------------------------------------------
// サーバー起動
// ----------------------------------------------------


app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}${BASE_URL}`);
});

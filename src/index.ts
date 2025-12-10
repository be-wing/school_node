// src/index.ts
import express, { Request, Response } from 'express';
import * as path from 'path';
const app = express();
const port = 3000;


// ミドルウェア設定
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); // viewsフォルダはsrcの1つ上


// ルートの設定
app.get('/', async (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});
// サーバー起動
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

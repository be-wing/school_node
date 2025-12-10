// src/data/util.ts


import * as fs from 'fs';
import * as path from 'path';


// 投稿データの型定義
export interface Post {
    id: number;
    name: string;
    content: string;
    date: string;
}


// データストアのパス
const DATA_FILE = path.join(__dirname, 'data.json');


// ----------------------------------------------------
// 新規追加: 日付フォーマットヘルパー関数
// ----------------------------------------------------


/**
 * 現在時刻を 'Y-m-d H:i:s' 形式の文字列で返す。
 * @param date - フォーマット対象のDateオブジェクト (デフォルトは new Date())
 * @returns {string} フォーマットされた日付文字列
 */
export const getFormattedDate = (date: Date = new Date()): string => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 0埋め
    const day = ('0' + date.getDate()).slice(-2); // 0埋め
    const hour = ('0' + date.getHours()).slice(-2); // 0埋め
    const minute = ('0' + date.getMinutes()).slice(-2); // 0埋め
    const second = ('0' + date.getSeconds()).slice(-2); // 0埋め


    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};


// ----------------------------------------------------
// 既存のI/O関数
// ----------------------------------------------------


/**
 * data.jsonを読み込み、投稿配列を返す (FR-01: 最新投稿が上になるようソート)
 */
export function read_data(): Post[] {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        const posts: Post[] = JSON.parse(data);
        // IDの降順（最新投稿が上）にソートして返す
        return posts.sort((a, b) => b.id - a.id);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            return [];
        }
        console.error('Error reading data.json:', error);
        return [];
    }
}


/**
 * 投稿配列をdata.jsonに書き込む
 */
export function write_data(data: Post[]): boolean {
    try {
        // 書き込み前にID昇順にソート（保存データの整合性を保つため）
        const sortedData = data.sort((a, b) => a.id - b.id);
        fs.writeFileSync(DATA_FILE, JSON.stringify(sortedData, null, 4), 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing to data.json:', error);
        return false;
    }
}


// 初期ファイル作成 (データファイルが存在しない場合)
if (!fs.existsSync(DATA_FILE)) {
    write_data([]);
}

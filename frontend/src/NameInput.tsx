import React, { useState } from 'react'; // Reactをインポート

// 1. NameInput コンポーネントの定義
function NameInput() {
    // フォーム入力の状態を管理するStateフック
    const [name, setName] = useState('');

    // 入力値が変更されたときに実行されるハンドラ関数
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.target.value には、入力フィールドの現在の値が入っています。
        setName(e.target.value);
    };
    return (
        <div>
            <h2>名前入力フォーム</h2>
            <input
                type="text"
                value={name} // 入力フィールドの値をStateで管理 
                onChange={handleNameChange} // 入力値が変更されたときにハンドラを呼び出す
                placeholder="名前を入力してください"
            />
            <p>こんにちは、{name}さん！</p>
        </div>
    );
}

export default NameInput;
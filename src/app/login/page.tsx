import Btn from "@/components/Btn";
import React from "react";

// TODO フォントださい
// firebase authでログイン
// ログイン後に / に遷移
function page() {
  return (
    <div className="m-20">
      <h1 className="text-5xl text-center">Dev Diary📝</h1>
      <p className="text-xl text-center mt-4">
        Dev&nbsp;Diaryは、日々の開発活動
        を記録するシンプルなアプリです。アイデアや進捗を手軽にメモし、成長を振り返ることができます。
      </p>

      <div className="flex flex-col items-center w-full p-4">
        <p className="text-2xl">ログインして始める</p>
        <Btn className="bg-blue-500 hover:bg-blue-700 text-lg mt-4">
          Googleでログイン
        </Btn>
      </div>

      <div>ここにアプリプレビュー or 使い方ガイド</div>
    </div>
  );
}

export default page;

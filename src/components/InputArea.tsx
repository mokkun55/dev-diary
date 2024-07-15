"use client";

import React, { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Btn from "./Btn";
import { auth, db } from "@/firebase";
import { doc, collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";

// TODO firebaseにデータ{title, emoji, diary, createdAt}の送信

function InputArea() {
  const router = useRouter();

  const [emoji, setEmoji] = useState<string>("📝");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [inputTitle, setInputTitle] = useState<string>("");

  // 絵文字ピッカー
  const emojiClick = (emoji: EmojiClickData) => {
    setEmoji(emoji.emoji);
    setShowEmojiPicker(!showEmojiPicker);
  };

  // auth
  const userId = auth.currentUser?.uid;

  // 保存
  const saveClick = async () => {
    if (inputText === "") {
      toast.error("本文が入力されていません");
      return;
    }

    // 改行をすべて\nに置換 => 1行目をタイトルにする
    // let diaryTitle = inputText.replace(/\r\n|\r/g, "\n");
    // diaryTitle = diaryTitle.split("\n")[0];
    // diaryTitle = diaryTitle.replace(/#/g, "");

    if (!userId) {
      alert("ユーザーIDが取得できませんでした \nログインしてください");
      console.error("ユーザーIDが取得できませんでした");
      router.push("/login");
      return;
    }
    // console.log("タイトル: ", diaryTitle);
    // console.log("本文: ", inputText);

    // firebaseにデータ{title, emoji, diary, createdAt}の送信
    const userDocRef = doc(db, "users", userId);

    const diarysCollectionRef = collection(userDocRef, "diarys");

    await addDoc(diarysCollectionRef, {
      title: inputTitle,
      emoji: emoji,
      diary: inputText,
      createdAt: new Date(),
    });

    // 完了時の処理
    toast.success("保存しました");
    setInputText("");
    setEmoji("📝");
  };

  return (
    <div className="w-full p-2">
      <Toaster position="top-center" />
      <div>
        <h1 className="text-3xl font-bold mb-4 mt-2 text-center">
          今日の日記を書く✎
        </h1>
        <div>
          <div className="flex items-center justify-end">
            <Btn
              className="bg-green-500 hover:bg-green-700 text-xl w-[120px] h-[40px] mt-2"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? "プレビュー" : "編集"}
            </Btn>
            <Btn
              className="bg-gray-300 hover:bg-gray-700 text-gray-500 text-xl mt-2"
              onClick={() => {
                router.push("/help/md");
              }}
            >
              ?
            </Btn>
          </div>
          <div className="flex items-start">
            <button
              className="text-[80px] mb-[-15px]"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {emoji}
            </button>

            {/* 絵文字ピッカー */}
            {showEmojiPicker ? (
              <EmojiPicker onEmojiClick={emojiClick} skinTonesDisabled />
            ) : (
              ""
            )}
          </div>
        </div>

        {isEdit ? (
          <>
            <input
              type="text"
              placeholder="Title"
              required
              className="w-full p-2 border-none rounded mt-2 text-3xl font-bold outline-none"
              onChange={(e) => setInputTitle(e.target.value)}
              value={inputTitle}
            />
            <textarea
              placeholder="write in markdown"
              required
              className="bg-gray-50 resize-none w-full p-2 border-none outline-none rounded mt-2 text-xl h-[calc(100vh-450px)]"
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            ></textarea>
          </>
        ) : (
          <div className="markdown">
            <ReactMarkdown>{inputText}</ReactMarkdown>
          </div>
        )}

        <div className="flex justify-end">
          <Btn
            className="bg-blue-500 hover:bg-blue-700 text-2xl w-[100px] h-[50px]"
            onClick={saveClick}
          >
            保存
          </Btn>
        </div>
      </div>
    </div>
  );
}

export default InputArea;

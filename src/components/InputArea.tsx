"use client";

import React, { useState } from "react";
import EmojiPicker, { Emoji, EmojiClickData } from "emoji-picker-react";
import Btn from "./Btn";
import { auth, db } from "@/firebase";
import { doc, collection, addDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

// TODO firebaseにデータ{title, emoji, diary, createdAt}の送信

function InputArea() {
  const router = useRouter();

  const [emoji, setEmoji] = useState<string>("📝");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  // 絵文字ピッカー
  const emojiClick = (emoji: EmojiClickData) => {
    setEmoji(emoji.emoji);
    setShowEmojiPicker(!showEmojiPicker);
  };

  // auth
  const userId = auth.currentUser?.uid;

  // 保存
  const saveClick = async () => {
    let diaryTitle = inputTitle;
    if (!inputTitle) {
      diaryTitle = dayjs().format("MM/DD") + "の日記";
    }

    if (!userId) {
      alert("ユーザーIDが取得できませんでした \nログインしてください");
      console.error("ユーザーIDが取得できませんでした");
      router.push("/login");
      return;
    }
    console.log("タイトル: ", diaryTitle);
    console.log("本文: ", inputText);

    // firebaseにデータ{title, emoji, diary, createdAt}の送信
    const userDocRef = doc(db, "users", userId);

    const diarysCollectionRef = collection(userDocRef, "diarys");

    await addDoc(diarysCollectionRef, {
      title: diaryTitle,
      emoji: emoji,
      diary: inputText,
      createdAt: new Date(),
    });

    // 完了時の処理
    toast.success("保存しました");
    setInputTitle("");
    setInputText("");
  };

  return (
    <div className="w-full p-2">
      <Toaster position="top-center" />
      <div>
        <h1 className="text-3xl font-bold mb-4 mt-2 text-center">
          今日の日記を書く✎
        </h1>
        <div>
          <div className="flex">
            <button
              className="text-4xl mr-2"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {emoji}
            </button>
            <input
              type="text"
              placeholder="タイトル"
              className="p-2 border rounded w-full text-2xl"
              onChange={(e) => setInputTitle(e.target.value)}
              value={inputTitle}
            />
          </div>
          {/* 絵文字ピッカー */}
          {showEmojiPicker ? (
            <EmojiPicker
              onEmojiClick={emojiClick}
              skinTonesDisabled
              searchDisabled
            />
          ) : (
            ""
          )}
        </div>
        <textarea
          placeholder="本文"
          required
          className="resize-none w-full p-2 border rounded mt-2 text-2xl h-[calc(100vh-350px)]"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        ></textarea>
        <div className="flex justify-end">
          <Btn
            className="bg-blue-500 hover:bg-blue-700 text-2xl w-[100px]"
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

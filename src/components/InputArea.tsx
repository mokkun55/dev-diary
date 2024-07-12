"use client";

import React, { useState } from "react";
import EmojiPicker, { Emoji, EmojiClickData } from "emoji-picker-react";
import Btn from "./Btn";

// TODO firebaseにデータ{title, emoji, diary, createdAt}の送信

function InputArea() {
  const [emoji, setEmoji] = useState<string>("📝");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  // 絵文字ピッカー
  const emojiClick = (emoji: EmojiClickData) => {
    setEmoji(emoji.emoji);
    setShowEmojiPicker(!showEmojiPicker);
  };

  // 保存
  const saveClick = () => {
    console.log("タイトル: ", inputTitle);
    console.log("本文: ", inputText);
  };

  return (
    <div className="w-full p-2">
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

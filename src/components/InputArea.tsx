"use client";

import React, { useEffect, useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Btn from "./Btn";
import { auth, db } from "@/firebase";
import { doc, collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { useAuthState } from "react-firebase-hooks/auth";
import dayjs from "dayjs";

function InputArea() {
  const router = useRouter();
  const today = dayjs().format("YYYY-MM-DD");

  const [emoji, setEmoji] = useState<string>("📝");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [isToday, setIsToday] = useState<boolean>(false);
  const [todayDiaryId, setTodayDiaryId] = useState<string>("");

  // 絵文字ピッカー
  const emojiClick = (emoji: EmojiClickData) => {
    setEmoji(emoji.emoji);
    setShowEmojiPicker(!showEmojiPicker);
  };

  // auth
  const userId = auth.currentUser?.uid;
  const [user] = useAuthState(auth);

  // getdoc
  const getDiary = async () => {
    if (!userId) {
      console.error("ユーザーIDが取得できませんでした");
      return;
    }
    try {
      const Ref = collection(db, "users", userId, "diarys");
      const docsSnap = await getDocs(Ref);
      const todayDiary = docsSnap.docs.filter((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt.toDate();
        const todayDiaryId = doc.id;
        setTodayDiaryId(todayDiaryId);
        const formattedDate = dayjs(createdAt).format("YYYY-MM-DD");
        return formattedDate === today;
      });
      console.log("今日の日記: ", todayDiary);
      if (todayDiary.length === 0) {
        setIsToday(false);
        console.log("今日の日記は書かれていません");
      } else {
        setIsToday(true);
        console.log("今日の日記は書かれています");
      }
    } catch (error) {
      toast.error("DBエラーが発生しました");
      console.error("dbエラー: ", error);
    }
  };

  useEffect(() => {
    getDiary();
  }, [user]);

  // 保存
  const saveClick = async () => {
    if (inputText === "") {
      toast.error("本文が入力されていません");
      return;
    }

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
    setIsToday(true);
    setInputText("");
    setEmoji("📝");
    setInputTitle("");
  };

  return (
    <div className="w-full p-2">
      <Toaster position="top-center" />
      {isToday ? (
        <div className="flex flex-col justify-center items-center h-[50vh]">
          <h1 className="text-3xl font-bold text-center m-4">
            今日の日記はすでに記入済みです
            <br /> お疲れ様でした!
          </h1>
          <div className="flex flex-col justify-center">
            <Btn
              className="bg-green-500 hover:bg-green-700 h-[50px] text-xl"
              onClick={() => router.push(`/diary/${todayDiaryId}`)}
            >
              今日の日記を(編集)見る
            </Btn>
            <Btn
              className="bg-blue-500 hover:bg-blue-700 h-[50px] text-xl mt-4"
              onClick={() => router.push("/diary")}
            >
              過去の日記を振り返る
            </Btn>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4 mt-2 text-center">
            今日の日記を書く✎
          </h1>
          <div className="flex items-center justify-end">
            <Btn
              className="bg-green-500 hover:bg-green-700 text-xl w-[120px] h-[40px]"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? "プレビュー" : "編集"}
            </Btn>
            <Btn
              className="bg-gray-300 hover:bg-gray-700 text-gray-500 text-xl h-[40px] w-[40px] ml-1"
              onClick={() => {
                router.push("/help/md");
              }}
            >
              ?
            </Btn>
            <Btn
              className="bg-blue-500 hover:bg-blue-700 text-xl ml-4 w-[120px] h-[40px]"
              onClick={saveClick}
            >
              保存
            </Btn>
          </div>

          {isEdit ? (
            <>
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
            <div>
              <p className="text-center text-[80px]">{emoji}</p>
              <h1 className="text-3xl font-bold text-center">{inputTitle}</h1>
              <div className="markdown">
                <ReactMarkdown>{inputText}</ReactMarkdown>
              </div>
            </div>
          )}

          <div className="flex justify-end"></div>
        </div>
      )}
    </div>
  );
}

export default InputArea;

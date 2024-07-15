"use client";

import Btn from "@/components/Btn";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { auth, db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";

type Props = {
  params: {
    id: string;
  };
};

function Page({ params }: Props) {
  const [user] = useAuthState(auth);
  const [title, setTitle] = useState<string>("");
  const [diary, setDiary] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [edit, setEdit] = useState<boolean>(false);

  const router = useRouter();

  const diaryId = params.id;
  const userId = auth.currentUser?.uid;
  // console.log("日記ID:" + diaryId);

  // TODO diaryIdを取ってきて、その日記を参照し emoji タイトル 内容 を表示する
  // 編集機能???
  useEffect(() => {
    // const userId = auth.currentUser?.uid;

    const getDiaryData = async () => {
      const diaryDataRef = doc(db, `users/${userId}/diarys/${diaryId}`);
      onSnapshot(diaryDataRef, (snapshot) => {
        // console.log(snapshot.data());

        // TODO もじデータがないときの処理
        // if (!snapshot.data()) {
        //   router.push("/notfount");
        //   return;
        // }

        setEmoji(snapshot.data()?.emoji);
        setTitle(snapshot.data()?.title);
        setDiary(snapshot.data()?.diary);
        setDate(snapshot.data()?.createdAt.toDate());
      });
    };

    getDiaryData();
  }, [diaryId, router, user, userId]);

  // TODO 編集機能
  const editDiary = () => {
    alert("編集機能はまだ実装されていません");
  };

  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-full">
          <Btn
            className="bg-gray-500 hover:bg-gray-700 text-xl m-4"
            onClick={() => setEdit(!edit)}
          >
            {edit ? "保存して閉じる" : "編集"}
          </Btn>
          <p className="text-center text-[80px]">{emoji}</p>
          <h1 className="text-3xl font-bold text-center">
            {edit ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-center border rounded"
              ></input>
            ) : (
              title
            )}
          </h1>
          <p className="text-xl text-center">
            {dayjs(date).format("YYYY/MM/DD (dddd)")}
          </p>
          <div className="m-6">
            {edit ? (
              <textarea
                className="text-xl resize-none p-2 w-full border h-[calc(100vh-400px)]"
                value={diary}
                onChange={(e) => setDiary(e.target.value)}
              ></textarea>
            ) : (
              <div className="markdown">
                <ReactMarkdown>{diary}</ReactMarkdown>
              </div>
            )}

            <div className="flex justify-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

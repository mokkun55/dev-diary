"use client";

import Btn from "@/components/Btn";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { auth, db } from "@/firebase";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Diary from "@/components/types";
import { useAuthState } from "react-firebase-hooks/auth";
import dayjs from "dayjs";

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
        <Sidebar />
        <div className="w-full">
          <p className="text-xl text-center">
            {dayjs(date).format("YYYY/MM/DD (dddd)")}
          </p>
          <h1 className="text-3xl font-bold text-center m-4 mt-0">
            <span>{emoji}</span>
            {title}
          </h1>
          <div className="m-6">
            <textarea
              className="text-xl resize-none p-2 w-full border h-[calc(100vh-300px)]"
              value={diary}
            ></textarea>
            <div className="flex justify-end">
              <Btn
                className="bg-green-500 hover:bg-green-700 text-2xl w-[100px] h-[50px]"
                onClick={editDiary}
              >
                編集
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

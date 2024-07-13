"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import Btn from "./Btn";
import { auth, db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Diary from "./types";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [diarys, setDiarys] = useState<Diary[]>([]);
  const [user] = useAuthState(auth);
  const router = useRouter();

  // 日付取得 dayjs
  dayjs.locale("ja");

  // データ読み込み
  useEffect(() => {
    const userId = auth.currentUser?.uid;

    const getDiaryData = async () => {
      const diaryDataRef = collection(db, `users/${userId}/diarys`);
      onSnapshot(
        query(diaryDataRef, orderBy("createdAt", "desc")),
        (snapshot) => {
          // console.log(snapshot.docs);
          setDiarys(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              emoji: doc.data().emoji,
              title: doc.data().title,
              diary: doc.data().diary,
              createdAt: doc.data().createdAt.toDate(),
            }))
          );
        }
      );
    };

    getDiaryData();
  }, [user]);

  return (
    <div className="bg-blue-50 w-1/3 p-4">
      <h1 className="text-xl font-bold text-center">
        {dayjs().format("YYYY/MM/DD (ddd)")}
      </h1>

      {/* TODO ◯日ストリーク */}

      <Btn
        className="bg-blue-500 hover:bg-blue-700 w-full mt-1"
        onClick={() => {
          router.push("/");
        }}
      >
        日記を書く✎
      </Btn>

      {/* 日記一覧 */}
      {/* TODO 過去10件くらいに制限？？？ */}
      <div>
        <div className="flex items-center justify-center mt-5">
          <h1 className="text-xl border-b text-center font-bold">日記一覧</h1>
          <Btn
            className="bg-blue-500 hover:bg-blue-700 ml-2"
            onClick={() => {
              router.push("/diary");
            }}
          >
            詳細
          </Btn>
        </div>
        <ul className="overflow-auto h-[calc(100vh-210px)]">
          {diarys.map((diary, index) => (
            <li
              key={index}
              className="block lg:flex my-2 border-b pb-2 cursor-pointer"
              onClick={() => {
                router.push(`/diary/${diary.id}`);
              }}
            >
              <p className="font-bold">
                {dayjs(diary.createdAt).format("MM/DD")}
              </p>
              <p>
                <span className="lg:ml-4">{diary.emoji}</span>
                {diary.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

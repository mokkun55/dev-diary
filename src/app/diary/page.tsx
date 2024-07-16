"use client";

import Header from "@/components/Header";
import Diary from "@/components/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Btn from "@/components/Btn";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import Link from "next/link";
import { auth, db } from "@/firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

// 過去の日記を一覧で見れるページ
// クリックで "diary/[id]" に飛ばす
function Page() {
  dayjs.locale("ja");
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const [diarys, setDiarys] = useState<Diary[]>([]);

  // データ読み込み
  useEffect(() => {
    const userId = auth.currentUser?.uid;

    const getDiaryData = async () => {
      const diaryDataRef = collection(db, `users/${userId}/diarys`);
      onSnapshot(
        query(diaryDataRef, orderBy("createdAt", "desc"), limit(10)),
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

  const changeMonth = (num: number) => {};

  return (
    <>
      <Header />

      <div className="m-4">
        <div className="w-full">
          <h1 className="text-center text-3xl font-bold">日記一覧</h1>
        </div>

        {/* 一覧 */}
        <div>
          <div className="flex items-center justify-between">
            {/* ナビゲーション */}
            <div className="flex items-center">
              <Btn
                className="bg-blue-500 hover:bg-blue-700 text-3xl text-center rounded-r-none w-[50px] h-[45px]"
                onClick={() => changeMonth(-1)}
              >
                {"<"}
              </Btn>
              <Btn
                className="bg-blue-500 hover:bg-blue-700 text-3xl text-center rounded-s-none w-[50px] h-[45px]"
                onClick={() => changeMonth(1)}
              >
                {">"}
              </Btn>
              <Btn
                className="bg-blue-500 hover:bg-blue-700 text-2xl text-center w-[100px] h-[45px] ml-4"
                onClick={() => changeMonth(1)}
              >
                今日
              </Btn>
            </div>
            <h1 className="text-4xl">
              {dayjs().format("YYYY年MM月DD日 (dddd)")}
            </h1>
            {/* between調整用↓ */}
            <div></div>
          </div>

          {/* カレンダー(月ごと) */}
          <div className="flex justify-center my-4">
            <table className="table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">日付</th>
                  <th className="border border-gray-300 px-4 py-2">タイトル</th>
                </tr>
              </thead>
              <tbody>
                {diarys.map((diary, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {diary.createdAt.toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Link href={`/diary/${diary.id}`}>{diary.title}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;

"use client";

import Btn from "@/components/Btn";
import Header from "@/components/Header";
import { auth, db } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import toast, { Toaster } from "react-hot-toast";

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

  useEffect(() => {
    const getDiaryData = async () => {
      const diaryDataRef = doc(db, `users/${userId}/diarys/${diaryId}`);
      onSnapshot(diaryDataRef, (snapshot) => {
        // console.log(snapshot.data());

        // TODO もしデータがないときの処理
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

  // 編集機能
  const clickEdit = () => {
    if (edit) {
      try {
        // updatedoc
        if (!userId || !diaryId) {
          toast.error("userIdかdiaryIdが取得できませんでした");
          return;
        }
        const editDiary = async () => {
          updateDoc(doc(db, "users", userId, "diarys", diaryId), {
            title: title,
            diary: diary,
          });
        };
        editDiary();
      } catch (error) {
        console.error("dbエラー " + error);
        toast.error("db取得エラー");
      }
      toast.success("保存しました");
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  // 削除機能
  const clickDelete = () => {
    if (!userId || !diaryId) {
      toast.error("userIdかdiaryIdが取得できませんでした");
      return;
    }
    const deleteDiary = async () => {
      try {
        await deleteDoc(doc(db, "users", userId, "diarys", diaryId));
        toast.success("削除しました");
        router.push("/");
      } catch (error) {
        console.error("dbエラー " + error);
        toast.error("db取得エラー");
      }
    };
    if (window.confirm("本当に削除してもよろしいですか？")) {
      deleteDiary();
    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-full">
          <Btn
            className="bg-green-500 hover:bg-green-700 text-xl m-4 mr-0"
            onClick={clickEdit}
          >
            {edit ? "保存して閉じる" : "編集"}
          </Btn>
          <Btn
            className="bg-red-500 hover:bg-red-700 text-xl m-4"
            onClick={clickDelete}
          >
            削除
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

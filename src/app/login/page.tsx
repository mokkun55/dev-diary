"use client";

import Btn from "@/components/Btn";
import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// TODO フォントださい
function Page() {
  const router = useRouter();

  // ログイン関係
  const [user] = useAuthState(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider);
    if (user) {
      router.push("/");
    }
  };

  const clickSignout = () => {
    signOut(auth);
  };
  return (
    <div className="m-20">
      <h1 className="text-5xl text-center">Dev Diary📝</h1>
      <p className="text-xl text-center mt-4">
        Dev&nbsp;Diaryは、日々の開発活動
        を記録するシンプルなアプリです。アイデアや進捗を手軽にメモし、成長を振り返ることができます。
      </p>

      <div className="flex flex-col items-center w-full p-4">
        {user ? (
          <>
            <Btn
              className="text-2xl bg-blue-500 hover:bg-blue-red mt-4 w-[250px] h-[70px]"
              onClick={() => router.push("/")}
            >
              日記を書く✎
            </Btn>
            <Btn
              className="text-2xl bg-red-500 hover:bg-blue-red mt-4 w-[230px] h-[50px]"
              onClick={clickSignout}
            >
              サインアウト
            </Btn>
          </>
        ) : (
          <>
            <p className="text-2xl">ログインして始める</p>
            <Btn
              className="text-2xl bg-blue-500 hover:bg-blue-700 mt-4 w-[250px] h-[70px]"
              onClick={loginWithGoogle}
            >
              Googleでログイン
            </Btn>
          </>
        )}
      </div>

      <div className="flex justify-center items-center">
        ここにアプリプレビュー or 使い方ガイド
      </div>
    </div>
  );
}

export default Page;

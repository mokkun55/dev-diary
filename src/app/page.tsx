"use client";

import Btn from "@/components/Btn";
import Header from "@/components/Header";
import InputArea from "@/components/InputArea";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function Page() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  return (
    <>
      <Header />
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-[80vh]">
          <h1 className="text-3xl font-bold">loading...</h1>
        </div>
      ) : (
        <>
          <div className="flex h-[calc(100vh-80px)]">
            {user ? (
              <>
                <Sidebar />
                <InputArea />
              </>
            ) : (
              <div className="text-center w-full mt-12">
                <h1 className="text-5xl font-bold">ログインしてください</h1>
                <Btn
                  className="text-2xl bg-blue-500 hover:bg-blue-700 mt-4 w-[250px] h-[70px]"
                  onClick={() => router.push("/login")}
                >
                  ログインページへ
                </Btn>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Page;

"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
function Page({ params }: Props) {
  const router = useRouter();

  const diaryId = params.id;
  console.log(diaryId);

  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar />
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center m-4">
            <span>😀</span>日記のタイトル
          </h1>
          <div className="m-6">
            <textarea className="text-xl resize-none p-2 w-full border h-[calc(100vh-300px)]"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

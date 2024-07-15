"use client";

import Header from "@/components/Header";
import Diary from "@/components/types";
import React, { useState } from "react";

// 過去の日記を一覧で見れるページ
// クリックで "diary/[id]" に飛ばす
function Page() {
  const [diarys, setDiarys] = useState<Diary[]>([]);
  return (
    <>
      <Header />

      <div className="m-4">
        <div className="w-full">
          <h1 className="text-center text-3xl my-4 font-bold">日記一覧</h1>
        </div>
      </div>
    </>
  );
}

export default Page;

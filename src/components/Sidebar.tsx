"use client";

import { useRouter } from "next/navigation";
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import Btn from "./Btn";

function Sidebar() {
  const router = useRouter();
  const diaryId = "1fjdsaew4321";

  // 日付取得 dayjs
  dayjs.locale("ja");

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
      <div>
        <h1 className="text-xl border-b text-center font-bold mt-5">
          日記一覧
        </h1>
        <ul>
          <li
            className="flex my-2 border-b pb-2 cursor-pointer"
            onClick={() => {
              router.push(`/diary/${diaryId}`);
            }}
          >
            <p>7/11</p>
            <p>
              <span className="ml-4">😀</span>React.jsを学んだ
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

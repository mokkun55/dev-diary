import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

// 過去の日記を一覧で見れるページ
// クリックで "diary/[id]" に飛ばす
function page() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <h1 className="">日記一覧</h1>
        </div>
      </div>
    </>
  );
}

export default page;

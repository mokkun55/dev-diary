import Header from "@/components/Header";
import InputArea from "@/components/InputArea";
import Sidebar from "@/components/Sidebar";
import React from "react";

function page() {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar />
        {/* TODO 今日の日記を書いている場合 今日の日記を表示する */}
        {/* きほん1日1日記 */}
        <InputArea />
      </div>
    </>
  );
}

export default page;

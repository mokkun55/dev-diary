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
        <InputArea />
      </div>
    </>
  );
}

export default page;

"use client";

import Link from "next/link";
import React from "react";
import Btn from "./Btn";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Header() {
  // TODO 仮置き
  const user = true;
  const router = useRouter();

  return (
    <header className="bg-gray-50 p-2 flex items-center justify-between h-[80px]">
      <Link href={"/"}>
        <h1 className="text-3xl inline-block">Dev Diary📝</h1>
      </Link>

      <div className="flex items-center flex-col">
        {user ? (
          <>
            {/* プロフ画像 */}
            <Image
              src="/imgs/profIcon.jpg"
              width={500}
              height={500}
              alt="プロフ画像"
              className="w-[50px] border rounded-full cursor-pointer"
              onClick={() => {
                router.push("/login");
              }}
            />
            {/* displayName */}
            <p className=" text-[8px]">もっくん</p>
          </>
        ) : (
          <>
            <Btn
              className="bg-blue-500 hover:bg-blue-700"
              onClick={() => {
                router.push("/login");
              }}
            >
              ログイン
            </Btn>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

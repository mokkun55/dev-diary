"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Diary from "./types";
import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  // firebaseからデータを取得
  const [user] = useAuthState(auth);

  useEffect(() => {
    // TODO データ取得
  }, []);

  // TODO 仮置き
  const router = useRouter();

  const userIcon = user?.photoURL ?? "/imgs/userIcon.png";
  const userName = user ? user.displayName : "名前";

  return (
    <header className="bg-gray-50 p-2 flex items-center justify-between h-[80px]">
      <Link href={"/"}>
        <h1 className="text-3xl inline-block">Dev Diary📝</h1>
      </Link>

      <div className="flex items-center flex-col">
        {/* プロフ画像 */}

        <Image
          src={userIcon}
          width={500}
          height={500}
          alt="プロフ画像"
          className="w-[50px] border rounded-full cursor-pointer"
          onClick={() => {
            router.push("/login");
          }}
        />
        {/* displayName */}
        <p className=" text-[8px]">{userName}</p>
      </div>
    </header>
  );
}

export default Header;

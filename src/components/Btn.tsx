import React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
};

// ボタンのレイアウトを作成
function Btn({ children, className, onClick }: Props) {
  return (
    <button
      className={` rounded py-1 px-2 text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Btn;

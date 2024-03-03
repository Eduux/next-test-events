"use client";
import { MouseEventHandler } from "react";

type TypeColor = "normal" | "green" | "red";

interface IButton {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  type?: HTMLButtonElement["type"];
  typeColor?: TypeColor;
}

export default function Button({
  onClick = () => {},
  children,
  typeColor,
  ...rest
}: IButton) {
  const getTypeColor = () => {
    const types = {
      ["normal"]: "bg-blue-500",
      ["green"]: "bg-green-900",
      ["red"]: "bg-red-900",
    };

    return typeColor ? types[typeColor] : types.normal;
  };

  return (
    <button
      onClick={onClick}
      className={`${getTypeColor()} border-2 min-w-28 justify-center flex items-center font-semibold text-sm text-white px-6 py-2 hover:opacity-90 transition-all`}
      {...rest}
    >
      {children}
    </button>
  );
}

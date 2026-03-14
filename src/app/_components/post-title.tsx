import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] text-white">
      {children}
    </h1>
  );
}

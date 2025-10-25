import type React from "react";
import { Link } from "react-router";
import chorasLogoColour from "@/assets/choras_logo_colour.svg";
import chorasLogoWhite from "@/assets/choras_logo_white.svg";

type AppLayoutProps = {
  title: React.ReactNode | string;
  right?: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export function AppLayout({ title, right, sidebar, children }: AppLayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 bg-choras-dark flex justify-between relative items-center">
        <div className="w-sidebar h-16 pl-6 flex flex-1 items-center">
          <Link to="/" className="group inline-block">
            <img src={chorasLogoWhite} alt="CHORAS" className="h-10 group-hover:hidden" />
            <img src={chorasLogoColour} alt="CHORAS" className="h-10 hidden group-hover:block" />
          </Link>
        </div>
        <div className="border-b border-b-stone-600 absolute top-16 left-0 w-sidebar z-50" />
        {typeof title === "string" ? (
          <h1 className="text-center font-choras text-choras-primary text-2xl flex-2 font-bold">
            {title}
          </h1>
        ) : (
          <div className="flex-2">{title}</div>
        )}
        <div className="w-sidebar flex-1 flex justify-end pr-6">{right}</div>
      </header>
      <main className="flex flex-1">
        <aside className="w-sidebar bg-choras-dark z-40 h-container">{sidebar}</aside>
        <div className="flex-1 h-container overflow-y-scroll bg-[#dcdcdc] border-l border-l-stone-600">
          {children}
        </div>
      </main>
    </div>
  );
}

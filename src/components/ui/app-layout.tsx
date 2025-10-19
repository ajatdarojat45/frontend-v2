import type React from "react";
import { Link } from "react-router";

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
      <header className="h-16 bg-choras-dark flex justify-between items-center">
        <Link
          to="/"
          className="w-sidebar h-16 pl-6 flex flex-1 items-center border-b border-b-stone-600 font-choras uppercase text-white text-[2.5rem]"
        >
          CHORAS
        </Link>
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

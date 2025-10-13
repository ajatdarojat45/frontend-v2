import type React from "react";
import { Link } from "react-router";

type AppLayoutProps = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export function AppLayout({ title, right, sidebar, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 bg-black flex justify-between items-center">
        <Link to="/" className="w-sidebar h-16 pl-6 border-b border-b-stone-600">
          <h1 className="font-[Questrial] uppercase text-white text-[2.5rem] h-16 flex items-center">
            CHORAS
          </h1>
        </Link>
        <h1 className="text-center font-choras text-choras-primary text-2xl flex-2 font-bold">
          {title}
        </h1>
        <div className="w-sidebar shrink-0 flex-1 flex justify-end pr-6">{right}</div>
      </header>
      <main className="flex flex-1">
        <aside className="w-sidebar bg-black/95 z-40">{sidebar}</aside>
        <div className="flex-1 bg-stone-200 border-l border-l-stone-600 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}

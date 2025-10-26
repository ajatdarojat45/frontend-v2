import type React from "react";
import { Link } from "react-router";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable";

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
        <Link
          to="/"
          className="w-sidebar h-16 pl-6 flex flex-1 items-center font-choras uppercase text-white text-[2.5rem]"
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
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          minSize={22.8}
          maxSize={50}
          defaultSize={22.8}
          className="bg-choras-dark border-t border-t-stone-600 z-40 h-container"
        >
          {sidebar}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="flex-1 h-container overflow-y-scroll bg-[#dcdcdc]">
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

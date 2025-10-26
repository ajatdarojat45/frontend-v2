import type React from "react";
import { Link } from "react-router";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable";
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

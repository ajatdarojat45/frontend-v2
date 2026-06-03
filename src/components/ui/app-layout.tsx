import type React from "react";
import { Link } from "react-router";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable";
import chorasLogoColour from "@/assets/choras_logo_colour.svg";
import chorasLogoWhite from "@/assets/choras_logo_white.svg";
import { useSidebarResize } from "@/hooks/useSidebarResize";
import { cn } from "@/libs/style";

type HeaderVariant = "default" | "light";

type AppLayoutProps = {
  title: React.ReactNode | string;
  right?: React.ReactNode;
  sidebar: React.ReactNode;
  rightSidebar?: React.ReactNode;
  children: React.ReactNode;
  headerVariant?: HeaderVariant;
  headerClassName?: string;
};

export function AppLayout({
  title,
  right,
  sidebar,
  children,
  headerVariant = "default",
  headerClassName,
  rightSidebar,
}: AppLayoutProps) {
  const { windowWidth, sidebarMinSize, sidebarDefaultSize, handleSidebarResize } =
    useSidebarResize();
  const headerVariantClassName: Record<HeaderVariant, string> = {
    default: "bg-choras-dark",
    light: "bg-white border-b border-slate-300",
  };
  const isLightHeader = headerVariant === "light";

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header
        className={cn(
          "h-16 flex justify-between relative items-center",
          headerVariantClassName[headerVariant],
          headerClassName,
        )}
      >
        <div className="w-sidebar h-16 pl-6 flex flex-1 items-center">
          <Link to="/" className="group inline-block">
            <img
              src={chorasLogoWhite}
              alt="CHORAS"
              className={cn("h-10", isLightHeader ? "hidden" : "group-hover:hidden")}
            />
            <img
              src={chorasLogoColour}
              alt="CHORAS"
              className={cn("h-10", isLightHeader ? "block" : "hidden group-hover:block")}
            />
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
      <ResizablePanelGroup direction="horizontal" key={windowWidth}>
        <ResizablePanel
          minSize={sidebarMinSize}
          defaultSize={sidebarDefaultSize}
          maxSize={60}
          collapsedSize={sidebarMinSize}
          onResize={handleSidebarResize}
          className="bg-choras-dark border-t border-t-stone-600 z-40 min-w-83"
        >
          {sidebar}
        </ResizablePanel>
        <ResizableHandle className="bg-choras-dark" />
        <ResizablePanel className="bg-[#dcdcdc]">
          <div className="h-full overflow-auto relative">{children}</div>
        </ResizablePanel>
        {rightSidebar && (
          <ResizablePanel
            minSize={sidebarMinSize}
            defaultSize={sidebarDefaultSize}
            maxSize={60}
            collapsedSize={sidebarMinSize}
            onResize={handleSidebarResize}
            className="bg-choras-dark border-t border-t-stone-600 z-40 min-w-83"
          >
            {rightSidebar}
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
}

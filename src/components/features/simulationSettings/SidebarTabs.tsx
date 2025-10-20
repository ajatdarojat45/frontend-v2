import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SurfacesTab } from "./SurfacesTab";
import { SourceReceiversTab } from "./SourceReceiversTab";
import { SettingTab } from "./SettingTab";

export function SidebarTabs() {
  return (
    <div className="h-full w-full relative p-0">
      <Tabs defaultValue="sources" className="h-full w-full" orientation="vertical">
        <div className="h-full w-full">
          <TabsContent value="surfaces" className="m-0">
            <SurfacesTab />
          </TabsContent>

          <TabsContent value="sources" className="m-0">
            <SourceReceiversTab />
          </TabsContent>

          <TabsContent value="settings" className="h-full m-0">
            <SettingTab />
          </TabsContent>
        </div>

        <TabsList className="fixed left-64 md:left-72 lg:left-[var(--width-sidebar)] bottom-0 h-[75%] w-8 p-0 flex-col rounded-r-xl roundedn-l-none z-10 bg-transparent">
          <TabsTrigger
            value="sources"
            className="w-full data-[state=active]:bg-choras-dark data-[state=active]:text-choras-primary text-white/50 flex items-center justify-center bg-choras-dark/50 rounded-l-none cursor-pointer pr-2"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              clipPath: "polygon(0 0, 1% 0, 100% 15%, 100% 85%, 1% 100%, 0 100%)",
            }}
          >
            Sources/Receiver
          </TabsTrigger>
          <TabsTrigger
            value="surfaces"
            className="w-full data-[state=active]:bg-choras-dark data-[state=active]:text-choras-primary text-white/50 flex items-center justify-center bg-choras-dark/50 rounded-l-none cursor-pointer pr-2"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              clipPath: "polygon(0 0, 1% 0, 100% 15%, 100% 85%, 1% 100%, 0 100%)",
            }}
          >
            Surfaces
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="w-full data-[state=active]:bg-choras-dark data-[state=active]:text-choras-primary text-white/50 flex items-center justify-center bg-choras-dark/50 rounded-l-none cursor-pointer pr-2"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              clipPath: "polygon(0 0, 1% 0, 100% 15%, 100% 85%, 1% 100%, 0 100%)",
            }}
          >
            Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

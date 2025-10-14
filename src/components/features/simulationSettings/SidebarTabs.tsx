import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SurfacesTab } from "./SurfacesTab";

export function SidebarTabs() {
  return (
    <div className="h-full w-full relative p-0">
      <Tabs defaultValue="surfaces" className="h-full w-full" orientation="vertical">
        <div className="h-full w-full overflow-hidden">
          <TabsContent value="surfaces" className="h-full m-0">
            <SurfacesTab />
          </TabsContent>

          <TabsContent value="sources" className="h-full m-0">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Sources</h3>
              <p className="text-sm text-muted-foreground">
                Source configuration controls will go here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="h-full m-0">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Settings</h3>
              <p className="text-sm text-muted-foreground">Application settings will go here.</p>
            </div>
          </TabsContent>
        </div>

        <TabsList className="fixed left-64 md:left-72 lg:left-[var(--width-sidebar)] bottom-0 h-[75%] w-8 p-0 flex-col rounded-r-xl roundedn-l-none z-10 bg-transparent">
          <TabsTrigger
            value="sources"
            className="w-full data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-foreground text-white flex items-center justify-center bg-sidebar-foreground rounded-l-none rounded-r-xl"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Sources/Receiver
          </TabsTrigger>
          <TabsTrigger
            value="surfaces"
            className="w-full data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-foreground text-white flex items-center justify-center bg-sidebar-foreground rounded-l-none rounded-r-xl"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Surfaces
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="w-full data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-foreground text-white flex items-center justify-center bg-sidebar-foreground rounded-l-none rounded-r-xl"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

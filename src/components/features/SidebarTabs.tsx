import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function SidebarTabs() {
  return (
    <div className="h-[50%] w-full relative">
      <Tabs defaultValue="simulation" className="h-full w-full" orientation="vertical">
        <div className="h-full w-full overflow-hidden">
          <TabsContent value="simulation" className="h-full m-0 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Simulations</h3>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Method</h3>
                <select className="w-full p-2 border rounded-md bg-background">
                  <option>Diffusion Equation (DE)</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-teal-600 text-white p-2 rounded-md text-sm">
                  DE repo
                </button>
                <button className="flex-1 bg-gray-600 text-white p-2 rounded-md text-sm">
                  DE docs
                </button>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Sources</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm">Source 1</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded">X 0.95</span>
                    <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded">Y 2.35</span>
                    <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded">Z 1.5</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Receivers</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm">Receiver 1</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded">X 1.95</span>
                    <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded">Y 1.64</span>
                    <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded">Z 1.36</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sources" className="h-full m-0 p-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Sources</h3>
              <p className="text-sm text-muted-foreground">
                Source configuration controls will go here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="h-full m-0 p-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Settings</h3>
              <p className="text-sm text-muted-foreground">Application settings will go here.</p>
            </div>
          </TabsContent>
        </div>

        {/* Vertical Tabs - positioned absolutely to overflow outside parent */}
        <TabsList className="fixed left-64 md:left-72 lg:left-80 top-16 h-[50%] w-8 p-0 bg-slate-700 flex-col rounded-none border-l border-slate-600 z-10">
          <TabsTrigger
            value="simulation"
            className="h-32 w-full p-0 text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white rounded-none border-b border-slate-600 flex items-center justify-center"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            SurfaceViewer
          </TabsTrigger>
          <TabsTrigger
            value="sources"
            className="h-32 w-full p-0 text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white rounded-none border-b border-slate-600 flex items-center justify-center"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Sources
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="h-32 w-full p-0 text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white rounded-none flex items-center justify-center"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

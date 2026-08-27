import EventPanel from "@/components/EventPanel";

export default function Home() {
  return (
    <main className="flex h-screen flex-col overflow-hidden">

      {/* Main map area */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#101214]">
        
        {/* Map fills the entire area */}
        <div className="absolute inset-0">
          <div className="flex h-full w-full items-center justify-center text-white">
            MAP GOES HERE
          </div>
        </div>

        {/* Floating event panel */}
<div className="absolute bottom-0 left-4 top-4 z-10">
  <EventPanel />
</div>

      </div>
    </main>
  );
}
import EventPanel from "@/components/EventPanel";
import VietnamMap from "@/components/VNMap";

export default function Home() {
  return (
    <main className="flex h-screen flex-col overflow-hidden">

      {/* Main map area */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#101214]">
        
        {/* Map fills the entire area */}
        <div className="absolute inset-0">
          <VietnamMap />
        </div>

        {/* Floating event panel */}
<div className="absolute bottom-0 left-4 top-4 z-10">
  <EventPanel />
</div>

      </div>
    </main>
  );
}
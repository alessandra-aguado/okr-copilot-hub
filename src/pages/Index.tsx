import Header from "@/components/Header";
import OKRChatInterface from "@/components/OKRChatInterface";
import AppSidebar from "@/components/AppSidebar";
import { useSidebarState } from "@/hooks/useSidebarState";

const Index = () => {
  const { isCollapsed: sidebarCollapsed, toggle: toggleSidebar } = useSidebarState();

  return (
    <div className="h-screen bg-bg-secondary overflow-hidden">
      {/* Fixed Sidebar */}
      <div className={`sidebar-fixed ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <AppSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
      </div>
      
      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''} h-screen flex flex-col`}>
        <Header />
        
        <main className="flex-1 flex items-center justify-center bg-bg-primary">
          <div className="w-full max-w-[980px] mx-auto">
            <OKRChatInterface />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

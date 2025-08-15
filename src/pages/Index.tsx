import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import Footer from "@/components/Footer";
import AppSidebar from "@/components/AppSidebar";
import { useSidebarState } from "@/hooks/useSidebarState";

const Index = () => {
  const { isCollapsed: sidebarCollapsed, toggle: toggleSidebar } = useSidebarState();

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Fixed Sidebar */}
      <div className={`sidebar-fixed ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <AppSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
      </div>
      
      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <Header />
        
        <main className="flex-1 flex items-center justify-center py-16 bg-bg-primary min-h-screen">
          <div className="w-full max-w-[980px] mx-auto">
            <ChatInterface />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;

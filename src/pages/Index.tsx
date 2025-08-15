import { useState } from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import Footer from "@/components/Footer";
import AppSidebar from "@/components/AppSidebar";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-bg-secondary flex">
      {/* Sidebar */}
      <AppSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center py-16 bg-bg-primary">
          <ChatInterface />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;

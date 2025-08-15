import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Plus, 
  FileText, 
  Target, 
  Folder, 
  Settings, 
  HelpCircle, 
  BarChart3, 
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AppSidebar = ({ isCollapsed, onToggle }: AppSidebarProps) => {
  const location = useLocation();
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  
  const currentPath = location.pathname;
  
  const isActive = (path: string) => currentPath === path;
  
  const navigationItems = [
    { title: "Crear OKR para mi unidad", url: "/create", icon: Target },
    { title: "Mis OKRs activos", url: "/active", icon: FileText },
    { title: "Historial de OKRs", url: "/history", icon: Folder },
  ];
  
  const toolsItems = [
    { title: "Guías prácticas", url: "/guides", icon: HelpCircle },
    { title: "Plantillas de OKRs", url: "/templates", icon: FileText },
    { title: "Importar desde CSV", url: "/import", icon: Folder },
  ];
  
  const settingsItems = [
    { title: "Ayuda", url: "/help", icon: HelpCircle },
    { title: "Actividad", url: "/activity", icon: BarChart3 },
    { title: "Ajustes", url: "/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-sidebar-bg transition-smooth">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="w-[18px] h-[18px] bg-[#0078D4] rounded-full flex items-center justify-center">
              <Target className="h-3 w-3 text-white" />
            </div>
            <span className="sidebar-logo-text">OKR Consultant</span>
          </div>
        )}
        {isCollapsed && (
          <div className="flex items-center justify-center w-full">
            <div className="w-[18px] h-[18px] bg-[#0078D4] rounded-full flex items-center justify-center">
              <Target className="h-3 w-3 text-white" />
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 text-sidebar-text hover:text-sidebar-text hover:bg-sidebar-hover"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* New OKR Button */}
      <div className="p-4">
        <Button 
          variant="pill" 
          className="w-full justify-start space-2"
          asChild
        >
          <NavLink to="/new">
            <Plus className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-menu-item">Nuevo OKR</span>}
          </NavLink>
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 space-y-1">
        {/* Main Navigation */}
        <div className="space-y-1 mb-6">
          {!isCollapsed && (
            <h3 className="sidebar-section-title">
              Principal
            </h3>
          )}
          {navigationItems.map((item) => (
            <Button
              key={item.title}
              variant="sidebar"
              className={cn(
                "w-full text-sidebar-text font-medium hover:bg-sidebar-hover hover:text-sidebar-active",
                isActive(item.url) && "bg-sidebar-active-bg text-sidebar-active font-semibold"
              )}
              asChild
            >
              <NavLink to={item.url}>
                <item.icon className="sidebar-icon" />
                {!isCollapsed && <span className="ml-3 truncate sidebar-menu-item">{item.title}</span>}
              </NavLink>
            </Button>
          ))}
        </div>

        {/* Tools Section */}
        <div className="space-y-1 mb-6">
          {!isCollapsed && (
            <Collapsible open={isToolsOpen} onOpenChange={setIsToolsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="sidebar" className="w-full">
                  <Settings className="sidebar-icon" />
                  <span className="ml-3 sidebar-tools-title">Herramientas OKR</span>
                  <ChevronDown className={cn(
                    "sidebar-icon ml-auto transition-transform",
                    isToolsOpen && "rotate-180"
                  )} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 ml-4">
                {toolsItems.map((item) => (
                  <Button
                    key={item.title}
                    variant="sidebar"
                    className={cn(
                      "w-full text-sm",
                      isActive(item.url) && "bg-sidebar-active-bg text-sidebar-active"
                    )}
                    asChild
                  >
                    <NavLink to={item.url}>
                      <item.icon className="sidebar-subicon" />
                      <span className="ml-3 sidebar-submenu-item">{item.title}</span>
                    </NavLink>
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>

        {/* Settings Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="sidebar-section-title">
              Configuración
            </h3>
          )}
          {settingsItems.map((item) => (
            <Button
              key={item.title}
              variant="sidebar"
              className={cn(
                "w-full text-sidebar-text font-medium hover:bg-sidebar-hover hover:text-sidebar-active",
                isActive(item.url) && "bg-sidebar-active-bg text-sidebar-active font-semibold"
              )}
              asChild
            >
              <NavLink to={item.url}>
                <item.icon className="sidebar-icon" />
                {!isCollapsed && <span className="ml-3 truncate sidebar-menu-item">{item.title}</span>}
              </NavLink>
            </Button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AppSidebar;
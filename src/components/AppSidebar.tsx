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
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
    { title: "Crear OKR", url: "/create", icon: Target },
    { title: "Mis OKRs", url: "/active", icon: FileText },
    { title: "Historial", url: "/history", icon: Folder },
  ];
  
  const resourcesItems = [
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
    <div className="flex flex-col h-full bg-sidebar-bg transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-full">
          <div className="w-[24px] h-[24px] bg-[#0078D4] rounded-full flex items-center justify-center">
            <Target className="h-3.5 w-3.5 text-white" />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 text-sidebar-text hover:text-sidebar-text hover:bg-sidebar-hover"
        >
          <Menu className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* New OKR Button */}
      <div className="p-4">
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="pill" 
                  size="icon"
                  className="w-full h-10"
                  asChild
                >
                  <NavLink to="/new">
                    <Plus className="h-3.5 w-3.5" />
                  </NavLink>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Nuevo OKR</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button 
            variant="pill" 
            className="w-full justify-start space-2"
            asChild
          >
            <NavLink to="/new">
              <Plus className="h-3.5 w-3.5" />
              <span className="ml-2 sidebar-menu-item">Nuevo OKR</span>
            </NavLink>
          </Button>
        )}
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
            <div key={item.title}>
              {isCollapsed ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="sidebar"
                        size="icon"
                        className={cn(
                          "w-full h-10 text-sidebar-text font-medium hover:bg-sidebar-hover hover:text-sidebar-active",
                          isActive(item.url) && "bg-sidebar-active-bg text-sidebar-active font-semibold"
                        )}
                        asChild
                      >
                        <NavLink to={item.url}>
                          <item.icon className="h-4 w-4" />
                        </NavLink>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Button
                  variant="sidebar"
                  className={cn(
                    "w-full text-sidebar-text font-medium hover:bg-sidebar-hover hover:text-sidebar-active",
                    isActive(item.url) && "bg-sidebar-active-bg text-sidebar-active font-semibold"
                  )}
                  asChild
                >
                  <NavLink to={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="ml-2 truncate sidebar-menu-item">{item.title}</span>
                  </NavLink>
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Resources Section */}
        <div className="space-y-1 mb-6">
          {isCollapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="sidebar" size="icon" className="w-full h-10">
                    <Wrench className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Recursos</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Collapsible open={isToolsOpen} onOpenChange={setIsToolsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="sidebar" className="w-full">
                  <Wrench className="h-4 w-4" />
                  <span className="ml-2 sidebar-tools-title">Recursos</span>
                  <ChevronDown className={cn(
                    "h-3.5 w-3.5 ml-auto transition-transform",
                    isToolsOpen && "rotate-180"
                  )} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 ml-4">
                {resourcesItems.map((item) => (
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
                      <item.icon className="h-3.5 w-3.5" />
                      <span className="ml-2 sidebar-submenu-item">{item.title}</span>
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
            <div key={item.title}>
              {isCollapsed ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="sidebar"
                        size="icon"
                        className={cn(
                          "w-full h-10 text-sidebar-text font-medium hover:bg-sidebar-hover hover:text-sidebar-active",
                          isActive(item.url) && "bg-sidebar-active-bg text-sidebar-active font-semibold"
                        )}
                        asChild
                      >
                        <NavLink to={item.url}>
                          <item.icon className="h-4 w-4" />
                        </NavLink>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Button
                  variant="sidebar"
                  className={cn(
                    "w-full text-sidebar-text font-medium hover:bg-sidebar-hover hover:text-sidebar-active",
                    isActive(item.url) && "bg-sidebar-active-bg text-sidebar-active font-semibold"
                  )}
                  asChild
                >
                  <NavLink to={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="ml-2 truncate sidebar-menu-item">{item.title}</span>
                  </NavLink>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AppSidebar;
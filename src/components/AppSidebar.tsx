import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  TargetIcon,
  ListIcon,
  HistoryIcon,
  BookIcon,
  HelpIcon,
  ActivityIcon,
  SettingsIcon,
  ChevronDownIcon,
  MenuIcon,
  FileIcon,
  FolderIcon
} from "@/components/icons/CustomIcons";
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
    { title: "Crear OKR", url: "/create", icon: TargetIcon },
    { title: "Mis OKRs", url: "/active", icon: ListIcon },
    { title: "Historial", url: "/history", icon: HistoryIcon },
  ];
  
  const resourcesItems = [
    { title: "Guías prácticas", url: "/guides", icon: HelpIcon },
    { title: "Plantillas de OKRs", url: "/templates", icon: FileIcon },
    { title: "Importar desde CSV", url: "/import", icon: FolderIcon },
  ];
  
  const settingsItems = [
    { title: "Ayuda", url: "/help", icon: HelpIcon },
    { title: "Actividad", url: "/activity", icon: ActivityIcon },
    { title: "Ajustes", url: "/settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex flex-col h-full bg-sidebar-bg transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-full">
          <div className="w-[24px] h-[24px] bg-[#0078D4] rounded-full flex items-center justify-center">
            <TargetIcon className="h-3.5 w-3.5 text-white" />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 text-sidebar-text hover:text-sidebar-text hover:bg-sidebar-hover"
        >
          <MenuIcon className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* New OKR Button */}
      <div className="p-4">
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center py-2 px-4 hover:bg-[#f0f0f0] rounded-md cursor-pointer">
                  <NavLink to="/new" className="flex items-center justify-center">
                    <PlusIcon size={16} className="text-[#404040]" />
                  </NavLink>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Nuevo OKR</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <NavLink to="/new" className="flex items-center gap-2 py-2 px-4 hover:bg-[#f0f0f0] rounded-md">
            <PlusIcon size={16} className="text-[#404040]" />
            <span className="text-sm font-medium text-[#404040]" style={{ fontFamily: 'Open Sans' }}>Nuevo OKR</span>
          </NavLink>
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
                      <div className={cn(
                        "flex items-center justify-center py-2 px-4 hover:bg-[#f0f0f0] rounded-md cursor-pointer",
                        isActive(item.url) && "bg-[#e6f3ff]"
                      )}>
                        <NavLink to={item.url} className="flex items-center justify-center">
                          <item.icon size={16} className="text-[#404040]" />
                        </NavLink>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <NavLink 
                  to={item.url} 
                  className={cn(
                    "flex items-center gap-2 py-2 px-4 hover:bg-[#f0f0f0] rounded-md",
                    isActive(item.url) && "bg-[#e6f3ff]"
                  )}
                >
                  <item.icon size={16} className="text-[#404040]" />
                  <span className="text-sm font-medium text-[#404040]" style={{ fontFamily: 'Open Sans' }}>{item.title}</span>
                </NavLink>
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
                  <div className="flex items-center justify-center py-2 px-4 hover:bg-[#f0f0f0] rounded-md cursor-pointer">
                    <BookIcon size={16} className="text-[#404040]" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Recursos</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Collapsible open={isToolsOpen} onOpenChange={setIsToolsOpen}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center gap-2 py-2 px-4 hover:bg-[#f0f0f0] rounded-md cursor-pointer">
                  <BookIcon size={16} className="text-[#404040]" />
                  <span className="text-sm font-medium text-[#404040]" style={{ fontFamily: 'Open Sans' }}>Recursos</span>
                  <ChevronDownIcon size={14} className={cn(
                    "ml-auto transition-transform text-[#404040]",
                    isToolsOpen && "rotate-180"
                  )} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 ml-4">
                {resourcesItems.map((item) => (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    className={cn(
                      "flex items-center gap-2 py-2 px-4 hover:bg-[#f0f0f0] rounded-md",
                      isActive(item.url) && "bg-[#e6f3ff]"
                    )}
                  >
                    <item.icon size={16} className="text-[#404040]" />
                    <span className="text-sm font-medium text-[#404040]" style={{ fontFamily: 'Open Sans' }}>{item.title}</span>
                  </NavLink>
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
                      <div className={cn(
                        "flex items-center justify-center py-2 px-4 hover:bg-[#f0f0f0] rounded-md cursor-pointer",
                        isActive(item.url) && "bg-[#e6f3ff]"
                      )}>
                        <NavLink to={item.url} className="flex items-center justify-center">
                          <item.icon size={16} className="text-[#404040]" />
                        </NavLink>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <NavLink 
                  to={item.url} 
                  className={cn(
                    "flex items-center gap-2 py-2 px-4 hover:bg-[#f0f0f0] rounded-md",
                    isActive(item.url) && "bg-[#e6f3ff]"
                  )}
                >
                  <item.icon size={16} className="text-[#404040]" />
                  <span className="text-sm font-medium text-[#404040]" style={{ fontFamily: 'Open Sans' }}>{item.title}</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AppSidebar;
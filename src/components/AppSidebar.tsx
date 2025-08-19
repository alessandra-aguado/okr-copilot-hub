import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusIcon, TargetIcon, ListIcon, HistoryIcon, BookIcon, HelpIcon, ActivityIcon, SettingsIcon, ToolboxIcon, ChevronDownIcon, MenuIcon, FileIcon, FolderIcon } from "@/components/icons/CustomIcons";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}
const AppSidebar = ({
  isCollapsed,
  onToggle
}: AppSidebarProps) => {
  const location = useLocation();
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const navigationItems = [{
    title: "Crear OKR",
    url: "/create",
    icon: TargetIcon
  }, {
    title: "Mis OKRs",
    url: "/active",
    icon: ListIcon
  }, {
    title: "Historial",
    url: "/history",
    icon: HistoryIcon
  }];
  const resourcesItems = [{
    title: "Guías prácticas",
    url: "/guides",
    icon: HelpIcon
  }, {
    title: "Plantillas de OKRs",
    url: "/templates",
    icon: FileIcon
  }, {
    title: "Importar desde CSV",
    url: "/import",
    icon: FolderIcon
  }];
  const settingsItems = [{
    title: "Ayuda",
    url: "/help",
    icon: HelpIcon
  }, {
    title: "Ajustes",
    url: "/settings",
    icon: SettingsIcon
  }];
   return <div className="flex flex-col h-full bg-sidebar-bg transition-all duration-300 ease-in-out" style={{ width: isCollapsed ? '56px' : '180px' }}>
      {/* Header */}
      <div className="relative p-4">
        <div className="flex items-center justify-center w-full">
          {/* Logo space reserved for isotipo */}
        </div>
        <Button variant="ghost" size="icon" onClick={onToggle} className="absolute top-4 right-[6px] h-8 w-8 text-sidebar-text hover:text-sidebar-text hover:bg-sidebar-hover">
          <SettingsIcon size={16} className="text-[#404040]" />
        </Button>
      </div>

      {/* New OKR Button */}
      <div className="px-3 pb-6">
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#00D6C4] to-[#0180E7] text-white rounded-lg hover:from-[#00c0b0] hover:to-[#0060c7] transition-all cursor-pointer shadow-lg mx-auto">
                  <PlusIcon size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Nuevo OKR</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <NavLink 
            to="/new" 
            className="flex items-center justify-center gap-2 w-full h-10 bg-gradient-to-r from-[#00D6C4] to-[#0180E7] text-white rounded-lg hover:from-[#00c0b0] hover:to-[#0060c7] transition-all shadow-lg"
          >
            <PlusIcon size={20} />
            <span className="text-sm font-bold">Nuevo OKR</span>
          </NavLink>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3">
        {/* Main Navigation */}
        <div className="space-y-1 mb-8">
          {!isCollapsed && (
            <h3 className="sidebar-section-title px-0 mb-3 text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
              PRINCIPALES
            </h3>
          )}
          {navigationItems.map(item => (
            <div key={item.title}>
              {isCollapsed ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink 
                        to={item.url} 
                        className={cn(
                          "flex items-center justify-center h-10 hover:bg-[#f0f0f0] rounded-md transition-colors",
                          isActive(item.url) && "bg-[#f0f0f0]"
                        )}
                      >
                        <item.icon size={20} className="text-gray-500" />
                      </NavLink>
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
                    "flex items-center gap-3 px-3 py-2.5 hover:bg-[#f0f0f0] rounded-md transition-colors min-h-[40px]",
                    isActive(item.url) && "bg-[#f0f0f0]"
                  )}
                >
                  <item.icon size={20} className="text-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-[#404040]">{item.title}</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>

        {/* Resources Section */}
        <div className="space-y-1 mb-8">
          {isCollapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center h-10 hover:bg-[#f0f0f0] rounded-md transition-colors cursor-pointer">
                    <ToolboxIcon size={20} className="text-gray-500" />
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
                <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#f0f0f0] rounded-md cursor-pointer min-h-[40px] transition-colors">
                  <ToolboxIcon size={20} className="text-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-[#404040]">Recursos</span>
                  <ChevronDownIcon 
                    size={16} 
                    className={cn("ml-auto transition-transform text-[#404040] flex-shrink-0", isToolsOpen && "rotate-180")} 
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 ml-6 mt-1">
                {resourcesItems.map(item => (
                  <div key={item.title}>
                    <NavLink 
                      to={item.url} 
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 hover:bg-[#f0f0f0] rounded-md transition-colors min-h-[36px]",
                        isActive(item.url) && "bg-[#f0f0f0]"
                      )}
                    >
                      <item.icon size={18} className="text-gray-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-[#404040]">{item.title}</span>
                    </NavLink>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>

        {/* Settings Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="sidebar-section-title px-0 mb-3 text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
              CONFIGURACIÓN
            </h3>
          )}
          {settingsItems.map(item => (
            <div key={item.title}>
              {isCollapsed ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink 
                        to={item.url} 
                        className={cn(
                          "flex items-center justify-center h-10 hover:bg-[#f0f0f0] rounded-md transition-colors",
                          isActive(item.url) && "bg-[#f0f0f0]"
                        )}
                      >
                        <item.icon size={20} className="text-gray-500" />
                      </NavLink>
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
                    "flex items-center gap-3 px-3 py-2.5 hover:bg-[#f0f0f0] rounded-md transition-colors min-h-[40px]",
                    isActive(item.url) && "bg-[#f0f0f0]"
                  )}
                >
                  <item.icon size={20} className="text-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-[#404040]">{item.title}</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>;
};
export default AppSidebar;
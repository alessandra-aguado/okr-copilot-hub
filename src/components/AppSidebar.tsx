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
      <div className="px-[6px] pb-4">
        {isCollapsed ? <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#00D6C4] to-[#0180E7] text-white rounded-lg hover:from-[#00c0b0] hover:to-[#0060c7] transition-all cursor-pointer shadow-lg">
                  <PlusIcon size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Nuevo OKR</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> : <NavLink to="/new" className="flex items-center justify-center gap-2 w-full h-10 bg-gradient-to-r from-[#00D6C4] to-[#0180E7] text-white rounded-lg hover:from-[#00c0b0] hover:to-[#0060c7] transition-all shadow-lg mx-[6px]">
            <PlusIcon size={20} />
            <span className="text-sm font-bold">Nuevo OKR</span>
          </NavLink>}
      </div>

      {/* Navigation */}
      <div className="flex-1 px-[6px]">
        {/* Main Navigation */}
        <div className="space-y-[2px] mb-6">
          {!isCollapsed && <h3 className="sidebar-section-title px-[6px] mb-2">
              PRINCIPALES
            </h3>}
          {navigationItems.map(item => <div key={item.title} className="px-[6px]">
              {isCollapsed ? <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink to={item.url} className={cn("flex items-center justify-center py-[4px] hover:bg-[#f0f0f0] rounded-md h-10 whitespace-nowrap overflow-hidden text-ellipsis", isActive(item.url) && "bg-[#f0f0f0]")}>
                        <item.icon size={20} className="text-gray-500" />
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> : <NavLink to={item.url} className={cn("flex items-center gap-3 py-[4px] px-3 hover:bg-[#f0f0f0] rounded-md min-h-[36px] whitespace-nowrap overflow-hidden text-ellipsis", isActive(item.url) && "bg-[#f0f0f0]")}>
                  <item.icon size={20} className="text-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-[#404040] leading-none">{item.title}</span>
                </NavLink>}
            </div>)}
        </div>

        {/* Resources Section */}
        <div className="space-y-[2px] mb-6">
          {isCollapsed ? <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center py-[4px] hover:bg-[#f0f0f0] rounded-md h-10 whitespace-nowrap overflow-hidden text-ellipsis mx-[6px]">
                    <ToolboxIcon size={20} className="text-gray-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Recursos</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> : <Collapsible open={isToolsOpen} onOpenChange={setIsToolsOpen}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center gap-3 py-[4px] px-3 hover:bg-[#f0f0f0] rounded-md cursor-pointer min-h-[36px] whitespace-nowrap overflow-hidden text-ellipsis mx-[6px]">
                  <ToolboxIcon size={20} className="text-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-[#404040] leading-none">Recursos</span>
                  <ChevronDownIcon size={20} className={cn("ml-auto transition-transform text-[#404040] flex-shrink-0", isToolsOpen && "rotate-180")} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-[2px] ml-4">
                 {resourcesItems.map(item => <div key={item.title} className="px-[6px]">
                    <NavLink to={item.url} className={cn("flex items-center gap-3 py-[4px] px-3 hover:bg-[#f0f0f0] rounded-md min-h-[36px] whitespace-nowrap overflow-hidden text-ellipsis", isActive(item.url) && "bg-[#f0f0f0]")}>
                      <item.icon size={20} className="text-gray-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-[#404040] leading-none">{item.title}</span>
                    </NavLink>
                  </div>)}
              </CollapsibleContent>
            </Collapsible>}
        </div>

        {/* Settings Section */}
        <div className="space-y-[2px]">
          {!isCollapsed && <h3 className="sidebar-section-title px-[6px] mb-2">
              CONFIGURACIÓN
            </h3>}
          {settingsItems.map(item => <div key={item.title} className="px-[6px]">
              {isCollapsed ? <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink to={item.url} className={cn("flex items-center justify-center py-[4px] hover:bg-[#f0f0f0] rounded-md h-10 whitespace-nowrap overflow-hidden text-ellipsis", isActive(item.url) && "bg-[#f0f0f0]")}>
                        <item.icon size={20} className="text-gray-500" />
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> : <NavLink to={item.url} className={cn("flex items-center gap-3 py-[4px] px-3 hover:bg-[#f0f0f0] rounded-md min-h-[36px] whitespace-nowrap overflow-hidden text-ellipsis", isActive(item.url) && "bg-[#f0f0f0]")}>
                  <item.icon size={20} className="text-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-[#404040] leading-none">{item.title}</span>
                </NavLink>}
            </div>)}
        </div>
      </div>

    </div>;
};
export default AppSidebar;
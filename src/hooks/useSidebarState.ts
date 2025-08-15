import { useState, useEffect } from 'react';

export const useSidebarState = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggle = () => setIsCollapsed(!isCollapsed);

  return { isCollapsed, toggle };
};
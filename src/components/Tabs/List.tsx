import React, { useRef } from 'react';

export const List = ({ children }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 1. Only care about Arrow keys
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

    // 2. Get all tab triggers inside this list
    const tabs = Array.from(
      listRef.current?.querySelectorAll('[role="tab"]:not([disabled])') || []
    ) as HTMLElement[];

    // 3. Find which one currently has focus
    const index = tabs.indexOf(document.activeElement as HTMLElement);
    
    // If focus isn't on a tab, stop
    if (index === -1) return; 

    // 4. Calculate next/prev index (with looping!)
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length; // Loop to start
    } else {
      nextIndex = (index - 1 + tabs.length) % tabs.length; // Loop to end
    }

    // 5. MANUALLY move focus to the new tab
    const nextTab = tabs[nextIndex];
    nextTab.focus();
    
    // Optional: If you want the tab to select automatically on focus (Windows style),
    // trigger a click:
    // nextTab.click(); 
  };

  return (
    <div 
      ref={listRef} 
      role="tablist" 
      onKeyDown={handleKeyDown} // <--- The Engine
      className="tabs-list"
    >
      {children}
    </div>
  );
};
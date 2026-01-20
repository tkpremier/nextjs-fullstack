import { TabsContext } from "@/context/Tabs";
import { PropsWithChildren, useContext } from "react";

export const Trigger = ({ children, value }: PropsWithChildren<{ value: string }>) => {
  const { activeTab, setActiveTab, idPrefix } = useContext(TabsContext);
  const isActive = activeTab === value;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`${idPrefix}-panel-${value}`} // Links to content
      id={`${idPrefix}-tab-${value}`} // ID for this button
      onClick={() => setActiveTab(value)}
      tabIndex={isActive ? 0 : -1} // Roving tabindex
    >
      {children}
    </button>
  );
};
import { TabsContext } from "@/context/Tabs";
import { PropsWithChildren, useContext } from "react";

export const Panel = ({ children, value }: PropsWithChildren<{ value: string }>) => {
  const { activeTab, setActiveTab, idPrefix } = useContext(TabsContext);
  const isActive = activeTab === value;
  return isActive ? (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${value}`} // Matches Trigger aria-controls
      aria-labelledby={`${idPrefix}-tab-${value}`} // Links back to Trigger
      tabIndex={0}
    >
      {children}
    </div>
  ) : null;
};
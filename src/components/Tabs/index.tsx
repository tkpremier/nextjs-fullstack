import { TabsContext } from "@/context/Tabs";
import { PropsWithChildren, useId, useState } from "react";
import { List } from "./List";
import { Panel } from "./Panel";
import { Trigger } from "./Trigger";

const Tabs = ({
  children,
  defaultValue,
}: PropsWithChildren<{ defaultValue: string }>) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  // Lead Move: Generate a base ID for A11y linking
  const idPrefix = useId();
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, idPrefix }}>
      <div className="tabs-root">{children}</div>
    </TabsContext.Provider>
  );
};
Tabs.Trigger = Trigger;
Tabs.Content = Panel;
Tabs.List = List;
export { Tabs };

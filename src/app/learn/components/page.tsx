'use client';
import { Tabs } from "@/components/Tabs";

export default () => {
  return (
    <div>
      <h1>Components</h1>
      <Tabs defaultValue="react">
        <Tabs.List>
          <Tabs.Trigger key="react" value="react">React</Tabs.Trigger>
          <Tabs.Trigger key="typescript" value="typescript">Typescript</Tabs.Trigger>
          <Tabs.Trigger key="css" value="css">CSS</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content key="react-content" value="react">
          <p>React is a library for building user interfaces.</p>
        </Tabs.Content>
        <Tabs.Content key="typescript-content" value="typescript">
          <p>Typescript is a superset of Javascript.</p>
        </Tabs.Content>
        <Tabs.Content key="css-content" value="css">
          <p>CSS is a language for styling HTML documents. We use CSS Modules to style our components to avoid global scope pollution.  We also use PostCSS to use modern CSS features like custom properties and nesting.</p>
        </Tabs.Content>
      </Tabs>
    </div>
  );
};
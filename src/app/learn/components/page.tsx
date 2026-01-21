'use client';
import Modal from "@/components/Modal";
import { Tabs } from "@/components/Tabs";
import { useState } from "react";

const Components = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <h1>Components</h1>
      <h2>Tabs</h2>
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
      <h2>Modal</h2>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Modal">
        <p>This is a modal.</p>
      </Modal>
      <button onClick={() => setIsModalOpen(true)}>Open Another Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Another Modal">
        <p>This is another modal.</p>
      </Modal>
    </div>
  );
};

export default Components;
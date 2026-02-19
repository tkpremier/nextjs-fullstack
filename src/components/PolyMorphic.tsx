// Uses Generics correctly (<E extends React.ElementType>). Uses ComponentPropsWithRef. Knows that ref typing is complex in polymorphic components and handles it (or explains the trade-off).

import { ComponentPropsWithRef, ElementType, ReactNode } from "react";

// 1. Define the props exclusive to your component
type ButtonOwnProps<E extends ElementType> = {
  as?: E;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
};

// 2. Merge with HTML props, omitting duplicates
type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & Omit<ComponentPropsWithRef<E>, keyof ButtonOwnProps<E>>;

// 3. Use Generics in the implementation
// Note: Type-safe refs in polymorphism are notoriously hard. 
// A Lead might use a utility type or specific casting here.
export const Button = <E extends ElementType = 'button'>({ ref, as, variant, children, ...props }: ButtonProps<E>) => {
  const Component = as || 'button';

  return (
    <Component
      ref={ref}
      className={`btn-${variant}`}
      {...props}
    >
      {children}
    </Component>
  );
}
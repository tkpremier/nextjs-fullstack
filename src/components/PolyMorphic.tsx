// Uses Generics correctly (<E extends React.ElementType>). Uses ComponentPropsWithRef. Knows that ref typing is complex in polymorphic components and handles it (or explains the trade-off).

// 1. Define the props exclusive to your component
type ButtonOwnProps<E extends React.ElementType> = {
  as?: E;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
};

// 2. Merge with HTML props, omitting duplicates
type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> & Omit<React.ComponentPropsWithRef<E>, keyof ButtonOwnProps<E>>;

// 3. Use Generics in the implementation
// Note: Type-safe refs in polymorphism are notoriously hard. 
// A Lead might use a utility type or specific casting here.
export const Button = <E extends React.ElementType = 'button'>({ ref, as, variant, children, ...props }: ButtonProps<E>) => {
  const Component = as || 'button';

  return (
    <Component
      ref={ref}
      className={`btn-${variant}`}
      {...props}
    />
  );
}
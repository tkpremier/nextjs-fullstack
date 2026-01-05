import Link from 'next/link';

export const UnauthenticatedFallback = ({ loginUrl = '/' }: { loginUrl: string }) => (
  <h1>
    <Link href={loginUrl}>Please login</Link>
  </h1>
);

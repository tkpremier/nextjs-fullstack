export const UnauthenticatedFallback = ({ loginUrl = '/auth/login' }: { loginUrl: string }) => (
  <h1>
    <a href={loginUrl}>Please login</a>
  </h1>
);

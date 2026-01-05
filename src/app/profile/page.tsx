'use client';
import { UnauthenticatedFallback } from '@/components/UnauthenticatedFallback';
import { UserContext } from '@/context/user';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useContext, useMemo } from 'react';

const Profile = () => {
  const [user] = useContext(UserContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const loginUrl = useMemo(() => {
    const currentUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    return `${process.env.NEXT_PUBLIC_APP_BASE_URL}/login${
      currentUrl ? `?returnTo=${encodeURIComponent(currentUrl)}` : ''
    }`;
  }, [pathname, searchParams]);

  return (
    <Suspense
      fallback={
        <div>
          <UnauthenticatedFallback loginUrl={loginUrl} />
        </div>
      }
    >
      <div>{user ? <h1>{user.name}</h1> : <UnauthenticatedFallback loginUrl={loginUrl} />}</div>
    </Suspense>
  );
};

export default () => (
  <Suspense
    fallback={
      <div>
        <UnauthenticatedFallback loginUrl="/" />
      </div>
    }
  >
    <Profile />
  </Suspense>
);

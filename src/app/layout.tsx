import { Header } from '@/components/Header';
import '@/styles/global.scss';
import layoutStyles from '@/styles/layout.module.scss';
import '@/styles/tokens.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PropsWithChildren, Suspense } from 'react';

export const metadata: Metadata = {
  title: 'TK Premier',
  icons: '/favicon.ico'
};

const Layout = ({ children }: PropsWithChildren<{}>) => (
  <html>
    <body>
      <div className={layoutStyles.mainRoot}>
        <Suspense fallback={<header>Loading...</header>}>
          <Header />
        </Suspense>
        {children}
        <footer>
          <Link href="/about" key="about">
            About
          </Link>
          <Link href="/learn" key="learn">
            Learn
          </Link>
          <Link href="/interview" key="interview">
            Interviews
          </Link>
        </footer>
      </div>
    </body>
  </html>
);

export default Layout;

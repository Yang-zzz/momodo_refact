import '../styles/globals.css';
import { Providers } from '../context/providers';
import { Noto_Sans_KR } from '@next/font/google';

const notosanskr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={notosanskr.className}>
      <body suppressHydrationWarning={true}>
        <main className=''>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

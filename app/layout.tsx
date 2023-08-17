import '@styles/global.css';

import Nav from '@components/Nav';
import Footer from '@components/Footer';

export const metadata = {
  title: 'Flexibble',
  description: 'Showcase and discover remareble developer projects.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

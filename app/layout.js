import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: 'PAPISO AI - Smart AI for Everyone',
  description: 'Talk to me in Sesotho or English!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

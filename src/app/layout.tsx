import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HackIllinois 2024 - Event Schedule',
  description: 'Discover workshops, talks, meals, and networking opportunities at HackIllinois 2024',
  keywords: ['hackathon', 'hackIllinois', 'schedule', 'events', 'programming', 'technology'],
  openGraph: {
    title: 'HackIllinois 2024 - Event Schedule',
    description: 'Join us for an amazing hackathon experience with workshops, talks, and networking',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#8b5cf6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
import './globals.css';
import AppShell from '@/components/AppShell';

export const metadata = {
  title: 'B612research — Web3 Security, Done Quietly',
  description: 'B612research is a small, deliberate security audit practice for cross-chain and interoperability protocols.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppShell>{children}</AppShell>
    </html>
  );
}

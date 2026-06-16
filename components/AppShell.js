'use client';

import { useState, useEffect } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import QuoteModal from './QuoteModal';
import CasesPanel from './CasesPanel';
import SvgDefs from './SvgDefs';

export default function AppShell({ children }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [casesOpen, setCasesOpen] = useState(false);

  useEffect(() => {
    const handler = () => setQuoteOpen(true);
    window.addEventListener('open-quote', handler);
    return () => window.removeEventListener('open-quote', handler);
  }, []);

  return (
    <body data-theme="light" data-density="default">
      <SvgDefs />
      <Nav onQuote={() => setQuoteOpen(true)} />
      <main>{children}</main>
      <Footer onQuote={() => setQuoteOpen(true)} />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <CasesPanel open={casesOpen} onClose={() => setCasesOpen(false)} />
    </body>
  );
}

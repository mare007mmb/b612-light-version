'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/',          label: 'Home' },
  { href: '/team',      label: 'Team' },
  { href: '/highlight', label: 'Highlight' },
  { href: '/audits',    label: 'Audits' },
  { href: '/research',  label: 'Research' },
  { href: '/media',     label: 'Media' },
];

export default function Nav({ onQuote }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <Link className="brand" href="/" aria-label="B612research home">
            <Image className="brand-mark" src="/b612-logo.svg" alt="B612research" width={120} height={40} priority />
          </Link>
          <nav>
            <ul className="nav-links">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={pathname === href ? 'active' : ''}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-cta">
            <span className="nav-status">
              <span className="pulse" />
              Accepting work
            </span>
            <button
              onClick={onQuote}
              className="btn"
              style={{ backgroundColor: 'rgb(202,98,57)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Book an audit <span className="arrow">→</span>
            </button>
            <button
              className="nav-hamburger"
              id="hamburger"
              aria-expanded={menuOpen}
              aria-label="Menu"
              onClick={() => setMenuOpen(v => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Navigation">
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
        <div className="mobile-cta">
          <button
            onClick={() => { setMenuOpen(false); onQuote && onQuote(); }}
            className="btn"
            style={{ backgroundColor: 'rgb(202,98,57)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Book an audit <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </>
  );
}

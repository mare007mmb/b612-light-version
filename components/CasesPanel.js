'use client';

import { useEffect } from 'react';
import { caseCases } from '@/lib/data';

const sevColor = { crit: 'var(--accent)', high: '#e0a13a', med: '#c7b27a', low: '#8a8472' };

export default function CasesPanel({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className={`cpanel-backdrop${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="More case studies"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="cpanel">
        <div className="cpanel-inner">
          <div className="cpanel-top">
            <div>
              <span className="cpanel-label">Selected engagements</span>
              <h2>More<br/><span className="em">case studies.</span></h2>
            </div>
            <button className="cpanel-close" onClick={onClose} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="ccase-list">
            {caseCases.map((c) => (
              <a key={c.id} className="ccase-item" href="#">
                <div>
                  <div className="ccase-meta">
                    <span>{c.id}</span>
                    <span className={`sev ${c.sevClass}`}>● {c.sev}</span>
                    <span>{c.date}</span>
                  </div>
                  <div className="ccase-title">{c.title}</div>
                  <p className="ccase-dek">{c.dek}</p>
                </div>
                <div className="ccase-pills">
                  {c.tags.map(t => <span key={t} className="ccase-pill">{t}</span>)}
                  <div className="ccase-arrow">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

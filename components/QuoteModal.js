'use client';

import { useEffect, useState } from 'react';

export default function QuoteModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) setSubmitted(false);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className={`qmodal-backdrop${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Request a quote"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="qmodal">
        <div className="qmodal-inner">
          <div className="qmodal-top">
            <span className="qmodal-label">Audit enquiry</span>
            <button className="qmodal-close" onClick={onClose} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {!submitted ? (
            <>
              <h2>Let&apos;s talk about<br/><span className="em">your protocol.</span></h2>
              <p className="sub">Tell us what you&apos;re building. We&apos;ll read the code before we reply.</p>
              <form className="qform" onSubmit={handleSubmit}>
                <div className="qfield-row">
                  <div className="qfield">
                    <label htmlFor="q-name">Your name</label>
                    <input id="q-name" type="text" placeholder="Alex Chen" required />
                  </div>
                  <div className="qfield">
                    <label htmlFor="q-company">Protocol / Company</label>
                    <input id="q-company" type="text" placeholder="Hyperlane" required />
                  </div>
                </div>
                <div className="qfield">
                  <label htmlFor="q-type">Scope type</label>
                  <select id="q-type">
                    <option value="">Select type…</option>
                    <option>Smart contracts (Solidity)</option>
                    <option>Bridge / Interoperability</option>
                    <option>DeFi protocol</option>
                    <option>Cross-chain messaging</option>
                    <option>Rust / CosmWasm</option>
                    <option>Other / Mixed stack</option>
                  </select>
                </div>
                <div className="qfield-row">
                  <div className="qfield">
                    <label htmlFor="q-loc">LOC estimate</label>
                    <input id="q-loc" type="text" placeholder="~8,000 LOC" />
                  </div>
                  <div className="qfield">
                    <label htmlFor="q-timeline">Desired start</label>
                    <input id="q-timeline" type="text" placeholder="July 2026" />
                  </div>
                </div>
                <div className="qfield">
                  <label htmlFor="q-repo">Code link (optional)</label>
                  <input id="q-repo" type="url" placeholder="https://github.com/your-org/repo" />
                </div>
                <div className="qfield">
                  <label htmlFor="q-msg">Anything else we should know</label>
                  <textarea id="q-msg" rows="4" placeholder="Previous audits, known constraints, launch date…"></textarea>
                </div>
                <div className="qform-submit">
                  <button type="submit" className="btn">Send enquiry <span className="arrow">→</span></button>
                  <p className="qform-note">We reply within 2 business days · All communications are confidential</p>
                </div>
              </form>
            </>
          ) : (
            <div className="qmodal-success show">
              <div className="check">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <h3>Enquiry sent.</h3>
              <p>We&apos;ll review your project and get back within two business days.</p>
              <button className="btn ghost" onClick={onClose} style={{ marginTop: '8px' }}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

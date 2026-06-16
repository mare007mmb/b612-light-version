import Image from 'next/image';
import StarField from './StarField';

export default function Footer({ onQuote }) {
  return (
    <section className="contact" id="contact">
      <StarField />
      <div className="contact-bg-star" aria-hidden="true">
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <use href="#b612-star-outline" />
        </svg>
      </div>
      <div className="wrap">
        <h2 className="contact-title" style={{ textAlign: 'center', fontSize: 'clamp(42px, 8vw, 120px)' }}>
          <span className="roman">Let&apos;s talk</span><br />
          about your<br />
          protocol.
        </h2>
        <p className="lede" style={{ maxWidth: '48ch', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          Tell us what you&apos;re building, the timeline, and a code link if you have one. We reply within two business days.
        </p>
        <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={onQuote} className="btn" style={{ cursor: 'pointer', background: '#F5F0E4', color: '#0E0D0A', borderColor: '#F5F0E4' }}>
            Request a quote <span className="arrow">→</span>
          </button>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: 'clamp(40px, 6vw, 80px) 0 0' }} />

        <div className="footer-logo" aria-hidden="true" style={{ borderTop: 'none' }}>
          <Image src="/b612-logo.svg" alt="" width={620} height={80} style={{ maxWidth: '620px', opacity: 0.35, width: '100%', height: 'auto' }} />
        </div>

        <div className="footer-base">
          <span>© 2026 B612research d.o.o.</span>
          <span>Visual identity v1.0 · March 2026</span>
          <span>Last updated · 27 May 2026</span>
        </div>

        <div className="contact-socials" aria-label="Elsewhere">
          <a href="#" className="social" aria-label="X / Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" className="social" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-.99-.02-1.94-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .97-.31 3.18 1.17.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.48 3.17-1.17 3.17-1.17.63 1.58.24 2.74.12 3.03.74.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.38-5.25 5.66.41.35.78 1.05.78 2.11 0 1.52-.01 2.75-.01 3.13 0 .3.21.66.79.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>
          </a>
          <a href="#" className="social" aria-label="Telegram">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.16 6.99c-1.067.466-1.045 1.974.061 2.402l4.04 1.564 1.585 5.078a1.077 1.077 0 0 0 1.704.539l2.396-1.966 4.187 3.097c.764.566 1.846.15 2.04-.78l3.273-15.658a1.292 1.292 0 0 0-1.297-1.485zM17.42 7.42l-7.41 6.71-.29 3.1-1.55-4.81 9.31-5.65c.36-.22.69.27.36.65z"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { logos } from '@/lib/data';
import QuoteButton from '@/components/QuoteButton';
import HeroCanvas from '@/components/HeroCanvas';

export const metadata = {
  title: 'B612research — Web3 Security, Done Quietly',
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <HeroCanvas />
        <div className="wrap">
          <div className="hero-eyebrow">
            <span className="eyebrow">Web3 Security Research, est. 2022</span>
            <span className="sep" />
            <span className="eyebrow">B612</span>
          </div>
          <h1 className="display" style={{ fontFamily: '"Clash Display"', letterSpacing: 0, lineHeight: 0.88 }}>
            Security Audits Done Right.
          </h1>
          <div className="hero-sub">
            <p className="lede">
              B612research is a small, deliberate audit practice for cross-chain and interoperability protocols. We work the way good security should be done — slowly, structurally, line by line.
            </p>
            <div>
              <div className="hero-cta-row">
                <QuoteButton
                  className="btn"
                  style={{ background: '#0E0D0A', borderColor: '#0E0D0A', cursor: 'pointer' }}
                >
                  Request a quote <span className="arrow">→</span>
                </QuoteButton>
                <Link href="/audits" className="btn ghost">Portfolio <span className="arrow">→</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted By ── */}
      <section className="trusted-by">
        <div className="wrap">
          <p className="trusted-label">Projects secured by our team</p>
          <div className="trusted-grid">
            {logos.map((l) => (
              <a key={l.alt} className="trusted-cell" href={l.href} target="_blank" rel="noopener noreferrer">
                <Image src={l.src} alt={l.alt} width={120} height={28} style={{ height: '28px', width: 'auto' }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Quote ── */}
      <section className="quote" id="about">
        <div className="wrap quote-grid">
          <aside className="quote-aside">
            <div className="sect-label">01 / WHY CHOOSE US?</div>
            <Image
              src="/space-planet.svg"
              alt=""
              width={320}
              height={320}
              aria-hidden="true"
              style={{ width: '100%', maxWidth: '300px', height: 'auto', marginTop: '32px', opacity: 0.4 }}
            />
          </aside>
          <div className="quote-body">
            <p>
              <span className="mute">Founded by an</span>
              <span className="ink"> experienced web3 security researcher with a strong track record of providing high-quality security services for leading web3 protocols.</span>
            </p>
            <div className="quote-credit">
              <span className="line" />
              <span>B612 WEB3 RESEARCH AGENCY</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Expertise ── */}
      <section className="expertise">
        <div className="wrap expertise-grid">
          <div>
            <div className="sect-label">— Expertise</div>
            <h3 className="expertise-title">Industry-leading<br /><span className="em">expertise.</span></h3>
            <p className="expertise-body">
              Our researchers have extensive experience across blockchain security, cryptography, and cross-chain integrations. We've reviewed protocols securing billions in TVL — across all the major EVM and non-EVM ecosystems we audit on.
            </p>
          </div>
          <div className="expertise-chains" aria-label="Chains we audit">
            {['Ethereum','Arbitrum','Optimism','Base','zkSync','BNB Chain','Berachain','Cosmos / IBC','Solana','Move (Sui / Aptos)'].map(c => (
              <span key={c} className="chain-tag">{c}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

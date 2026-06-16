export const metadata = { title: 'Highlight — B612research' };

const stats = [
  { k: 'Audits completed', v: '40+', desc: 'We\'ve completed over 40 security audits for projects of all sizes, from stablecoin protocols to cross-chain bridges.' },
  { k: 'Vulnerabilities found', v: '300+', desc: 'We don\'t just find bugs — we identify vulnerabilities before they become breaches.' },
  { k: 'Lines of code audited', v: '200,000+', desc: 'We review every line — not just the critical paths — because the most dangerous bugs are the ones that hide in the boring code.' },
  { k: 'Protocols secured', v: '10+', desc: 'Security isn\'t just a step in the process; it\'s the foundation of every protocol we touch.' },
];

export default function HighlightPage() {
  return (
    <section className="numbers">
      <div className="wrap">
        <div className="sect-head">
          <div>
            <div className="sect-label"><span className="num">02</span> / Audits</div>
            <h2 style={{ marginTop: '28px' }}>BY THE NUMBERS</h2>
          </div>
          <p className="descriptor">
            We don&apos;t scale audits. We scale care. Each engagement is run by a senior researcher from the first kickoff to the last remediation review — no pyramid, no handoffs, no juniors learning on your code.
          </p>
        </div>

        <div className="numbers-grid">
          {stats.map((s) => (
            <div key={s.k} className="number">
              <span className="k">{s.k}</span>
              <div className="desc">{s.desc}</div>
              <span className="v">{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

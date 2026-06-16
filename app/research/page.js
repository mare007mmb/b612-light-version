import { bountyFindings } from '@/lib/data';

export const metadata = { title: 'Research — B612research' };

const sevColor = { crit: 'var(--accent)', high: '#e0a13a', med: '#c7b27a', low: '#8a8472' };

function ArrowIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
}

export default function ResearchPage() {
  return (
    <section className="writing">
      <div className="wrap">
        <div className="sect-head">
          <div>
            <div className="sect-label"><span className="num">05</span> / Bug Bounty</div>
            <h2 style={{ marginTop: '28px' }}>Public<br /><span className="em">findings.</span></h2>
          </div>
          <p className="descriptor">
            A selection of critical and high-severity findings disclosed through public bug bounty programs. All findings listed with protocol permission.
          </p>
        </div>

        <div id="bounty-list">
          {bountyFindings.map((f) => (
            <a key={f.id} className="audit-row" href="#">
              <span className="num">{f.id}</span>
              <div className="ttl">
                {f.title}
                <span className="sub">{f.protocol} · {f.program}</span>
              </div>
              <span className="scope" style={{ color: sevColor[f.sevClass], fontWeight: 500 }}>{f.sev}</span>
              <span className="date">{f.date}</span>
              <span className="findings">
                <span
                  className="pill"
                  style={{ color: sevColor[f.sevClass], borderColor: `color-mix(in oklch, ${sevColor[f.sevClass]} 40%, transparent)` }}
                >
                  {f.reward}
                </span>
              </span>
              <span className="arrow"><ArrowIcon /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

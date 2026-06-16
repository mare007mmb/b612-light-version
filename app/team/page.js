import { teamMembers } from '@/lib/data';

export const metadata = { title: 'Team — B612research' };

export default function TeamPage() {
  return (
    <section className="team">
      <div className="wrap">
        <div className="sect-head">
          <div>
            <div className="sect-label"><span className="num">01</span> / Team</div>
            <h2 style={{ marginTop: '28px' }}>The<br /><span className="em">researchers.</span></h2>
          </div>
          <p className="descriptor">
            A small team of specialists. Every audit is led and delivered by a senior researcher — no handoffs, no juniors learning on your codebase. We keep the team intentionally small so quality stays constant.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <div key={i} className="team-card">
              <div className="team-photo">
                <div className="placeholder">Photo TBC</div>
              </div>
              <div className="team-info">
                <div className="role">{m.role}</div>
                <div className="name">{m.name}</div>
                <div className="meta">{m.meta}</div>
                <div className="specs">
                  {m.specs.map(s => <span key={s} className="spec">{s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

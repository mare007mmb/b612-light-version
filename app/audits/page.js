'use client';

import { useState } from 'react';
import { audits } from '@/lib/data';
import CasesPanel from '@/components/CasesPanel';

function ArrowIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
}

export default function AuditsPage() {
  const [casesOpen, setCasesOpen] = useState(false);

  return (
    <>
      <section className="audits">
        <div className="wrap">
          <div className="sect-head">
            <div>
              <div className="sect-label"><span className="num">03</span> / Portfolio</div>
              <h2 style={{ marginTop: '28px' }}>Audit<br /><span className="em">portfolio.</span></h2>
            </div>
            <p className="descriptor">
              A selection of completed engagements across cross-chain, DeFi, and restaking protocols. All findings disclosed with protocol permission.
            </p>
          </div>

          <div id="audits-list">
            {audits.map((d) => {
              const pills = [];
              if (d.crit) pills.push(<span key="c" className="pill crit">C {d.crit}</span>);
              if (d.findings.high) pills.push(<span key="h" className="pill">H {d.findings.high}</span>);
              if (d.findings.med) pills.push(<span key="m" className="pill">M {d.findings.med}</span>);
              if (d.findings.low) pills.push(<span key="l" className="pill">L {d.findings.low}</span>);
              return (
                <a key={d.num} className="audit-row" href="#">
                  <span className="num">{d.num}</span>
                  <div className="ttl">{d.title}<span className="sub">{d.sub}</span></div>
                  <span className="scope">{d.scope}</span>
                  <span className="date">{d.date}</span>
                  <span className="findings">{pills}</span>
                  <span className="arrow"><ArrowIcon /></span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Case Study ── */}
      <section className="case">
        <div className="wrap">
          <div className="case-head">
            <div>
              <div className="case-label"><span style={{ color: 'var(--beige-50)' }}>04</span> / Case study no. 04</div>
              <h2 style={{ marginTop: '18px' }}>Anatomy of<br />a $2M <span className="em">near-miss.</span></h2>
            </div>
            <p className="case-dek">
              A bridge contract that had been through three previous audits shipped with a critical replay vulnerability in its message-decoding path. We found it on day eight of a six-week engagement. Here, with permission, is how.
            </p>
          </div>

          <div className="case-grid">
            <div>
              <div className="case-meta-list">
                {[
                  ['Client', 'Confidential — L2 bridge'],
                  ['Engagement', 'Pre-mainnet review'],
                  ['Scope', '9,400 LOC · Solidity 0.8.24'],
                  ['Duration', '42 days'],
                  ['Funds at risk', '~$2.1M projected TVL day-1'],
                  ['Disclosure', 'Coordinated · 90 days'],
                ].map(([k, v]) => (
                  <div key={k} className="cell">
                    <div className="k">{k}</div>
                    <div className="v">{v}</div>
                  </div>
                ))}
              </div>

              <div className="severity-row">
                <span className="sev-pill crit"><span className="sw" /><span className="num">1</span> <span className="lbl">Critical</span></span>
                <span className="sev-pill high"><span className="sw" /><span className="num">3</span> <span className="lbl">High</span></span>
                <span className="sev-pill med"><span className="sw" /><span className="num">9</span> <span className="lbl">Medium</span></span>
                <span className="sev-pill low"><span className="sw" /><span className="num">14</span> <span className="lbl">Low / Info</span></span>
              </div>

              <div className="case-cta-row">
                <a href="#" className="btn">Read the full report <span className="arrow">→</span></a>
                <button onClick={() => setCasesOpen(true)} className="btn ghost" style={{ cursor: 'pointer' }}>More case studies →</button>
              </div>
            </div>

            <div className="case-finding">
              <div className="fh">
                <span className="id">FINDING — B612-04-C01</span>
                <span className="sev"><span className="sw" />Critical</span>
              </div>
              <div className="ft">Replay across chains via shared message hash</div>
              <pre>
                <span className="ln">42</span><span className="kw">function</span> <span className="fn">_verifyMessage</span>(<span className="kw">bytes</span> <span className="kw">calldata</span> msg_) <span className="kw">internal</span> {'{'}
{'\n'}<span className="ln">43</span>    <span className="kw">bytes32</span> h = keccak256(msg_);
{'\n'}<span className="hl"><span className="ln">44</span>    <span className="kw">require</span>(!seen[h], <span className="str">&quot;replay&quot;</span>);  <span className="com">// ← chain id not mixed in</span></span>
{'\n'}<span className="ln">45</span>    seen[h] = <span className="kw">true</span>;
{'\n'}<span className="ln">46</span>    _route(msg_);
{'\n'}<span className="ln">47</span> {'}'}
              </pre>
              <div className="annot">
                <strong>The bug.</strong> The replay-protection map is keyed on the message hash alone. Two domains sharing the same canonical bridge layout will produce identical hashes for identical payloads — meaning a valid message on chain A can be replayed on chain B.
              </div>
            </div>
          </div>
        </div>
      </section>

      <CasesPanel open={casesOpen} onClose={() => setCasesOpen(false)} />
    </>
  );
}

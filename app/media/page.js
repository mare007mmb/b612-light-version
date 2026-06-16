'use client';

import { useState } from 'react';
import { episodes } from '@/lib/data';

export default function MediaPage() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(null);
  const len = episodes.length;

  function prev() { setCurrent(c => (c - 1 + len) % len); }
  function next() { setCurrent(c => (c + 1) % len); }
  function togglePlay(i) { setPlaying(p => p === i ? null : i); }

  return (
    <section className="podcast" style={{ marginTop: 0 }}>
      <div className="wrap">
        <div className="podcast-left">
          <div className="label">— B612 Podcast · Season 02</div>
          <h2 className="podcast-title">
            Conversations<br />with builders <span className="em">who ship quietly.</span>
          </h2>
          <p className="dek">
            Long-form interviews with the researchers, founders, and chain engineers behind the protocols you actually use. No script. No takes. Roughly monthly.
          </p>
        </div>

        <div className="podcast-carousel-wrap">
          <div className="podcast-carousel" id="podcast-carousel">
            {episodes.map((e, i) => (
              <div key={i} className={`ep-slide${i === current ? ' active' : ''}`}>
                <div className="ep-num">{e.num}</div>
                <span className="ep-tag">{e.tag}</span>
                <div className="ep-title">{e.title}</div>
                <div className="ep-guest">with {e.guest}</div>
                <div className="player">
                  <button className="play-btn" onClick={() => togglePlay(i)} aria-label="Play">
                    {playing === i
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
                      : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l16 9-16 9V3z"/></svg>
                    }
                  </button>
                  <div className="progress">
                    <div className="bar" style={{ width: i === 0 ? '31%' : '0%' }} />
                  </div>
                  <span className="ts">{i === 0 ? '21:14 / ' : '0:00 / '}{e.dur}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-nav">
            <button className="carousel-btn" onClick={prev} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <span className="carousel-dots">
              {episodes.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === current ? ' active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Episode ${i + 1}`}
                />
              ))}
            </span>
            <button className="carousel-btn" onClick={next} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

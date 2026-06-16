'use client';

export default function QuoteButton({ children, className, style }) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent('open-quote'));
  }
  return (
    <button onClick={handleClick} className={className} style={style}>
      {children}
    </button>
  );
}

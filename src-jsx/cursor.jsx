// Custom crosshair cursor + small icon set, exported to window.
(function () {
  const { useRef, useEffect } = React;

  // Ref-based cursor: position is written straight to the DOM node inside a
  // single rAF tick. No React state, so moving the mouse never triggers a
  // re-render of the whole app (that was a big source of jank).
  function Cursor() {
    const ref = useRef(null);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let x = -100, y = -100, big = false, raf = 0, dirty = false;
      const flush = () => {
        raf = 0;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        if (dirty) {
          el.style.width = el.style.height = big ? '58px' : '42px';
          el.style.borderColor = big ? 'rgba(176,107,255,0.9)' : 'rgba(230,230,255,0.6)';
          dirty = false;
        }
      };
      const schedule = () => { if (!raf) raf = requestAnimationFrame(flush); };
      const move = e => { x = e.clientX; y = e.clientY; schedule(); };
      const over = e => {
        const t = !!e.target.closest('a,button,[data-hover],input,textarea');
        if (t !== big) { big = t; dirty = true; schedule(); }
      };
      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('pointerover', over, { passive: true });
      return () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerover', over);
      };
    }, []);
    return (
      <div ref={ref} style={{
        position: 'fixed', left: 0, top: 0, zIndex: 9999, pointerEvents: 'none',
        width: 42, height: 42, transform: 'translate3d(-100px,-100px,0) translate(-50%,-50%)',
        borderRadius: '50%', border: '1px solid rgba(230,230,255,0.6)',
        transition: 'width .2s var(--ease-out), height .2s var(--ease-out), border-color .2s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        willChange: 'transform',
      }}>
        <span style={{ position: 'absolute', width: 9, height: 1, background: 'rgba(230,230,255,0.85)' }} />
        <span style={{ position: 'absolute', width: 1, height: 9, background: 'rgba(230,230,255,0.85)' }} />
      </div>
    );
  }

  // tiny stroke icon set (no external dep)
  const I = (d, props = {}) => (
    <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="none"
      stroke="currentColor" strokeWidth={props.sw || 1.6} strokeLinecap="round" strokeLinejoin="round">
      {d}
    </svg>
  );
  const Icons = {
    arrowUR: p => I(<path d="M7 17 17 7M9 7h8v8" />, p),
    arrowR: p => I(<path d="M5 12h14M13 6l6 6-6 6" />, p),
    bookmark: p => I(<path d="M6 4h12v16l-6-4-6 4z" />, p),
    github: p => I(<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.3 0C6.6 2.3 5.5 2.6 5.5 2.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />, p),
    telegram: p => I(<path d="M22 4 2 11l6 2 2 6 4-4 5 4 3-15z" />, p),
    mail: p => I(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>, p),
    close: p => I(<path d="M6 6l12 12M18 6 6 18" />, p),
    spark: p => I(<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />, p),
  };

  window.Cursor = Cursor;
  window.Icons = Icons;
})();

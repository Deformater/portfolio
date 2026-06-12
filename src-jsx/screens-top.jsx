// Nav, Hero, SectionHead — exported to window.
(function () {
  const { useState, useEffect } = React;

  /* ---------------- Nav ---------------- */
  function Nav({ onNav, active }) {
    const mobile = window.useMQ(window.MQ_MOBILE);
    const [solid, setSolid] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
      let cur = false, ticking = false;
      const s = () => {
        ticking = false;
        const next = window.scrollY > 40;
        if (next !== cur) { cur = next; setSolid(next); }
      };
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(s); } };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    // collapse the burger menu when leaving the mobile breakpoint
    useEffect(() => { if (!mobile) setMenuOpen(false); }, [mobile]);
    const links = [['projects', 'Проекты'], ['achievements', 'Достижения'], ['about', 'О себе'], ['contact', 'Контакт']];
    return (
      <>
        <header style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: mobile ? '12px 16px' : '18px clamp(20px,5vw,48px)',
          background: solid ? 'rgba(5,6,15,0.6)' : 'transparent',
          backdropFilter: solid ? 'blur(14px)' : 'none', WebkitBackdropFilter: solid ? 'blur(14px)' : 'none',
          borderBottom: solid ? '1px solid var(--line-2)' : '1px solid transparent',
          transition: 'background .4s var(--ease-out), border-color .4s',
        }}>
          <button onClick={() => { setMenuOpen(false); onNav('home'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 10, flexShrink: 0 }}>
            <span style={{ alignSelf: 'center', width: 9, height: 9, borderRadius: '50%', background: 'var(--iris-violet)', boxShadow: '0 0 14px 2px var(--iris-violet)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: mobile ? 16 : 17, letterSpacing: '-0.01em', color: 'var(--text-heading)' }}>муравенко</span>
            {!mobile && <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 17, color: 'var(--text-muted)' }}>engineering</span>}
          </button>
          {!mobile && (
            <nav style={{ display: 'flex', gap: 6, padding: 5, borderRadius: 'var(--radius-pill)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)' }}>
              {links.map(([id, label]) => (
                <button key={id} onClick={() => onNav(id)} style={{
                  fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  padding: '9px 16px', borderRadius: 'var(--radius-pill)', border: 'none', whiteSpace: 'nowrap',
                  background: active === id ? 'var(--grad-iris)' : 'transparent',
                  color: active === id ? 'var(--text-on-accent)' : 'var(--text-muted)',
                  transition: 'color .25s, background .25s',
                }}>{label}</button>
              ))}
            </nav>
          )}
          {mobile && (
            <button onClick={() => setMenuOpen(o => !o)} aria-label="Меню" aria-expanded={menuOpen} style={{
              position: 'relative', width: 42, height: 42, flexShrink: 0, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
              background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12,
              backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
            }}>
              {[0, 1, 2].map(n => (
                <span key={n} style={{
                  width: 18, height: 2, borderRadius: 2, background: 'var(--text-heading)',
                  transition: 'transform .3s var(--ease-out), opacity .2s var(--ease-out)',
                  ...(menuOpen ? (n === 0 ? { transform: 'translateY(6px) rotate(45deg)' } : n === 1 ? { opacity: 0 } : { transform: 'translateY(-6px) rotate(-45deg)' }) : null),
                }} />
              ))}
            </button>
          )}
        </header>
        {mobile && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 90,
            background: 'rgba(5,6,15,0.74)', backdropFilter: 'blur(22px) saturate(1.3)', WebkitBackdropFilter: 'blur(22px) saturate(1.3)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(28px,9vw,52px)',
            opacity: menuOpen ? 1 : 0, visibility: menuOpen ? 'visible' : 'hidden', pointerEvents: menuOpen ? 'auto' : 'none',
            transition: 'opacity .3s var(--ease-out), visibility .3s var(--ease-out)',
          }}>
            {links.map(([id, label], idx) => (
              <button key={id} onClick={() => { onNav(id); setMenuOpen(false); }} style={{
                background: 'none', border: 'none', cursor: 'pointer', width: '100%',
                display: 'flex', alignItems: 'baseline', gap: 18, padding: '18px 0',
                borderBottom: idx < links.length - 1 ? '1px solid var(--line-2)' : 'none',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: active === id ? 'var(--iris-gold)' : 'var(--text-faint)' }}>{'0' + (idx + 1)}</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(30px,9vw,42px)', letterSpacing: '-0.02em', color: active === id ? 'var(--text-heading)' : 'var(--text-secondary)' }}>{label}</span>
              </button>
            ))}
          </div>
        )}
      </>
    );
  }

  /* ---------------- Hero ---------------- */
  function Hero({ onOpen, featured }) {
    const { Button, ShaderField, Crystal } = window.PortfolioDesignSystem_22735b;
    const Icons = window.Icons;
    const mobile = window.useMQ(window.MQ_MOBILE);
    const frost = {
      background: 'linear-gradient(150deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035) 60%)',
      backdropFilter: 'blur(22px) saturate(1.6)', WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
      border: '1px solid rgba(255,255,255,0.16)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 30px 70px rgba(0,0,0,0.45)',
    };
    const chips = [
      { n: '60к+', l: 'пользователей', top: '4%', right: '20%', d: 0 },
      { n: '1k+', l: 'запросов / день', top: '38%', right: '2%', d: 1.4 },
      { n: '96%', l: 'аптайм', top: '70%', right: '26%', d: 2.6 },
    ];
    return (
      <section data-screen-label="Главная" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
        <style>{`
          @keyframes heroRise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
          @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
          .hero-rise{animation:heroRise .9s var(--ease-glide) both}
          @media (prefers-reduced-motion: no-preference){ .hero-float{animation:heroFloat 7s ease-in-out infinite} }
        `}</style>
        {/* iridescent aurora ground (static, matches the Frosted Stack mock) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
          {/* bright violet glow parked BEHIND the panel so the frosted glass reads as translucent */}
          <div style={{ position: 'absolute', width: 680, height: 680, left: '2%', top: '12%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(150,90,255,0.5), rgba(120,70,230,0.18) 44%, transparent 68%)', filter: 'blur(44px)' }} />
          <div style={{ position: 'absolute', width: 600, height: 600, right: '2%', top: '24%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(110,210,255,0.26), transparent 62%)', filter: 'blur(46px)' }} />
          <div style={{ position: 'absolute', width: 480, height: 480, right: '16%', bottom: '-16%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,200,120,0.20), transparent 60%)', filter: 'blur(48px)' }} />
        </div>
        {/* seam fade into the projects section below */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 180, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--container)', margin: '0 auto', padding: mobile ? '96px 18px 72px' : '120px clamp(20px,5vw,48px) 80px', minHeight: '100vh', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1.45fr) minmax(0,0.62fr)', alignItems: 'center', gap: mobile ? 24 : 'clamp(24px,4vw,56px)' }}>
          {/* ---- frosted panel ---- */}
          <div className="hero-rise" style={{ ...frost, borderRadius: mobile ? 22 : 28, padding: mobile ? '26px 22px' : 'clamp(38px,3.4vw,52px) clamp(40px,4vw,60px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 12.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 24 }}>
              <span style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.3)' }} />BACKEND · FOUNDER · ИТМО
            </div>
            <h1 style={{ font: 'var(--type-h1)', fontSize: 'clamp(40px,4.6vw,64px)', letterSpacing: 'var(--track-tight)', lineHeight: 0.98, margin: 0, color: 'var(--text-heading)', maxWidth: '15ch' }}>
              Создаю продукты, <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--iris-gold)' }}>которыми пользуются</em>
            </h1>
            <p style={{ font: 'var(--type-body)', fontSize: 'clamp(15px,1.4vw,17px)', color: 'var(--text-secondary)', maxWidth: '38ch', marginTop: 24, lineHeight: 1.6 }}>
              ИИ и сети, ставшие продуктами для десятков тысяч людей.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
              <Button variant="primary" iconRight={<Icons.arrowR />} as="a" href="#projects" onClick={(e) => { e.preventDefault(); const el = document.getElementById('projects'); if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' }); }}>смотреть кейсы</Button>
              <Button variant="glass" as="a" href="#contact" onClick={(e) => { e.preventDefault(); const el = document.getElementById('contact'); if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' }); }}>связаться</Button>
            </div>
          </div>

          {/* ---- glass stat chips: floating depth on desktop, a tidy row on mobile ---- */}
          <div style={mobile
            ? { display: 'flex', flexWrap: 'wrap', gap: 10 }
            : { position: 'relative', height: '100%', minHeight: 420, pointerEvents: 'none' }}>
            {chips.map((c) => (
              <div key={c.l} className={mobile ? '' : 'hero-rise'} style={mobile
                ? { ...frost, borderRadius: 16, padding: '14px 16px', flex: '1 1 40%', minWidth: 0 }
                : { ...frost, position: 'absolute', top: c.top, right: c.right, borderRadius: 20, padding: '20px 24px', minWidth: 150, animationDelay: `${c.d}s`, animationDuration: '.9s' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: mobile ? 22 : 28, letterSpacing: '-0.02em', color: 'var(--text-heading)' }}>{c.n}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: mobile ? 10 : 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 6 }}>{c.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* scroll cue */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 26, zIndex: 2, color: 'var(--text-faint)', display: 'flex' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14" />
            <path d="M6 13l6 6 6-6" />
          </svg>
        </div>
      </section>
    );
  }

  function SectionHead({ index, kicker, title }) {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 18 }}>{kicker}</div>
          <h2 style={{ font: 'var(--type-h2)', fontSize: 'clamp(32px,4.5vw,56px)', letterSpacing: 'var(--track-tight)', margin: 0, color: 'var(--text-heading)', maxWidth: '20ch' }}>{title}</h2>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-faint)' }}>/ {index}</span>
      </div>
    );
  }

  Object.assign(window, { Nav, Hero, SectionHead });
})();

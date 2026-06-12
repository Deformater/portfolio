// CaseStudy, Achievements, About, Contact — exported to window.
(function () {
  const { useState } = React;
  const NS = 'PortfolioDesignSystem_22735b';

  /* ===== shared glass system (matches the hero Frosted Stack) ===== */
  const frost = {
    background: 'linear-gradient(150deg, rgba(255,255,255,0.11), rgba(255,255,255,0.035) 62%)',
    backdropFilter: 'blur(22px) saturate(1.6)', WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
    border: '1px solid rgba(255,255,255,0.14)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 24px 60px rgba(0,0,0,0.4)',
  };
  // mobile: opaque card with NO backdrop-filter — backdrop-blur on many cards is
  // the single biggest scroll-jank source on phones.
  const frostSolid = {
    background: 'linear-gradient(150deg, rgba(34,37,58,0.9), rgba(16,17,30,0.92) 62%)',
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow: '0 14px 40px rgba(0,0,0,0.45)',
  };
  const gold = { fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--iris-gold)' };

  function Aura({ blobs }) {
    const mobile = window.useMQ(window.MQ_MOBILE);
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {blobs.map((b, i) => (
          <div key={i} style={{ position: 'absolute', borderRadius: '50%', filter: mobile ? 'none' : 'blur(48px)', ...b }} />
        ))}
      </div>
    );
  }
  const violet = (extra) => ({ width: 560, height: 560, background: 'radial-gradient(circle, rgba(150,90,255,0.30), transparent 64%)', ...extra });
  const cyan = (extra) => ({ width: 540, height: 540, background: 'radial-gradient(circle, rgba(110,210,255,0.20), transparent 62%)', ...extra });
  const warm = (extra) => ({ width: 460, height: 460, background: 'radial-gradient(circle, rgba(255,200,120,0.16), transparent 60%)', ...extra });

  function Frost({ children, style, interactive }) {
    const base = window.useMQ(window.MQ_MOBILE) ? frostSolid : frost;
    const hover = e => { if (!interactive) return; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.26)'; };
    const out = e => { if (!interactive) return; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; };
    return (
      <div onMouseEnter={hover} onMouseLeave={out} style={{ ...base, borderRadius: 22, padding: 26, transition: 'transform .35s var(--ease-out), border-color .35s var(--ease-out)', ...style }}>
        {children}
      </div>
    );
  }

  /* ---------------- Case study overlay ---------------- */
  function CaseStudy({ project, onClose }) {
    const { Button, Tag, ShaderField } = window[NS];
    const Icons = window.Icons;
    if (!project) return null;
    const p = project;
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--bg)', overflowY: 'auto', animation: 'csIn .5s var(--ease-glide)' }}>
        <style>{`@keyframes csIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}`}</style>
        <div style={{ position: 'relative', minHeight: 420, overflow: 'hidden', borderBottom: '1px solid var(--line-2)' }}>
          <Aura blobs={[violet({ left: '-6%', top: '-30%' }), cyan({ right: '6%', top: '10%' })]} />
          <div style={{ position: 'absolute', top: 20, left: 'clamp(20px,5vw,48px)', right: 'clamp(20px,5vw,48px)', display: 'flex', justifyContent: 'space-between', zIndex: 3 }}>
            <Button variant="glass" size="sm" icon={<Icons.close />} onClick={onClose}>назад</Button>
            <Tag variant="solid">{p.year}</Tag>
          </div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--container)', margin: '0 auto', padding: '110px clamp(20px,5vw,48px) 50px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 18 }}>{p.category}</div>
              <h1 style={{ font: 'var(--type-h1)', fontSize: 'clamp(38px,5.5vw,72px)', letterSpacing: 'var(--track-tight)', margin: 0, color: 'var(--text-heading)', maxWidth: '14ch' }}>{p.title}</h1>
              <div style={{ marginTop: 20, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 16 }}>{p.role}</div>
              {p.links && (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 26 }}>
                  {p.links.map(([lab, href], i) => (
                    <Button key={href} variant={i === 0 ? 'primary' : 'glass'} size="sm" as="a" href={href} target="_blank" iconRight={<Icons.arrowUR />}>{lab}</Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,48px)' }}>
          <p style={{ font: 'var(--type-h3)', fontSize: 'clamp(22px,2.6vw,34px)', fontWeight: 500, lineHeight: 1.3, color: 'var(--text-body)', maxWidth: '24ch', margin: 0, letterSpacing: '-0.01em' }}>{p.blurb}</p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '36px 0 56px' }}>
            {p.stack.map(s => <Tag key={s} variant="solid">{s}</Tag>)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 16, marginBottom: 64 }}>
            {p.metrics.map(([v, l]) => (
              <Frost key={l} style={{ padding: 'var(--space-6)' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: v.length > 12 ? 'clamp(14px,3.4vw,21px)' : 'clamp(28px,3.2vw,40px)', letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--text-heading)', whiteSpace: v.length > 12 ? 'normal' : 'nowrap', overflowWrap: 'break-word' }}>{v}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 6 }}>{l}</div>
              </Frost>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 30 }}>
            {[['Задача', p.problem], ['Подход', p.approach], ['Результат', p.result]].map(([h, b]) => (
              <div key={h}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--iris-gold)', marginBottom: 14 }}>{h}</div>
                <p style={{ font: 'var(--type-body)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65 }}>{b}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 72, display: 'flex', justifyContent: 'center' }}>
            <Button variant="ghost" icon={<Icons.arrowR />} onClick={onClose}>вернуться к проектам</Button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Achievements ---------------- */
  function Achievements() {
    const Icons = window.Icons;
    const SectionHead = window.SectionHead;
    const mobile = window.useMQ(window.MQ_MOBILE);
    const a = window.PORTFOLIO.achievements, timeline = window.PORTFOLIO.timeline;
    const TYPE = {
      'олимпиада': 'var(--iris-gold)',
      'курс': 'var(--iris-cyan)',
      'работа': 'var(--iris-violet)',
      'проект': 'var(--iris-blue)',
    };
    return (
      <section id="achievements" data-screen-label="Достижения" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', padding: 'var(--section-y) 0' }}>
        <Aura blobs={[violet({ left: '-8%', top: '6%' }), cyan({ right: '-6%', top: '30%' })]} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--container)', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>
          <SectionHead index="02" kicker="Достижения" title={<>Цифры и <em style={gold}>достижения</em></>} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginTop: 56 }}>
            {a.map(([v, l, sub]) => (
              <Frost key={l} interactive style={{ padding: 28 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(30px,3.6vw,46px)', letterSpacing: '-0.02em', color: 'var(--text-heading)' }}>{v}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 8 }}>{l}</div>
                {sub && <div style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>{sub}</div>}
              </Frost>
            ))}
          </div>
          <Frost style={{ marginTop: 20, padding: 'clamp(28px,3.4vw,44px) clamp(18px,2.6vw,30px)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 22px', marginBottom: 'clamp(20px,2.6vw,34px)' }}>
              {Object.entries(TYPE).map(([t, c]) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, boxShadow: `0 0 10px 1px ${c}` }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t}</span>
                </div>
              ))}
            </div>
            {mobile ? (
              /* vertical timeline (mobile) — line on the left, full-width cards; top = earlier, bottom = later */
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 18, top: 0, bottom: 0, width: 1, transform: 'translateX(-0.5px)', background: 'linear-gradient(180deg, transparent, var(--line-strong) 3%, var(--line-strong) 97%, transparent)' }} />
                {timeline.map((e, i) => {
                  const c = TYPE[e.type] || 'var(--iris-gold)';
                  return (
                    <div key={i} style={{ position: 'relative', paddingLeft: 46, paddingBottom: 'clamp(14px,3vw,22px)' }}>
                      <div style={{ position: 'absolute', left: 18, top: 22, transform: 'translate(-50%,-50%)', width: 14, height: 14, borderRadius: '50%', background: c, boxShadow: `0 0 0 4px var(--bg), 0 0 16px 2px ${c}`, zIndex: 2 }} />
                      <div style={{ position: 'absolute', left: 18, top: 22, width: 26, height: 1, transform: 'translateY(-0.5px)', background: `linear-gradient(90deg, ${c}, transparent)` }} />
                      <Frost interactive style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: c }}>{e.year}</span>
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-faint)' }} />
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{e.type}</span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-heading)', marginBottom: 6 }}>{e.place}</div>
                        <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-muted)', overflowWrap: 'anywhere' }}>{e.title}</div>
                      </Frost>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* horizontal timeline (desktop) — original */
              <div style={{ overflowX: 'auto', overflowY: 'hidden', paddingBottom: 6, WebkitOverflowScrolling: 'touch' }}>
                <div style={{ position: 'relative', width: '100%', minWidth: timeline.length * 190, height: 400, display: 'grid', gridTemplateColumns: `repeat(${timeline.length}, minmax(150px,1fr))` }}>
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, transform: 'translateY(-0.5px)', background: 'linear-gradient(90deg, transparent, var(--line-strong) 6%, var(--line-strong) 94%, transparent)' }} />
                  {timeline.map((e, i) => {
                    const up = i % 2 === 0;
                    const c = TYPE[e.type] || 'var(--iris-gold)';
                    return (
                      <div key={i} style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 13, height: 13, borderRadius: '50%', background: c, boxShadow: `0 0 0 4px var(--bg), 0 0 16px 2px ${c}`, zIndex: 2 }} />
                        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-0.5px)', width: 1, height: 28, background: `linear-gradient(${up ? '180deg' : '0deg'}, ${c}, transparent)`, ...(up ? { bottom: '50%' } : { top: '50%' }) }} />
                        <div style={{ position: 'absolute', left: 9, right: 9, ...(up ? { bottom: 'calc(50% + 28px)' } : { top: 'calc(50% + 28px)' }) }}>
                          <Frost interactive style={{ padding: '15px 17px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: c }}>{e.year}</span>
                              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-faint)' }} />
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{e.type}</span>
                            </div>
                            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-heading)', marginBottom: 6 }}>{e.place}</div>
                            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-muted)' }}>{e.title}</div>
                          </Frost>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Frost>
        </div>
      </section>
    );
  }

  /* ---------------- About ---------------- */
  function About() {
    const { Tag } = window[NS];
    const SectionHead = window.SectionHead;
    const stack = window.PORTFOLIO.stack;
    const mobile = window.useMQ(window.MQ_MOBILE);
    return (
      <section id="about" data-screen-label="О себе" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', padding: 'var(--section-y) 0' }}>
        <Aura blobs={[warm({ left: '38%', top: '8%' }), violet({ right: '-8%', bottom: '-10%' })]} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--container)', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>
          <SectionHead index="03" kicker="О себе" title={<>Инженер и <em style={gold}>фаундер</em></>} />
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(260px,360px) 1fr', gap: mobile ? 28 : 'clamp(28px,5vw,64px)', marginTop: mobile ? 36 : 56, alignItems: 'start' }}>
            <Frost style={{ padding: 8, borderRadius: 24, overflow: 'hidden', maxWidth: mobile ? 320 : 'none', margin: mobile ? '0 auto' : 0 }}>
              <img src="assets/portrait.jpg" alt="Григорий Муравенко" loading="lazy" decoding="async" style={{ display: 'block', width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', objectPosition: 'center 16%', borderRadius: 18, background: 'rgba(255,255,255,0.04)' }} />
            </Frost>
            <div>
              <p style={{ font: 'var(--type-h3)', fontSize: 'clamp(20px,2.4vw,30px)', fontWeight: 500, lineHeight: 1.35, color: 'var(--text-body)', margin: 0, letterSpacing: '-0.01em' }}>
                Студент ИТМО и фаундер. Запускаю продукты с нуля — от backend и инфраструктуры до первых <em style={gold}>десятков тысяч</em> пользователей.
              </p>
              <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', marginTop: 22, lineHeight: 1.7, maxWidth: '54ch' }}>
                Работал в Яндексе над ML-инфраструктурой и дата-центрами. Сейчас развиваю собственные B2C продукты с аудиторией 70 000+.
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--iris-gold)', margin: '38px 0 16px' }}>Стек</div>
              <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                {stack.map(s => <Tag key={s} variant="solid">{s}</Tag>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- Contact ---------------- */
  function Contact() {
    const Icons = window.Icons;
    const SectionHead = window.SectionHead;
    return (
      <section id="contact" data-screen-label="Контакт" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', padding: 'var(--section-y) 0' }}>
        <Aura blobs={[violet({ left: '-6%', top: '4%' }), cyan({ right: '4%', top: '26%' }), warm({ right: '20%', bottom: '-16%' })]} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--container)', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>
          <SectionHead index="04" kicker="Контакт" title={<>Давайте <em style={gold}>поговорим</em></>} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28, marginTop: 56, alignItems: 'start' }}>
            <Frost style={{ padding: 'clamp(28px,3.4vw,40px)', display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--ok)', boxShadow: '0 0 12px 2px var(--ok)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>открыт · отвечаю 24/7</span>
              </div>
              <h3 style={{ font: 'var(--type-h3)', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.01em', color: 'var(--text-heading)', margin: 0 }}>
                Хотите запустить проект или <em style={gold}>позвать в команду?</em>
              </h3>
              <p style={{ font: 'var(--type-body)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65, maxWidth: '42ch' }}>
                Я открыт к работе и интересным задачам. Напишите в тг или на почту — отвечаю в течение пары часов, в любой день.
              </p>
            </Frost>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[[<Icons.mail />, 'muravenkog@yandex.ru', 'Почта', 'mailto:muravenkog@yandex.ru'], [<Icons.telegram />, '@Deformater5432', 'Telegram', 'https://t.me/Deformater5432'], [<Icons.github />, 'github.com/Deformater', 'Гитхаб', 'https://github.com/Deformater']].map(([ic, val, lab, href]) => (
                <a key={lab} href={href} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
                  <Frost interactive style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 22 }}>
                    <span style={{ color: 'var(--iris-gold)' }}>{ic}</span>
                    <span style={{ flex: 1 }}>
                      <span style={{ display: 'block', fontSize: 12, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>{lab}</span>
                      <span style={{ display: 'block', color: 'var(--text-body)', fontSize: 16, marginTop: 3 }}>{val}</span>
                    </span>
                    <span style={{ color: 'var(--text-faint)' }}><Icons.arrowUR /></span>
                  </Frost>
                </a>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 'clamp(60px,10vw,120px)', paddingTop: 28, borderTop: '1px solid var(--line-2)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            <span>© 2026 Григорий Муравенко</span>
            <span>Санкт-Петербург · Москва · удалённо</span>
          </div>
        </div>
      </section>
    );
  }

  Object.assign(window, { CaseStudy, Achievements: React.memo(Achievements), About: React.memo(About), Contact: React.memo(Contact) });
})();

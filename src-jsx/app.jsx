// Root app — wires nav, sections, and the case-study overlay.
(function () {
  const { useState, useEffect } = React;

  function App() {
    const [active, setActive] = useState('home');
    const [openProject, setOpenProject] = useState(null);
    const projects = window.PORTFOLIO.projects;
    const featured = projects[0];

    const nav = id => {
      setActive(id);
      if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 10, behavior: 'smooth' });
    };

    // scroll-spy (rAF-throttled, only re-renders on a real change)
    useEffect(() => {
      const ids = ['projects', 'achievements', 'about', 'contact'];
      let cur = 'home', ticking = false;
      const compute = () => {
        ticking = false;
        const y = window.scrollY + 120;
        let next = 'home';
        for (const id of ids) { const el = document.getElementById(id); if (el && el.offsetTop <= y) next = id; }
        if (next !== cur) { cur = next; setActive(next); }
      };
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(compute); } };
      window.addEventListener('scroll', onScroll, { passive: true }); compute();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // lock scroll under overlay
    useEffect(() => {
      document.body.style.overflow = openProject ? 'hidden' : '';
    }, [openProject]);

    return (
      <>
        <window.Nav onNav={nav} active={active} />
        <main>
          <window.Hero onOpen={setOpenProject} featured={featured} />
          <window.Projects3D onOpen={setOpenProject} />
          <window.Achievements />
          <window.About />
          <window.Contact />
        </main>
        <window.CaseStudy project={openProject} onClose={() => setOpenProject(null)} />
      </>
    );
  }

  // Mount once, only on this page. The DS bundle also contains a compiled
  // copy of this file whose guard still looks for "app.jsx"; since this page
  // loads the precompiled "app.js" instead, that bundled copy stays dormant
  // and only this entry mounts (no double-createRoot).
  function mount() {
    if (!document.querySelector('script[src*="app.js"]')) return; // not the kit page
    const ready = window.Cursor && window.Nav && window.Hero && window.Projects3D &&
      window.Achievements && window.About && window.Contact && window.CaseStudy && window.THREE && window.UnrealBloomPass;
    if (!ready) { requestAnimationFrame(mount); return; }
    if (!window.__kitRoot) window.__kitRoot = ReactDOM.createRoot(document.getElementById('root'));
    window.__kitRoot.render(<App />);
  }
  mount();
})();

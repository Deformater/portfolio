// Projects3D — three big, angular, transparent glass crystals scattered
// on one screen (zigzag: upper-left / right / lower-left). Dark faceted
// glass with chromatic dispersion + bloom. They float gently and fade in
// as the section enters view. Hover a crystal → it glows gold and its
// project name appears; click opens the case study.
// Needs window.THREE + window.{EffectComposer,RenderPass,UnrealBloomPass}.
(function () {
  const { useRef, useEffect } = React;
  const SectionHead = window.SectionHead;

  // Each crystal centres (wy≈0) at its scroll moment `cp`. They sit at
  // 0.30 / 0.52 / 0.72 and fully clear the screen before the sticky canvas
  // pins/unpins, so the canvas edge never slices a crystal. Blue is set a
  // bit further from gold. K below controls the vertical spacing.
  // cps kept early enough that the LAST crystal fully clears the top of the
  // canvas (wy > edge+fadeBand) before the sticky range ends (prog→1), so the
  // unpinning canvas edge never slices a crystal. With K=25 a crystal clears
  // ~0.31 of prog after its cp, so the last cp must stay below ~0.65.
  const LAYOUT = [
    { x: -4.2, cp: 0.08, s: 2.4, att: 0xffe08a, emi: 0x2a1c00, disp: 9, seed: 1, rot: 0.5 },   // gold
    { x: 4.1, cp: 0.30, s: 2.5, att: 0x6aa0ff, emi: 0x001230, disp: 11, seed: 5, rot: -0.4 },   // sapphire
    { x: -3.6, cp: 0.52, s: 2.3, att: 0xc888ff, emi: 0x180030, disp: 13, seed: 9, rot: 0.9 },   // violet
  ];

  function Projects3D({ onOpen }) {
    const projects = window.PORTFOLIO.projects;
    const mountRef = useRef(null);
    const stageRef = useRef(null);
    const labelRefs = useRef([]);
    const openRef = useRef(onOpen);
    openRef.current = onOpen;
    const mobile = window.useMQ(window.MQ_MOBILE);

    // mobile: make the page snap one crystal per screen while Projects is in view
    useEffect(() => {
      if (!mobile) return;
      const el = document.documentElement;
      const prev = el.style.scrollSnapType;
      el.style.scrollSnapType = 'y proximity';
      return () => { el.style.scrollSnapType = prev; };
    }, [mobile]);

    useEffect(() => {
      const THREE = window.THREE;
      if (!THREE || !window.UnrealBloomPass) return;
      const mount = mountRef.current;
      let W = mount.clientWidth, H = mount.clientHeight;
      // On portrait / narrow viewports the wide x-spread (±4) pushes the
      // crystals off the orthographic frustum, so center them (x→0) and shrink
      // a touch — each then rises through the middle one at a time on scroll.
      const narrow = window.matchMedia(window.MQ_MOBILE).matches;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
      renderer.setSize(W, H);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.75;
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.display = 'block';

      const scene = new THREE.Scene();
      let halfH = 5, halfW = halfH * (W / H);
      const camera = new THREE.OrthographicCamera(-halfW, halfW, halfH, -halfH, -50, 50);
      camera.position.z = 10;

      // env: studio panels on dark navy → rich caustics inside the glass
      const ec = document.createElement('canvas'); ec.width = 512; ec.height = 256;
      const ex = ec.getContext('2d');
      const gr = ex.createLinearGradient(0, 0, 0, 256);
      gr.addColorStop(0, '#1a2236'); gr.addColorStop(0.5, '#0a0e1c'); gr.addColorStop(1, '#04060e');
      ex.fillStyle = gr; ex.fillRect(0, 0, 512, 256);
      const spot = (x, y, r, c) => { const rg = ex.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, c); rg.addColorStop(1, 'rgba(0,0,0,0)'); ex.fillStyle = rg; ex.fillRect(0, 0, 512, 256); };
      spot(150, 70, 120, 'rgba(255,255,255,1)'); spot(380, 90, 110, 'rgba(230,240,255,0.95)'); spot(256, 180, 120, 'rgba(255,250,255,0.8)');
      spot(110, 60, 30, 'rgba(255,255,255,1)'); spot(420, 80, 30, 'rgba(255,255,255,1)'); spot(256, 150, 26, 'rgba(255,255,255,1)');
      const envTex = new THREE.CanvasTexture(ec);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromEquirectangular(envTex);
      scene.environment = envRT.texture;
      pmrem.dispose(); envTex.dispose();

      // organic surface noise → normal map (natural frosted ripples)
      const nc = document.createElement('canvas'); nc.width = 256; nc.height = 256;
      const nx = nc.getContext('2d'); const nid = nx.createImageData(256, 256);
      for (let i = 0; i < nid.data.length; i += 4) { const vv = 128 + (Math.random() - 0.5) * 90; nid.data[i] = vv; nid.data[i + 1] = vv; nid.data[i + 2] = 255; nid.data[i + 3] = 255; }
      nx.putImageData(nid, 0, 0);
      const noiseTex = new THREE.CanvasTexture(nc);
      noiseTex.wrapS = noiseTex.wrapT = THREE.RepeatWrapping; noiseTex.repeat.set(3, 3);

      scene.add(new THREE.AmbientLight(0x202840, 0.4));
      const key = new THREE.DirectionalLight(0xffffff, 2.0); key.position.set(3, 4, 6); scene.add(key);

      function crystalGeo(seed) {
        const g = new THREE.IcosahedronGeometry(1, 0);
        const pos = g.attributes.position, v = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
          v.fromBufferAttribute(pos, i);
          const a = Math.sin(v.x * 1.4 + seed * 1.3) * Math.cos(v.y * 1.6 - seed) + Math.sin(v.z * 1.3 + seed * 2.1);
          v.multiplyScalar(0.86 + 0.18 * a);
          pos.setXYZ(i, v.x, v.y, v.z);
        }
        g.computeVertexNormals();
        return g;
      }

      const geoms = [], meshes = [];
      projects.forEach((proj, i) => {
        const L = LAYOUT[i % LAYOUT.length];
        // mobile: a cheap reflective/translucent gem — NO transmission and NO
        // bloom. Real-time glass transmission re-renders the scene every frame and
        // is what lagged; a standard material with env reflections is ~free.
        const mat = narrow
          ? new THREE.MeshStandardMaterial({
              color: new THREE.Color(L.att), metalness: 0, roughness: 0.18,
              emissive: new THREE.Color(L.att),
              envMapIntensity: 2.4, transparent: true, opacity: 0,
              side: THREE.DoubleSide, flatShading: true,
            })
          : new THREE.MeshPhysicalMaterial({
              transmission: 1.0, thickness: 0.85, roughness: 0.04, metalness: 0,
              ior: 1.55, dispersion: L.disp,
              clearcoat: 1.0, clearcoatRoughness: 0.04, color: 0xffffff,
              specularIntensity: 1.4, specularColor: 0xffffff,
              emissive: new THREE.Color(L.emi), emissiveIntensity: 1.0,
              attenuationColor: new THREE.Color(L.att), attenuationDistance: 1.7,
              envMapIntensity: 3.4, normalMap: noiseTex, normalScale: new THREE.Vector2(0.09, 0.09),
              transparent: true, opacity: 0, side: THREE.DoubleSide, flatShading: true,
            });
        const geo = crystalGeo(L.seed); geoms.push(geo);
        const mesh = new THREE.Mesh(geo, mat);
        const sc = L.s * (narrow ? 0.72 : 1);
        const mx = narrow ? 0 : L.x;
        // mobile: space crystals exactly one screen apart → vertical snap-slider
        const cp = narrow ? i / projects.length : L.cp;
        mesh.position.set(mx, 0, 0);
        mesh.scale.set(sc, sc * 1.08, sc * 0.92);
        mesh.rotation.set(0.2, L.rot, L.rot * 0.3);
        mesh.userData = { proj, i, phase: i * 2.0, rs: (i % 2 ? -1 : 1) * 0.12, baseS: sc, hov: 0, app: 0, x: mx, cp: cp };
        scene.add(mesh); meshes.push(mesh);
      });

      // bloom composer — desktop only. On mobile we render the scene directly
      // (no post-processing passes), so there is no per-frame bloom cost.
      let composer = null;
      if (!narrow) {
        composer = new window.EffectComposer(renderer);
        composer.addPass(new window.RenderPass(scene, camera));
        const bloom = new window.UnrealBloomPass(new THREE.Vector2(W, H), 0.85, 0.5, 0.7);
        composer.addPass(bloom);
        composer.setSize(W, H);
      }

      // interaction
      const ray = new THREE.Raycaster();
      const ndc = new THREE.Vector2(-2, -2);
      let hovered = -1;
      const onMove = e => {
        const r = renderer.domElement.getBoundingClientRect();
        ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      };
      const onLeave = () => { ndc.set(-2, -2); };
      const onClick = () => {
        if (narrow) {
          // no hover on touch — tap opens whichever crystal is centered now
          let best = -1, bd = 1e9;
          meshes.forEach(m => { const u = m.userData; if (u.app > 0.4 && Math.abs(u.wy || 0) < bd) { bd = Math.abs(u.wy || 0); best = u.i; } });
          if (best >= 0) openRef.current(projects[best]);
          return;
        }
        if (hovered >= 0) openRef.current(projects[hovered]);
      };
      renderer.domElement.addEventListener('pointermove', onMove);
      renderer.domElement.addEventListener('pointerleave', onLeave);
      renderer.domElement.addEventListener('click', onClick);

      // scroll progress through the (tall) stage → drifts crystals so you
      // scroll a little to move from one to the next
      let reveal = 0, prog = 0;
      const computeReveal = () => {
        const stage = stageRef.current; if (!stage) return;
        const rect = stage.getBoundingClientRect();
        const vh = window.innerHeight;
        reveal = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.7)));
        const span = rect.height - vh;
        prog = span > 0 ? Math.max(0, Math.min(1, -rect.top / span)) : 0;
      };
      let revTick = false;
      const onScroll = () => { if (!revTick) { revTick = true; requestAnimationFrame(() => { revTick = false; computeReveal(); }); } };
      window.addEventListener('scroll', onScroll, { passive: true });
      computeReveal();

      const clock = new THREE.Clock();
      let raf = 0, running = false, lastRender = 0;
      const tmp = new THREE.Vector3();
      function frame() {
        // mobile: cap the expensive glass-transmission + bloom pipeline to ~30fps
        if (narrow) { const now = performance.now(); if (now - lastRender < 33) { raf = requestAnimationFrame(frame); return; } lastRender = now; }
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;
        // Recompute scroll progress LIVE every frame (not just on throttled
        // scroll events) so `prog`/`reveal` can never lag behind a fast or
        // smooth scroll — a stale value is what let the canvas edge slice a
        // still-opaque crystal.
        computeReveal();
        const cRect = renderer.domElement.getBoundingClientRect();

        // hover pick — only raycast when the pointer is actually over the
        // canvas (ndc starts at -2,-2 = off-canvas). Skipping it otherwise
        // avoids a full scene raycast on every animation frame.
        let nh = -1;
        if (ndc.x >= -1 && ndc.x <= 1 && ndc.y >= -1 && ndc.y <= 1) {
          ray.setFromCamera(ndc, camera);
          const hits = ray.intersectObjects(meshes.filter(m => m.userData.app > 0.4), false);
          nh = hits.length ? hits[0].object.userData.i : -1;
        }
        if (nh !== hovered) { hovered = nh; renderer.domElement.style.cursor = nh >= 0 ? 'pointer' : 'default'; }

        const K = narrow ? 10 * projects.length : 25;
        const lift = narrow ? 1.3 : 0;   // mobile: raise crystals above centre so the label sits higher
        // Fade the WHOLE canvas out near the pinned-range boundaries (tracks
        // scroll exactly, every frame — no animation lag). This guarantees the
        // canvas is transparent the instant it pins/unpins, so the moving
        // canvas edge can never show a clipped crystal, no matter where the
        // crystals happen to be.
        // No whole-canvas darkening envelope — each crystal fades itself at the
        // edges (per-mesh `vis` below), so nothing dims the middle of the scene.
        // ONE exception: kill canvas opacity across the very tail of the pinned
        // range (prog 0.86→0.96). By then every crystal has already faded out via
        // its own `cp` logic, so this dims nothing visible — it only guarantees
        // the canvas is fully transparent before it un-pins, so the rising next
        // section can never slice a crystal that a fast scroll left half-faded.
        const tailKill = Math.max(0, Math.min(1, (0.96 - prog) / 0.10));
        renderer.domElement.style.opacity = (Math.min(1, reveal * 1.4) * tailKill).toFixed(3);

        meshes.forEach(m => {
          const u = m.userData;
          // crystal rises through centre as scroll passes its moment cp.
          // wy < 0 → below centre (entering from the BOTTOM); wy > 0 → above.
          const wy = (prog - u.cp) * K;
          u.wy = wy;
          // Each crystal fades only as its own centre slides past the top/bottom
          // edge; the whole-canvas envelope above handles the pin boundaries.
          const edge = 5.6, fadeBand = 2.2;
          const vis = Math.max(0, Math.min(1, (edge + fadeBand - Math.abs(wy)) / fadeBand));
          // Fade IN gently, but fade OUT fast — a crystal leaving the scene
          // snaps to invisible so it can never be caught half-opaque by the
          // un-pinning canvas edge on a quick scroll.
          const k = vis < u.app ? 0.5 : 0.14;
          u.app += (vis - u.app) * k;
          // hover glow
          const ht = (u.i === hovered) ? 1 : 0;
          u.hov += (ht - u.hov) * 0.12;

          m.material.opacity = narrow ? u.app * 0.78 : u.app;        // mobile gem stays translucent
          m.material.emissiveIntensity = narrow ? (0.5 + u.hov * 0.6) : (1.0 + u.hov * 1.8);
          m.material.envMapIntensity = narrow ? (1.7 + u.hov * 1.2) : (3.4 + u.hov * 2.2);

          const float = Math.sin(t * 0.5 + u.phase) * 0.16;
          m.position.y = wy + float + lift;
          const s = u.baseS * (1 + u.hov * 0.05);
          m.scale.set(s, s * 1.08, s * 0.92);
          m.rotation.y += dt * u.rs;
          m.rotation.x = 0.2 + Math.sin(t * 0.3 + u.phase) * 0.08;

          // label goes to the side OPPOSITE the crystal (where the space is):
          // crystal on the left (x<0) → label on the right, and vice-versa —
          // so they alternate in the same zig-zag rhythm as the crystals.
          tmp.set(u.x, wy + lift, 0).project(camera);
          const sx = (tmp.x * 0.5 + 0.5) * cRect.width;
          const sy = (-tmp.y * 0.5 + 0.5) * cRect.height;
          const ppu = cRect.width / (2 * halfW);            // px per world unit
          const crystalHalfPx = ppu * (u.baseS * 1.5);      // ~crystal half-width
          const labelW = 300, gap = 36;
          const lab = labelRefs.current[u.i];
          if (lab) {
            if (narrow) {
              // centered under the crystal; shown when this crystal is the one
              // in the middle of the screen (there is no hover on touch).
              lab.style.textAlign = 'center';
              const ly = sy + (u.baseS * 1.2) * ppu + 18;
              lab.style.transform = `translate(-50%,0) translate(${sx}px, ${ly}px)`;
              const centered = Math.max(0, Math.min(1, 1 - Math.abs(wy) / 2.4));
              lab.style.opacity = (u.app * centered).toFixed(3);
            } else if (u.x < 0) {                            // crystal left → label right
              let lx = sx + crystalHalfPx + gap;
              lx = Math.min(cRect.width - labelW - 28, lx);
              lab.style.textAlign = 'left';
              lab.style.transform = `translate(0,-50%) translate(${lx}px, ${sy}px)`;
              lab.style.opacity = (u.hov * u.app).toFixed(3);
            } else {                                          // crystal right → label left
              let lx = sx - crystalHalfPx - gap;
              lx = Math.max(labelW + 28, lx);
              lab.style.textAlign = 'right';
              lab.style.transform = `translate(-100%,-50%) translate(${lx}px, ${sy}px)`;
              lab.style.opacity = (u.hov * u.app).toFixed(3);
            }
          }
        });

        if (narrow) renderer.render(scene, camera); else composer.render();
        raf = requestAnimationFrame(frame);
      }

      // The glass-transmission + bloom pipeline is expensive; only run it
      // while the projects section is actually on-screen and the tab is
      // visible. Off-screen it stays completely idle.
      let onScreen = false;
      const play = () => { if (!running && onScreen && !document.hidden) { running = true; clock.getDelta(); raf = requestAnimationFrame(frame); } };
      // When the loop stops, force the canvas fully transparent so a paused
      // (frozen) frame can never be left on-screen to be clipped by the
      // unpinning edge. It repaints with the correct fade the moment it resumes.
      const pause = () => { running = false; if (raf) { cancelAnimationFrame(raf); raf = 0; } renderer.domElement.style.opacity = '0'; };
      // Generous rootMargin keeps the loop alive while the section is anywhere
      // near the viewport, so the pin/unpin sweep is always rendered with the
      // live fade instead of pausing mid-transition.
      const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; onScreen ? play() : pause(); }, { threshold: 0, rootMargin: '25% 0px 25% 0px' });
      io.observe(mount);
      const onVis = () => (document.hidden ? pause() : play());
      document.addEventListener('visibilitychange', onVis);

      const onResize = () => {
        W = mount.clientWidth; H = mount.clientHeight;
        renderer.setSize(W, H); if (composer) composer.setSize(W, H);
        halfW = halfH * (W / H);
        camera.left = -halfW; camera.right = halfW; camera.top = halfH; camera.bottom = -halfH;
        camera.updateProjectionMatrix();
        computeReveal();
      };
      window.addEventListener('resize', onResize);

      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('scroll', onScroll);
        renderer.domElement.removeEventListener('pointermove', onMove);
        renderer.domElement.removeEventListener('pointerleave', onLeave);
        renderer.domElement.removeEventListener('click', onClick);
        composer && composer.dispose && composer.dispose();
        renderer.dispose();
        meshes.forEach(m => m.material.dispose());
        geoms.forEach(g => g.dispose());
        envRT.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    }, []);

    return (
      <section id="projects" data-screen-label="Проекты" style={{ position: 'relative', background: 'var(--bg)', overflow: 'clip' }}>
        <div style={{ position: 'relative', zIndex: 3, maxWidth: 'var(--container)', margin: '0 auto', padding: 'clamp(56px,8vw,104px) clamp(20px,5vw,48px) 0', pointerEvents: 'none' }}>
          <SectionHead index="01" kicker="Проекты — Labs" title={<>Каждый кристалл — <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--iris-gold)' }}>проект</em></>} />
        </div>

        {/* tall stage → sticky canvas pinned while you scroll through the crystals.
            mobile: one 100vh screen per crystal (+1 trailing screen) for a snap-slider. */}
        <div ref={stageRef} style={mobile
          ? { position: 'relative', height: `${(projects.length + 1) * 100}vh` }
          : { position: 'relative', height: '165vh', marginTop: '-12vh' }}>
          <div ref={mountRef} style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', zIndex: 1 }} />
          <div style={{ position: 'sticky', top: 0, height: '100vh', marginTop: '-100vh', zIndex: 2, pointerEvents: 'none' }}>
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={el => (labelRefs.current[i] = el)}
                style={{ position: 'absolute', top: 0, left: 0, width: 300, opacity: 0, textAlign: 'right', transition: 'opacity .2s linear', willChange: 'transform,opacity' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--iris-gold)' }}>
                  {String(i + 1).padStart(2, '0')} · {p.category}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(24px,2.6vw,34px)', letterSpacing: '-0.01em', color: 'var(--text-heading)', marginTop: 8, textShadow: '0 2px 24px rgba(4,6,14,0.95)' }}>
                  {p.title}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.5, color: 'var(--text-secondary)', marginTop: 12, textShadow: '0 1px 14px rgba(4,6,14,0.9)' }}>
                  {p.blurb}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-heading)', marginTop: 14 }}>открыть проект →</div>
              </div>
            ))}
          </div>
          {/* mobile: one full-screen snap target per crystal (the +1 buffer screen has none) */}
          {mobile && projects.map((p, i) => (
            <div key={'snap' + i} aria-hidden style={{ position: 'absolute', left: 0, right: 0, top: `${i * 100}vh`, height: '100vh', scrollSnapAlign: 'center', pointerEvents: 'none' }} />
          ))}
        </div>
      </section>
    );
  }

  window.Projects3D = React.memo(Projects3D);
})();

/* @ds-bundle: {"format":3,"namespace":"PortfolioDesignSystem_22735b","components":[{"name":"Crystal","sourcePath":"components/brand/Crystal.jsx"},{"name":"ShaderField","sourcePath":"components/brand/ShaderField.jsx"},{"name":"ProjectCard","sourcePath":"components/cards/ProjectCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"GlassCard","sourcePath":"components/core/GlassCard.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/brand/Crystal.jsx":"578988985c20","components/brand/ShaderField.jsx":"6e1f64366eeb","components/cards/ProjectCard.jsx":"53055e1e9a4b","components/core/Button.jsx":"605eedb2cad6","components/core/GlassCard.jsx":"669585529fd7","components/core/IconButton.jsx":"206bff16574c","components/core/Input.jsx":"457f7fa48c01","components/core/Tag.jsx":"abb2660e007c","design-canvas.jsx":"bd8746af6e58","ui_kits/portfolio/app.jsx":"bb897a8f9eef","ui_kits/portfolio/crystals3d.jsx":"bfddb6f43a36","ui_kits/portfolio/cursor.jsx":"234b3d8697e6","ui_kits/portfolio/data.js":"6ce7bc019461","ui_kits/portfolio/image-slot.js":"9309434cb09c","ui_kits/portfolio/screens-more.jsx":"b3d2e8179c6d","ui_kits/portfolio/screens-top.jsx":"f9345b0ac008"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PortfolioDesignSystem_22735b = window.PortfolioDesignSystem_22735b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Crystal.jsx
try { (() => {
/**
 * Crystal — iridescent faceted gem. Each crystal represents a project
 * in the «Проекты» (Labs) section. Pure CSS facets + chromatic edges,
 * slow float/rotate. Pass a `seed` to vary the cut.
 */
function Crystal({
  size = 220,
  seed = 0,
  floating = true,
  glow = true,
  style = {},
  className = ''
}) {
  const cuts = ['polygon(50% 0%, 78% 22%, 92% 60%, 62% 100%, 38% 100%, 8% 58%, 24% 20%)', 'polygon(50% 0%, 85% 30%, 72% 72%, 50% 100%, 24% 76%, 14% 34%)', 'polygon(46% 0%, 82% 18%, 96% 54%, 70% 96%, 30% 100%, 6% 50%, 18% 16%)', 'polygon(50% 2%, 74% 14%, 94% 46%, 80% 86%, 44% 100%, 12% 70%, 20% 28%)'];
  const clip = cuts[seed % cuts.length];
  const rot = seed * 37 % 40 - 20;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: size,
      height: size * 1.15,
      position: 'relative',
      animation: floating ? `crystalFloat ${7 + seed % 4}s var(--ease-in-out, ease-in-out) infinite` : 'none',
      filter: glow ? 'drop-shadow(0 18px 40px rgba(176,107,255,0.35))' : 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      transform: `rotate(${rot}deg)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      clipPath: clip,
      background: 'conic-gradient(from 120deg, #7ee0ff, #b06bff 25%, #ff7ec2 45%, #ffd98a 60%, #7a6bff 80%, #7ee0ff)',
      opacity: 0.92
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      clipPath: clip,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.55), transparent 40%, rgba(0,0,0,0.35) 100%)',
      mixBlendMode: 'overlay'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      clipPath: clip,
      background: 'linear-gradient(70deg, transparent 44%, rgba(255,255,255,0.6) 50%, transparent 56%)',
      mixBlendMode: 'screen',
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      clipPath: clip,
      boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.45)'
    }
  })), /*#__PURE__*/React.createElement("style", null, `@keyframes crystalFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}`));
}
Object.assign(__ds_scope, { Crystal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Crystal.jsx", error: String((e && e.message) || e) }); }

// components/brand/ShaderField.jsx
try { (() => {
const {
  useRef,
  useEffect
} = React;
/**
 * ShaderField — the signature background. A slow, always-alive marbled
 * flow (domain-warped FBM) in deep red / blue / teal on near-black.
 * The pointer gently bends the current near it — no rings, no trails.
 */
function ShaderField({
  intensity = 1,
  brightness = 1,
  baseColor = [0.020, 0.014, 0.045],
  interactive = true,
  className = '',
  style = {}
}) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: true
    });
    if (!gl) return;
    const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }`;
    const fs = `
      precision highp float;
      uniform vec2 u_res; uniform float u_time;
      uniform vec2 u_mouse; uniform float u_mAmt;
      uniform float u_bright; uniform vec3 u_base;

      float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
      float noise(vec2 p){ vec2 i=floor(p),f=fract(p);
        float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));
        vec2 u=f*f*(3.-2.*f); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
      float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.02+vec2(1.7); a*=.5;} return v; }

      void main(){
        vec2 uv=gl_FragCoord.xy/u_res.xy; float asp=u_res.x/u_res.y;
        vec2 p=vec2(uv.x*asp,uv.y);
        float t=u_time*0.06;

        // gentle pointer push: bend the field outward near the cursor
        vec2 md=p-vec2(u_mouse.x*asp,u_mouse.y);
        float mi=exp(-dot(md,md)*2.2)*u_mAmt;
        p+=normalize(md+1e-4)*mi*0.16;

        // domain warping → smooth marbled current
        vec2 p2=p*2.1;
        vec2 q=vec2(fbm(p2 + vec2(0.0,t)), fbm(p2 + vec2(5.2,1.3) - t*0.7));
        vec2 r=vec2(fbm(p2 + 2.4*q + vec2(1.7,9.2) + 0.15*t),
                    fbm(p2 + 2.4*q + vec2(8.3,2.8) - 0.12*t));
        float f=fbm(p2 + 2.6*r);

        // palette: near-black → indigo → crimson → teal filaments
        vec3 deep   = u_base;
        vec3 indigo = vec3(0.10,0.13,0.42);
        vec3 crim   = vec3(0.60,0.10,0.20);
        vec3 teal   = vec3(0.10,0.48,0.52);

        vec3 col = deep;
        col = mix(col, indigo, smoothstep(0.30,0.72,f));
        col = mix(col, crim,   smoothstep(0.40,0.74,r.x));
        col = mix(col, teal,   smoothstep(0.55,0.82,r.y)*0.7);

        // soft luminous filaments riding the flow
        float bn = (r.x - r.y)*8.0 + f*6.0;
        float fil = pow(1.0 - abs(sin(bn)), 4.5);
        vec3 filCol = mix(crim*1.6, teal*1.5, smoothstep(0.2,0.8,r.y));
        col += filCol * fil * 0.6;

        // brighten subtly toward the cursor
        col += (crim*0.6+teal*0.4) * mi * 0.55;

        col *= u_bright;
        gl_FragColor=vec4(col,1.0);
      }`;
    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(prog, n);
    const uRes = U('u_res'),
      uTime = U('u_time'),
      uMouse = U('u_mouse'),
      uMAmt = U('u_mAmt'),
      uBright = U('u_bright'),
      uBase = U('u_base');

    // This is a soft, low-frequency marbled background — it reads identically
    // at a reduced internal resolution, so render at ~0.7x device pixels (and
    // never above 1x DPR). Big GPU saving for a 5x-FBM fragment shader.
    const RENDER_SCALE = 0.7;
    let DPR = Math.min(window.devicePixelRatio || 1, 1) * RENDER_SCALE,
      raf = 0;
    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 1) * RENDER_SCALE;
      const w = canvas.clientWidth || window.innerWidth,
        h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.max(1, Math.round(w * DPR));
      canvas.height = Math.max(1, Math.round(h * DPR));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // smoothed pointer (single point — no trail)
    let tx = 0.5,
      ty = 0.5,
      mx = 0.5,
      my = 0.5,
      tAmt = 0,
      amt = 0;
    const onMove = e => {
      const rect = canvas.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width;
      ty = 1.0 - (e.clientY - rect.top) / rect.height;
      tAmt = 1;
    };
    const onLeave = () => {
      tAmt = 0;
    };
    if (interactive) {
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerdown', onMove);
      document.addEventListener('pointerleave', onLeave);
    }
    const start = performance.now();
    let running = false,
      lastDraw = 0;
    const FRAME_MS = 1000 / 30; // the flow is very slow — 30fps is plenty
    const frame = now => {
      raf = requestAnimationFrame(frame);
      if (now - lastDraw < FRAME_MS) return;
      lastDraw = now;
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      amt += (tAmt - amt) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uMAmt, amt);
      gl.uniform1f(uBright, brightness * intensity);
      gl.uniform3fv(uBase, baseColor);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Only animate while the canvas is on-screen AND the tab is visible.
    // Two full-screen WebGL fields running off-screen is what makes the
    // page crawl — this stops them the moment they're not needed.
    let onScreen = false;
    const play = () => {
      if (!running && onScreen && !document.hidden) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    const pause = () => {
      running = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      onScreen ? play() : pause();
    }, {
      threshold: 0
    });
    io.observe(canvas);
    const onVis = () => document.hidden ? pause() : play();
    document.addEventListener('visibilitychange', onVis);
    return () => {
      pause();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', resize);
      if (interactive) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onMove);
        document.removeEventListener('pointerleave', onLeave);
      }
    };
  }, [intensity, brightness, interactive]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: className,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      display: 'block',
      ...style
    }
  });
}
Object.assign(__ds_scope, { ShaderField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ShaderField.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — pill-shaped action. Iridescent-fill `primary`, frosted
 * `glass`, outline `ghost`, and inline `link`.
 */
function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  icon,
  iconRight,
  disabled = false,
  full = false,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '9px 16px',
      font: '13px'
    },
    md: {
      padding: '14px 24px',
      font: '15px'
    },
    lg: {
      padding: '17px 30px',
      font: '16px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--grad-iris)',
      color: 'var(--text-on-accent)',
      border: '1px solid transparent',
      fontWeight: 600
    },
    glass: {
      background: 'var(--glass-bg)',
      color: 'var(--text-body)',
      border: '1px solid var(--glass-border)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      fontWeight: 600
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid var(--line-strong)',
      fontWeight: 500
    },
    link: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: 'none',
      padding: 0,
      fontWeight: 500,
      borderBottom: '1px solid var(--line-strong)',
      borderRadius: 0
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    fontFamily: 'var(--font-sans)',
    fontSize: sizes[size].font,
    padding: variant === 'link' ? 0 : sizes[size].padding,
    borderRadius: variant === 'link' ? 0 : 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    width: full ? '100%' : 'auto',
    transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...variants[variant],
    ...style
  };
  const hover = e => {
    if (disabled) return;
    if (variant === 'primary') {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-glow-iris)';
    } else if (variant === 'glass' || variant === 'ghost') e.currentTarget.style.background = 'var(--glass-bg-hover)';
  };
  const out = e => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
    if (variant === 'glass') e.currentTarget.style.background = 'var(--glass-bg)';
    if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
  };
  const Tag = as === 'a' ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    disabled: as === 'a' ? undefined : disabled,
    style: base,
    onMouseEnter: hover,
    onMouseLeave: out
  }, rest), icon, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/GlassCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * GlassCard — the base frosted surface: translucent fill, hairline
 * border, backdrop blur, inset top highlight. Lifts on hover when
 * `interactive`.
 */
function GlassCard({
  interactive = false,
  padding = 'var(--space-5)',
  radius = 'var(--radius-lg)',
  children,
  style = {},
  ...rest
}) {
  const hover = e => {
    if (!interactive) return;
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.borderColor = 'rgba(176,107,255,0.45)';
  };
  const out = e => {
    if (!interactive) return;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = 'var(--glass-border)';
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: hover,
    onMouseLeave: out,
    style: {
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
      borderRadius: radius,
      padding,
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      boxShadow: 'var(--glass-highlight), var(--shadow-card)',
      transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/GlassCard.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — round, hairline-bordered control holding a single icon
 * (arrow, bookmark, etc). Pass the icon as children.
 */
function IconButton({
  size = 38,
  label,
  children,
  style = {},
  ...rest
}) {
  const hover = e => {
    e.currentTarget.style.background = 'var(--glass-bg-hover)';
    e.currentTarget.style.borderColor = 'var(--border-glass-strong)';
  };
  const out = e => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.borderColor = 'var(--glass-border)';
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    onMouseEnter: hover,
    onMouseLeave: out,
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--glass-border)',
      background: 'transparent',
      color: 'var(--text-body)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'var(--transition-base)',
      flex: '0 0 auto',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Input — frosted text field with floating-ish label. Used on the
 * contact form. Supports `multiline`.
 */
function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  multiline = false,
  rows = 4,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const shared = {
    width: '100%',
    background: 'var(--glass-bg)',
    border: `1px solid ${focus ? 'rgba(176,107,255,0.6)' : 'var(--glass-border)'}`,
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-body)',
    font: 'var(--type-body)',
    fontSize: 16,
    padding: '13px 15px',
    outline: 'none',
    resize: 'vertical',
    backdropFilter: 'var(--glass-blur)',
    WebkitBackdropFilter: 'var(--glass-blur)',
    transition: 'border-color var(--dur-base) var(--ease-out)',
    boxSizing: 'border-box'
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--type-label)',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 8
    }
  }, label), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: shared
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: shared
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — small pill label (e.g. "видео", "react", category chips).
 * `outline` is the default Noomo-style hairline pill; `accent` fills
 * with the iridescent gradient.
 */
function Tag({
  variant = 'outline',
  children,
  style = {},
  ...rest
}) {
  const variants = {
    outline: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid var(--glass-border)'
    },
    solid: {
      background: 'var(--surface-glass)',
      color: 'var(--text-body)',
      border: '1px solid var(--glass-border)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)'
    },
    accent: {
      background: 'var(--grad-iris)',
      color: 'var(--text-on-accent)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: 'var(--type-label)',
      fontSize: 11,
      letterSpacing: '0.02em',
      padding: '5px 11px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProjectCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ArrowUR = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  width: "17",
  height: "17",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.6"
}, /*#__PURE__*/React.createElement("path", {
  d: "M7 17 17 7M9 7h8v8"
}));
const Bookmark = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  width: "17",
  height: "17",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.6"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6 4h12v16l-6-4-6 4z"
}));

/**
 * ProjectCard — the Noomo-style project tile: a tall media panel with a
 * type pill, ELEMENT/category + name overlaid bottom-left, and
 * arrow/bookmark actions bottom-right. Defaults to a Crystal as media;
 * pass `media` (e.g. an <img> or <ShaderField/>) to override.
 */
function ProjectCard({
  category = 'Element',
  title,
  tag = 'видео',
  seed = 0,
  media,
  height = 420,
  onOpen,
  style = {},
  ...rest
}) {
  const hover = e => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.borderColor = 'rgba(176,107,255,0.45)';
  };
  const out = e => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = 'var(--glass-border)';
  };
  return /*#__PURE__*/React.createElement("article", _extends({
    onMouseEnter: hover,
    onMouseLeave: out,
    onClick: onOpen,
    style: {
      position: 'relative',
      height,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #0a0c1c, #070811)',
      border: '1px solid var(--glass-border)',
      cursor: onOpen ? 'pointer' : 'default',
      transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      boxShadow: 'var(--shadow-card)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, media || /*#__PURE__*/React.createElement(__ds_scope.Crystal, {
    size: Math.min(height * 0.5, 220),
    seed: seed
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(5,6,15,0.85) 8%, transparent 46%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, null, tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 18,
      bottom: 18,
      right: 110
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, category), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 22,
      letterSpacing: '-0.01em',
      color: 'var(--text-heading)',
      marginTop: 7
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"
  }, /*#__PURE__*/React.createElement(ArrowUR, null)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "\u0412 \u0437\u0430\u043A\u043B\u0430\u0434\u043A\u0438"
  }, /*#__PURE__*/React.createElement(Bookmark, null))));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/app.jsx
try { (() => {
// Root app — wires nav, sections, and the case-study overlay.
(function () {
  const {
    useState,
    useEffect
  } = React;
  function App() {
    const [active, setActive] = useState('home');
    const [openProject, setOpenProject] = useState(null);
    const projects = window.PORTFOLIO.projects;
    const featured = projects[0];
    const nav = id => {
      setActive(id);
      if (id === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      const el = document.getElementById(id);
      if (el) window.scrollTo({
        top: el.offsetTop - 10,
        behavior: 'smooth'
      });
    };

    // scroll-spy (rAF-throttled, only re-renders on a real change)
    useEffect(() => {
      const ids = ['projects', 'achievements', 'about', 'contact'];
      let cur = 'home',
        ticking = false;
      const compute = () => {
        ticking = false;
        const y = window.scrollY + 120;
        let next = 'home';
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= y) next = id;
        }
        if (next !== cur) {
          cur = next;
          setActive(next);
        }
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(compute);
        }
      };
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
      compute();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // lock scroll under overlay
    useEffect(() => {
      document.body.style.overflow = openProject ? 'hidden' : '';
    }, [openProject]);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.Cursor, null), /*#__PURE__*/React.createElement(window.Nav, {
      onNav: nav,
      active: active
    }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(window.Hero, {
      onOpen: setOpenProject,
      featured: featured
    }), /*#__PURE__*/React.createElement(window.Projects3D, {
      onOpen: setOpenProject
    }), /*#__PURE__*/React.createElement(window.Achievements, null), /*#__PURE__*/React.createElement(window.About, null), /*#__PURE__*/React.createElement(window.Contact, null)), /*#__PURE__*/React.createElement(window.CaseStudy, {
      project: openProject,
      onClose: () => setOpenProject(null)
    }));
  }

  // Mount once, only on the kit page (the DS bundle also contains a
  // compiled copy of this file; without this guard it would try to mount
  // the portfolio onto any consumer that loads _ds_bundle.js). Both the
  // bundled copy and the Babel copy call mount(); the shared root keeps
  // it idempotent (no double-createRoot).
  function mount() {
    if (!document.querySelector('script[src*="app.jsx"]')) return; // not the kit page
    const ready = window.Cursor && window.Nav && window.Hero && window.Projects3D && window.Achievements && window.About && window.Contact && window.CaseStudy && window.THREE && window.UnrealBloomPass;
    if (!ready) {
      requestAnimationFrame(mount);
      return;
    }
    if (!window.__kitRoot) window.__kitRoot = ReactDOM.createRoot(document.getElementById('root'));
    window.__kitRoot.render(/*#__PURE__*/React.createElement(App, null));
  }
  mount();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/crystals3d.jsx
try { (() => {
// Projects3D — three big, angular, transparent glass crystals scattered
// on one screen (zigzag: upper-left / right / lower-left). Dark faceted
// glass with chromatic dispersion + bloom. They float gently and fade in
// as the section enters view. Hover a crystal → it glows gold and its
// project name appears; click opens the case study.
// Needs window.THREE + window.{EffectComposer,RenderPass,UnrealBloomPass}.
(function () {
  const {
    useRef,
    useEffect
  } = React;
  const SectionHead = window.SectionHead;

  // Each crystal centres (wy≈0) at its scroll moment `cp`. They sit at
  // 0.30 / 0.52 / 0.72 and fully clear the screen before the sticky canvas
  // pins/unpins, so the canvas edge never slices a crystal. Blue is set a
  // bit further from gold. K below controls the vertical spacing.
  // cps kept early enough that the LAST crystal fully clears the top of the
  // canvas (wy > edge+fadeBand) before the sticky range ends (prog→1), so the
  // unpinning canvas edge never slices a crystal. With K=25 a crystal clears
  // ~0.31 of prog after its cp, so the last cp must stay below ~0.65.
  const LAYOUT = [{
    x: -4.2,
    cp: 0.08,
    s: 2.4,
    att: 0xffe08a,
    emi: 0x2a1c00,
    disp: 9,
    seed: 1,
    rot: 0.5
  },
  // gold
  {
    x: 4.1,
    cp: 0.30,
    s: 2.5,
    att: 0x6aa0ff,
    emi: 0x001230,
    disp: 11,
    seed: 5,
    rot: -0.4
  },
  // sapphire
  {
    x: -3.6,
    cp: 0.52,
    s: 2.3,
    att: 0xc888ff,
    emi: 0x180030,
    disp: 13,
    seed: 9,
    rot: 0.9
  } // violet
  ];
  function Projects3D({
    onOpen
  }) {
    const projects = window.PORTFOLIO.projects;
    const mountRef = useRef(null);
    const stageRef = useRef(null);
    const labelRefs = useRef([]);
    const openRef = useRef(onOpen);
    openRef.current = onOpen;
    useEffect(() => {
      const THREE = window.THREE;
      if (!THREE || !window.UnrealBloomPass) return;
      const mount = mountRef.current;
      let W = mount.clientWidth,
        H = mount.clientHeight;
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
      renderer.setSize(W, H);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.75;
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.display = 'block';
      const scene = new THREE.Scene();
      let halfH = 5,
        halfW = halfH * (W / H);
      const camera = new THREE.OrthographicCamera(-halfW, halfW, halfH, -halfH, -50, 50);
      camera.position.z = 10;

      // env: studio panels on dark navy → rich caustics inside the glass
      const ec = document.createElement('canvas');
      ec.width = 512;
      ec.height = 256;
      const ex = ec.getContext('2d');
      const gr = ex.createLinearGradient(0, 0, 0, 256);
      gr.addColorStop(0, '#1a2236');
      gr.addColorStop(0.5, '#0a0e1c');
      gr.addColorStop(1, '#04060e');
      ex.fillStyle = gr;
      ex.fillRect(0, 0, 512, 256);
      const spot = (x, y, r, c) => {
        const rg = ex.createRadialGradient(x, y, 0, x, y, r);
        rg.addColorStop(0, c);
        rg.addColorStop(1, 'rgba(0,0,0,0)');
        ex.fillStyle = rg;
        ex.fillRect(0, 0, 512, 256);
      };
      spot(150, 70, 120, 'rgba(255,255,255,1)');
      spot(380, 90, 110, 'rgba(230,240,255,0.95)');
      spot(256, 180, 120, 'rgba(255,250,255,0.8)');
      spot(110, 60, 30, 'rgba(255,255,255,1)');
      spot(420, 80, 30, 'rgba(255,255,255,1)');
      spot(256, 150, 26, 'rgba(255,255,255,1)');
      const envTex = new THREE.CanvasTexture(ec);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromEquirectangular(envTex);
      scene.environment = envRT.texture;
      pmrem.dispose();
      envTex.dispose();

      // organic surface noise → normal map (natural frosted ripples)
      const nc = document.createElement('canvas');
      nc.width = 256;
      nc.height = 256;
      const nx = nc.getContext('2d');
      const nid = nx.createImageData(256, 256);
      for (let i = 0; i < nid.data.length; i += 4) {
        const vv = 128 + (Math.random() - 0.5) * 90;
        nid.data[i] = vv;
        nid.data[i + 1] = vv;
        nid.data[i + 2] = 255;
        nid.data[i + 3] = 255;
      }
      nx.putImageData(nid, 0, 0);
      const noiseTex = new THREE.CanvasTexture(nc);
      noiseTex.wrapS = noiseTex.wrapT = THREE.RepeatWrapping;
      noiseTex.repeat.set(3, 3);
      scene.add(new THREE.AmbientLight(0x202840, 0.4));
      const key = new THREE.DirectionalLight(0xffffff, 2.0);
      key.position.set(3, 4, 6);
      scene.add(key);
      function crystalGeo(seed) {
        const g = new THREE.IcosahedronGeometry(1, 0);
        const pos = g.attributes.position,
          v = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
          v.fromBufferAttribute(pos, i);
          const a = Math.sin(v.x * 1.4 + seed * 1.3) * Math.cos(v.y * 1.6 - seed) + Math.sin(v.z * 1.3 + seed * 2.1);
          v.multiplyScalar(0.86 + 0.18 * a);
          pos.setXYZ(i, v.x, v.y, v.z);
        }
        g.computeVertexNormals();
        return g;
      }
      const geoms = [],
        meshes = [];
      projects.forEach((proj, i) => {
        const L = LAYOUT[i % LAYOUT.length];
        const mat = new THREE.MeshPhysicalMaterial({
          transmission: 1.0,
          thickness: 0.85,
          roughness: 0.04,
          metalness: 0,
          ior: 1.55,
          dispersion: L.disp,
          clearcoat: 1.0,
          clearcoatRoughness: 0.04,
          color: 0xffffff,
          specularIntensity: 1.4,
          specularColor: 0xffffff,
          emissive: new THREE.Color(L.emi),
          emissiveIntensity: 1.0,
          attenuationColor: new THREE.Color(L.att),
          attenuationDistance: 1.7,
          envMapIntensity: 3.4,
          normalMap: noiseTex,
          normalScale: new THREE.Vector2(0.09, 0.09),
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          flatShading: true
        });
        const geo = crystalGeo(L.seed);
        geoms.push(geo);
        const mesh = new THREE.Mesh(geo, mat);
        const sc = L.s;
        mesh.position.set(L.x, 0, 0);
        mesh.scale.set(sc, sc * 1.08, sc * 0.92);
        mesh.rotation.set(0.2, L.rot, L.rot * 0.3);
        mesh.userData = {
          proj,
          i,
          phase: i * 2.0,
          rs: (i % 2 ? -1 : 1) * 0.12,
          baseS: sc,
          hov: 0,
          app: 0,
          x: L.x,
          cp: L.cp
        };
        scene.add(mesh);
        meshes.push(mesh);
      });

      // bloom composer
      const composer = new window.EffectComposer(renderer);
      composer.addPass(new window.RenderPass(scene, camera));
      const bloom = new window.UnrealBloomPass(new THREE.Vector2(W, H), 0.85, 0.5, 0.7);
      composer.addPass(bloom);
      composer.setSize(W, H);

      // interaction
      const ray = new THREE.Raycaster();
      const ndc = new THREE.Vector2(-2, -2);
      let hovered = -1;
      const onMove = e => {
        const r = renderer.domElement.getBoundingClientRect();
        ndc.x = (e.clientX - r.left) / r.width * 2 - 1;
        ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      };
      const onLeave = () => {
        ndc.set(-2, -2);
      };
      const onClick = () => {
        if (hovered >= 0) openRef.current(projects[hovered]);
      };
      renderer.domElement.addEventListener('pointermove', onMove);
      renderer.domElement.addEventListener('pointerleave', onLeave);
      renderer.domElement.addEventListener('click', onClick);

      // scroll progress through the (tall) stage → drifts crystals so you
      // scroll a little to move from one to the next
      let reveal = 0,
        prog = 0;
      const computeReveal = () => {
        const stage = stageRef.current;
        if (!stage) return;
        const rect = stage.getBoundingClientRect();
        const vh = window.innerHeight;
        reveal = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.7)));
        const span = rect.height - vh;
        prog = span > 0 ? Math.max(0, Math.min(1, -rect.top / span)) : 0;
      };
      let revTick = false;
      const onScroll = () => {
        if (!revTick) {
          revTick = true;
          requestAnimationFrame(() => {
            revTick = false;
            computeReveal();
          });
        }
      };
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
      computeReveal();
      const clock = new THREE.Clock();
      let raf = 0,
        running = false;
      const tmp = new THREE.Vector3();
      function frame() {
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
        if (nh !== hovered) {
          hovered = nh;
          renderer.domElement.style.cursor = nh >= 0 ? 'pointer' : 'default';
        }
        const K = 25;
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
          const edge = 5.6,
            fadeBand = 2.2;
          const vis = Math.max(0, Math.min(1, (edge + fadeBand - Math.abs(wy)) / fadeBand));
          // Fade IN gently, but fade OUT fast — a crystal leaving the scene
          // snaps to invisible so it can never be caught half-opaque by the
          // un-pinning canvas edge on a quick scroll.
          const k = vis < u.app ? 0.5 : 0.14;
          u.app += (vis - u.app) * k;
          // hover glow
          const ht = u.i === hovered ? 1 : 0;
          u.hov += (ht - u.hov) * 0.12;
          m.material.opacity = u.app;
          m.material.emissiveIntensity = 1.0 + u.hov * 1.8; // glow brighter on hover
          m.material.envMapIntensity = 3.4 + u.hov * 2.2;
          const float = Math.sin(t * 0.5 + u.phase) * 0.16;
          m.position.y = wy + float;
          const s = u.baseS * (1 + u.hov * 0.05);
          m.scale.set(s, s * 1.08, s * 0.92);
          m.rotation.y += dt * u.rs;
          m.rotation.x = 0.2 + Math.sin(t * 0.3 + u.phase) * 0.08;

          // label goes to the side OPPOSITE the crystal (where the space is):
          // crystal on the left (x<0) → label on the right, and vice-versa —
          // so they alternate in the same zig-zag rhythm as the crystals.
          tmp.set(u.x, wy, 0).project(camera);
          const sx = (tmp.x * 0.5 + 0.5) * cRect.width;
          const sy = (-tmp.y * 0.5 + 0.5) * cRect.height;
          const ppu = cRect.width / (2 * halfW); // px per world unit
          const crystalHalfPx = ppu * (u.baseS * 1.5); // ~crystal half-width
          const labelW = 300,
            gap = 36;
          const lab = labelRefs.current[u.i];
          if (lab) {
            if (u.x < 0) {
              // crystal left → label right
              let lx = sx + crystalHalfPx + gap;
              lx = Math.min(cRect.width - labelW - 28, lx);
              lab.style.textAlign = 'left';
              lab.style.transform = `translate(0,-50%) translate(${lx}px, ${sy}px)`;
            } else {
              // crystal right → label left
              let lx = sx - crystalHalfPx - gap;
              lx = Math.max(labelW + 28, lx);
              lab.style.textAlign = 'right';
              lab.style.transform = `translate(-100%,-50%) translate(${lx}px, ${sy}px)`;
            }
            lab.style.opacity = (u.hov * u.app).toFixed(3);
          }
        });
        composer.render();
        raf = requestAnimationFrame(frame);
      }

      // The glass-transmission + bloom pipeline is expensive; only run it
      // while the projects section is actually on-screen and the tab is
      // visible. Off-screen it stays completely idle.
      let onScreen = false;
      const play = () => {
        if (!running && onScreen && !document.hidden) {
          running = true;
          clock.getDelta();
          raf = requestAnimationFrame(frame);
        }
      };
      // When the loop stops, force the canvas fully transparent so a paused
      // (frozen) frame can never be left on-screen to be clipped by the
      // unpinning edge. It repaints with the correct fade the moment it resumes.
      const pause = () => {
        running = false;
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        renderer.domElement.style.opacity = '0';
      };
      // Generous rootMargin keeps the loop alive while the section is anywhere
      // near the viewport, so the pin/unpin sweep is always rendered with the
      // live fade instead of pausing mid-transition.
      const io = new IntersectionObserver(([e]) => {
        onScreen = e.isIntersecting;
        onScreen ? play() : pause();
      }, {
        threshold: 0,
        rootMargin: '80% 0px 80% 0px'
      });
      io.observe(mount);
      const onVis = () => document.hidden ? pause() : play();
      document.addEventListener('visibilitychange', onVis);
      const onResize = () => {
        W = mount.clientWidth;
        H = mount.clientHeight;
        renderer.setSize(W, H);
        composer.setSize(W, H);
        halfW = halfH * (W / H);
        camera.left = -halfW;
        camera.right = halfW;
        camera.top = halfH;
        camera.bottom = -halfH;
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
        composer.dispose && composer.dispose();
        renderer.dispose();
        meshes.forEach(m => m.material.dispose());
        geoms.forEach(g => g.dispose());
        envRT.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    }, []);
    return /*#__PURE__*/React.createElement("section", {
      id: "projects",
      "data-screen-label": "\u041F\u0440\u043E\u0435\u043A\u0442\u044B",
      style: {
        position: 'relative',
        background: 'var(--bg)',
        overflow: 'clip'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 3,
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: 'clamp(56px,8vw,104px) clamp(20px,5vw,48px) 0',
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      index: "01",
      kicker: "\u041F\u0440\u043E\u0435\u043A\u0442\u044B \u2014 Labs",
      title: /*#__PURE__*/React.createElement(React.Fragment, null, "\u041A\u0430\u0436\u0434\u044B\u0439 \u043A\u0440\u0438\u0441\u0442\u0430\u043B\u043B \u2014 ", /*#__PURE__*/React.createElement("em", {
        style: {
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'var(--iris-gold)'
        }
      }, "\u043F\u0440\u043E\u0435\u043A\u0442"))
    })), /*#__PURE__*/React.createElement("div", {
      ref: stageRef,
      style: {
        position: 'relative',
        height: '165vh',
        marginTop: '-12vh'
      }
    }, /*#__PURE__*/React.createElement("div", {
      ref: mountRef,
      style: {
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        zIndex: 1
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        top: 0,
        height: '100vh',
        marginTop: '-100vh',
        zIndex: 2,
        pointerEvents: 'none'
      }
    }, projects.map((p, i) => /*#__PURE__*/React.createElement("div", {
      key: p.id,
      ref: el => labelRefs.current[i] = el,
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 300,
        opacity: 0,
        textAlign: 'right',
        transition: 'opacity .2s linear',
        willChange: 'transform,opacity'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--iris-gold)'
      }
    }, String(i + 1).padStart(2, '0'), " \xB7 ", p.category), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 'clamp(24px,2.6vw,34px)',
        letterSpacing: '-0.01em',
        color: 'var(--text-heading)',
        marginTop: 8,
        textShadow: '0 2px 24px rgba(4,6,14,0.95)'
      }
    }, p.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13.5,
        lineHeight: 1.5,
        color: 'var(--text-secondary)',
        marginTop: 12,
        textShadow: '0 1px 14px rgba(4,6,14,0.9)'
      }
    }, p.blurb), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: 'var(--text-heading)',
        marginTop: 14
      }
    }, "\u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442 \u2192"))))));
  }
  window.Projects3D = Projects3D;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/crystals3d.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/cursor.jsx
try { (() => {
// Custom crosshair cursor + small icon set, exported to window.
(function () {
  const {
    useRef,
    useEffect
  } = React;

  // Ref-based cursor: position is written straight to the DOM node inside a
  // single rAF tick. No React state, so moving the mouse never triggers a
  // re-render of the whole app (that was a big source of jank).
  function Cursor() {
    const ref = useRef(null);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let x = -100,
        y = -100,
        big = false,
        raf = 0,
        dirty = false;
      const flush = () => {
        raf = 0;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        if (dirty) {
          el.style.width = el.style.height = big ? '58px' : '42px';
          el.style.borderColor = big ? 'rgba(176,107,255,0.9)' : 'rgba(230,230,255,0.6)';
          dirty = false;
        }
      };
      const schedule = () => {
        if (!raf) raf = requestAnimationFrame(flush);
      };
      const move = e => {
        x = e.clientX;
        y = e.clientY;
        schedule();
      };
      const over = e => {
        const t = !!e.target.closest('a,button,[data-hover],input,textarea');
        if (t !== big) {
          big = t;
          dirty = true;
          schedule();
        }
      };
      window.addEventListener('pointermove', move, {
        passive: true
      });
      window.addEventListener('pointerover', over, {
        passive: true
      });
      return () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerover', over);
      };
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        width: 42,
        height: 42,
        transform: 'translate3d(-100px,-100px,0) translate(-50%,-50%)',
        borderRadius: '50%',
        border: '1px solid rgba(230,230,255,0.6)',
        transition: 'width .2s var(--ease-out), height .2s var(--ease-out), border-color .2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        width: 9,
        height: 1,
        background: 'rgba(230,230,255,0.85)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        width: 1,
        height: 9,
        background: 'rgba(230,230,255,0.85)'
      }
    }));
  }

  // tiny stroke icon set (no external dep)
  const I = (d, props = {}) => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: props.size || 18,
    height: props.size || 18,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: props.sw || 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, d);
  const Icons = {
    arrowUR: p => I(/*#__PURE__*/React.createElement("path", {
      d: "M7 17 17 7M9 7h8v8"
    }), p),
    arrowR: p => I(/*#__PURE__*/React.createElement("path", {
      d: "M5 12h14M13 6l6 6-6 6"
    }), p),
    bookmark: p => I(/*#__PURE__*/React.createElement("path", {
      d: "M6 4h12v16l-6-4-6 4z"
    }), p),
    github: p => I(/*#__PURE__*/React.createElement("path", {
      d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.3 0C6.6 2.3 5.5 2.6 5.5 2.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
    }), p),
    telegram: p => I(/*#__PURE__*/React.createElement("path", {
      d: "M22 4 2 11l6 2 2 6 4-4 5 4 3-15z"
    }), p),
    mail: p => I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "5",
      width: "18",
      height: "14",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m3 7 9 6 9-6"
    })), p),
    close: p => I(/*#__PURE__*/React.createElement("path", {
      d: "M6 6l12 12M18 6 6 18"
    }), p),
    spark: p => I(/*#__PURE__*/React.createElement("path", {
      d: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"
    }), p)
  };
  window.Cursor = Cursor;
  window.Icons = Icons;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/cursor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/data.js
try { (() => {
// Portfolio content — Григорий Муравенко (from CV)
window.PORTFOLIO = {
  projects: [{
    id: 'velum',
    category: 'Privacy · Network',
    title: 'Velum VPN',
    tag: 'продукт',
    year: '2024',
    url: 'vpnvelum.com',
    side: 'left',
    role: 'Founder · Core Engineer',
    links: [['Открыть сайт', 'https://vpnvelum.com/'], ['Бот в Telegram', 'https://t.me/VPNvelum_bot']],
    stack: ['Python', 'VLESS', 'Remnawave', 'PostgreSQL', 'Docker', 'Celery'],
    blurb: 'Собственный VPN-сервис с упором на скорость и устойчивость к блокировкам. 10\u00a0000+\u00a0пользователей.',
    problem: 'Готовые VPN либо медленные, либо легко режутся DPI. Нужна была высокая скорость без узнаваемой сигнатуры в трафике.',
    approach: 'Поднял сеть узлов на ядре VLESS с обфусцирующим транспортом и панелью Remnawave, автоматический выбор ближайшей локации и биллинг на Python.',
    result: 'Стабильный сервис с 10 000+ пользователей: скорость близка к нативной, устойчивость к блокировкам.',
    metrics: [['10 000+', 'пользователей'], ['VLESS', 'ядро'], ['24/7', 'аптайм']]
  }, {
    id: 'multix',
    category: 'AI · Generation',
    title: 'Multix AI',
    tag: 'платформа',
    year: '2025',
    url: 'aimultix.com',
    side: 'right',
    role: 'Founder · Full-stack',
    links: [['Открыть сайт', 'https://aimultix.com/']],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'RabbitMQ'],
    blurb: 'Платформа для генерации контента с помощью ИИ — аналог Higgsfield. 500+ пользователей.',
    problem: 'Доступ к лучшим генеративным моделям разрознен: разные интерфейсы, ключи и оплаты, нет единого места.',
    approach: 'Собрал единый веб-интерфейс с очередями задач (Celery/RabbitMQ), маршрутизацией к моделям и биллингом.',
    result: 'Платформа с 500+ пользователями, генерирующая видео, фото и тексты из одного окна.',
    metrics: [['500+', 'пользователей'], ['Видео · Фото · Аудио', 'в одном окне'], ['S3', 'хранилище медиа']]
  }, {
    id: 'aibots',
    category: 'AI · Telegram',
    title: 'Сеть ИИ-ботов',
    tag: 'продукт',
    year: '2025',
    url: '@ai_veo_bot · @sora2_aibot',
    side: 'left',
    role: 'Solo Engineer',
    links: [['@ai_veo_bot', 'https://t.me/ai_veo_bot'], ['@sora2_aibot', 'https://t.me/sora2_aibot']],
    stack: ['Python', 'aiogram', 'PostgreSQL', 'Celery', 'Docker'],
    blurb: 'Сеть Telegram-ботов для генерации видео, фото и аудио. Суммарная аудитория 60 000+ человек.',
    problem: 'Генеративные модели сложны для обычного пользователя — нужен максимально простой вход прямо в мессенджере.',
    approach: 'Запустил ботов (@ai_veo_bot, @sora2_aibot) с очередями генерации, оплатой и масштабированием под нагрузку.',
    result: 'Суммарная аудитория 60 000+ человек, тысячи генераций видео, фото и аудио ежедневно.',
    metrics: [['60 000+', 'аудитория'], ['видео · фото · аудио', 'генерация'], ['2', 'бота в сети']]
  }],
  achievements: [['10 000+', 'пользователей Velum VPN'], ['60 000+', 'аудитория ИИ-ботов'], ['Founder / CTO', '«Попутчик» · команда 6'], ['Яндекс', 'ML Cloud · SRE / DevOps', 'Backend Python']],
  talks: [['МОШ 2023', 'Абсолютный победитель предпрофессиональной олимпиады'], ['НТО 2023', 'Призёр по направлению «Информационная безопасность»'], ['Яндекс 2024', 'Школа бэкенд-разработки на Python']],
  // Хронология: олимпиады · курсы · работа · проекты
  timeline: [{
    year: '2023',
    type: 'олимпиада',
    place: 'МОШ',
    title: 'Абсолютный победитель предпрофессиональной олимпиады'
  }, {
    year: '2023',
    type: 'олимпиада',
    place: 'НТО',
    title: 'Призёр по направлению «Информационная безопасность»'
  }, {
    year: '2024',
    type: 'курс',
    place: 'Яндекс',
    title: 'Школа бэкенд-разработки на Python'
  }, {
    year: '2024–25',
    type: 'работа',
    place: 'Яндекс',
    title: 'Бэкенд-стажировка на Python'
  }, {
    year: '2025',
    type: 'работа',
    place: 'Яндекс',
    title: 'DevOps / SRE junior'
  }, {
    year: '2025',
    type: 'проект',
    place: 'ИИ-боты',
    title: 'Сеть Telegram-ботов, аудитория 60 000+'
  }, {
    year: '2025–26',
    type: 'работа',
    place: '«Попутчик»',
    title: 'Founder / CTO — логистическая биржа, команда 6'
  }, {
    year: '2026',
    type: 'проект',
    place: 'Velum VPN',
    title: 'Запуск VPN-сервиса, 10 000+ пользователей'
  }, {
    year: '2026',
    type: 'проект',
    place: 'Multix AI',
    title: 'ИИ-платформа генерации контента'
  }],
  stack: ['Python', 'Go', 'Java', 'FastAPI', 'Django', 'Flask', 'PostgreSQL', 'Docker', 'Celery', 'RabbitMQ']
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/data.js", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/screens-more.jsx
try { (() => {
// CaseStudy, Achievements, About, Contact — exported to window.
(function () {
  const {
    useState
  } = React;
  const NS = 'PortfolioDesignSystem_22735b';

  /* ===== shared glass system (matches the hero Frosted Stack) ===== */
  const frost = {
    background: 'linear-gradient(150deg, rgba(255,255,255,0.11), rgba(255,255,255,0.035) 62%)',
    backdropFilter: 'blur(22px) saturate(1.6)',
    WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
    border: '1px solid rgba(255,255,255,0.14)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 24px 60px rgba(0,0,0,0.4)'
  };
  const gold = {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontWeight: 400,
    color: 'var(--iris-gold)'
  };
  function Aura({
    blobs
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }
    }, blobs.map((b, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        borderRadius: '50%',
        filter: 'blur(48px)',
        ...b
      }
    })));
  }
  const violet = extra => ({
    width: 560,
    height: 560,
    background: 'radial-gradient(circle, rgba(150,90,255,0.30), transparent 64%)',
    ...extra
  });
  const cyan = extra => ({
    width: 540,
    height: 540,
    background: 'radial-gradient(circle, rgba(110,210,255,0.20), transparent 62%)',
    ...extra
  });
  const warm = extra => ({
    width: 460,
    height: 460,
    background: 'radial-gradient(circle, rgba(255,200,120,0.16), transparent 60%)',
    ...extra
  });
  function Frost({
    children,
    style,
    interactive
  }) {
    const hover = e => {
      if (!interactive) return;
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.26)';
    };
    const out = e => {
      if (!interactive) return;
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
    };
    return /*#__PURE__*/React.createElement("div", {
      onMouseEnter: hover,
      onMouseLeave: out,
      style: {
        ...frost,
        borderRadius: 22,
        padding: 26,
        transition: 'transform .35s var(--ease-out), border-color .35s var(--ease-out)',
        ...style
      }
    }, children);
  }

  /* ---------------- Case study overlay ---------------- */
  function CaseStudy({
    project,
    onClose
  }) {
    const {
      Button,
      Tag,
      ShaderField
    } = window[NS];
    const Icons = window.Icons;
    if (!project) return null;
    const p = project;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--bg)',
        overflowY: 'auto',
        animation: 'csIn .5s var(--ease-glide)'
      }
    }, /*#__PURE__*/React.createElement("style", null, `@keyframes csIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}`), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        minHeight: 420,
        overflow: 'hidden',
        borderBottom: '1px solid var(--line-2)'
      }
    }, /*#__PURE__*/React.createElement(Aura, {
      blobs: [violet({
        left: '-6%',
        top: '-30%'
      }), cyan({
        right: '6%',
        top: '10%'
      })]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 20,
        left: 'clamp(20px,5vw,48px)',
        right: 'clamp(20px,5vw,48px)',
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 3
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "glass",
      size: "sm",
      icon: /*#__PURE__*/React.createElement(Icons.close, null),
      onClick: onClose
    }, "\u043D\u0430\u0437\u0430\u0434"), /*#__PURE__*/React.createElement(Tag, {
      variant: "solid"
    }, p.year)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 2,
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '110px clamp(20px,5vw,48px) 50px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 30,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: 18
      }
    }, p.category), /*#__PURE__*/React.createElement("h1", {
      style: {
        font: 'var(--type-h1)',
        fontSize: 'clamp(38px,5.5vw,72px)',
        letterSpacing: 'var(--track-tight)',
        margin: 0,
        color: 'var(--text-heading)',
        maxWidth: '14ch'
      }
    }, p.title), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 20,
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-sans)',
        fontSize: 16
      }
    }, p.role), p.links && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        marginTop: 26
      }
    }, p.links.map(([lab, href], i) => /*#__PURE__*/React.createElement(Button, {
      key: href,
      variant: i === 0 ? 'primary' : 'glass',
      size: "sm",
      as: "a",
      href: href,
      target: "_blank",
      iconRight: /*#__PURE__*/React.createElement(Icons.arrowUR, null)
    }, lab)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,48px)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: 'var(--type-h3)',
        fontSize: 'clamp(22px,2.6vw,34px)',
        fontWeight: 500,
        lineHeight: 1.3,
        color: 'var(--text-body)',
        maxWidth: '24ch',
        margin: 0,
        letterSpacing: '-0.01em'
      }
    }, p.blurb), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap',
        margin: '36px 0 56px'
      }
    }, p.stack.map(s => /*#__PURE__*/React.createElement(Tag, {
      key: s,
      variant: "solid"
    }, s))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))',
        gap: 16,
        marginBottom: 64
      }
    }, p.metrics.map(([v, l]) => /*#__PURE__*/React.createElement(Frost, {
      key: l,
      style: {
        padding: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: v.length > 12 ? 'clamp(17px,1.9vw,22px)' : 'clamp(28px,3.2vw,40px)',
        letterSpacing: '-0.02em',
        color: 'var(--text-heading)',
        whiteSpace: 'nowrap'
      }
    }, v), /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 14,
        marginTop: 6
      }
    }, l)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
        gap: 30
      }
    }, [['Задача', p.problem], ['Подход', p.approach], ['Результат', p.result]].map(([h, b]) => /*#__PURE__*/React.createElement("div", {
      key: h
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--iris-gold)',
        marginBottom: 14
      }
    }, h), /*#__PURE__*/React.createElement("p", {
      style: {
        font: 'var(--type-body)',
        color: 'var(--text-secondary)',
        margin: 0,
        lineHeight: 1.65
      }
    }, b)))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 72,
        display: 'flex',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: /*#__PURE__*/React.createElement(Icons.arrowR, null),
      onClick: onClose
    }, "\u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C"))));
  }

  /* ---------------- Achievements ---------------- */
  function Achievements() {
    const Icons = window.Icons;
    const SectionHead = window.SectionHead;
    const a = window.PORTFOLIO.achievements,
      timeline = window.PORTFOLIO.timeline;
    const TYPE = {
      'олимпиада': 'var(--iris-gold)',
      'курс': 'var(--iris-cyan)',
      'работа': 'var(--iris-violet)',
      'проект': 'var(--iris-blue)'
    };
    return /*#__PURE__*/React.createElement("section", {
      id: "achievements",
      "data-screen-label": "\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F",
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        padding: 'var(--section-y) 0'
      }
    }, /*#__PURE__*/React.createElement(Aura, {
      blobs: [violet({
        left: '-8%',
        top: '6%'
      }), cyan({
        right: '-6%',
        top: '30%'
      })]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 2,
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '0 clamp(20px,5vw,48px)'
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      index: "02",
      kicker: "\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F",
      title: /*#__PURE__*/React.createElement(React.Fragment, null, "\u0426\u0438\u0444\u0440\u044B \u0438 ", /*#__PURE__*/React.createElement("em", {
        style: gold
      }, "\u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F"))
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
        gap: 16,
        marginTop: 56
      }
    }, a.map(([v, l, sub]) => /*#__PURE__*/React.createElement(Frost, {
      key: l,
      interactive: true,
      style: {
        padding: 28
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 'clamp(30px,3.6vw,46px)',
        letterSpacing: '-0.02em',
        color: 'var(--text-heading)'
      }
    }, v), /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 14,
        marginTop: 8
      }
    }, l), sub && /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 14,
        marginTop: 4
      }
    }, sub)))), /*#__PURE__*/React.createElement(Frost, {
      style: {
        marginTop: 20,
        padding: 'clamp(28px,3.4vw,44px) clamp(18px,2.6vw,30px)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '14px 22px',
        marginBottom: 'clamp(20px,2.6vw,34px)'
      }
    }, Object.entries(TYPE).map(([t, c]) => /*#__PURE__*/React.createElement("div", {
      key: t,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: c,
        boxShadow: `0 0 10px 1px ${c}`
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, t)))), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: 6,
        WebkitOverflowScrolling: 'touch'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: '100%',
        minWidth: timeline.length * 190,
        height: 400,
        display: 'grid',
        gridTemplateColumns: `repeat(${timeline.length}, minmax(150px,1fr))`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        height: 1,
        transform: 'translateY(-0.5px)',
        background: 'linear-gradient(90deg, transparent, var(--line-strong) 6%, var(--line-strong) 94%, transparent)'
      }
    }), timeline.map((e, i) => {
      const up = i % 2 === 0;
      const c = TYPE[e.type] || 'var(--iris-gold)';
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          position: 'relative'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 13,
          height: 13,
          borderRadius: '50%',
          background: c,
          boxShadow: `0 0 0 4px var(--bg), 0 0 16px 2px ${c}`,
          zIndex: 2
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-0.5px)',
          width: 1,
          height: 28,
          background: `linear-gradient(${up ? '180deg' : '0deg'}, ${c}, transparent)`,
          ...(up ? {
            bottom: '50%'
          } : {
            top: '50%'
          })
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          position: 'absolute',
          left: 9,
          right: 9,
          ...(up ? {
            bottom: 'calc(50% + 28px)'
          } : {
            top: 'calc(50% + 28px)'
          })
        }
      }, /*#__PURE__*/React.createElement(Frost, {
        interactive: true,
        style: {
          padding: '15px 17px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 9
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.06em',
          color: c
        }
      }, e.year), /*#__PURE__*/React.createElement("span", {
        style: {
          width: 3,
          height: 3,
          borderRadius: '50%',
          background: 'var(--text-faint)'
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text-faint)'
        }
      }, e.type)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--text-heading)',
          marginBottom: 6
        }
      }, e.place), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          lineHeight: 1.5,
          color: 'var(--text-muted)'
        }
      }, e.title))));
    }))))));
  }

  /* ---------------- About ---------------- */
  function About() {
    const {
      Tag
    } = window[NS];
    const SectionHead = window.SectionHead;
    const stack = window.PORTFOLIO.stack;
    return /*#__PURE__*/React.createElement("section", {
      id: "about",
      "data-screen-label": "\u041E \u0441\u0435\u0431\u0435",
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        padding: 'var(--section-y) 0'
      }
    }, /*#__PURE__*/React.createElement(Aura, {
      blobs: [warm({
        left: '38%',
        top: '8%'
      }), violet({
        right: '-8%',
        bottom: '-10%'
      })]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 2,
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '0 clamp(20px,5vw,48px)'
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      index: "03",
      kicker: "\u041E \u0441\u0435\u0431\u0435",
      title: /*#__PURE__*/React.createElement(React.Fragment, null, "\u0418\u043D\u0436\u0435\u043D\u0435\u0440 \u0438 ", /*#__PURE__*/React.createElement("em", {
        style: gold
      }, "\u0444\u0430\u0443\u043D\u0434\u0435\u0440"))
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(260px,360px) 1fr',
        gap: 'clamp(28px,5vw,64px)',
        marginTop: 56,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Frost, {
      style: {
        padding: 8,
        borderRadius: 24,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "assets/portrait.png",
      alt: "\u0413\u0440\u0438\u0433\u043E\u0440\u0438\u0439 \u041C\u0443\u0440\u0430\u0432\u0435\u043D\u043A\u043E",
      style: {
        display: 'block',
        width: '100%',
        aspectRatio: '4 / 5',
        objectFit: 'cover',
        objectPosition: 'center 16%',
        borderRadius: 18,
        background: 'rgba(255,255,255,0.04)'
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        font: 'var(--type-h3)',
        fontSize: 'clamp(20px,2.4vw,30px)',
        fontWeight: 500,
        lineHeight: 1.35,
        color: 'var(--text-body)',
        margin: 0,
        letterSpacing: '-0.01em'
      }
    }, "\u0421\u0442\u0443\u0434\u0435\u043D\u0442 \u0418\u0422\u041C\u041E \u0438 \u0444\u0430\u0443\u043D\u0434\u0435\u0440. \u0417\u0430\u043F\u0443\u0441\u043A\u0430\u044E \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B \u0441 \u043D\u0443\u043B\u044F \u2014 \u043E\u0442 backend \u0438 \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u044B \u0434\u043E \u043F\u0435\u0440\u0432\u044B\u0445 ", /*#__PURE__*/React.createElement("em", {
      style: gold
    }, "\u0434\u0435\u0441\u044F\u0442\u043A\u043E\u0432 \u0442\u044B\u0441\u044F\u0447"), " \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439."), /*#__PURE__*/React.createElement("p", {
      style: {
        font: 'var(--type-body)',
        color: 'var(--text-muted)',
        marginTop: 22,
        lineHeight: 1.7,
        maxWidth: '54ch'
      }
    }, "\u0420\u0430\u0431\u043E\u0442\u0430\u043B \u0432 \u042F\u043D\u0434\u0435\u043A\u0441\u0435 \u043D\u0430\u0434 ML-\u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u043E\u0439 \u0438 \u0434\u0430\u0442\u0430-\u0446\u0435\u043D\u0442\u0440\u0430\u043C\u0438. \u0421\u0435\u0439\u0447\u0430\u0441 \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u044E \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 B2C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439 70 000+."), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--iris-gold)',
        margin: '38px 0 16px'
      }
    }, "\u0421\u0442\u0435\u043A"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 9,
        flexWrap: 'wrap'
      }
    }, stack.map(s => /*#__PURE__*/React.createElement(Tag, {
      key: s,
      variant: "solid"
    }, s)))))));
  }

  /* ---------------- Contact ---------------- */
  function Contact() {
    const {
      Button,
      Input
    } = window[NS];
    const Icons = window.Icons;
    const SectionHead = window.SectionHead;
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({
      name: '',
      email: '',
      msg: ''
    });
    const upd = k => e => setForm({
      ...form,
      [k]: e.target.value
    });
    return /*#__PURE__*/React.createElement("section", {
      id: "contact",
      "data-screen-label": "\u041A\u043E\u043D\u0442\u0430\u043A\u0442",
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        padding: 'var(--section-y) 0'
      }
    }, /*#__PURE__*/React.createElement(Aura, {
      blobs: [violet({
        left: '-6%',
        top: '4%'
      }), cyan({
        right: '4%',
        top: '26%'
      }), warm({
        right: '20%',
        bottom: '-16%'
      })]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 2,
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '0 clamp(20px,5vw,48px)'
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      index: "04",
      kicker: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442",
      title: /*#__PURE__*/React.createElement(React.Fragment, null, "\u0414\u0430\u0432\u0430\u0439\u0442\u0435 ", /*#__PURE__*/React.createElement("em", {
        style: gold
      }, "\u043F\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u043C"))
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
        gap: 28,
        marginTop: 56,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Frost, {
      style: {
        padding: 'var(--space-8)'
      }
    }, sent ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        color: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--iris-gold)'
      }
    }, /*#__PURE__*/React.createElement(Icons.spark, {
      size: 28
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--type-h4)',
        color: 'var(--text-heading)'
      }
    }, "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-muted)',
        margin: 0
      }
    }, "\u041E\u0442\u0432\u0435\u0447\u0443 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u044B \u0434\u043D\u0435\u0439. \u0421\u043F\u0430\u0441\u0438\u0431\u043E!")) : /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        setSent(true);
      },
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "\u0418\u043C\u044F",
      value: form.name,
      onChange: upd('name'),
      placeholder: "\u0413\u0440\u0438\u0433\u043E\u0440\u0438\u0439"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "E-mail",
      type: "email",
      value: form.email,
      onChange: upd('email'),
      placeholder: "you@example.com"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435",
      multiline: true,
      rows: 4,
      value: form.msg,
      onChange: upd('msg'),
      placeholder: "\u041E \u0447\u0451\u043C \u043F\u0440\u043E\u0435\u043A\u0442?"
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      full: true,
      iconRight: /*#__PURE__*/React.createElement(Icons.arrowR, null)
    }, "\u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, [[/*#__PURE__*/React.createElement(Icons.mail, null), 'muravenkog@yandex.ru', 'Почта', 'mailto:muravenkog@yandex.ru'], [/*#__PURE__*/React.createElement(Icons.telegram, null), '@Deformater5432', 'Telegram', 'https://t.me/Deformater5432'], [/*#__PURE__*/React.createElement(Icons.github, null), 'github.com/Deformater', 'Гитхаб', 'https://github.com/Deformater']].map(([ic, val, lab, href]) => /*#__PURE__*/React.createElement("a", {
      key: lab,
      href: href,
      target: "_blank",
      rel: "noopener",
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/React.createElement(Frost, {
      interactive: true,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: 22
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--iris-gold)'
      }
    }, ic), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 12,
        color: 'var(--text-faint)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.08em'
      }
    }, lab), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        color: 'var(--text-body)',
        fontSize: 16,
        marginTop: 3
      }
    }, val)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)'
      }
    }, /*#__PURE__*/React.createElement(Icons.arrowUR, null))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'clamp(60px,10vw,120px)',
        paddingTop: 28,
        borderTop: '1px solid var(--line-2)',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14,
        color: 'var(--text-faint)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 \u0413\u0440\u0438\u0433\u043E\u0440\u0438\u0439 \u041C\u0443\u0440\u0430\u0432\u0435\u043D\u043A\u043E"), /*#__PURE__*/React.createElement("span", null, "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433 \xB7 \u041C\u043E\u0441\u043A\u0432\u0430 \xB7 \u0443\u0434\u0430\u043B\u0451\u043D\u043D\u043E"))));
  }
  Object.assign(window, {
    CaseStudy,
    Achievements,
    About,
    Contact
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/screens-more.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/screens-top.jsx
try { (() => {
// Nav, Hero, SectionHead — exported to window.
(function () {
  const {
    useState,
    useEffect
  } = React;

  /* ---------------- Nav ---------------- */
  function Nav({
    onNav,
    active
  }) {
    const [solid, setSolid] = useState(false);
    useEffect(() => {
      let cur = false,
        ticking = false;
      const s = () => {
        ticking = false;
        const next = window.scrollY > 40;
        if (next !== cur) {
          cur = next;
          setSolid(next);
        }
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(s);
        }
      };
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const links = [['projects', 'Проекты'], ['achievements', 'Достижения'], ['about', 'О себе'], ['contact', 'Контакт']];
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px clamp(20px,5vw,48px)',
        background: solid ? 'rgba(5,6,15,0.6)' : 'transparent',
        backdropFilter: solid ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: solid ? 'blur(14px)' : 'none',
        borderBottom: solid ? '1px solid var(--line-2)' : '1px solid transparent',
        transition: 'background .4s var(--ease-out), border-color .4s'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onNav('home'),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'baseline',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        alignSelf: 'center',
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: 'var(--iris-violet)',
        boxShadow: '0 0 14px 2px var(--iris-violet)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 17,
        letterSpacing: '-0.01em',
        color: 'var(--text-heading)'
      }
    }, "\u043C\u0443\u0440\u0430\u0432\u0435\u043D\u043A\u043E"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: 17,
        color: 'var(--text-muted)'
      }
    }, "engineering")), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        gap: 6,
        padding: 5,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)'
      }
    }, links.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => onNav(id),
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        padding: '9px 16px',
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        whiteSpace: 'nowrap',
        background: active === id ? 'var(--grad-iris)' : 'transparent',
        color: active === id ? 'var(--text-on-accent)' : 'var(--text-muted)',
        transition: 'color .25s, background .25s'
      }
    }, label))));
  }

  /* ---------------- Hero ---------------- */
  function Hero({
    onOpen,
    featured
  }) {
    const {
      Button,
      ShaderField,
      Crystal
    } = window.PortfolioDesignSystem_22735b;
    const Icons = window.Icons;
    const frost = {
      background: 'linear-gradient(150deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035) 60%)',
      backdropFilter: 'blur(22px) saturate(1.6)',
      WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
      border: '1px solid rgba(255,255,255,0.16)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 30px 70px rgba(0,0,0,0.45)'
    };
    const chips = [{
      n: '60к+',
      l: 'пользователей',
      top: '4%',
      right: '20%',
      d: 0
    }, {
      n: '1k+',
      l: 'запросов / день',
      top: '38%',
      right: '2%',
      d: 1.4
    }, {
      n: '96%',
      l: 'аптайм',
      top: '70%',
      right: '26%',
      d: 2.6
    }];
    return /*#__PURE__*/React.createElement("section", {
      "data-screen-label": "\u0413\u043B\u0430\u0432\u043D\u0430\u044F",
      style: {
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'var(--bg)'
      }
    }, /*#__PURE__*/React.createElement("style", null, `
          @keyframes heroRise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
          @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
          .hero-rise{animation:heroRise .9s var(--ease-glide) both}
          @media (prefers-reduced-motion: no-preference){ .hero-float{animation:heroFloat 7s ease-in-out infinite} }
        `), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        width: 680,
        height: 680,
        left: '2%',
        top: '12%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(150,90,255,0.5), rgba(120,70,230,0.18) 44%, transparent 68%)',
        filter: 'blur(44px)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        width: 600,
        height: 600,
        right: '2%',
        top: '24%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(110,210,255,0.26), transparent 62%)',
        filter: 'blur(46px)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        width: 480,
        height: 480,
        right: '16%',
        bottom: '-16%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,200,120,0.20), transparent 60%)',
        filter: 'blur(48px)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 180,
        zIndex: 1,
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent, var(--bg))'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 2,
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '120px clamp(20px,5vw,48px) 80px',
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.45fr) minmax(0,0.62fr)',
        alignItems: 'center',
        gap: 'clamp(24px,4vw,56px)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero-rise",
      style: {
        ...frost,
        borderRadius: 28,
        padding: 'clamp(38px,3.4vw,52px) clamp(40px,4vw,60px)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: 'var(--font-mono)',
        fontSize: 12.5,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 1,
        background: 'rgba(255,255,255,0.3)'
      }
    }), "BACKEND \xB7 FOUNDER \xB7 \u0418\u0422\u041C\u041E"), /*#__PURE__*/React.createElement("h1", {
      style: {
        font: 'var(--type-h1)',
        fontSize: 'clamp(40px,4.6vw,64px)',
        letterSpacing: 'var(--track-tight)',
        lineHeight: 0.98,
        margin: 0,
        color: 'var(--text-heading)',
        maxWidth: '15ch'
      }
    }, "\u0421\u043E\u0437\u0434\u0430\u044E \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B, ", /*#__PURE__*/React.createElement("em", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontWeight: 400,
        color: 'var(--iris-gold)'
      }
    }, "\u043A\u043E\u0442\u043E\u0440\u044B\u043C\u0438 \u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F")), /*#__PURE__*/React.createElement("p", {
      style: {
        font: 'var(--type-body)',
        fontSize: 'clamp(15px,1.4vw,17px)',
        color: 'var(--text-secondary)',
        maxWidth: '38ch',
        marginTop: 24,
        lineHeight: 1.6
      }
    }, "\u0418\u0418 \u0438 \u0441\u0435\u0442\u0438, \u0441\u0442\u0430\u0432\u0448\u0438\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430\u043C\u0438 \u0434\u043B\u044F \u0434\u0435\u0441\u044F\u0442\u043A\u043E\u0432 \u0442\u044B\u0441\u044F\u0447 \u043B\u044E\u0434\u0435\u0439."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        marginTop: 34,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconRight: /*#__PURE__*/React.createElement(Icons.arrowR, null),
      as: "a",
      href: "#projects",
      onClick: e => {
        e.preventDefault();
        const el = document.getElementById('projects');
        if (el) window.scrollTo({
          top: el.offsetTop,
          behavior: 'smooth'
        });
      }
    }, "\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441\u044B"), /*#__PURE__*/React.createElement(Button, {
      variant: "glass",
      as: "a",
      href: "#contact",
      onClick: e => {
        e.preventDefault();
        const el = document.getElementById('contact');
        if (el) window.scrollTo({
          top: el.offsetTop,
          behavior: 'smooth'
        });
      }
    }, "\u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F"))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: '100%',
        minHeight: 420,
        pointerEvents: 'none'
      }
    }, chips.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.l,
      className: "hero-rise",
      style: {
        ...frost,
        position: 'absolute',
        top: c.top,
        right: c.right,
        borderRadius: 20,
        padding: '20px 24px',
        minWidth: 150,
        animationDelay: `${c.d}s`,
        animationDuration: '.9s'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 28,
        letterSpacing: '-0.02em',
        color: 'var(--text-heading)'
      }
    }, c.n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginTop: 7
      }
    }, c.l))))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 26,
        zIndex: 2,
        color: 'var(--text-faint)',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "26",
      height: "26",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 13l6 6 6-6"
    }))));
  }
  function SectionHead({
    index,
    kicker,
    title
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 30,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: 18
      }
    }, kicker), /*#__PURE__*/React.createElement("h2", {
      style: {
        font: 'var(--type-h2)',
        fontSize: 'clamp(32px,4.5vw,56px)',
        letterSpacing: 'var(--track-tight)',
        margin: 0,
        color: 'var(--text-heading)',
        maxWidth: '20ch'
      }
    }, title)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--text-faint)'
      }
    }, "/ ", index));
  }
  Object.assign(window, {
    Nav,
    Hero,
    SectionHead
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/screens-top.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Crystal = __ds_scope.Crystal;

__ds_ns.ShaderField = __ds_scope.ShaderField;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tag = __ds_scope.Tag;

})();

/* Shared UI primitives + helpers -> window */
(function () {
  const { useState } = React;

  // ---- placeholder image ----
  function Img({ label, tone = "", className = "", style, children }) {
    return (
      <div className={"ph " + tone + " " + className} style={style}>
        {label ? <span className="ph__label">{label}</span> : null}
        {children}
      </div>
    );
  }

  // ---- money ----
  const money = (n) => "$" + Number(n).toLocaleString("en-US");

  // ---- dates ----
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function pad(n) { return String(n).padStart(2, "0"); }
  function toISO(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function fromISO(s) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }
  function addDays(iso, n) { const d = fromISO(iso); d.setDate(d.getDate() + n); return toISO(d); }
  function fmtShort(iso) { const d = fromISO(iso); return MONTHS[d.getMonth()] + " " + d.getDate(); }
  function fmtLong(iso) { const d = fromISO(iso); return DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(); }
  function nights(a, b) { return Math.max(1, Math.round((fromISO(b) - fromISO(a)) / 86400000)); }

  const TODAY = "2026-06-12";
  const DEFAULTS = { checkIn: TODAY, checkOut: addDays(TODAY, 3) };

  // ---- section heading ----
  function SectionHead({ eyebrow, title, sub, align = "left", onDark = false }) {
    return (
      <div style={{ textAlign: align, maxWidth: align === "center" ? 640 : 760, marginInline: align === "center" ? "auto" : 0 }}>
        {eyebrow ? <div className={"eyebrow" + (onDark ? " on-dark" : "")} style={{ marginBottom: 16 }}>{eyebrow}</div> : null}
        <h2 className="display" style={{ fontSize: 38, margin: 0, color: onDark ? "#fff" : "var(--ink)" }}>{title}</h2>
        {sub ? <p className="muted" style={{ fontSize: 16.5, lineHeight: 1.6, marginTop: 14, color: onDark ? "rgba(255,255,255,.7)" : "var(--muted)" }}>{sub}</p> : null}
      </div>
    );
  }

  // ---- select (styled native) ----
  function Select({ value, onChange, children, error, ...p }) {
    return (
      <div className="select-wrap">
        <select className={"select" + (error ? " select--error" : "")} value={value} onChange={onChange} {...p}>{children}</select>
        <span className="select-wrap__chev"><window.Icon name="chevDown" size={16} /></span>
      </div>
    );
  }

  // ---- counter ----
  function Counter({ value, onChange, min = 1, max = 9 }) {
    return (
      <div className="counter">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="decrease">
          <window.Icon name="minus" size={16} />
        </button>
        <span className="counter__val tnum">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="increase">
          <window.Icon name="plus" size={16} />
        </button>
      </div>
    );
  }

  // ---- checkbox ----
  function Check({ checked, onChange, label, count }) {
    return (
      <label className="check">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="check__box"><window.Icon name="checkSmall" size={12} sw={2.6} /></span>
        <span className="check__label">{label}</span>
        {count != null ? <span className="check__count tnum">{count}</span> : null}
      </label>
    );
  }

  // ---- amenity row ----
  function Amenity({ akey, label }) {
    const lbl = label || (window.AURELIA.AMENITIES[akey] || akey);
    return (
      <span className="amen"><window.Icon name={akey} size={16} />{lbl}</span>
    );
  }

  window.UI = { Img, money, SectionHead, Select, Counter, Check, Amenity,
    dates: { toISO, fromISO, addDays, fmtShort, fmtLong, nights, TODAY, DEFAULTS, MONTHS, DAYS, pad } };
})();

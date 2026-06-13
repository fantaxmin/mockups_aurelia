/* Icon set — minimal line icons (functional UI, not imagery) */
(function () {
  const S = ({ children, size = 18, sw = 1.6, fill = "none", ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}>
      {children}
    </svg>
  );

  const PATHS = {
    wifi: <><path d="M2 8.5a16 16 0 0 1 20 0" /><path d="M5 12a11 11 0 0 1 14 0" /><path d="M8.5 15.5a6 6 0 0 1 7 0" /><circle cx="12" cy="19" r="0.6" fill="currentColor" stroke="none" /></>,
    ac: <><rect x="2.5" y="4.5" width="19" height="9" rx="1.5" /><path d="M6 17.5c0 1.2-.6 1.8-1.5 2.2M12 17.5c0 1.4-.8 2-1.8 2.6M18 17.5c0 1.2-.6 1.8-1.5 2.2" /></>,
    pool: <><path d="M3 18c1.3 0 1.3 1 2.6 1s1.3-1 2.6-1 1.3 1 2.6 1 1.3-1 2.6-1 1.3 1 2.6 1 1.3-1 2.6-1" /><path d="M3 14c1.3 0 1.3 1 2.6 1s1.3-1 2.6-1 1.3 1 2.6 1 1.3-1 2.6-1 1.3 1 2.6 1 1.3-1 2.6-1" /><path d="M7 14V5.5A1.5 1.5 0 0 1 8.5 4M7 9h4" /></>,
    parking: <><rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M9.5 16.5V8h3.2a2.4 2.4 0 0 1 0 4.8H9.5" /></>,
    breakfast: <><path d="M5 8h11v3a5.5 5.5 0 0 1-11 0V8Z" /><path d="M16 9h1.8a1.7 1.7 0 0 1 0 3.4H16" /><path d="M7.5 4.5c-.4.6-.4 1.2 0 1.8M10.5 4.5c-.4.6-.4 1.2 0 1.8M13 19.5H8" /></>,
    tv: <><rect x="2.5" y="5" width="19" height="12" rx="1.6" /><path d="M8 20.5h8M12 17v3.5" /></>,
    safe: <><rect x="3.5" y="4.5" width="17" height="15" rx="1.6" /><circle cx="13" cy="12" r="3.2" /><path d="M13 9v1.4M13 8.8l.001 0M7 8v8" /></>,
    minibar: <><rect x="5" y="3.5" width="14" height="17" rx="1.6" /><path d="M5 9h14M9 6v.8M9 12.5v2" /></>,
    bath: <><path d="M3 12h18v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2Z" /><path d="M5 12V6.2A2.2 2.2 0 0 1 7.2 4c.9 0 1.4.4 1.8 1M7 20l-1 1.5M18 20l1 1.5" /></>,
    balcony: <><path d="M3 21V11l9-5 9 5v10" /><path d="M3 21h18M8 21v-6h8v6M12 11v4" /></>,
    star: <path d="M12 3.6l2.5 5.1 5.6.8-4 4 .95 5.6L12 16.5 6.95 19.1 7.9 13.5l-4-4 5.6-.8L12 3.6Z" fill="currentColor" stroke="none" />,
    starHalf: <path d="M12 3.6v12.9L6.95 19.1 7.9 13.5l-4-4 5.6-.8L12 3.6Z" fill="currentColor" stroke="none" />,
    check: <path d="M5 12.5l4.2 4.2L19 6.5" />,
    checkSmall: <path d="M4 8l3 3 6-7" sw="2.4" />,
    chevDown: <path d="M6 9l6 6 6-6" />,
    chevLeft: <path d="M15 6l-6 6 6 6" />,
    chevRight: <path d="M9 6l6 6-6 6" />,
    arrowRight: <path d="M4 12h16M14 6l6 6-6 6" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
    pin: <><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" /></>,
    cal: <><rect x="3.5" y="5" width="17" height="15.5" rx="1.6" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></>,
    user: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5" /></>,
    users: <><circle cx="9" cy="8.5" r="3.2" /><path d="M3 19.5c0-3.2 2.7-4.8 6-4.8s6 1.6 6 4.8" /><path d="M16 5.4a3.2 3.2 0 0 1 0 6.1M21 19.5c0-2.6-1.7-4.1-4-4.6" /></>,
    shield: <><path d="M12 3l7 2.5v5.5c0 4.6-3 8-7 9.5-4-1.5-7-4.9-7-9.5V5.5L12 3Z" /><path d="M9 12l2 2 4-4.2" /></>,
    cancel: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
    support: <><circle cx="12" cy="12" r="8.5" /><path d="M8 13a4 4 0 0 0 8 0M9.5 9.5h.01M14.5 9.5h.01" /></>,
    download: <><path d="M12 4v11M7.5 10.5L12 15l4.5-4.5" /><path d="M5 19.5h14" /></>,
    map: <><path d="M9 5.5L3.5 7.7v11l5.5-2.2 6 2.2 5.5-2.2v-11L15 7.7 9 5.5Z" /><path d="M9 5.5v11M15 7.7v11" /></>,
    key: <><circle cx="8" cy="8" r="3.8" /><path d="M10.7 10.7L20 20M16.5 16.5l2-2M14 14l1.6-1.6" /></>,
    concierge: <><path d="M5 18.5h14M6.5 18.5a5.5 5.5 0 0 1 11 0M12 8v5M12 5.5a1.4 1.4 0 1 0 0-.1" /></>,
    bed: <><path d="M3 8v11M3 13h18v6M21 19v-2M21 13a3 3 0 0 0-3-3H8a2.5 2.5 0 0 0-2.5 2.5V13" /></>,
    expand: <><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    quote: <path d="M9 7c-2.5 1-4 3-4 6h3v4H4v-4M19 7c-2.5 1-4 3-4 6h3v4h-4v-4" fill="none" />,
    print: <><path d="M6 9V4h12v5M6 18H4v-6h16v6h-2M8 14h8v6H8z" /></>,
    lock: <><rect x="5" y="11" width="14" height="9" rx="1.6" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    card: <><rect x="3" y="5.5" width="18" height="13" rx="1.8" /><path d="M3 9.5h18M6.5 14.5h4" /></>,
  };

  function Icon({ name, size = 18, sw = 1.6, ...p }) {
    const path = PATHS[name];
    if (!path) return null;
    return <S size={size} sw={sw} {...p}>{path}</S>;
  }

  function Stars({ value = 0, size = 15 }) {
    const items = [];
    for (let i = 1; i <= 5; i++) {
      const diff = value - i;
      let nm = "star";
      let cls = "";
      if (diff <= -1) { cls = "empty"; }
      else if (diff < 0) { nm = "starHalf"; }
      items.push(
        <span key={i} style={{ position: "relative", width: size, height: size, display: "inline-block" }}>
          <span style={{ position: "absolute", inset: 0, color: "rgba(20,35,57,.16)" }}>
            <S size={size}>{PATHS.star}</S>
          </span>
          {nm !== "star" || diff >= 0 ? (
            <span style={{ position: "absolute", inset: 0, color: "var(--gold)" }}>
              <S size={size}>{PATHS[diff < 0 ? "starHalf" : "star"]}</S>
            </span>
          ) : null}
        </span>
      );
    }
    return <span className="stars" aria-label={value + " stars"}>{items}</span>;
  }

  window.Icon = Icon;
  window.Stars = Stars;
})();

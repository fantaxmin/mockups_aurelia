/* Screen 2 — Search Results -> window.Results */
(function () {
  const { useState, useMemo } = React;

  const SORTS = { price: "Price (low to high)", rating: "Guest rating", popularity: "Popularity" };

  function ResultCard({ room, search, onOpen, onReserve }) {
    const n = window.UI.dates.nights(search.checkIn, search.checkOut);
    return (
      <article className="card" style={{ display: "grid", gridTemplateColumns: "300px 1fr", overflow: "hidden", transition: "box-shadow .2s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}>
        <window.UI.Img label={room.name} style={{ minHeight: 232 }} onClick={() => onOpen(room)}>
          <span style={{ position: "absolute", top: 14, left: 14 }}><span className="badge badge--avail"><span className="dot" />Available · {room.badge}</span></span>
        </window.UI.Img>
        <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <span className="badge badge--soft">{room.type}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                  <window.Stars value={room.rating} size={14} />
                  <span className="tnum" style={{ fontWeight: 600 }}>{room.rating}</span>
                  <span className="muted">({room.reviews})</span>
                </span>
              </div>
              <h3 className="display" style={{ fontSize: 22, margin: "0 0 6px", cursor: "pointer" }} onClick={() => onOpen(room)}>{room.name}</h3>
              <div className="muted" style={{ fontSize: 13.5, display: "flex", gap: 16 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><window.Icon name="bed" size={15} />{room.beds}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><window.Icon name="users" size={15} />Sleeps {room.sleeps}</span>
                <span className="tnum">{room.sqm} m²</span>
              </div>
            </div>
          </div>
          <p className="muted" style={{ fontSize: 14, lineHeight: 1.55, margin: "14px 0 16px" }}>{room.blurb}</p>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 18 }}>
            {room.amenities.slice(0, 5).map((a) => <span key={a} style={{ color: "var(--gold-ink)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5 }}><window.Icon name={a} size={16} />{window.AURELIA.AMENITIES[a]}</span>)}
            {room.amenities.length > 5 ? <span className="muted" style={{ fontSize: 12.5, alignSelf: "center" }}>+{room.amenities.length - 5} more</span> : null}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line-2)" }}>
            <div>
              <span className="display" style={{ fontSize: 25 }}>{window.UI.money(room.price)}</span>
              <span className="muted" style={{ fontSize: 13.5 }}> / night</span>
              <div className="muted" style={{ fontSize: 12.5 }}>{window.UI.money(room.price * n)} total · {n} nights</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn--ghost" onClick={() => onOpen(room)}>Details</button>
              <button className="btn btn--gold" onClick={() => onReserve(room)}>Reserve</button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  function Results({ search, setSearch, onOpenRoom, onReserve, onHome, onRooms }) {
    const data = window.AURELIA;
    const d = window.UI.dates;
    const prices = data.ROOMS.map((r) => r.price);
    const MIN = Math.min(...prices), MAX = Math.max(...prices);

    const [maxPrice, setMaxPrice] = useState(MAX);
    const [types, setTypes] = useState([]);
    const [amen, setAmen] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [sort, setSort] = useState("popularity");

    const typeCounts = useMemo(() => {
      const m = {}; data.ROOMS.forEach((r) => (m[r.type] = (m[r.type] || 0) + 1)); return m;
    }, []);
    const amenList = ["wifi", "ac", "pool", "parking", "breakfast"];

    const filtered = useMemo(() => {
      let list = data.ROOMS.filter((r) =>
        r.price <= maxPrice &&
        (types.length === 0 || types.includes(r.type)) &&
        (amen.length === 0 || amen.every((a) => r.amenities.includes(a))) &&
        r.rating >= minRating
      );
      if (sort === "price") list = [...list].sort((a, b) => a.price - b.price);
      else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
      else list = [...list].sort((a, b) => b.reviews - a.reviews);
      return list;
    }, [maxPrice, types, amen, minRating, sort]);

    const toggle = (val, list, set) => set(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);
    const reset = () => { setMaxPrice(MAX); setTypes([]); setAmen([]); setMinRating(0); };
    const activeCount = (maxPrice < MAX ? 1 : 0) + types.length + amen.length + (minRating > 0 ? 1 : 0);

    return (
      <div className="screen" style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <window.TopNav active="Rooms" onHome={onHome} onRooms={onRooms} />

        {/* criteria bar */}
        <div style={{ background: "#fff", borderBottom: "1px solid var(--line)", position: "sticky", top: 78, zIndex: 30 }}>
          <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 14, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontWeight: 600 }}><window.Icon name="pin" size={16} />{search.destination || data.HOTEL}</span>
              <span className="divider-v" style={{ height: 16 }} />
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><window.Icon name="cal" size={16} />{d.fmtShort(search.checkIn)} – {d.fmtShort(search.checkOut)}</span>
              <span className="divider-v" style={{ height: 16 }} />
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><window.Icon name="users" size={16} />{search.adults + search.children} guests · {search.rooms} room{search.rooms > 1 ? "s" : ""}</span>
              <button className="btn btn--ghost" style={{ padding: "7px 14px", fontSize: 13 }} onClick={onHome}>Modify</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="muted" style={{ fontSize: 13.5 }}>Sort by</span>
              <div style={{ width: 210 }}>
                <window.UI.Select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </window.UI.Select>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "286px 1fr", gap: 36, padding: "36px 40px 96px", alignItems: "start" }}>
          {/* FILTERS */}
          <aside style={{ position: "sticky", top: 158 }}>
            <div className="card" style={{ padding: "22px 22px 8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <h3 className="display" style={{ fontSize: 18, margin: 0 }}>Filters</h3>
                {activeCount > 0 ? <button onClick={reset} style={{ border: 0, background: "none", color: "var(--gold-ink)", fontSize: 13, fontWeight: 600 }}>Clear ({activeCount})</button> : null}
              </div>

              <FilterGroup title="Price per night">
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 12 }}>
                  <span className="muted">{window.UI.money(MIN)}</span>
                  <span style={{ fontWeight: 700 }}>Up to {window.UI.money(maxPrice)}</span>
                </div>
                <input type="range" className="range" min={MIN} max={MAX} step={10} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} />
              </FilterGroup>

              <FilterGroup title="Room type">
                {data.ROOM_TYPES.map((t) => <window.UI.Check key={t} label={t} count={typeCounts[t] || 0} checked={types.includes(t)} onChange={() => toggle(t, types, setTypes)} />)}
              </FilterGroup>

              <FilterGroup title="Amenities">
                {amenList.map((a) => <window.UI.Check key={a} label={data.AMENITIES[a]} checked={amen.includes(a)} onChange={() => toggle(a, amen, setAmen)} />)}
              </FilterGroup>

              <FilterGroup title="Guest rating" last>
                {[4.5, 4, 3.5, 0].map((r) => (
                  <label key={r} className="check" onClick={() => setMinRating(r)}>
                    <span className="check__box" style={{ borderRadius: 999, background: minRating === r ? "var(--navy-900)" : "#fff", borderColor: minRating === r ? "var(--navy-900)" : "var(--line)" }}>
                      {minRating === r ? <span style={{ width: 7, height: 7, borderRadius: 999, background: "#fff" }} /> : null}
                    </span>
                    <span className="check__label" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      {r === 0 ? "Any rating" : <><window.Stars value={r} size={13} /> {r}+</>}
                    </span>
                  </label>
                ))}
              </FilterGroup>
            </div>
          </aside>

          {/* RESULTS */}
          <main>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <h1 className="display" style={{ fontSize: 27, margin: 0 }}>{filtered.length} room{filtered.length !== 1 ? "s" : ""} available</h1>
              <span className="muted" style={{ fontSize: 14 }}>{d.fmtLong(search.checkIn)} → {d.fmtLong(search.checkOut)}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {filtered.map((r) => <ResultCard key={r.id} room={r} search={search} onOpen={onOpenRoom} onReserve={onReserve} />)}
              {filtered.length === 0 ? (
                <div className="card" style={{ padding: 56, textAlign: "center" }}>
                  <h3 className="display" style={{ fontSize: 20, margin: "0 0 8px" }}>No rooms match your filters</h3>
                  <p className="muted" style={{ margin: "0 0 20px" }}>Try widening your price range or removing a filter.</p>
                  <button className="btn btn--navy" onClick={reset}>Clear filters</button>
                </div>
              ) : null}
            </div>
          </main>
        </div>
        <window.Footer />
      </div>
    );
  }

  function FilterGroup({ title, children, last }) {
    return (
      <div style={{ padding: "18px 0", borderBottom: last ? "0" : "1px solid var(--line-2)" }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>{title}</div>
        {children}
      </div>
    );
  }

  window.Results = Results;
})();

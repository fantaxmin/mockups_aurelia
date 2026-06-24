/* Pantalla 2 — Resultados de búsqueda (listado + filtros). */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "../components/TopNav.jsx";
import { Footer } from "../components/Footer.jsx";
import { Select } from "../components/ui/Select.jsx";
import { Icon } from "../components/Icon.jsx";
import { ResultCard } from "../components/rooms/ResultCard.jsx";
import { FilterPanel } from "../components/filters/FilterPanel.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { fmtShort, fmtLong } from "../lib/format.js";
import { HABITACIONES } from "@shared/data/habitaciones.js";
import { resolverDestino } from "@shared/data/destinos.js";
import { HOTEL } from "@shared/data/hotel.js";
import filtrarHabitaciones from "@shared/logic/filtrarHabitaciones.js";

const SORTS = { price: "Price (low to high)", rating: "Guest rating", popularity: "Popularity" };

export default function Results() {
  const navigate = useNavigate();
  const { search, setRoom } = useBooking();

  // Resuelve el destino buscado a una sede y limita el catálogo a esa ubicación.
  const destino = useMemo(() => resolverDestino(search.destination), [search.destination]);
  const roomsEnDestino = useMemo(
    () => (destino ? HABITACIONES.filter((r) => r.destinoId === destino.id) : []),
    [destino]
  );

  const prices = roomsEnDestino.map((r) => r.price);
  const MIN = prices.length ? Math.min(...prices) : 0;
  const MAX = prices.length ? Math.max(...prices) : 1000;

  const [maxPrice, setMaxPrice] = useState(MAX);
  const [types, setTypes] = useState([]);
  const [amen, setAmen] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("popularity");

  // El rango de precio se reajusta al cambiar de destino.
  useEffect(() => { setMaxPrice(MAX); }, [MAX]);

  const typeCounts = useMemo(() => {
    const m = {};
    roomsEnDestino.forEach((r) => (m[r.type] = (m[r.type] || 0) + 1));
    return m;
  }, [roomsEnDestino]);

  const filtered = useMemo(() => {
    if (roomsEnDestino.length === 0) return [];
    // CU-02 — filtra por precio, rating y amenidades con la lógica compartida.
    let list = filtrarHabitaciones(roomsEnDestino, {
      precioMax: maxPrice,
      ratingMin: minRating || undefined,
      amenidades: amen,
    });
    // El panel permite varios tipos a la vez (la lógica base filtra por uno).
    if (types.length > 0) list = list.filter((r) => types.includes(r.type));

    if (sort === "price") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [roomsEnDestino, maxPrice, types, amen, minRating, sort]);

  const reset = () => { setMaxPrice(MAX); setTypes([]); setAmen([]); setMinRating(0); };
  const activeCount = (maxPrice < MAX ? 1 : 0) + types.length + amen.length + (minRating > 0 ? 1 : 0);

  const openRoom = (room) => { setRoom(room); navigate("/rooms/" + room.id); };
  const totalGuests = search.adults + search.children;

  return (
    <div className="screen" style={{ minHeight: "100vh", background: "var(--color-paper)" }}>
      <TopNav active="Rooms" />

      {/* barra de criterios */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--line)", position: "sticky", top: 78, zIndex: 30 }}>
        <div className="wrap criteria-bar flex flex-wrap items-center justify-between gap-3" style={{ padding: "16px 40px" }}>
          <div className="flex items-center flex-wrap gap-4" style={{ fontSize: 14 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontWeight: 600 }}><Icon name="pin" size={16} />{search.destination || HOTEL}</span>
            <span className="divider-v" style={{ height: 16 }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Icon name="cal" size={16} />{fmtShort(search.checkIn)} – {fmtShort(search.checkOut)}</span>
            <span className="divider-v" style={{ height: 16 }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Icon name="users" size={16} />{totalGuests} guests · {search.rooms} room{search.rooms > 1 ? "s" : ""}</span>
            <button type="button" className="btn btn--ghost" style={{ padding: "7px 14px", fontSize: 13 }} onClick={() => navigate("/")}>Modify</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <label htmlFor="sort" className="muted" style={{ fontSize: 13.5 }}>Sort by</label>
            <div style={{ width: 210 }}>
              <Select id="sort" aria-label="Ordenar resultados" value={sort} onChange={(e) => setSort(e.target.value)}>
                {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap grid-results grid gap-9 items-start grid-cols-1 lg:grid-cols-[286px_1fr]" style={{ padding: "36px 40px 96px" }}>
        {/* FILTROS */}
        <aside className="filters-aside lg:sticky" aria-label="Filtros de búsqueda" style={{ top: 158 }}>
          <FilterPanel
            min={MIN}
            max={MAX}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            types={types}
            setTypes={setTypes}
            amen={amen}
            setAmen={setAmen}
            minRating={minRating}
            setMinRating={setMinRating}
            typeCounts={typeCounts}
            activeCount={activeCount}
            onReset={reset}
          />
        </aside>

        {/* RESULTADOS */}
        <main>
          <div className="flex flex-wrap gap-2 justify-between items-baseline" style={{ marginBottom: 20 }}>
            <h1 className="display" style={{ fontSize: 27, margin: 0 }}>{filtered.length} room{filtered.length !== 1 ? "s" : ""} available</h1>
            <span className="muted" style={{ fontSize: 14 }}>{fmtLong(search.checkIn)} → {fmtLong(search.checkOut)}</span>
          </div>
          {filtered.length > 0 ? (
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 20 }}>
              {filtered.map((r) => <li key={r.id}><ResultCard room={r} search={search} onOpen={openRoom} onReserve={openRoom} /></li>)}
            </ul>
          ) : roomsEnDestino.length === 0 ? (
            <div className="card" style={{ padding: 56, textAlign: "center" }}>
              <h3 className="display" style={{ fontSize: 20, margin: "0 0 8px" }}>No properties in {search.destination || "that destination"} yet</h3>
              <p className="muted" style={{ margin: "0 0 20px" }}>We don't have a hotel there for now. Try Lisbon, Porto, Madrid, Barcelona or Paris.</p>
              <button type="button" className="btn btn--navy" onClick={() => navigate("/")}>Change destination</button>
            </div>
          ) : (
            <div className="card" style={{ padding: 56, textAlign: "center" }}>
              <h3 className="display" style={{ fontSize: 20, margin: "0 0 8px" }}>No rooms match your filters</h3>
              <p className="muted" style={{ margin: "0 0 20px" }}>Try widening your price range or removing a filter.</p>
              <button type="button" className="btn btn--navy" onClick={reset}>Clear filters</button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

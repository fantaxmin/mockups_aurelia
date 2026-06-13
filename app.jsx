/* App — router, state, tweaks -> mounts to #root */
(function () {
  const { useState, useEffect, useMemo } = React;
  const d = window.UI.dates;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "#b6924f",
    "corners": "refined",
    "heroTone": "dusk",
    "headingFont": "Schibsted Grotesk"
  }/*EDITMODE-END*/;

  function genRef() {
    const a = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    let s = "AUR-";
    for (let i = 0; i < 3; i++) s += a[Math.floor(Math.random() * a.length)];
    s += "-" + Math.floor(1000 + Math.random() * 9000);
    return s;
  }

  function App() {
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

    const [route, setRoute] = useState("home"); // home|results|detail|checkout|confirm
    const [search, setSearch] = useState({
      destination: "Hotel Aurelia, Lisbon",
      checkIn: d.DEFAULTS.checkIn,
      checkOut: d.DEFAULTS.checkOut,
      adults: 2, children: 0, rooms: 1,
    });
    // --- defaults so any screen renders fully populated (e.g. for export capture) ---
    const DEFAULT_ROOM = window.AURELIA.ROOMS.find((r) => r.id === "deluxe-king");
    const defTotals = (() => {
      const n = d.nights(d.DEFAULTS.checkIn, d.DEFAULTS.checkOut);
      const roomTotal = DEFAULT_ROOM.price * n;
      const taxes = Math.round(roomTotal * 0.12);
      const fee = 28;
      return { n, roomTotal, taxes, fee, total: roomTotal + taxes + fee };
    })();

    const [room, setRoom] = useState(DEFAULT_ROOM);
    const [booking, setBooking] = useState({
      room: DEFAULT_ROOM, totals: defTotals,
      search: { destination: "Hotel Aurelia, Lisbon", checkIn: d.DEFAULTS.checkIn, checkOut: d.DEFAULTS.checkOut, adults: 2, children: 0, rooms: 1 },
    });
    const [bookingRef, setBookingRef] = useState("AUR-KQF-2048");
    const [guest, setGuest] = useState({
      name: "Eleanor Vance", email: "eleanor.vance@email.com", phone: "+351 912 345 678", nationality: "Portugal", requests: "",
      card: "", exp: "", cvc: "", cardName: "",
    });

    // apply tweaks as CSS vars
    useEffect(() => {
      const r = document.documentElement.style;
      const accent = t.accent || "#b6924f";
      r.setProperty("--gold", accent);
      // derive lighter / inky shades
      r.setProperty("--gold-2", `color-mix(in oklab, ${accent} 78%, white)`);
      r.setProperty("--gold-ink", `color-mix(in oklab, ${accent} 72%, #2a2008)`);
      const rad = t.corners === "sharp" ? "0px" : t.corners === "soft" ? "10px" : "4px";
      const radLg = t.corners === "sharp" ? "0px" : t.corners === "soft" ? "18px" : "8px";
      r.setProperty("--radius", rad);
      r.setProperty("--radius-lg", radLg);
      r.setProperty("--ff-display", `"${t.headingFont}", system-ui, sans-serif`);
    }, [t.accent, t.corners, t.headingFont]);

    function go(next) { setRoute(next); window.scrollTo({ top: 0, behavior: "auto" }); }

    // expose a global navigation hook for export/capture tooling
    useEffect(() => { window.gotoScreen = (next) => { setRoute(next); window.scrollTo(0, 0); }; }, []);

    const onSearch = () => go("results");
    const onOpenRoom = (r) => { setRoom(r); go("detail"); };
    const onReserve = (r) => { // straight from results -> build booking with defaults then detail
      setRoom(r); go("detail");
    };
    const onConfirmReservation = (r, totals) => {
      setBooking({ room: r, totals, search: { ...search } });
      go("checkout");
    };
    const onCompleteCheckout = () => {
      setBookingRef(genRef());
      go("confirm");
    };

    let screen;
    if (route === "home") screen = <window.Home search={search} setSearch={setSearch} onSearch={onSearch} onOpenRoom={onOpenRoom} onBookRoom={onOpenRoom} onRooms={() => go("results")} />;
    else if (route === "results") screen = <window.Results search={search} setSearch={setSearch} onOpenRoom={onOpenRoom} onReserve={onReserve} onHome={() => go("home")} onRooms={() => go("results")} />;
    else if (route === "detail") screen = <window.Detail room={room} search={search} setSearch={setSearch} onConfirm={onConfirmReservation} onHome={() => go("home")} onRooms={() => go("results")} onBack={() => go("results")} />;
    else if (route === "checkout") screen = <window.Checkout booking={booking} guest={guest} setGuest={setGuest} onComplete={onCompleteCheckout} onBack={() => go("detail")} onHome={() => go("home")} onRooms={() => go("results")} />;
    else if (route === "confirm") screen = <window.Confirmation booking={booking} guest={guest} bookingRef={bookingRef} onHome={() => { go("home"); }} onRooms={() => go("results")} />;

    const { TweaksPanel, TweakSection, TweakColor, TweakRadio } = window;

    return (
      <>
        {screen}
        <TweaksPanel>
          <TweakSection label="Accent" />
          <TweakColor label="Gold tone" value={t.accent}
            options={["#b6924f", "#c8a24e", "#a9824a", "#b98a5e", "#9c7f55"]}
            onChange={(v) => setTweak("accent", v)} />
          <TweakSection label="Form" />
          <TweakRadio label="Corners" value={t.corners} options={["sharp", "refined", "soft"]} onChange={(v) => setTweak("corners", v)} />
          <TweakSection label="Type" />
          <TweakRadio label="Headings" value={t.headingFont}
            options={["Schibsted Grotesk", "Marcellus", "Cormorant Garamond"]}
            onChange={(v) => setTweak("headingFont", v)} />
        </TweaksPanel>
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();

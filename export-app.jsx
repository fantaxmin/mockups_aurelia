/* Export entry — renders ALL 5 screens stacked in the DOM at once,
   each in a uniquely-id'd uniform frame, so a screenshot tool can
   capture each by id with zero navigation/timing races. */
(function () {
  const d = window.UI.dates;
  const noop = () => {};
  const FRAME_H = 3060;

  function ExportApp() {
    const data = window.AURELIA;
    const search = { destination: "Hotel Aurelia, Lisbon", checkIn: d.DEFAULTS.checkIn, checkOut: d.DEFAULTS.checkOut, adults: 2, children: 0, rooms: 1 };
    const room = data.ROOMS.find((r) => r.id === "deluxe-king");
    const n = d.nights(search.checkIn, search.checkOut);
    const roomTotal = room.price * n;
    const taxes = Math.round(roomTotal * 0.12);
    const fee = 28;
    const totals = { n, roomTotal, taxes, fee, total: roomTotal + taxes + fee };
    const booking = { room, totals, search };
    const guest = { name: "Eleanor Vance", email: "eleanor.vance@email.com", phone: "+351 912 345 678", nationality: "Portugal", requests: "", card: "", exp: "", cvc: "", cardName: "" };

    const Frame = ({ id, children }) => (
      <div id={id} style={{ minHeight: FRAME_H, background: "#0b1422", overflow: "hidden" }}>{children}</div>
    );

    return (
      <div>
        <Frame id="exp-home"><window.Home search={search} setSearch={noop} onSearch={noop} onOpenRoom={noop} onBookRoom={noop} onRooms={noop} /></Frame>
        <Frame id="exp-results"><window.Results search={search} setSearch={noop} onOpenRoom={noop} onReserve={noop} onHome={noop} onRooms={noop} /></Frame>
        <Frame id="exp-detail"><window.Detail room={room} search={search} setSearch={noop} onConfirm={noop} onHome={noop} onRooms={noop} onBack={noop} /></Frame>
        <Frame id="exp-checkout"><window.Checkout booking={booking} guest={guest} setGuest={noop} onComplete={noop} onBack={noop} onHome={noop} onRooms={noop} /></Frame>
        <Frame id="exp-confirm"><window.Confirmation booking={booking} guest={guest} bookingRef={"AUR-KQF-2048"} onHome={noop} onRooms={noop} /></Frame>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<ExportApp />);
})();

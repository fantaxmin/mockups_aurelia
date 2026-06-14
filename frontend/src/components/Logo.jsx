/* Logotipo de Aurelia (marca + wordmark). */
export function Logo({ dark }) {
  const stroke = dark ? "var(--color-gold2)" : "var(--color-gold)";
  return (
    <span className="logo">
      <svg className="logo__mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="29" height="29" rx="2" stroke={stroke} strokeWidth="1.4" />
        <path d="M16 7l5.5 12.5h-3.1L16 13.4l-2.4 6.1h-3.1L16 7Z" fill={stroke} />
        <path d="M11 22.5h10" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      AURELIA
    </span>
  );
}

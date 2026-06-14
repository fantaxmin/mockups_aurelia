/**
 * Envoltura sobre lucide-react.
 * Mantiene los nombres de íconos usados en las pantallas (pin, cal, bed, …)
 * y los mapea a los componentes de Lucide, para no acoplar las vistas a la
 * librería concreta. La API se conserva: <Icon name="pin" size={18} />.
 */
import {
  Wifi,
  AirVent,
  Waves,
  SquareParking,
  Coffee,
  Tv,
  Vault,
  Refrigerator,
  Bath,
  Sunrise,
  Star,
  StarHalf,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Search,
  MapPin,
  Calendar,
  User,
  Users,
  ShieldCheck,
  CalendarClock,
  Headset,
  Download,
  Map,
  KeyRound,
  ConciergeBell,
  BedDouble,
  Maximize2,
  Plus,
  Minus,
  Lock,
  CreditCard,
  Menu,
  X,
  TriangleAlert,
} from "lucide-react";

// Nombre interno -> componente Lucide.
const MAP = {
  wifi: Wifi,
  ac: AirVent,
  pool: Waves,
  parking: SquareParking,
  breakfast: Coffee,
  tv: Tv,
  safe: Vault,
  minibar: Refrigerator,
  bath: Bath,
  balcony: Sunrise,
  star: Star,
  starHalf: StarHalf,
  check: Check,
  checkSmall: Check,
  chevDown: ChevronDown,
  chevLeft: ChevronLeft,
  chevRight: ChevronRight,
  arrowRight: ArrowRight,
  search: Search,
  pin: MapPin,
  cal: Calendar,
  user: User,
  users: Users,
  shield: ShieldCheck,
  cancel: CalendarClock,
  support: Headset,
  download: Download,
  map: Map,
  key: KeyRound,
  concierge: ConciergeBell,
  bed: BedDouble,
  expand: Maximize2,
  plus: Plus,
  minus: Minus,
  lock: Lock,
  card: CreditCard,
  menu: Menu,
  close: X,
  alert: TriangleAlert,
};

/**
 * @param {string} name  Nombre interno del ícono.
 * @param {number} [size=18]
 * @param {number} [sw=1.6] Grosor del trazo.
 */
export function Icon({ name, size = 18, sw = 1.6, ...p }) {
  const Cmp = MAP[name];
  if (!Cmp) return null;
  return <Cmp size={size} strokeWidth={sw} {...p} />;
}

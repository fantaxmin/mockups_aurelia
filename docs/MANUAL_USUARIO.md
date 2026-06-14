# Manual de Usuario — Hotel Aurelia

Guía rápida para reservar una habitación en el sistema en línea del Hotel Aurelia.
Redactada en lenguaje claro, orientada a tareas (siguiendo la estructura propuesta en el
informe del proyecto).

## 1. Introducción
El sistema permite buscar habitaciones disponibles, comparar opciones, ver el detalle de
cada habitación y completar una reserva en pocos pasos. No necesitas crear una cuenta para
reservar.

## 2. Primeros pasos
- Abre la aplicación en tu navegador.
- En la página principal verás el formulario de búsqueda sobre la imagen de portada.

## 3. Búsqueda de disponibilidad
1. Escribe tu **destino**.
2. Elige la **fecha de entrada (check-in)** y la **fecha de salida (check-out)**.
3. Indica el número de **huéspedes** (y habitaciones).
4. Pulsa **Search Availability**.

> Si falta un dato o las fechas no son válidas, aparecerá un mensaje emergente explicando
> qué corregir (por ejemplo, "La fecha de check-out debe ser posterior").

## 4. Filtrar y elegir habitación
- En la pantalla de resultados, usa el panel de **filtros** (precio, tipo, amenidades,
  calificación) y el orden (precio, calificación, popularidad).
- Pulsa **Details** para ver el detalle, o **Reserve** para reservar directamente.

## 5. Detalle de la habitación
- Revisa la galería, las amenidades y las reseñas de huéspedes.
- Ajusta fechas y huéspedes: el **precio total se recalcula automáticamente**
  (precio por noche + impuestos 12% + cargo por servicio).
- Pulsa **Confirm Reservation**.

## 6. Completar la reserva (checkout)
El proceso tiene tres pasos: **Tus datos → Pago → Confirmación**.
1. **Tus datos:** nombre completo, correo, teléfono, nacionalidad y solicitudes (opcional).
   Los datos del usuario de prueba se cargan automáticamente.
2. **Pago:** información de la tarjeta (no se realiza ningún cobro real).
3. Al finalizar verás la **confirmación** con tu número de referencia (formato `AUR-XXX-0000`).

> Cualquier dato inválido (correo o teléfono mal formados, campos vacíos) se señala en el
> propio campo y con un mensaje emergente.

## 7. Confirmación y soporte
- Guarda tu **número de referencia**.
- Puedes **descargar la confirmación en PDF** (botón *Download Confirmation PDF*) o volver
  al inicio.
- Cancelación gratuita hasta 24 horas antes de la llegada.

---

### Nota técnica
Las reservas se almacenan de forma temporal y se eliminan automáticamente tras un período
(24 horas por defecto). Es un entorno de demostración.

/**
 * Sistema de notificaciones tipo toast / pop-up.
 *
 * La lógica de negocio lanza Error; la UI atrapa y llama a useToast().error(msg)
 * para mostrarlo como pop-up visible (en vez de dejarlo en consola).
 */
import { createContext, useCallback, useContext, useState } from "react";
import { Icon } from "./Icon.jsx";

const ToastContext = createContext(null);

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (mensaje, tipo = "error", duracion = 5000) => {
      const id = nextId++;
      setToasts((list) => [...list, { id, mensaje, tipo }]);
      if (duracion) setTimeout(() => remove(id), duracion);
      return id;
    },
    [remove]
  );

  const api = {
    show: push,
    error: (m, d) => push(m, "error", d),
    success: (m, d) => push(m, "success", d),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-stack" role="region" aria-live="assertive">
        {toasts.map((t) => (
          <div key={t.id} className={"toast toast--" + t.tipo}>
            <span className="toast__icon">
              <Icon name={t.tipo === "success" ? "check" : "alert"} size={18} />
            </span>
            <div className="toast__body">
              <div className="toast__title">{t.tipo === "success" ? "Listo" : "No se pudo continuar"}</div>
              {t.mensaje}
            </div>
            <button className="toast__close" aria-label="Cerrar" onClick={() => remove(t.id)}>
              <Icon name="close" size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
}

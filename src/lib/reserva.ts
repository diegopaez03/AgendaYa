import type { Reserva, SlotHorario, ResultadoCancelacion } from "./types";

const ESTADOS_CANCELABLES = new Set<Reserva["estado"]>([
  "Confirmada",
  "Reagendada",
]);

export function esFechaFutura(fecha: string, referencia = new Date()): boolean {
  const fechaReserva = new Date(`${fecha}T00:00:00`);
  const hoy = new Date(referencia);
  hoy.setHours(0, 0, 0, 0);
  return fechaReserva >= hoy;
}

export function puedeCancelarReserva(
  reserva: Reserva,
  referencia = new Date()
): boolean {
  return (
    ESTADOS_CANCELABLES.has(reserva.estado) &&
    esFechaFutura(reserva.fecha, referencia)
  );
}

export function cancelarReserva(
  reserva: Reserva,
  slot: SlotHorario,
  referencia = new Date()
): ResultadoCancelacion {
  if (!puedeCancelarReserva(reserva, referencia)) {
    throw new Error(
      "La reserva no puede cancelarse: estado inválido o fecha pasada."
    );
  }

  return {
    reserva: { ...reserva, estado: "Cancelada" },
    slot: { ...slot, disponibilidad: "Disponible" },
  };
}

/**
 * Integrante 1 — Pruebas unitarias US_M05_005
 * Cancelación Base y Liberación de Cupo
 */
import { describe, expect, it } from "vitest";
import {
  cancelarReserva,
  puedeCancelarReserva,
  esFechaFutura,
} from "../reserva";
import type { Reserva, SlotHorario } from "../types";

const reservaBase: Reserva = {
  id: "RES-0042",
  estado: "Confirmada",
  invitado: "María López",
  email: "maria.lopez@test.com",
  fecha: "2026-06-25",
  hora: "10:00",
  slotId: "SLOT-20260625-1000",
  estadoFinanciero: "Pendiente",
};

const slotOcupado: SlotHorario = {
  slotId: "SLOT-20260625-1000",
  disponibilidad: "Ocupada",
};

describe("US_M05_005 — Cancelación Base y Liberación de Cupo", () => {
  it("cancela una reserva confirmada con fecha futura y libera el slot", () => {
    const referencia = new Date("2026-06-20T12:00:00");

    expect(puedeCancelarReserva(reservaBase, referencia)).toBe(true);

    const resultado = cancelarReserva(reservaBase, slotOcupado, referencia);

    expect(resultado.reserva.estado).toBe("Cancelada");
    expect(resultado.slot.disponibilidad).toBe("Disponible");
    expect(resultado.slot.slotId).toBe(reservaBase.slotId);
  });

  it("no permite cancelar una reserva en estado Completada", () => {
    const reservaCompletada: Reserva = {
      ...reservaBase,
      id: "RES-0103",
      estado: "Completada",
      fecha: "2026-06-10",
    };

    expect(puedeCancelarReserva(reservaCompletada)).toBe(false);
    expect(() => cancelarReserva(reservaCompletada, slotOcupado)).toThrow(
      "La reserva no puede cancelarse"
    );
  });

  it("oculta la cancelación para reservas con fecha pasada", () => {
    const reservaPasada: Reserva = {
      ...reservaBase,
      estado: "Reagendada",
      fecha: "2026-01-01",
    };
    const referencia = new Date("2026-06-20T12:00:00");

    expect(esFechaFutura(reservaPasada.fecha, referencia)).toBe(false);
    expect(puedeCancelarReserva(reservaPasada, referencia)).toBe(false);
  });
});

/**
 * Integrante 3 — Pruebas unitarias US_M05_012
 * Alerta de Reembolso Manual
 */
import { describe, expect, it, vi } from "vitest";
import { debeMostrarAlertaReembolso } from "../reembolso";
import { procesarCancelacion } from "../cancelacion";
import type { Reserva, SlotHorario } from "../types";

const slot: SlotHorario = {
  slotId: "SLOT-20261225-1000",
  disponibilidad: "Ocupada",
};

const enviarCorreoOk = vi.fn().mockResolvedValue(true);

function crearReserva(estadoFinanciero: Reserva["estadoFinanciero"]): Reserva {
  return {
    id: "RES-0099",
    estado: "Confirmada",
    invitado: "Ana Gómez",
    email: "ana.gomez@test.com",
    fecha: "2026-12-25",
    hora: "15:30",
    slotId: slot.slotId,
    estadoFinanciero,
  };
}

describe("US_M05_012 — Alerta de Reembolso Manual", () => {
  it("muestra alerta de reembolso cuando la reserva tiene pago previo", async () => {
    const reservaPagada = crearReserva("Pagado");

    expect(debeMostrarAlertaReembolso(reservaPagada.estadoFinanciero)).toBe(
      true
    );

    const resultado = await procesarCancelacion(
      reservaPagada,
      slot,
      enviarCorreoOk
    );

    expect(resultado.mostrarAlertaReembolso).toBe(true);
  });

  it("no muestra alerta cuando el estado financiero es Pendiente", async () => {
    const reservaPendiente = crearReserva("Pendiente");

    expect(debeMostrarAlertaReembolso(reservaPendiente.estadoFinanciero)).toBe(
      false
    );

    const resultado = await procesarCancelacion(
      reservaPendiente,
      slot,
      enviarCorreoOk
    );

    expect(resultado.mostrarAlertaReembolso).toBe(false);
  });

  it("no muestra alerta cuando el cliente eligió Pago en el local", async () => {
    const reservaLocal = crearReserva("Pago en local");

    expect(debeMostrarAlertaReembolso(reservaLocal.estadoFinanciero)).toBe(
      false
    );

    const resultado = await procesarCancelacion(
      reservaLocal,
      slot,
      enviarCorreoOk
    );

    expect(resultado.mostrarAlertaReembolso).toBe(false);
  });
});

/**
 * Integrante 2 — Pruebas unitarias US_M05_011
 * Integración con Módulo de Notificaciones por Cancelación
 */
import { describe, expect, it, vi } from "vitest";
import { notificarCancelacion } from "../notificaciones";
import { procesarCancelacion } from "../cancelacion";
import type { Reserva, SlotHorario } from "../types";

const reserva: Reserva = {
  id: "RES-0042",
  estado: "Confirmada",
  invitado: "María López",
  email: "maria.lopez@test.com",
  fecha: "2026-12-25",
  hora: "10:00",
  slotId: "SLOT-20261225-1000",
  estadoFinanciero: "Pendiente",
};

const slot: SlotHorario = {
  slotId: "SLOT-20261225-1000",
  disponibilidad: "Ocupada",
};

describe("US_M05_011 — Notificaciones por Cancelación", () => {
  it("envía notificación exitosa tras cancelar una reserva", async () => {
    const enviarCorreo = vi.fn().mockResolvedValue(true);

    const resultado = await notificarCancelacion(reserva, enviarCorreo);

    expect(enviarCorreo).toHaveBeenCalledWith(
      reserva.email,
      "Tu turno fue cancelado",
      expect.stringContaining(reserva.invitado)
    );
    expect(resultado.enviado).toBe(true);
    expect(resultado.mensaje).toContain("correctamente");
  });

  it("mantiene la cancelación aunque falle el servicio de correo", async () => {
    const enviarCorreo = vi.fn().mockResolvedValue(false);

    const resultado = await procesarCancelacion(reserva, slot, enviarCorreo);

    expect(resultado.cancelacion.reserva.estado).toBe("Cancelada");
    expect(resultado.notificacion.enviado).toBe(false);
    expect(resultado.notificacion.mensaje).toContain("falló el envío");
  });

  it("invoca el envío de correo de forma asíncrona sin bloquear el flujo", async () => {
    let correoResuelto = false;
    const enviarCorreo = vi.fn(
      () =>
        new Promise<boolean>((resolve) => {
          setTimeout(() => {
            correoResuelto = true;
            resolve(true);
          }, 10);
        })
    );

    const promesa = procesarCancelacion(reserva, slot, enviarCorreo);

    expect(correoResuelto).toBe(false);

    const resultado = await promesa;

    expect(correoResuelto).toBe(true);
    expect(resultado.cancelacion.reserva.estado).toBe("Cancelada");
  });
});

import { cancelarReserva } from "./reserva";
import { notificarCancelacion, type ServicioCorreo } from "./notificaciones";
import { debeMostrarAlertaReembolso } from "./reembolso";
import type {
  Reserva,
  SlotHorario,
  ResultadoCancelacionCompleta,
} from "./types";

export async function procesarCancelacion(
  reserva: Reserva,
  slot: SlotHorario,
  enviarCorreo: ServicioCorreo
): Promise<ResultadoCancelacionCompleta> {
  const cancelacion = cancelarReserva(reserva, slot);
  const notificacion = await notificarCancelacion(cancelacion.reserva, enviarCorreo);

  return {
    cancelacion,
    notificacion,
    mostrarAlertaReembolso: debeMostrarAlertaReembolso(
      cancelacion.reserva.estadoFinanciero
    ),
  };
}

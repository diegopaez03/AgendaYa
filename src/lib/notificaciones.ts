import type { Reserva, ResultadoNotificacion } from "./types";

export type ServicioCorreo = (
  destinatario: string,
  asunto: string,
  cuerpo: string
) => Promise<boolean>;

export async function notificarCancelacion(
  reserva: Reserva,
  enviarCorreo: ServicioCorreo
): Promise<ResultadoNotificacion> {
  const asunto = "Tu turno fue cancelado";
  const cuerpo = `Hola ${reserva.invitado}, tu reserva del ${reserva.fecha} a las ${reserva.hora} fue cancelada.`;

  try {
    const enviado = await enviarCorreo(reserva.email, asunto, cuerpo);
    if (enviado) {
      return {
        enviado: true,
        mensaje: "Notificación enviada correctamente al invitado.",
      };
    }

    return {
      enviado: false,
      mensaje:
        "La reserva quedó cancelada, pero falló el envío del correo. Avisar al cliente por otro medio.",
    };
  } catch {
    return {
      enviado: false,
      mensaje:
        "La reserva quedó cancelada, pero falló el envío del correo. Avisar al cliente por otro medio.",
    };
  }
}

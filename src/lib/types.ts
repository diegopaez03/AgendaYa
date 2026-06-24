export type EstadoReserva =
  | "Confirmada"
  | "Reagendada"
  | "Completada"
  | "Cancelada";

export type EstadoFinanciero = "Pagado" | "Pendiente" | "Pago en local";

export type DisponibilidadSlot = "Disponible" | "Ocupada";

export interface Reserva {
  id: string;
  estado: EstadoReserva;
  invitado: string;
  email: string;
  fecha: string;
  hora: string;
  slotId: string;
  estadoFinanciero: EstadoFinanciero;
}

export interface SlotHorario {
  slotId: string;
  disponibilidad: DisponibilidadSlot;
}

export interface ResultadoCancelacion {
  reserva: Reserva;
  slot: SlotHorario;
}

export interface ResultadoNotificacion {
  enviado: boolean;
  mensaje: string;
}

export interface ResultadoCancelacionCompleta {
  cancelacion: ResultadoCancelacion;
  notificacion: ResultadoNotificacion;
  mostrarAlertaReembolso: boolean;
}

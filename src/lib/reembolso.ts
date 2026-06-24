import type { EstadoFinanciero } from "./types";

export function debeMostrarAlertaReembolso(
  estadoFinanciero: EstadoFinanciero
): boolean {
  return estadoFinanciero === "Pagado";
}

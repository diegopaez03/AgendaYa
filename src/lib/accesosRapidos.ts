export interface AccionDashboard {
  ruta: string;
  conteo: number;
  esGlobal: boolean;
  timestamp: number;
}

export class AccesosRapidosService {
  // US_M05_006: Rellenar slots con placeholders
  obtenerSlots(accionesExistentes: string[]): string[] {
    const TEXTO_PLACEHOLDER = "Aún no hay acciones suficientes";
    const TOTAL_SLOTS = 6;
    
    const resultado = [...accionesExistentes];
    while (resultado.length < TOTAL_SLOTS) {
      resultado.push(TEXTO_PLACEHOLDER);
    }
    return resultado.slice(0, TOTAL_SLOTS);
  }

  // US_M05_007: Registro y exclusión de rutas fijas
  registrarClick(accion: AccionDashboard): AccionDashboard {
    if (!accion.esGlobal || accion.ruta === 'Notificaciones') {
      return { ...accion };
    }
    return { ...accion, conteo: accion.conteo + 1 };
  }

  // US_M05_008: Ranking por frecuencia y desempate por recencia
  calcularTop6(items: AccionDashboard[]): AccionDashboard[] {
    return [...items].sort((a, b) => {
      if (b.conteo !== a.conteo) {
        return b.conteo - a.conteo;
      }
      return b.timestamp - a.timestamp;
    });
  }
}

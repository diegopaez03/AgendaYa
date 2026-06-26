import { describe, test, expect } from 'vitest';
import { AccesosRapidosService, AccionDashboard } from '../accesosRapidos';

describe('Pruebas Unitarias David - Módulo Accesos Rápidos (Cobertura Total)', () => {
  const service = new AccesosRapidosService();

  // ==========================================
  // HISTORIA: US_M05_006 - Inicialización
  // ==========================================
  describe('US_M05_006 — Inicialización de Accesos Rápidos', () => {
    test('Escenario 1: Cuenta nueva sin actividad debe llenar los 6 slots con placeholders', () => {
      const slots = service.obtenerSlots([]);
      expect(slots).toHaveLength(6);
      slots.forEach(slot => {
        expect(slot).toBe("Aún no hay acciones suficientes");
      });
    });

    test('Escenario 2: Cuenta con actividad parcial (3 acciones) debe completar los 3 slots restantes con placeholders', () => {
      const accionesPrevias = ['Crear Reserva', 'Ver Calendario', 'Buscar Cliente'];
      const slots = service.obtenerSlots(accionesPrevias);
      expect(slots).toHaveLength(6);
      expect(slots[0]).toBe('Crear Reserva');
      expect(slots[3]).toBe("Aún no hay acciones suficientes");
    });

    test('Escenario 3: Cuenta con actividad completa (6 acciones) no debe mostrar ningún placeholder', () => {
      const accionesPrevias = ['Accion1', 'Accion2', 'Accion3', 'Accion4', 'Accion5', 'Accion6'];
      const slots = service.obtenerSlots(accionesPrevias);
      expect(slots).toHaveLength(6);
      slots.forEach(slot => {
        expect(slot).not.toBe("Aún no hay acciones suficientes");
      });
    });
  });

  // ==========================================
  // HISTORIA: US_M05_007 - Registro de acciones
  // ==========================================
  describe('US_M05_007 — Registro de acciones', () => {
    test('Escenario 1: Debe incrementar el contador individual de 14 a 15 de una acción válida', () => {
      const accionValida: AccionDashboard = { ruta: 'ReporteSemanal', conteo: 14, esGlobal: true, timestamp: 1000 };
      const resultado = service.registrarClick(accionValida);
      expect(resultado.conteo).toBe(15);
    });

    test('Escenario 2: Debe ignorar y no alterar contadores si la ruta es fija (Notificaciones)', () => {
      const accionExcluida: AccionDashboard = { ruta: 'Notificaciones', conteo: 10, esGlobal: false, timestamp: 1000 };
      const resultado = service.registrarClick(accionExcluida);
      expect(resultado.conteo).toBe(10);
    });

    test('Escenario 3: Persistencia de datos - Debe mantener e incrementar conteos históricos sin reseteos', () => {
      const estadoHistorico: AccionDashboard = { ruta: 'Configuracion', conteo: 42, esGlobal: true, timestamp: 5000 };
      const resultado = service.registrarClick(estadoHistorico);
      expect(resultado.conteo).toBe(43);
    });
  });

  // ==========================================
  // HISTORIA: US_M05_008 - Ranking y ordenamiento
  // ==========================================
  describe('US_M05_008 — Ranking y ordenamiento', () => {
    test('Escenario 1: Debe ordenar las funcionalidades de mayor a menor frecuencia', () => {
      const lista = [
        { ruta: 'Bajo', conteo: 2, esGlobal: true, timestamp: 100 },
        { ruta: 'Alto', conteo: 10, esGlobal: true, timestamp: 100 }
      ];
      const resultado = service.calcularTop6(lista);
      expect(resultado[0].ruta).toBe('Alto');
    });

    test('Escenario 2: En caso de empate en clics, debe priorizar la acción con el timestamp más reciente (recencia)', () => {
      const lista = [
        { ruta: 'AccionVieja', conteo: 5, esGlobal: true, timestamp: 1000 },
        { ruta: 'AccionNueva', conteo: 5, esGlobal: true, timestamp: 2000 }
      ];
      const resultado = service.calcularTop6(lista);
      expect(resultado[0].ruta).toBe('AccionNueva');
    });

    test('Escenario 3: El procesamiento del ordenamiento debe ser correcto en la carga inicial', () => {
      const lista = [
        { ruta: 'A', conteo: 1, esGlobal: true, timestamp: 10 },
        { ruta: 'B', conteo: 3, esGlobal: true, timestamp: 20 },
        { ruta: 'C', conteo: 2, esGlobal: true, timestamp: 30 }
      ];
      const resultado = service.calcularTop6(lista);
      expect(resultado[0].ruta).toBe('B');
      expect(resultado[1].ruta).toBe('C');
    });
  });
});

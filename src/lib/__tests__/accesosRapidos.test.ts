import { describe, test, expect } from 'vitest';
import { AccesosRapidosService, AccionDashboard } from '../accesosRapidos';

describe('Pruebas Unitarias David - Módulo Accesos Rápidos', () => {
  const service = new AccesosRapidosService();

  // Prueba 1: US_M05_006
  test('US_M05_006: Debe llenar los slots vacíos con "Aún no hay acciones suficientes"', () => {
    const slots = service.obtenerSlots([]);
    expect(slots).toHaveLength(6);
    slots.forEach(slot => {
      expect(slot).toBe("Aún no hay acciones suficientes");
    });
  });

  // Prueba 2: US_M05_007
  test('US_M05_007: Debe ignorar el tracking si la ruta pertenece a la navegación fija', () => {
    const accionFija: AccionDashboard = { ruta: 'Notificaciones', conteo: 10, esGlobal: false, timestamp: 1000 };
    const resultado = service.registrarClick(accionFija);
    expect(resultado.conteo).toBe(10); 
  });

  // Prueba 3: US_M05_008
  test('US_M05_008: En caso de empate en clics, debe priorizar la acción más reciente', () => {
    const lista = [
      { ruta: 'AccionVieja', conteo: 5, esGlobal: true, timestamp: 1000 },
      { ruta: 'AccionNueva', conteo: 5, esGlobal: true, timestamp: 2000 }
    ];
    const resultado = service.calcularTop6(lista);
    expect(resultado[0].ruta).toBe('AccionNueva'); 
  });
});

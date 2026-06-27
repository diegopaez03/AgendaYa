# AgendaYA — TP4 Integración Continua

Proyecto seed en **Next.js + TypeScript** para el Trabajo Práctico Nº 4 de Ingeniería y Calidad de Software.

## Contexto

Caso de estudio **AgendaYA** (M05 — Gestión de Agenda y Reservas). Se implementó la lógica mínima necesaria para que pasen las pruebas unitarias derivadas de las historias de usuario trabajadas en los TP anteriores.

## Historias de usuario cubiertas

| Integrante | Historia | Archivo de tests |
|---|---|---|
| Integrante 1 | US_M05_005 — Cancelación base y liberación de cupo | `src/lib/__tests__/reserva.test.ts` |
| Integrante 2 | US_M05_011 — Notificaciones por cancelación | `src/lib/__tests__/notificaciones.test.ts` |
| Integrante 3 | US_M05_012 — Alerta de reembolso manual | `src/lib/__tests__/reembolso.test.ts` |
| Integrante 4 | US_M05_006 — Inicializacion de accesos rapidos | `src/lib/__tests__/accesosRapidos.test.ts` |
| Integrante 5 | US_M05_007 — Registro de acciones | `src/lib/__tests__/accesosRapidos.test.ts` |
| Integrante 5 | US_M05_008 — Ranking y ordenamiento | `src/lib/__tests__/accesosRapidos.test.ts` |

Cada integrante aporta **3 pruebas unitarias**.

## Requisitos

- Node.js 20+
- npm

## Instalación

```bash
npm install
```

## Scripts

```bash
npm test          # Ejecutar pruebas unitarias (Vitest)
npm run test:watch
npm run build     # Build de producción
npm run dev       # Servidor de desarrollo
npm run lint      # ESLint
```

## Pipeline de CI

El workflow `.github/workflows/ci.yml` se ejecuta en:

- Creación o actualización de **Pull Requests** hacia `main`/`master`
- **Push** a `main`/`master`

Pasos del pipeline:

1. Checkout del código
2. Configuración de Node.js 20
3. `npm ci`
4. `npm test`
5. `npm run build`

## Estructura relevante

```
src/lib/
  types.ts
  reserva.ts
  notificaciones.ts
  reembolso.ts
  cancelacion.ts
  __tests__/
.github/workflows/ci.yml
```

## Publicación en GitHub

1. Crear repositorio en GitHub.
2. Vincular el remoto y subir el código:

```bash
git remote add origin https://github.com/<usuario>/<repo>.git
git add .
git commit -m "TP4: proyecto seed, tests unitarios y pipeline CI"
git push -u origin main
```

3. Crear un Pull Request de prueba para verificar que el pipeline se dispara correctamente.

## Informe

Ver `INFORME-TP4.md` en la carpeta raíz del TP4 para la estructura del informe entregable.

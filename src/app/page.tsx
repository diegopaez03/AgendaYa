export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
        <header className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
            TP4 — Integración Continua
          </p>
          <h1 className="text-4xl font-bold">AgendaYA</h1>
          <p className="text-lg text-slate-600">
            Seed del módulo M05 — Gestión de Agenda y Reservas (Admin).
            La lógica de cancelación, notificaciones y alertas de reembolso
            se valida con pruebas unitarias.
          </p>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Historias cubiertas por tests</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            <li>US_M05_005 — Cancelación base y liberación de cupo</li>
            <li>US_M05_011 — Notificaciones por cancelación</li>
            <li>US_M05_012 — Alerta de reembolso manual</li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Comandos útiles</h2>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
{`npm test        # ejecutar pruebas unitarias
npm run build   # compilar el proyecto
npm run dev     # servidor de desarrollo`}
          </pre>
        </section>
      </main>
    </div>
  );
}

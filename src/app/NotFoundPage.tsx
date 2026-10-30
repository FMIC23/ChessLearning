import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <p className="text-6xl" aria-hidden="true">♚</p>
      <h1 className="mt-4 text-2xl font-bold">Página no encontrada</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Esta casilla está vacía.</p>
      <Link to="/" className="mt-6 inline-block text-brand-600 underline">
        Volver al inicio
      </Link>
    </div>
  );
}

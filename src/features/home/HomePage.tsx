import { Link } from 'react-router-dom';
import { Card } from '@/components/ui';

export function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white sm:p-10">
        <h1 className="text-3xl font-bold sm:text-4xl">Aprende ajedrez desde cero hasta experto</h1>
        <p className="mt-3 max-w-2xl text-brand-50">
          Un camino guiado con lecciones interactivas, problemas tácticos, aperturas, finales y partidas contra el ordenador.
        </p>
        <Link to="/tablero" className="mt-6 inline-block rounded-lg bg-white px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50">
          Abrir el tablero
        </Link>
      </section>
      <Card>
        <p>La ruta de aprendizaje llegará en la siguiente fase.</p>
      </Card>
    </div>
  );
}

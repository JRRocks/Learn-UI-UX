import { Preview } from '../pages/Preview';
import { useRoute } from './router';

export function App() {
  const route = useRoute();
  const [section, param] = route.path;
  if (section === 'apercu' && param) return <Preview target={param} />;
  return <p>Épreuves</p>;
}

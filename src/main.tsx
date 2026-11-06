import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/schibsted-grotesk/wght.css';
import '@fontsource-variable/schibsted-grotesk/wght-italic.css';
import '@fontsource-variable/atkinson-hyperlegible-mono/wght.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/app.css';
import { App } from './app/App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Installable, and usable offline after a first visit: the worker stores every file of the build
// (production builds only). Registered once the page has loaded, so it never competes with it.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const register = () =>
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // Offline support is a bonus; the app works without it.
    });
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/schibsted-grotesk/wght.css';
import '@fontsource-variable/schibsted-grotesk/wght-italic.css';
import '@fontsource-variable/atkinson-hyperlegible-mono/wght.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/app.css';
import { App } from './app/App';
import { preloadContent } from './content';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/** Whether the worker in control of this page stores every file of it, because it comes from the same build (src/sw.js). */
function storedByController(): Promise<boolean> {
  const worker = navigator.serviceWorker.controller;
  if (!worker) return Promise.resolve(false);
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    const answer = (yes: boolean) => {
      clearTimeout(timer);
      port1.close();
      resolve(yes);
    };
    // A worker that does not answer (an older one) is not counted on.
    const timer = setTimeout(() => answer(false), 3000);
    port1.onmessage = (event) => answer(event.data === true);
    worker.postMessage({ stores: import.meta.url }, [port2]);
  });
}

/** Resolves once no worker of the registration is being installed or activated. */
async function settled(registration: ServiceWorkerRegistration): Promise<void> {
  for (;;) {
    const active = registration.active?.state === 'activating' ? registration.active : null;
    const worker = registration.installing ?? registration.waiting ?? active;
    if (!worker) return;
    await new Promise((resolve) => worker.addEventListener('statechange', resolve, { once: true }));
  }
}

/** Whether every file of this page is stored, once the worker of its build, if any, is installed. */
async function stored(registration: ServiceWorkerRegistration | undefined): Promise<boolean> {
  if (await storedByController()) return true;
  if (!registration) return false;
  // First visit, or a page newer than the worker in control: the worker of this build stores every
  // file, then takes control of the page; or its install fails.
  if (!registration.installing && !registration.waiting) await registration.update().catch(() => {});
  await settled(registration);
  return storedByController();
}

// Installable, and usable offline after a first visit: the worker stores every file of the build
// (production builds only). Registered once the page has loaded, so it never competes with it.
// A page that no worker stores (no service worker in this browser, site data blocked, an install
// that failed, a page newer than the stored version) downloads its lessons in the background
// instead and keeps them in memory: a dropped connection then leaves them all at hand.
if (import.meta.env.PROD) {
  const start = () => {
    if (!('serviceWorker' in navigator)) return void preloadContent();
    navigator.serviceWorker.register('./sw.js').then(
      async (registration) => {
        if (!(await stored(registration))) void preloadContent();
      },
      () => void preloadContent(),
    );
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

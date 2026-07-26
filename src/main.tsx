import { createRoot } from 'react-dom/client';

import { App } from './app';

async function bootstrap(): Promise<void> {
  if (import.meta.env.VITE_MOCK_ENABLED === 'true') {
    const { worker } = await import('./mocks/browser');
    const { seedDatabase } = await import('./mocks/data/db');

    await seedDatabase();

    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  createRoot(document.getElementById('root')!).render(<App />);
}

void bootstrap();

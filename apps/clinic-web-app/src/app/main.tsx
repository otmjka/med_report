import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

import appRouter from './appRouter';

createRoot(document.getElementById('root')!).render(
  <App appRouter={appRouter} />,
);

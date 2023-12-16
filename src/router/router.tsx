import { createBrowserRouter } from 'react-router-dom';
import { Root } from './root';
import { Dashboard } from '../pages/dashboard';
import { Results } from '../pages/results';
import { Finalize } from '../pages/finalize';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'results',
        children: [{ path: ':id', element: <Results /> }],
      },
      {
        path: 'finalize',
        children: [{ path: ':id', element: <Finalize /> }],
      },
    ],
  },
]);

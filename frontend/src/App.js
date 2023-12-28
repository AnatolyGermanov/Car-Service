import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';

import Main from './pages/Main/Main';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Profile from './pages/Profile/Profile';
import Orders from './pages/Orders/Orders';
import Clients from './pages/Clients/Clients';

import AuthProvider from './hoc/AuthProvider';
import RequireAuth from './hoc/RequireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/services',
    element: <Services />
  },
  {
    path: '/profile',
    element: <RequireAuth><Profile /></RequireAuth>
  },
  {
    path: '/orders/:userId?',
    element: <RequireAuth><Orders /></RequireAuth>
  },
  {
    path: '/clients',
    element: <RequireAuth><Clients /></RequireAuth>
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

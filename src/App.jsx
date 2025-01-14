import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import Home from './component/home/Home';
import HomePage from './component/home/HomePage';
import Register from './component/footer/auth/Register';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

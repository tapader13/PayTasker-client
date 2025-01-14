import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import Home from './component/home/Home';
import HomePage from './component/home/HomePage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: '/',
        element: <Home />,
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

import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import Home from './component/home/Home';
import HomePage from './component/home/HomePage';
import Register from './component/footer/auth/Register';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './provider/AuthProvider';
import Login from './component/footer/auth/Login';
import Dashboard from './component/dashboard/Dashboard';
// import WorkerHome from './component/dashboard/WorkerHome';
import DashboardHome from './component/dashboard/DashboardHome';
import AddNewTask from './component/dashboard/buyer/AddNewTask';
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
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <DashboardHome />,
      },
      {
        path: 'add-task',
        element: <AddNewTask />,
      },
      // {
      //   path: 'worker-home',
      //   element: <WorkerHome />,
      // },
    ],
  },
]);
function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </div>
  );
}

export default App;

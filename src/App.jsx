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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrivateWorkerRoute from './private/PrivateWorkerRoute';
import PrivateRoute from './private/PrivateRoute';
import PrivateBuyerRoute from './private/PrivateBuyerRoute';
import MyTask from './component/dashboard/buyer/MyTask';
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: <DashboardHome />,
      },
      {
        path: 'add-task',
        element: (
          <PrivateBuyerRoute>
            <AddNewTask />
          </PrivateBuyerRoute>
        ),
      },
      {
        path: 'my-task',
        element: (
          <PrivateBuyerRoute>
            <MyTask />
          </PrivateBuyerRoute>
        ),
      },
      // {
      //   path: 'worker-home',
      //   element: <WorkerHome />,
      // },
    ],
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;

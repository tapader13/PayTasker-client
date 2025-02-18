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
import Parchase from './component/dashboard/buyer/Parchase';
import Payment from './component/dashboard/Payment';
import PaymentHistory from './component/dashboard/buyer/PaymentHistory';
import TaskList from './component/dashboard/worker/TaskList';
import TaskDetailsPage from './component/dashboard/worker/TaskDetails';
import MySubmissionsPage from './component/dashboard/worker/MySubmissions';
import Withdrawals from './component/dashboard/worker/Withdrowals';
import ManageUser from './component/dashboard/admin/ManageUser';
import PrivateAdminRoute from './private/PrivateAdminRoute';
import ManageTask from './component/dashboard/admin/ManageTask';
import ErrorPage from './component/ErrorPage';
import Success from './component/Success';
import Fail from './component/Fail';
import Cancel from './component/Cancel';
import About from './component/About';
import Privacy from './component/Privacy';
import AllTask from './component/AllTask';
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
        path: '/about',
        element: <About />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/success',
        element: <Success />,
      },
      {
        path: '/fail',
        element: <Fail />,
      },
      {
        path: '/cancel',
        element: <Cancel />,
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
        path: 'alltask',
        element: <AllTask />,
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
        path: 'my-tasks',
        element: (
          <PrivateBuyerRoute>
            <MyTask />
          </PrivateBuyerRoute>
        ),
      },
      {
        path: 'purchase',
        element: (
          <PrivateBuyerRoute>
            <Parchase />
          </PrivateBuyerRoute>
        ),
      },
      {
        path: 'payment',
        element: (
          <PrivateBuyerRoute>
            <Payment />
          </PrivateBuyerRoute>
        ),
      },
      {
        path: 'tasks',
        element: (
          <PrivateWorkerRoute>
            <TaskList />
          </PrivateWorkerRoute>
        ),
      },
      {
        path: 'task/:taskId',
        element: (
          <PrivateWorkerRoute>
            <TaskDetailsPage />
          </PrivateWorkerRoute>
        ),
      },
      {
        path: 'mysubmissions',
        element: (
          <PrivateWorkerRoute>
            <MySubmissionsPage />
          </PrivateWorkerRoute>
        ),
      },
      {
        path: 'withdrawals',
        element: (
          <PrivateWorkerRoute>
            <Withdrawals />
          </PrivateWorkerRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateAdminRoute>
            <ManageUser />
          </PrivateAdminRoute>
        ),
      },
      {
        path: 'manage-tasks',
        element: (
          <PrivateAdminRoute>
            <ManageTask />
          </PrivateAdminRoute>
        ),
      },
      {
        path: 'paymentshistory',
        element: (
          <PrivateBuyerRoute>
            <PaymentHistory />
          </PrivateBuyerRoute>
        ),
      },
      // {
      //   path: 'worker-home',
      //   element: <WorkerHome />,
      // },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
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

import App from '../App';

// 前台
import Home from '../pages/Home';
import About from '../pages/about';
import ActivitiesPage from '../pages/ActivitiesPage';
import ActivitieDetail from '../pages/ActivitieDetail';
import LoginPage from '../pages/LoginPage';
import Center from '../pages/Center'; 
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import CheckoutSuccess from '../pages/CheckoutSuccess';

// 後台
import Dashboard from '../pages/admin/Dashboard';
import AdminActivities from '../pages/admin/AdminActivities'; 
import AdminCoupons from '../pages/admin/AdminCoupons';
import AdminOrders from '../pages/admin/AdminOrders';
import { element } from 'prop-types';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'about',
        element: <About />,
      },
      {
        path:'activities',
        element: <ActivitiesPage />,
      },
      {
        path: 'product/:id',
        element: <ActivitieDetail />
      },
      {
        path:'center',
        element: <Center />,
      },
      {
        path:'cart',
        element: <Cart />,
      },
      {
        path:'checkout',
        element: <Checkout />,
      },
      {
        path: 'checkout-success/:orderId',
        element: <CheckoutSuccess />
      },
      {
        path:'login',
        element: <LoginPage />,
      }
    ],
  },
  {
    path: 'admin',
    element: <Dashboard />,
    children: [
      {
        path: 'products',
        element: <AdminActivities />,
      },
      {
        path: 'coupons',
        element: <AdminCoupons />,
      },
      {
        path: 'orders',
        element: <AdminOrders />
      }
    ]
  }
]

export default routes;
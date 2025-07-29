// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import AddEditOrderPage from '../pages/AddEditOrderPage';
import MyOrdersPage from '../pages/MyOrdersPage';
import ProductsPage from '../pages/ProductsPage';
import AppLayout from '../layouts/AppLayout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/my-orders" replace />} />
          <Route path="my-orders" element={<MyOrdersPage />} />
          <Route path="add-order" element={<AddEditOrderPage />} />
          <Route path="add-order/:orderId" element={<AddEditOrderPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

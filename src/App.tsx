import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProductsPage from './components/pages/ProductsPage';
import ErrorPage from './components/pages/ErrorPage';
import ProductPage from './components/pages/ProductPage';
import Dashboard from './components/pages/tmp/Dashboard';
import LoadingPage from './components/pages/LoadingPage';
import { lazy } from 'react';
import LazyRoute from './components/reusable-ui/LazyRoute.tsx';
import RecoveryPageSkeleton from './components/auth/recovery-password/RecoveryPageSkeleton.tsx';
import ResetPageSkeleton from './components/auth/reset-password/ResetPageSkeleton.tsx';

function App() {
  const { user, loading } = useAuth();

  const LoginPage = lazy(() => import("./components/pages/LoginPage.tsx"));
  const RecoveryPage = lazy(() => import("./components/pages/RecoveryPage.tsx"));
  const ResetPasswordPage = lazy(() => import("./components/pages/ResetPasswordPage .tsx"));


  if (loading) return <LoadingPage />;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/produits" : "/login"} />} />

      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route
        path="/login"
        element={
          <LazyRoute fallback={<LoadingPage />}>
            <LoginPage />
          </LazyRoute>
        } />

      {/* <Route path="/recovery" element={<RecoveryPage />} />  */}
      <Route
        path="/recovery"
        element={
          <LazyRoute fallback={<RecoveryPageSkeleton />}>
            <RecoveryPage />
          </LazyRoute>
        }
      />

      
      {/* <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
      <Route
        path="/reset-password"
        element={
          <LazyRoute fallback={<ResetPageSkeleton />}>
            <ResetPasswordPage />
          </LazyRoute>
        }
      />


      {/* <Route path="/reset-success" element={<ResetPasswordSuccessPage />} /> */}

      /*debug */
      <Route path="/debug" element={<ResetPageSkeleton />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
      </Route>


      <Route
        path="/produits"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }>
      </Route>

      <Route path="/produits/:slug" element={
        <ProtectedRoute>
          <ProductPage />
        </ProtectedRoute>
      } />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
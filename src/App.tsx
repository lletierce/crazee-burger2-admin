import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
//import LoginPage from './components/pages/LoginPage';
import ProductsPage from './components/pages/ProductsPage';
import ErrorPage from './components/pages/ErrorPage';
import ProductPage from './components/pages/ProductPage';
import RecoveryPage from './components/pages/RecoveryPage';
import RecoverySendPage from './components/pages/RecoverySendPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage ';
import Dashboard from './components/pages/tmp/Dashboard';
import ResetPasswordSuccessPage from './components/pages/ResetPasswordSuccess';
import LoadingPage from './components/pages/LoadingPage';
import { lazy } from 'react';
import LazyRoute from './components/reusable-ui/LazyRoute.tsx';

function App() {
  const { user, loading } = useAuth();

  const LoginPage = lazy(() => import("./components/pages/LoginPage.tsx"));
  const RecoveryPage = lazy(() => import("./components/pages/RecoveryPage.tsx"));

  // if (loading) return <h1>Chargement...</h1>;
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
          <LazyRoute fallback={<LoadingPage />}>
            <RecoveryPage />
          </LazyRoute>
        }
      />

      <Route path="/recovery-send" element={<RecoverySendPage />} />
      {/* <Route path="/recovery-send" element={<LoadingPage />} /> */}



      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/reset-success" element={<ResetPasswordSuccessPage />} />

      /*debug */
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
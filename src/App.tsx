import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/pages/LoginPage';
import ProductsPage from './components/pages/ProductsPage';
import ErrorPage from './components/pages/ErrorPage';
import ProductPage from './components/pages/ProductPage';
import RecoveryPage from './components/pages/RecoveryPage';
import RecoverySendPage from './components/pages/RecoverySendPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage ';
import Dashboard from './components/pages/tmp/Dashboard';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <h1>Chargement...</h1>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/produits" : "/login"} />} />
      {/* <Route path="/login" element={<AuthForm />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recovery" element={<RecoveryPage />} /> /* Add lazy loading*/
      <Route path="/recovery-send" element={<RecoverySendPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

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
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/pages/LoginPage';
import ProductsPage from './components/pages/ProductsPage';
import ErrorPage from './components/pages/ErrorPage';
import ProductPage from './components/pages/ProductPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <h1>Chargement...</h1>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/produits" : "/login"} />} />
      {/* <Route path="/login" element={<AuthForm />} /> */}
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/produits"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }>
      </Route>

      <Route path="/produits/:productId" element={
        <ProtectedRoute>
          <ProductPage />
        </ProtectedRoute>
      } />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
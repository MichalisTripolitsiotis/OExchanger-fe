// @ts-nocheck
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Layouts/Navbar';
import Login from './components/authentication/pages/auth/Login';
import Signup from './components/authentication/pages/auth/Register';
import Home from './components/home/Home';
import Dashboard from './components/authentication/pages/authenticated/Dashboard';
import ProtectedRoute from './components/Layouts/ProtectedRoute';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';
import Me from './components/authentication/pages/authenticated/Me';
import EmailVerification from './components/authentication/pages/auth/EmailVerification';

function App() {
  const { token } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/verifyemail/:token" element={<EmailVerification />} />
        <Route element={<ProtectedRoute token={token} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="me" element={<Me />} />
        </Route>
        <Route path="*" element={
          <div>
            <h2>404 Page not found</h2>
          </div>
        }
        />
      </Routes>
    </div >
  );
}

export default App;

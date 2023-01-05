// @ts-nocheck
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Layouts/Navbar';
import Login from './components/authentication/pages/Login';
import Signup from './components/authentication/pages/Signup';
import Home from './components/home/Home';
import Dashboard from './components/authentication/pages/authenticated/Dashboard';
import ProtectedRoute from './components/Layouts/ProtectedRoute';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';
import Me from './components/authentication/pages/authenticated/Me';

function App() {
  const { token } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<ProtectedRoute token={token} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="me" element={<Me />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;

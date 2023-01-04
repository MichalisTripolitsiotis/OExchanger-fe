// @ts-nocheck
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Layouts/Navbar';
import Login from './components/authentication/pages/Login';
import Signup from './components/authentication/pages/Signup';
import Home from './components/home/Home';
import Dashboard from './components/authentication/pages/Dashboard';
import ProtectedRoute from './components/Layouts/ProtectedRoute';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;

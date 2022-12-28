import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Layouts/Navbar';
import Login from './components/authentication/pages/Login';
import Signup from './components/authentication/pages/Signup';
import Home from './components/home/Home';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

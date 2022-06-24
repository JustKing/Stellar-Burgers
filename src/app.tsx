import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Constructor } from './pages/constructor/constructor';
import { Login, Register, ForgotPassword, ResetPassword } from './pages/auth';

import AppHeader from './components/app-header/app-header';

const App = () => {
  const [offset, setOffset] = useState(0);

  const changeOffset = useCallback((offset: number) => {
    setOffset(offset);
  }, []);

  return (
    <BrowserRouter>
      <AppHeader changeOffset={changeOffset} />
      <main className="flex container jc-center" style={{ height: `calc(100vh - ${offset}px)` }}>
        <Routes>
          <Route path="/" element={<Constructor offset={offset} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;

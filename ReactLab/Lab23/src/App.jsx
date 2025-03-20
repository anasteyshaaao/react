import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HelloWorld from './components/HelloWorld';
import Button from './components/Button';
import LabWork1 from './components/Lab1';
import { ThemeProvider } from './components/ThemeContext';
import CounterWithEffect from './components/CounterWithEffect';
import Counter from './components/Counter';
import AuthForm from './components/AuthForm';
import Feedback from './components/Feedback';
import useLoginState from './redux/useLoginState';

function App() {
  const { isLoggedIn, login, logout } = useLoginState(); 

  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <ThemeProvider>
      <Router>
        {/* Навигация доступна всегда */}
        <Layout isLoggedIn={isLoggedIn} logout={logout}>
          <Routes>
            {/* Стартовая страница */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <>
                    <p>Стартовая страница</p>
                    <img src="/start.jpeg" alt="Описание картинки" />
                  </>
                ) : (
                  <Navigate to="/auth" /> 
                )
              }
            />
            {/* Лабораторная работа 1 */}
            <Route
              path="/lab1"
              element={
                isLoggedIn ? (
                  <>
                    <p>Стартовая страница</p>
                    <LabWork1 />
                  </>
                ) : (
                  <Navigate to="/auth" /> 
                )
              }
            />
            {/* Лабораторная работа 2 */}
            <Route
              path="/lab2"
              element={
                isLoggedIn ? (
                  <>
                    <HelloWorld />
                    <Button onClick={handleClick}>Click Me</Button>
                  </>
                ) : (
                  <Navigate to="/auth" /> 
                )
              }
            />
            {/* Лабораторная работа 3 */}
            <Route
              path="/lab3"
              element={
                isLoggedIn ? (
                  <>
                    <img src="/img.jpg" alt="Описание картинки" />
                  </>
                ) : (
                  <Navigate to="/auth" /> 
                )
              }
            />
            {/* Лабораторная работа 4 */}
            <Route
              path="/lab4"
              element={
                isLoggedIn ? (
                  <>
                    <CounterWithEffect />
                    <Counter />
                  </>
                ) : (
                  <Navigate to="/auth" /> 
                )
              }
            />
            {/* Форма обратной связи */}
            <Route
              path="/feedback"
              element={isLoggedIn ? <Feedback /> : <Navigate to="/auth" />}
            />
            {/* Форма авторизации */}
            <Route path="/auth" element={<AuthForm isLogin={true} onLogin={login} />} />
            {/* Форма регистрации */}
            <Route path="/register" element={<AuthForm isLogin={false} onLogin={login} />} />
            {/* Перенаправлениеесли пользователь не авторизован */}
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
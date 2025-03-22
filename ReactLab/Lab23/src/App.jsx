import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthForm from './components/AuthForm';
import { ThemeProvider } from './components/ThemeContext';
import useLoginState from './redux/useLoginState';
import HelloWorld from './components/HelloWorld';
import Button from './components/Button';
import LabWork1 from './components/Lab1';
import CounterWithEffect from './components/CounterWithEffect';
import Counter from './components/Counter';


function App() {
  const { isLoggedIn, login, logout, userName } = useLoginState();

  return (
    <ThemeProvider>
      <Router>
        <Layout isLoggedIn={isLoggedIn} logout={logout} userName={userName}>
          <Routes>
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
            <Route
              path="/auth"
              element={
                <AuthForm
                  isLogin={true}
                  onLogin={login} // Передаем login для входа
                />
              }
            />
            <Route
              path="/register"
              element={
                <AuthForm
                  isLogin={false}
                  onLogin={login} // Передаем login для регистрации
                />
              }
            />
            {/* Лабораторная работа 1 */}
            <Route
              path="/lab1"
              element={
                isLoggedIn ? (
                  <>
                    <p>Лабораторная работа 1</p>
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
                    <p>Лабораторная работа 2</p>
                    <HelloWorld />
                    <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
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
                    <p>Лабораторная работа 3</p>
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
                    <p>Лабораторная работа 4</p>
                    <CounterWithEffect />
                    <Counter />
                  </>
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            
            {/* Перенаправление, если пользователь не авторизован */}
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from './components/Layout';
import AuthForm from './components/AuthForm';
import { ThemeProvider } from './components/ThemeContext';
import HelloWorld from './components/HelloWorld';
import Button from './components/Button';
import LabWork1 from './components/Lab1';
import CounterWithEffect from './components/CounterWithEffect';
import Counter from './components/Counter';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { logout } from './redux/slices/authSlice';
import EditProfilePage from './components/EditProfilePage';
import AdminPanel from './components/AdminPanel';

function AppContent() {
  const dispatch = useDispatch();
  const { isLoggedIn, userName, isAdmin,isBlocked } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoggedIn && isBlocked) {
    return (
      <ThemeProvider>
        <Router>
          <Layout isLoggedIn={false} logout={handleLogout} userName="">
            <Routes>
              <Route path="*" element={
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <h2>Ваш аккаунт заблокирован</h2>
                  <p>Обратитесь к администратору для разблокировки</p>
                </div>
              } />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <Layout isLoggedIn={isLoggedIn} logout={handleLogout} userName={userName}>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn  && !isBlocked ? (
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
                <AuthForm isLogin={true} />
              }
            />
            <Route
              path="/edit-profile"
              element={
                isLoggedIn  ? (
                  <EditProfilePage />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="/admin"
              element={
                isLoggedIn && isAdmin ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/register"
              element={
                <AuthForm isLogin={false} />
              }
            />
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
             <Route
              path="/lab5"
              element={
                isLoggedIn ? (
                  <>
                      <h1> Лабораторная работа 5</h1>
                    <div class="container mt-4">
                  <ol class="list-group list-group-numbered">
                    <li class="list-group-item py-3">
                      Реализовать форму регистрации и форму авторизации с помощью React-hook-forms или Formik (валидация полей)
                    </li>
                    <li class="list-group-item py-3">
                      Реализовать блок обратной связи. Форма обратной связи и список отзывов
                    </li>
                    <li class="list-group-item py-3">
                      Обработать submit форм через useCallback функции по примеру Лабораторной работы 1
                    </li>
                    <li class="list-group-item py-3">
                      Реализовать кастомный хук useLoginState
                      <ul class="list-unstyled mt-2 ms-3">
                        <li class="mb-1">• Выдает true / false - статус авторизации</li>
                        <li>• Если true - отрисовать приложение, иначе форму авторизации</li>
                      </ul>
                    </li>
                    <li class="list-group-item py-3">
                      Хранить статус авторизации можно в redux, context или localStore
                    </li>
                    <li class="list-group-item py-3">
                      Реализовать в правом верхнем углу профиль пользователя с кнопкой разлогина
                    </li>
                  </ol>
</div>
                  </>
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="/lab4"
              element={
                isLoggedIn ? (
                  <>
                    <p>Лабораторная работа 4</p>
                    <CounterWithEffect />
                  </>
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HelloWorld from './components/HelloWorld';
import Button from './components/Button';
import LabWork1 from './components/Lab1';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <p>Стартовая страница</p>
                <img src="/start.jpeg" alt="Описание картинки" />
              </>
            }
          />
           <Route
            path="/lab1"
            element={
              <>
                <p>Стартовая страница</p>
                <LabWork1/>
              </>
            }
          />
          <Route
            path="/lab2"
            element={
              <>
                <HelloWorld />
                <Button onClick={handleClick}>Click Me</Button>
              </>
            }
          />
          <Route
            path="/lab3"
            element={
              <>
                <img src="/dronov.jpg"  alt="Описание картинки" />
              </>
            }
          />
          
          {/* Добавьте другие маршруты по необходимости */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
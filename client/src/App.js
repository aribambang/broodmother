import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoute from './components/routes/AuthRoute';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Nav from './components/Nav';
import StripeSuccess from './pages/stripe/Success';
import StripeCancel from './pages/stripe/Cancel';
import Account from './pages/Account';
import Plans from './pages/Plans';

function App() {
  return (
    <Router>
      <Nav />
      <Toaster position='top-right' />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route
          exact
          path='/stripe/success'
          element={
            <AuthRoute>
              <StripeSuccess />
            </AuthRoute>
          }
        />
        <Route
          exact
          path='/stripe/cancel'
          element={
            <AuthRoute>
              <StripeCancel />
            </AuthRoute>
          }
        />
        <Route
          exact
          path='/account'
          element={
            <AuthRoute>
              <Account />
            </AuthRoute>
          }
        />
        <Route exact path='/plans/:name' element={<Plans />} />
      </Routes>
    </Router>
  );
}

export default App;

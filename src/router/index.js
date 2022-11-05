import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import PersistLogIn from '../components/PersistLogIn';
import HomePage from '../pages/HomePage';
import {
  FORGOT_PASSWORD_PREFIX,
  LOGIN_PREFIX,
  REGISTER_PREFIX,
} from '../constants/router';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback="loading">
          <Routes>
            {/* public routes */}
            <Route
              exact
              path={`/:theme${FORGOT_PASSWORD_PREFIX}`}
              element={<ForgotPasswordPage />}
            />
            <Route
              exact
              path={`/:theme${REGISTER_PREFIX}`}
              element={<RegisterPage />}
            />

            {/* persist routes */}
            <Route element={<PersistLogIn />}>
              <Route
                exact
                path={`/:theme${LOGIN_PREFIX}`}
                element={<LoginPage />}
              />

              <Route exact path="/:theme" element={<HomePage />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<></>} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

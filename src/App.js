import { React } from 'react';
import './App.scss';
import HomePage from './component/home/home';
import AuthRoute from './shared/auth/authRoute';
import { Route, Routes } from 'react-router-dom';
import NotFound from './component/notFound/notFound';
import DefaultLayOut from './layouts/default/default';
import Dashboard from './component/dashboard/dashboard';
import SecondaryLayout from './layouts/secondary/secondary';
import ErrorBoundary from './component/error/errorBoundary';
import Details from './component/details/details';

// jsx=javascript XML ,not required to use jsx file extention but its easy to recognize
//  inside return those are converted to pure js (create element/append child)

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Normal Routes */}
        <Route element={<DefaultLayOut />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id/:name/details" element={<Details />} />
        </Route>
        {/* Auth Routes */}
        <Route element={<AuthRoute />}>
          <Route element={<SecondaryLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;

import './App.css';
import { lazy, Suspense} from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicRoute from './components/PublicRoute/PublicRoute';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';



const HomeTab = lazy(() => import('./pages/HomeTab/HomeTab'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const CurrencyTab = lazy(() => import('./pages/CurrencyTab/CurrencyTab'));
const StatisticsTab = lazy(() => import('./pages/StatisticsTab/StatisticsTab'));



function App() {


  return (
    <Suspense fallback={<p>Loading page...</p>}>
    <Routes >
      <Route path='/home' element={ <RestrictedRoute> <HomeTab /></RestrictedRoute> } /> 
      <Route path='/dashboard' element={ <RestrictedRoute><DashboardPage/></RestrictedRoute>} />
      <Route path='/currency' element={ <RestrictedRoute><CurrencyTab /></RestrictedRoute>} />
      <Route path='/statistics' element={ <RestrictedRoute><StatisticsTab/></RestrictedRoute>} />


        <Route path='/register' element={<PublicRoute><RegistrationPage /></PublicRoute>}/>
        <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path='*' element={<NotFoundPage/>} />
    </Routes>
    </Suspense>
  )
}

export default App

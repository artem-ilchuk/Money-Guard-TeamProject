import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUserThunk } from "./redux/auth/operations";
import Preloader from "./components/Preloader/Preloader";

const HomeTab = lazy(() => import("./pages/HomeTab/HomeTab"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const CurrencyTab = lazy(() => import("./pages/CurrencyTab/CurrencyTab"));
const StatisticsTab = lazy(() => import("./pages/StatisticsTab/StatisticsTab"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  const [isFirstLoad, setIsFirstLoad] = useState(false);
  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit");
    if (!isFirstVisit) {
      setIsFirstLoad(true);
      localStorage.setItem("isFirstVisit", "true");
    }
    dispatch(refreshUserThunk());
  }, [dispatch]);
// || isRefreshing
  return isFirstLoad ? (
    <Preloader />
  ) : (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RestrictedRoute>
              <DashboardPage />
            </RestrictedRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomeTab />} />
          <Route path="statistic" element={<StatisticsTab />} />
          <Route path="currency" element={<CurrencyTab />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;

import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUserThunk } from "./redux/auth/operations";

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

  return isRefreshing ? null : (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route
          path="/home"
          element={
            <RestrictedRoute>
              {" "}
              <HomeTab />
            </RestrictedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RestrictedRoute>
              <DashboardPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/currency"
          element={
            <RestrictedRoute>
              <CurrencyTab />
            </RestrictedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <RestrictedRoute>
              <StatisticsTab />
            </RestrictedRoute>
          }
        />

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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;

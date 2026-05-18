import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RootStoreContext, rootStore } from "./stores/RootStore";
import LoginPage from "./pages/LoginPage";
import MoviesPage from "./pages/MoviesPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <RootStoreContext.Provider value={rootStore}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/movies" element={<MoviesPage />} />
                    </Route>

                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                </Routes>
            </BrowserRouter>
        </RootStoreContext.Provider>
    );
}
export default App;

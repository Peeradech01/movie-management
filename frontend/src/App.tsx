import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RootStoreContext, rootStore } from "./stores/RootStore";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <RootStoreContext.Provider value={rootStore}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
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

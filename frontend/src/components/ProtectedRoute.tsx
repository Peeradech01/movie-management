import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../stores/RootStore";

const ProtectedRoute = observer(() => {
    const { authStore } = useStore();

    if (!authStore.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
});

export default ProtectedRoute;

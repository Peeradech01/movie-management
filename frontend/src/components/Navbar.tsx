import { observer } from "mobx-react-lite";
import { useStore } from "../stores/RootStore";
import { useNavigate } from "react-router-dom";

const Navbar = observer(() => {
    const { authStore } = useStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authStore.logout();
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">Movie Management</h1>
            <div className="flex items-center gap-4">
                <span className="text-sm">
                    {authStore.username}
                    <span className="ml-3 bg-gray-600 px-2 py-0.5 rounded text-xs">
                        {authStore.role}
                    </span>
                </span>
                <button
                    onClick={handleLogout}
                    className="bg-white text-gray-800 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
});

export default Navbar;

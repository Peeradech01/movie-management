interface Props {
    isOpen: boolean;
    movieTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading: boolean;
}

const DeleteConfirmModal = ({
    isOpen,
    movieTitle,
    onConfirm,
    onCancel,
    isLoading,
}: Props) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 rounded-full p-3">
                        <svg
                            className="w-6 h-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </div>
                </div>

                {/* Text */}
                <h3 className="text-center text-lg font-semibold text-gray-800 mb-1">
                    Delete Movie
                </h3>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-gray-800">
                        "{movieTitle}"
                    </span>
                    ?
                    <br />
                    This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;

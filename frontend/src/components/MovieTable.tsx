import { observer } from "mobx-react-lite";
import type { Movie } from "../types";

interface Props {
    movies: Movie[];
    isManager: boolean;
    onEdit: (movie: Movie) => void;
    onDelete: (id: number) => void;
}

const RATING_STYLES: Record<string, string> = {
    G: "bg-green-100 text-green-700 border border-green-200",
    PG: "bg-blue-100 text-blue-700 border border-blue-200",
    M: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    MA: "bg-orange-100 text-orange-700 border border-orange-200",
    R: "bg-red-100 text-red-700 border border-red-200",
};

const MovieTable = observer(
    ({ movies, isManager, onEdit, onDelete }: Props) => {
        if (movies.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <svg
                        className="w-12 h-12 mb-3 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                        />
                    </svg>
                    <p className="text-sm font-medium">No movies found</p>
                </div>
            );
        }

        return (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    {/* Header */}
                    <thead>
                        <tr className="bg-gray-700 text-white text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 text-left font-semibold">
                                #
                            </th>
                            <th className="px-6 py-4 text-left font-semibold">
                                Title
                            </th>
                            <th className="px-6 py-4 text-left font-semibold">
                                Year Released
                            </th>
                            <th className="px-6 py-4 text-left font-semibold">
                                Rating
                            </th>
                            <th className="px-6 py-4 text-left font-semibold">
                                Added
                            </th>
                            <th className="px-6 py-4 text-right font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-gray-100">
                        {movies.map((movie, index) => (
                            <tr
                                key={movie.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {/* Index */}
                                <td className="px-6 py-4 text-gray-400 text-xs">
                                    {index + 1}
                                </td>

                                {/* Title */}
                                <td className="px-6 py-4">
                                    <span className="font-medium text-gray-800">
                                        {movie.title}
                                    </span>
                                </td>

                                {/* Year */}
                                <td className="px-6 py-4 text-gray-500">
                                    {movie.yearReleased}
                                </td>

                                {/* Rating */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${RATING_STYLES[movie.rating]}`}
                                    >
                                        {movie.rating}
                                    </span>
                                </td>

                                {/* Added date */}
                                <td className="px-6 py-4 text-gray-400 text-xs">
                                    {new Date(
                                        movie.createdAt,
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(movie)}
                                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            title="Edit"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>

                                        {isManager && (
                                            <button
                                                onClick={() =>
                                                    onDelete(movie.id)
                                                }
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Delete"
                                            >
                                                <svg
                                                    className="w-4 h-4"
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
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Footer */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
                    Showing {movies.length} movie
                    {movies.length !== 1 ? "s" : ""}
                </div>
            </div>
        );
    },
);

export default MovieTable;

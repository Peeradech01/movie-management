import { useState, useEffect } from "react";
import type { Movie, MovieRating } from "../types";

const RATINGS: MovieRating[] = ["G", "PG", "M", "MA", "R"];

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        title: string;
        yearReleased: number;
        rating: MovieRating;
    }) => void;
    editingMovie?: Movie | null;
    isLoading: boolean;
}

const MovieFormModal = ({
    isOpen,
    onClose,
    onSubmit,
    editingMovie,
    isLoading,
}: Props) => {
    const [title, setTitle] = useState("");
    const [yearReleased, setYearReleased] = useState("");
    const [rating, setRating] = useState<MovieRating>("G");

    useEffect(() => {
        if (editingMovie) {
            setTitle(editingMovie.title);
            setYearReleased(String(editingMovie.yearReleased));
            setRating(editingMovie.rating);
        } else {
            setTitle("");
            setYearReleased("");
            setRating("G");
        }
    }, [editingMovie, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit({ title, yearReleased: Number(yearReleased), rating });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                    {editingMovie ? "Edit Movie" : "Add Movie"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Year Released
                        </label>
                        <input
                            type="number"
                            value={yearReleased}
                            onChange={(e) => setYearReleased(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min={1888}
                            max={new Date().getFullYear() + 5}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rating
                        </label>
                        <select
                            value={rating}
                            onChange={(e) =>
                                setRating(e.target.value as MovieRating)
                            }
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {RATINGS.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MovieFormModal;

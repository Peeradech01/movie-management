import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/RootStore";
import Navbar from "../components/Navbar";
import MovieTable from "../components/MovieTable";
import MovieFormModal from "../components/MovieFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import Pagination from "../components/Pagination";

import type { Movie, MovieRating } from "../types";

const MoviesPage = observer(() => {
    const { movieStore, authStore } = useStore();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

    const [deletingMovie, setDeletingMovie] = useState<Movie | null>(null);

    useEffect(() => {
        movieStore.fetchMovies(1);
    }, [movieStore]);

    const handleOpenCreate = () => {
        setEditingMovie(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (movie: Movie) => {
        setEditingMovie(movie);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingMovie(null);
    };

    const handleSubmit = async (data: {
        title: string;
        yearReleased: number;
        rating: MovieRating;
    }) => {
        if (editingMovie) {
            await movieStore.updateMovie(editingMovie.id, data);
        } else {
            await movieStore.createMovie(data);
        }

        handleClose();
    };

    const handleDeleteClick = (id: number) => {
        const movie = movieStore.movies.find((m) => m.id === id) ?? null;

        setDeletingMovie(movie);
        setIsDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingMovie) return;

        await movieStore.deleteMovie(deletingMovie.id);

        setIsDeleteOpen(false);
        setDeletingMovie(null);
    };

    const handleDeleteCancel = () => {
        setIsDeleteOpen(false);
        setDeletingMovie(null);
    };

    const handlePageChange = (page: number) => {
        movieStore.fetchMovies(page);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Movies
                        </h2>

                        <p className="text-sm text-gray-500">
                            {movieStore.totalMovies} total
                        </p>
                    </div>

                    <button
                        onClick={handleOpenCreate}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
                    >
                        <span className="text-lg leading-none">+</span>
                        Add Movie
                    </button>
                </div>

                {movieStore.error && (
                    <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                        {movieStore.error}
                    </div>
                )}

                {movieStore.isLoading ? (
                    <div className="text-center py-16 text-gray-400">
                        Loading...
                    </div>
                ) : (
                    <>
                        <MovieTable
                            movies={movieStore.movies}
                            isManager={authStore.isManager}
                            onEdit={handleOpenEdit}
                            onDelete={handleDeleteClick}
                        />
                        <Pagination
                            currentPage={movieStore.currentPage}
                            totalPages={movieStore.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            <MovieFormModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                editingMovie={editingMovie}
                isLoading={movieStore.isLoading}
            />

            <DeleteConfirmModal
                isOpen={isDeleteOpen}
                movieTitle={deletingMovie?.title ?? ""}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                isLoading={movieStore.isLoading}
            />
        </div>
    );
});

export default MoviesPage;

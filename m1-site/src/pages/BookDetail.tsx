import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from '@mui/material';

interface Book {
  id: number;
  title: string;
  yearPublished: number;
  authorName: string;
  mean: number | null;
  price: number;
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du livre:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      if (!id) {
        console.error('L\'ID du livre est manquant');
        return;
      }

      await axios.get(`http://localhost:3001/books/delete/${id}`);
      setOpenModal(false);
      navigate('/books');
    } catch (error) {
      console.error('Erreur lors de la suppression du livre:', error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Chargement des détails du livre...</p>;
  }

  if (!book) {
    return <p className="text-center text-red-500">Le livre avec l'ID {id} n'a pas été trouvé.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Année de publication :</span> {book.yearPublished}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Note moyenne :</span> {book.mean ?? 'Pas de note'}
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Auteur</h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Nom :</span> {book.authorName}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Prix :</span> {book.price} €
        </p>
      </div>

      <div className="mt-6">
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpenModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Supprimer le livre
        </Button>
      </div>

      {/* Modal de confirmation */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="w-full max-w-sm p-6 bg-white rounded-lg mx-auto mt-20 shadow-lg">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Êtes-vous sûr de vouloir supprimer ce livre ?
          </h2>
          <div className="flex justify-between mt-6">
            <button
              onClick={handleDeleteBook}
              className="w-1/3 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Supprimer
            </button>
            <button
              onClick={() => setOpenModal(false)}
              className="w-1/3 bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookDetail;

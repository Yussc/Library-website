import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from '@mui/material';

interface Author {
  id: number;
  last_name: string;
  first_name: string;
  picture: string;
  bio: string;
  books: any[] | null; 
}

interface Book {
  id: number;
  title: string;
  yearPublished: number;
  author: Author;
  mean: number | null;
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);


  useEffect(() => {
    if (books.length > 0 && id) {
      const foundBook = books.find((book) => book.id.toString() === id);
      setBook(foundBook);
    }
  }, [books, id]);

  const handleDeleteBook = async () => {
    try {
      if (!id) {
        console.error('L\'ID du livre est manquant');
        return;
      }
      
      await axios.get(`http://localhost:3001/books/delete/${id}`);

      setBooks(books.filter((book) => book.id.toString() !== id));

      setOpenModal(false);

      navigate('/books');
    } catch (error) {
      console.error('Erreur lors de la suppression du livre:', error);
    }
  };

  if (loading) {
    return <p>Chargement des détails du livre...</p>;
  }

  if (!book) {
    return <p>Le livre avec l'ID {id} n'a pas été trouvé.</p>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Année de publication: {book.yearPublished}</p>
      <p>Note moyenne: {book.mean ?? 'Pas de note'}</p>
      <h2>Auteur</h2>
      <p>Nom: {book.author.first_name} {book.author.last_name}</p>
      <p>Biographie: {book.author.bio}</p>
      <img
        src={book.author.picture}
        alt={`${book.author.first_name} ${book.author.last_name}`}
        style={{ width: 100, height: 100 }}
      />

      <Button
        variant="contained"
        color="error"
        onClick={() => setOpenModal(true)} 
        className="mt-4"
      >
        Supprimer le livre
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="w-full max-w-sm p-6 bg-white rounded-lg mx-auto mt-20 shadow-lg">
          <h2 className="text-xl font-semibold text-center">Êtes-vous sûr de vouloir supprimer ce livre ?</h2>
          <div className="flex justify-between mt-4">
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteBook} 
              className="w-1/3 bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </Button>
            <Button
              variant="contained"
              onClick={() => setOpenModal(false)} 
              className="w-1/3 bg-gray-300 hover:bg-gray-400"
            >
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookDetail;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
}

interface Author {
  id: number;
  first_name: string;
  last_name: string;
  picture: string;
  bio: string;
  books: Book[];
}

const AuthorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false); 
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updatedFirstName, setUpdatedFirstName] = useState<string>('');
  const [updatedLastName, setUpdatedLastName] = useState<string>('');
  const [updatedBio, setUpdatedBio] = useState<string>('');
  const [updatedPicture, setUpdatedPicture] = useState<string>('');

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get<Author>(`http://localhost:3001/authors/${id}`);
        setAuthor(response.data);
        setUpdatedFirstName(response.data.first_name);
        setUpdatedLastName(response.data.last_name);
        setUpdatedBio(response.data.bio);
        setUpdatedPicture(response.data.picture);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l’auteur :', error);
      }
    };

    fetchAuthor();
  }, [id]);

  if (!author) {
    return <p>Chargement des données de l'auteur...</p>;
  }

  const handleUpdateAuthor = async () => {
    try {
      const payload = {
        id: author.id,
        first_name: updatedFirstName,
        last_name: updatedLastName,
        bio: updatedBio,
        picture: updatedPicture,
      };
      await axios.post('http://localhost:3001/authors/modify', payload);
      setAuthor({ ...author, ...payload });
      setIsEditMode(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations de l’auteur :', error);
    }
  };

  const handleDeleteAuthor = async () => {
    try {
      await axios.get(`http://localhost:3001/authors/delete/${author.id}`);
      navigate('/authors');
    } catch (error) {
      console.error('Erreur lors de la suppression de l’auteur :', error);
    }
  };

  const handleAddBookToAuthor = async () => {
    if (!selectedBookId) return;

    try {
      const response = await axios.post(`http://localhost:3001/authors/${author.id}/books`, {
        bookId: selectedBookId,
      });

      setAuthor({
        ...author,
        books: [...author.books, response.data], 
      });

      setSelectedBookId(null);
    } catch (error) {
      console.error('Erreur lors de l’ajout du livre à l’auteur :', error);
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    try {
      await axios.get(`http://localhost:3001/authors/delete/${bookId}`);
      setAuthor({ ...author, books: author.books.filter((book) => book.id !== bookId) });
    } catch (error) {
      console.error('Erreur lors de la suppression du livre :', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Détails de l'Auteur</h1>
      <div className="flex mb-4">
        <img src={author.picture} alt={`${author.first_name} ${author.last_name}'s photo`} className="h-32 w-32 rounded-full mr-4" />
        <div>
          {isEditMode ? (
            <div>
              <input
                type="text"
                value={updatedFirstName}
                onChange={(e) => setUpdatedFirstName(e.target.value)}
                placeholder="Prénom"
                className="border p-2 rounded mb-2 w-full"
              />
              <input
                type="text"
                value={updatedLastName}
                onChange={(e) => setUpdatedLastName(e.target.value)}
                placeholder="Nom"
                className="border p-2 rounded mb-2 w-full"
              />
              <textarea
                value={updatedBio}
                onChange={(e) => setUpdatedBio(e.target.value)}
                placeholder="Biographie"
                className="border p-2 rounded mb-2 w-full"
                rows={4}
              />
              <input
                type="text"
                value={updatedPicture}
                onChange={(e) => setUpdatedPicture(e.target.value)}
                placeholder="URL de l'image"
                className="border p-2 rounded mb-2 w-full"
              />
              <button
                onClick={handleUpdateAuthor}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Sauvegarder
              </button>
              <button
                onClick={() => setIsEditMode(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Annuler
              </button>
            </div>
          ) : (
            <div>
              <h2 className="font-bold text-xl">{author.first_name} {author.last_name}</h2>
              <p className="mb-2">{author.bio}</p>
              <button
                onClick={() => setIsEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Modifier
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Livres de cet auteur</h3>
      <ul>
        {author.books.map((book) => (
          <li key={book.id} className="mb-1 flex justify-between">
            <Link to={`/books/${book.id}`} className="text-blue-500 hover:underline">
              {book.title}
            </Link>
            <button
              onClick={() => handleDeleteBook(book.id)}
              className="text-red-500 hover:underline"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Ajouter un Livre existant</h3>

        {/* Choix livres */}
        <select
          value={selectedBookId || ''}
          onChange={(e) => setSelectedBookId(Number(e.target.value))}
          className="border p-2 rounded mb-4"
        >
          <option value="">Choisir un livre</option>
          {availableBooks.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddBookToAuthor}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      {/* Modal Delete AUteur */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="font-bold mb-4">Êtes-vous sûr de vouloir supprimer cet auteur ?</h2>
            <button
              onClick={handleDeleteAuthor}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Supprimer
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorDetails;

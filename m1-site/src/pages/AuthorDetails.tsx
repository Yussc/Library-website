import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GenericModal from '../composants/GenericModal';


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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updatedFirstName, setUpdatedFirstName] = useState<string>('');
  const [updatedLastName, setUpdatedLastName] = useState<string>('');
  const [updatedBio, setUpdatedBio] = useState<string>('');
  const [updatedPicture, setUpdatedPicture] = useState<string>('');
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState<boolean>(false); // état pour gérer le modal
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [newBook, setNewBook] = useState<{
    title: string;
    author: number; // l'auteur est automatiquement celui de la page
    publicationDate: number;
    price: number;
  }>({
    title: '',
    author: author ? author.id : 0, // l'auteur est pré-rempli avec l'ID de l'auteur
    publicationDate: 0,
    price: 0
  });

  // Fonction pour récupérer les détails de l'auteur
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

    const fetchAvailableBooks = async () => {
      try {
        const response = await axios.get<Book[]>('http://localhost:3001/books');
        setAvailableBooks(response.data); // Récupérer tous les livres disponibles
      } catch (error) {
        console.error('Erreur lors de la récupération des livres disponibles :', error);
      }
    };

    fetchAuthor();
    fetchAvailableBooks(); // Appeler la fonction pour récupérer les livres disponibles
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

  const handleDeleteBook = async (bookId: number) => {
    try {
      await axios.get(`http://localhost:3001/books/delete/${bookId}`);
      setAuthor({ ...author, books: author.books.filter((book) => book.id !== bookId) });
    } catch (error) {
      console.error('Erreur lors de la suppression du livre :', error);
    }
  };

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.publicationDate || !newBook.price) {
      console.error('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const payload = {
        title: newBook.title,
        authorId: author.id, // l'auteur est automatiquement celui de la page
        yearPublished: newBook.publicationDate,
        mean:0,
        price: newBook.price,
      };

      // Vérifiez que l'auteur est défini avant d'envoyer la requête
      if (!author || !author.id) {
        console.error("L'auteur est introuvable.");
        return;
      }
      // Envoyer la requête pour ajouter le livre
      const response = await axios.post('http://localhost:3001/books/create', payload);
      console.log('Réponse du serveur lors de l\'ajout:', response.data);
      

      // Ajouter le livre dans l'état de l'auteur
      setAuthor({
        ...author,
        books: [...author.books, response.data],
      });


      // Fermer le modal
      setIsLibraryModalOpen(false);
      setNewBook({
        title: '',
        author: author.id,
        publicationDate: 0,
        price: 0
      });

      // Recharger la page
    window.location.reload();
    } catch (error) {
      console.error('Erreur lors de l’ajout du livre :', error);
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
        <h3 className="text-xl font-semibold mb-2">Ajouter un Livre</h3>

        <button
          onClick={() => setIsLibraryModalOpen(true)} // Ouvrir le modal pour ajouter un livre
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Ajouter un Livre
        </button>
      </div>

      {/* Modal pour ajouter un livre */}
      <GenericModal
        isOpen={isLibraryModalOpen}
        title="Ajouter un nouveau livre"
        onClose={() => setIsLibraryModalOpen(false)}
        onAction={handleAddBook}
        actionLabel="Ajouter"
      >
        <p> Titre : </p>
        <input
          type="text"
          placeholder="Titre"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        
        <p> Auteur : </p>
        <input
          type="text"
          value={`${author.first_name} ${author.last_name}`}
          disabled
          className="border p-2 rounded mb-2 w-full bg-gray-200"
        />

        <p>Date de publication :</p>
        <input
          type="text"
          value={newBook.publicationDate || 0}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,4}$/.test(value)) { // Permet jusqu'à 4 chiffres uniquement
              setNewBook({ ...newBook, publicationDate: parseInt(value, 10) || 0 });
            }
            
          }}
          placeholder="Année (4 chiffres)"
          className="border p-2 rounded mb-4 w-full"
        />

        <p>Prix :</p>
        <input
          type="number"
          placeholder="Prix"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: parseInt(e.target.value) })}
          className="border p-2 rounded mb-4 w-full"
        />
      </GenericModal>

      {/* Modal Delete Auteur */}
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

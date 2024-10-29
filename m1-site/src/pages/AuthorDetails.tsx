import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Définition du type pour un auteur
interface Author {
  id: number;
  name: string;
  photo: string;
  biography: string;
  books: { id: number; title: string }[]; // Liste des livres de l'auteur
}

// Exemple d'auteur statique (peut être remplacé par des données dynamiques)
const exampleAuthor: Author = {
  id: 1,
  name: 'Author One',
  photo: 'https://via.placeholder.com/100',
  biography: 'Cette auteur a écrit plusieurs livres dans différents genres.',
  books: [
    { id: 1, title: 'Book One' },
    { id: 2, title: 'Book Two' },
  ],
};

const AuthorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [author] = useState<Author>(exampleAuthor); // Remplace par l'auteur correspondant selon l'ID
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updatedName, setUpdatedName] = useState<string>(author.name);
  const [updatedBio, setUpdatedBio] = useState<string>(author.biography);

  const handleDeleteAuthor = () => {
    // Logique pour supprimer l'auteur (remplacer par l'appel à l'API)
    console.log(`Auteur ${author.name} supprimé`);
    setIsDeleteModalOpen(false);
  };

  const handleUpdateAuthor = () => {
    // Logique pour mettre à jour les informations de l'auteur (remplacer par l'appel à l'API)
    console.log(`Auteur mis à jour : ${updatedName}, ${updatedBio}`);
    setIsEditMode(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Détails de l'Auteur</h1>
      <div className="flex mb-4">
        <img src={author.photo} alt={`${author.name}'s photo`} className="h-32 w-32 rounded-full mr-4" />
        <div>
          {isEditMode ? (
            <div>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
              />
              <textarea
                value={updatedBio}
                onChange={(e) => setUpdatedBio(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
                rows={4}
              />
              <button onClick={handleUpdateAuthor} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                Sauvegarder
              </button>
              <button onClick={() => setIsEditMode(false)} className="bg-gray-300 text-black px-4 py-2 rounded">
                Annuler
              </button>
            </div>
          ) : (
            <div>
              <h2 className="font-bold text-xl">{author.name}</h2>
              <p className="mb-2">{author.biography}</p>
              <button onClick={() => setIsEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                Modifier
              </button>
              <button onClick={() => setIsDeleteModalOpen(true)} className="bg-red-500 text-white px-4 py-2 rounded">
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Livres de cet auteur</h3>
      <ul>
        {author.books.map((book) => (
          <li key={book.id} className="mb-1">
            <Link to={`/books/${book.id}`} className="text-blue-500 hover:underline">
              {book.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Modale de confirmation pour la suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirmation de la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer l'auteur {author.name} ?</p>
            <div className="flex justify-end mt-4">
              <button onClick={handleDeleteAuthor} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                Supprimer
              </button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorDetails;

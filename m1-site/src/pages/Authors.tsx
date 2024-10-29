import React, { useState } from 'react';

// Définition du type pour un auteur
interface Author {
  id: number;
  name: string;
  photo: string;
  bookCount: number;
  averageRating: number; // Moyenne pondérée des avis
}

// Exemple d'auteurs statiques (peut être remplacé par des données dynamiques)
const initialAuthors: Author[] = [
  { id: 1, name: 'Author One', photo: 'https://via.placeholder.com/100', bookCount: 5, averageRating: 4.5 },
  { id: 2, name: 'Author Two', photo: 'https://via.placeholder.com/100', bookCount: 3, averageRating: 4.0 },
  { id: 3, name: 'Author Three', photo: 'https://via.placeholder.com/100', bookCount: 8, averageRating: 5.0 },
];

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>(initialAuthors);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newAuthor, setNewAuthor] = useState<{ name: string; photo: string; bookCount: number }>({
    name: '',
    photo: '',
    bookCount: 0,
  });

  const filteredAuthors = authors.filter(author => author.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddAuthor = () => {
    const newAuthorData: Author = {
      id: authors.length + 1,
      name: newAuthor.name,
      photo: newAuthor.photo,
      bookCount: newAuthor.bookCount,
      averageRating: 0, // Note moyenne par défaut
    };
    setAuthors([...authors, newAuthorData]);
    setNewAuthor({ name: '', photo: '', bookCount: 0 }); // Réinitialiser le formulaire
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Auteurs</h1>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          className="border p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ajouter un auteur
        </button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAuthors.map(author => (
          <li key={author.id} className="border p-4 rounded flex flex-col items-center">
            <img src={author.photo} alt={`${author.name}'s photo`} className="h-24 w-24 rounded-full mb-2" />
            <h2 className="font-bold">{author.name}</h2>
            <p>Nombre de livres: {author.bookCount}</p>
            <p>Note moyenne: {author.averageRating}</p>
          </li>
        ))}
      </ul>

      {/* Modale pour ajouter un auteur */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Ajouter un nouvel auteur</h2>
            <input
              type="text"
              placeholder="Nom"
              className="border p-2 rounded mb-2 w-full"
              value={newAuthor.name}
              onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL de la photo"
              className="border p-2 rounded mb-2 w-full"
              value={newAuthor.photo}
              onChange={(e) => setNewAuthor({ ...newAuthor, photo: e.target.value })}
            />
            <input
              type="number"
              placeholder="Nombre de livres"
              className="border p-2 rounded mb-4 w-full"
              value={newAuthor.bookCount}
              onChange={(e) => setNewAuthor({ ...newAuthor, bookCount: Number(e.target.value) })}
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddAuthor}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Ajouter
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authors;

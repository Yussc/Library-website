import React, { useState } from 'react';
import { Author } from '../models/AuthorModel';
import Liste from '../composants/Liste';
import SearchBar from '../composants/SearchBar';
import Button from '../composants/Button';
import GenericModal from '../composants/GenericModal';
import { useNavigate } from 'react-router-dom'; // Changer ici

const initialAuthors: Author[] = [
  { id: 1, name: 'Author 1', photoUrl: '/images/author1.jpg', bookCount: 5, averageRating: 4.2 },
  { id: 2, name: 'Author 2', photoUrl: '/images/author2.jpg', bookCount: 3, averageRating: 4.0 },
  { id: 3, name: 'Author 3', photoUrl: '/images/author3.jpg', bookCount: 7, averageRating: 4.5 },
];

const Authors: React.FC = () => {
  const navigate = useNavigate(); // Changer ici
  const [authors, setAuthors] = useState<Author[]>(initialAuthors);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newAuthor, setNewAuthor] = useState<{ name: string; photoUrl: string; bookCount: number; averageRating: number }>({
    name: '',
    photoUrl: '',
    bookCount: 0,
    averageRating: 0,
  });

  const handleAddAuthor = () => {
    const newAuthorData: Author = {
      id: authors.length + 1,
      name: newAuthor.name,
      photoUrl: newAuthor.photoUrl,
      bookCount: newAuthor.bookCount,
      averageRating: newAuthor.averageRating,
    };
    setAuthors([...authors, newAuthorData]);
    setNewAuthor({ name: '', photoUrl: '', bookCount: 0, averageRating: 0 });
    setIsModalOpen(false);
  };

  const handleAuthorClick = (id: number) => {
    navigate(`/authors/${id}`); // Changer ici
  };

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Auteurs</h1>

      {/* Barre de recherche */}
      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        placeholder="Rechercher par nom..."
      />

      {/* Bouton pour ajouter un nouvel auteur */}
      <Button label="Ajouter un auteur" onClick={() => setIsModalOpen(true)} />

      {/* Liste des auteurs filtrés */}
      <Liste
        items={filteredAuthors}
        renderItem={(author) => (
          <div key={author.id} className="flex items-center border-b py-2 cursor-pointer" onClick={() => handleAuthorClick(author.id)}>
            <img src={author.photoUrl} alt={author.name} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h2 className="font-bold">{author.name}</h2>
              <p>Nombre de livres: {author.bookCount}</p>
              <p>Note moyenne: {author.averageRating}</p>
            </div>
          </div>
        )}
      />

      {/* Modal pour ajouter un nouvel auteur */}
      <GenericModal
        isOpen={isModalOpen}
        title="Ajouter un nouvel auteur"
        onClose={() => setIsModalOpen(false)}
        onAction={handleAddAuthor}
        actionLabel="Ajouter"
      >
        <input
          type="text"
          placeholder="Nom de l'auteur"
          value={newAuthor.name}
          onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="URL de la photo"
          value={newAuthor.photoUrl}
          onChange={(e) => setNewAuthor({ ...newAuthor, photoUrl: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Nombre de livres"
          value={newAuthor.bookCount}
          onChange={(e) => setNewAuthor({ ...newAuthor, bookCount: Number(e.target.value) })}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Note moyenne"
          value={newAuthor.averageRating}
          onChange={(e) => setNewAuthor({ ...newAuthor, averageRating: Number(e.target.value) })}
          className="border p-2 rounded mb-4 w-full"
        />
      </GenericModal>
    </div>
  );
};

export default Authors;

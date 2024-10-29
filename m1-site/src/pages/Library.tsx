import React, { useState } from 'react';

// Définition du type pour un livre
interface Book {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
  averageRating: number; // Pour la note moyenne une fois les avis implémentés
}

// Exemple de livres statiques (peut être remplacé par des données dynamiques)
const initialBooks: Book[] = [
  { id: 1, title: 'Book 1', author: 'Author 1', publicationDate: '2021-01-01', averageRating: 4.5 },
  { id: 2, title: 'Book 2', author: 'Author 2', publicationDate: '2022-05-15', averageRating: 3.8 },
  { id: 3, title: 'Book 3', author: 'Author 3', publicationDate: '2020-10-30', averageRating: 5.0 },
];

const Library: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('title'); // Options: 'title', 'author', 'date'
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newBook, setNewBook] = useState<{ title: string; author: string; publicationDate: string }>({
    title: '',
    author: '',
    publicationDate: '',
  });

  const filteredBooks = books
    .filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'title') return a.title.localeCompare(b.title);
      if (sortOption === 'author') return a.author.localeCompare(b.author);
      return new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime();
    });

  const handleAddBook = () => {
    const newBookData: Book = {
      id: books.length + 1,
      title: newBook.title,
      author: newBook.author,
      publicationDate: newBook.publicationDate,
      averageRating: 0, // Note moyenne par défaut
    };
    setBooks([...books, newBookData]);
    setNewBook({ title: '', author: '', publicationDate: '' }); // Réinitialiser le formulaire
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Bibliothèque</h1>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Rechercher par titre..."
          className="border p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="title">Trier par titre</option>
          <option value="author">Trier par auteur</option>
          <option value="date">Trier par date</option>
        </select>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ajouter un livre
        </button>
      </div>
      <ul className="border rounded">
        {filteredBooks.map(book => (
          <li key={book.id} className="p-4 border-b">
            <h2 className="font-bold">{book.title}</h2>
            <p>Auteur: {book.author}</p>
            <p>Date de publication: {new Date(book.publicationDate).toLocaleDateString()}</p>
            <p>Note moyenne: {book.averageRating}</p>
          </li>
        ))}
      </ul>

      {/* Modale pour ajouter un livre */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Ajouter un nouveau livre</h2>
            <input
              type="text"
              placeholder="Titre"
              className="border p-2 rounded mb-2 w-full"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Auteur"
              className="border p-2 rounded mb-2 w-full"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 rounded mb-4 w-full"
              value={newBook.publicationDate}
              onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })}
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddBook}
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

export default Library;

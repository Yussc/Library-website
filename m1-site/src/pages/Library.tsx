import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importer Axios
import { Book } from '../models/BookModel';
import Liste from '../composants/Liste';
import SearchBar from '../composants/SearchBar';
import SortSelector from '../composants/SortSelector';
import AddButton from '../composants/AddButton';
import GenericModal from '../composants/GenericModal';

const Library: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);  // Initialiser un état vide pour les livres
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('title');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newBook, setNewBook] = useState<{ title: string; author: string; publicationDate: string }>({
    title: '',
    author: '',
    publicationDate: '',
  });

  // Requête pour récupérer les livres
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/books'); // URL de l'API
      console.log('Réponse de la requête:', response.data);
      // Adapter les données de l'API au modèle Book
      const fetchedBooks = response.data.map((book: any) => ({
        id: book.id,
        title: book.title,
        author: `${book.author.first_name} ${book.author.last_name}`,  // Combiner prénom et nom de l'auteur
        publicationDate: book.yearPublished.toString(),  // Adapter la date
        averageRating: book.mean || 0,  // Si la moyenne est nulle, la mettre à 0
      }));
      setBooks(fetchedBooks); // Mettre à jour l'état avec les livres récupérés
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  // Appeler la fonction fetchData dès que le composant est monté
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBook = () => {
    const newBookData: Book = {
      id: books.length + 1,
      title: newBook.title,
      author: newBook.author,
      publicationDate: newBook.publicationDate,
      averageRating: 0,
    };
    setBooks([...books, newBookData]);
    setNewBook({ title: '', author: '', publicationDate: '' });
    setIsModalOpen(false);
  };

  const sortOptions = [
    { value: 'title', label: 'Trier par titre' },
    { value: 'author', label: 'Trier par auteur' },
    { value: 'date', label: 'Trier par date de publication' },
  ];

  // Fonction pour trier les livres
  const sortBooks = (books: Book[], sortOption: string) => {
    return [...books].sort((a, b) => {
      if (sortOption === 'title') return a.title.localeCompare(b.title);
      if (sortOption === 'author') return a.author.localeCompare(b.author);
      if (sortOption === 'date') {
        return new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime();
      }
      return 0;
    });
  };

  // Filtrer les livres
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Appliquer le tri sur les livres filtrés
  const sortedBooks = sortBooks(filteredBooks, sortOption);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Bibliothèque</h1>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} placeholder="Rechercher un livre..." />
        <SortSelector sortOption={sortOption} onSortChange={setSortOption} options={sortOptions} />
        <AddButton label="Ajouter un livre" onClick={() => setIsModalOpen(true)} />
      </div>

      <Liste
        items={sortedBooks}
        renderItem={(book) => (
          <div key={book.id} className="p-4 border-b">
            <h2 className="font-bold">{book.title}</h2>
            <p>Auteur: {book.author}</p>
            <p>Date de publication: {new Date(book.publicationDate).toLocaleDateString()}</p>
            <p>Note moyenne: {book.averageRating}</p>
          </div>
        )}
      />

      <GenericModal
        isOpen={isModalOpen}
        title="Ajouter un nouveau livre"
        onClose={() => setIsModalOpen(false)}
        onAction={handleAddBook}
        actionLabel="Ajouter"
      >
        <input
          type="text"
          placeholder="Titre"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Auteur"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="date"
          value={newBook.publicationDate}
          onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })}
          className="border p-2 rounded mb-4 w-full"
        />
      </GenericModal>
    </div>
  );
};

export default Library;

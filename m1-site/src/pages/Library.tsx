import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { Link } from 'react-router-dom';
import { Book } from '../models/BookModel';
import Liste from '../composants/Liste';
import SearchBar from '../composants/SearchBar';
import SortSelector from '../composants/SortSelector';
import AddButton from '../composants/AddButton';
import GenericModal from '../composants/GenericModal';

const Library: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authorsComponent, setAuthorsComponent] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('title');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newBook, setNewBook] = useState<{ title: string; author: number; publicationDate: string, price: string }>({
    title: '',
    author: 1,
    publicationDate: '',
    price: '',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/books');
      const response2 = await axios.get('http://localhost:3001/authors');
      let tableAuthor = [];
      for(let author of response2.data){
        tableAuthor.push(<option value={author.id}>{`${author.first_name} ${author.last_name}`}</option>)
      }
      setAuthorsComponent(tableAuthor);
      console.log('Réponse de la requête:', response.data);
     
      const fetchedBooks = response.data.map((book: any) => ({
        id: book.id,
        title: book.title,
        author: `${book.author.first_name} ${book.author.last_name}`, 
        publicationDate: book.yearPublished.toString(), 
        averageRating: book.mean || 0, 
      }));
      setBooks(fetchedBooks); 
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBook = async () => {
    // Validation des données
    if (!newBook.title || !newBook.publicationDate || !newBook.price) {
      console.error('Tous les champs doivent être remplis');
      return;
    }



    try {
      
      // Données du livre à envoyer
      const newBookData = {
        title: newBook.title,
        authorId: newBook.author, // L'ID de l'auteur
        yearPublished: parseInt(newBook.publicationDate, 10),
        mean: 0,
        price: parseFloat(newBook.price),
      };

      console.log('Données envoyées au serveur:', newBookData);

      // Envoi de la requête pour ajouter le livre
      const response = await axios.post('http://localhost:3001/books/create', newBookData);

      console.log('Réponse du serveur lors de l\'ajout:', response.data);

      // Rechargement des livres après ajout
      fetchData();

      // Réinitialisation des valeurs du formulaire après un ajout réussi
      setNewBook({ title: '', author: 1, publicationDate: '', price: '' });
      setIsModalOpen(false);

    } catch (error: any) {
      console.error('Erreur lors de l\'ajout du livre:', error.response?.data || error.message);
    }
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

  const filteredBooks = books.filter(book => 
    book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
          <Link to={`/books/${book.id}`}>
            <div key={book.id} className="p-4 border-b cursor-pointer">
              <h2 className="font-bold">{book.title}</h2>
              <p>Auteur: {book.author}</p>
              <p>Date de publication: {book.publicationDate}</p>
              <p>Note moyenne: {book.averageRating}</p>
            </div>
          </Link>
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
        <select
          onChange={(e) => setNewBook({ ...newBook, author: parseInt(e.target.value) })}
          className="border p-2 rounded mb-2 w-full"
        >
        {authorsComponent}
        </select>
        <p>Date de publication :</p>
        <input
          type="text"
          value={newBook.publicationDate}
          onChange={(e) => {
            const value = e.target.value;
            // Vérifier si la valeur correspond à une chaîne de 4 chiffres maximum
            if (/^\d{0,4}$/.test(value)) {
              setNewBook({ ...newBook, publicationDate: value });
            }
          }}
          className="border p-2 rounded mb-4 w-full"
        />
        <input
          type="number"
          placeholder="Prix"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          className="border p-2 rounded mb-4 w-full"
        />
      </GenericModal>
    </div>
  );
};

export default Library;

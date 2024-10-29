import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Définition des types pour un avis et un livre
interface Review {
  id: number;
  rating: number; // Note entre 1 et 5
  comment?: string; // Commentaire optionnel
  date: string; // Date de création
}

interface Book {
  id: number;
  title: string;
  price: number;
  publicationYear: number;
  author: string;
  authorId: number; // ID de l'auteur pour le lien
  reviews: Review[]; // Liste des avis
}

// Exemple de livres (cela peut venir d'une API)
const booksData: Book[] = [
  {
    id: 1,
    title: 'Book One',
    price: 19.99,
    publicationYear: 2021,
    author: 'Author One',
    authorId: 1,
    reviews: [
      { id: 1, rating: 5, comment: 'Excellent book!', date: '2023-01-01' },
      { id: 2, rating: 4, comment: 'Very good read.', date: '2023-02-01' },
      { id: 3, rating: 2, comment: 'Not what I expected.', date: '2023-03-01' },
    ],
  },
  // Ajoute d'autres livres ici...
];

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    // Simuler le chargement des données du livre par ID
    const foundBook = booksData.find(b => b.id === Number(id));
    if (foundBook) {
      setBook(foundBook);
      setReviews(foundBook.reviews);
    } else {
      // Gérer le cas où le livre n'est pas trouvé
      console.error('Livre non trouvé');
    }
  }, [id]);

  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const handleDeleteBook = () => {
    console.log(`Livre ${book?.title} supprimé !`);
    navigate('/books');
    setConfirmationOpen(false);
  };

  if (!book) {
    return <div className="text-center">Chargement...</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">{book.title}</h1>
      <p>Prix: <span className="font-bold">${book.price.toFixed(2)}</span></p>
      <p>Année de publication: <span className="font-bold">{book.publicationYear}</span></p>
      <p>
        Auteur: <Link to={`/authors/${book.authorId}`} className="text-blue-500 hover:underline">{book.author}</Link>
      </p>
      
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={() => setConfirmationOpen(true)}
      >
        Supprimer le livre
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Avis</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setOpenDrawer(true)}
        >
          Voir les avis
        </button>
      </div>

      {/* Drawer pour les avis */}
      {openDrawer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-end">
          <div className="bg-white w-80 p-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Liste des avis</h2>
            <div className="flex justify-between mb-2">
              <label>Trier par date:</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="ml-2 border rounded">
                <option value="asc">Ascendant</option>
                <option value="desc">Descendant</option>
              </select>
            </div>
            <ul className="max-h-60 overflow-y-auto">
              {sortedReviews.map(review => (
                <li key={review.id} className="mb-2 p-2 border-b">
                  <div>
                    <span className="font-bold">Évaluation: {review.rating} ★</span>
                    {review.comment && <p>Commentaire: {review.comment}</p>}
                    <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-4 text-blue-500" onClick={() => setOpenDrawer(false)}>Fermer</button>
          </div>
        </div>
      )}

      {/* Modale de confirmation */}
      {confirmationOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce livre ?</p>
            <div className="flex justify-end mt-4">
              <button onClick={handleDeleteBook} className="bg-red-600 text-white px-4 py-2 rounded mr-2 hover:bg-red-700">
                Supprimer
              </button>
              <button onClick={() => setConfirmationOpen(false)} className="border rounded px-4 py-2 hover:bg-gray-200">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;

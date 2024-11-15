import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-4xl font-bold">Explorez votre bibliothèque</h1>
        <p className="mt-2">Découvrez, évaluez et gérez vos livres et auteurs préférés</p>
        <Link to="/books">
          <button className="mt-4 px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-100">
            Voir mes livres
          </button>
        </Link>
      </header>

      <footer className="text-center py-4">
        <p className="text-gray-600">© 2024 Bibliothèque en ligne. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default HomePage;

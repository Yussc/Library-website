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

      <section className="my-8">
        <h2 className="text-2xl font-semibold text-center">Fonctionnalités</h2>
        <div className="flex flex-wrap justify-center space-x-4 mt-4">
          <div className="p-4 bg-white rounded shadow w-60">
            <h3 className="font-bold">Gestion des livres</h3>
            <p>Ajoutez, modifiez et supprimez vos livres.</p>
          </div>
          <div className="p-4 bg-white rounded shadow w-60">
            <h3 className="font-bold">Gestion des auteurs</h3>
            <p>Ajoutez de nouveaux auteurs et consultez leurs œuvres.</p>
          </div>
          <div className="p-4 bg-white rounded shadow w-60">
            <h3 className="font-bold">Évaluations et avis</h3>
            <p>Laissez des avis et lisez ceux des autres utilisateurs.</p>
          </div>
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold text-center">Livres Recommandés</h2>
        <div className="flex flex-wrap justify-center mt-4">
          {/* Exemple de livres recommandés */}
          <div className="p-4">
            <div className="bg-white rounded shadow w-48">
              <img src="https://via.placeholder.com/150" alt="Livre" className="rounded-t" />
              <h3 className="font-bold p-2">Titre du Livre</h3>
              <p className="px-2">Auteur: Nom de l'Auteur</p>
              <Link to="/books/1" className="block text-blue-500 text-center py-2">Voir Détails</Link>
            </div>
          </div>
          {/* Ajoute d'autres livres ici */}
        </div>
      </section>

      <footer className="text-center py-4">
        <p className="text-gray-600">© 2024 Bibliothèque en ligne. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default HomePage;

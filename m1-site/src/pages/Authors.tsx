import React, { useState, useEffect } from 'react';
import { Author } from '../models/AuthorModel';
import Liste from '../composants/Liste';
import SearchBar from '../composants/SearchBar';
import Button from '../composants/Button';
import GenericModal from '../composants/GenericModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Authors: React.FC = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newAuthor, setNewAuthor] = useState<{ lastname: string; firstname: string; bio: string; photoUrl: string; bookCount: number; averageRating: number }>({
    lastname: '',
    firstname: '',
    bio: '',
    photoUrl: '',
    bookCount: 0,
    averageRating: 0,
  });

  // Requête pour récupérer les auteurs
  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:3001/authors');
      console.log('Réponse de la requête:', response.data);
      const fetchedAuthors = response.data.map((author: any) => ({
        id: author.id,
        name: `${author.first_name} ${author.last_name}`,
        photoUrl: author.picture,
        bookCount: author.number_books,
        averageRating: 0,
      }));
      setAuthors(fetchedAuthors);
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

 
  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleAddAuthor = async () => {
    try {
     
      const payload = {
        first_name: newAuthor.firstname || '', 
        last_name: newAuthor.lastname || '',
        picture: newAuthor.photoUrl,
        bio: newAuthor.bio || `Auteur de ${newAuthor.bookCount} livre(s).`, 
      };
  
     
      const response = await axios.post('http://localhost:3001/authors/create', payload);
      console.log('Auteur créé avec succès:', response.data);
  
     
      const createdAuthor: Author = {
        id: response.data.id,
        name: `${newAuthor.firstname} ${newAuthor.lastname}` ,
        photoUrl: newAuthor.photoUrl,
        bookCount: newAuthor.bookCount,
        averageRating: newAuthor.averageRating,
      };
  
      setAuthors([...authors, createdAuthor]);
      setNewAuthor({ lastname: '', firstname: '', bio: '', photoUrl: '', bookCount: 0, averageRating: 0 });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’auteur :', error);
    }
  };

  const handleAuthorClick = (id: number) => {
    navigate(`/authors/${id}`);
  };

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Auteurs</h1>

      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        placeholder="Rechercher par nom..."
      />

      <Button label="Ajouter un auteur" onClick={() => setIsModalOpen(true)} />

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
          value={newAuthor.lastname}
          onChange={(e) => setNewAuthor({ ...newAuthor, lastname: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Prénom"
          value={newAuthor.firstname}
          onChange={(e) => setNewAuthor({ ...newAuthor, firstname: e.target.value })}
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
          type="text"
          placeholder="Biographie"
          value={newAuthor.bio}
          onChange={(e) => setNewAuthor({ ...newAuthor, bio: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        
      </GenericModal>
    </div>
  );
};

export default Authors;

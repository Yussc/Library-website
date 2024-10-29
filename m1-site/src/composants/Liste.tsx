import React from 'react';

interface ListeProps<T> {
  items: T[];  // Liste des éléments, de type générique T
  renderItem: (item: T) => React.ReactNode;  // Fonction de rendu pour chaque élément
}

function Liste<T>({ items, renderItem }: ListeProps<T>) {
  return (
    <ul className="border rounded">
      {items.map((item, index) => (
        <li key={index} className="p-4 border-b">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default Liste;

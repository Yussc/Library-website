import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app/App.css';
import Home from './pages/Home';
import NavBar from './pages/NavBar'
import Library from './pages/Library'
import Authors from './pages/Authors'
import BookDetail from './pages/BookDetail'
import AuthorDetails from './pages/AuthorDetails';


function App() {
  return (
    <Router>
         <div>
        <NavBar/>
        </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Library />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/authors/:id" element={<AuthorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

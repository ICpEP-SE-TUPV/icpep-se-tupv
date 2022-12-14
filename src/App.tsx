
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Article from './pages/Article';
import Articles from './pages/Articles';

class App extends React.Component {
  render () {
    return (
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/article/:year/:slug" element={<Article />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    );
  }
}

export default App;

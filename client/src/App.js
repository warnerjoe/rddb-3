import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cards')
      .then(response => {
        setCards(response.data); // Update state with fetched card data
      })
      .catch(error => {
        console.error('Error fetching the card data:', error);
      });
  }, []); // Empty dependency array ensures this runs only once when component mounts

  return (
    <div className="App">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Map over cards state and render a Card component for each card */}
        {cards.map(card => (
          <Card key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default App;

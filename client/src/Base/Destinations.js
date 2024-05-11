import React, { useEffect, useState } from 'react'
import Backimgone from '../assets/b-img-4.jpg'
import CardLocation from '../Components/CardLoacation';
import Card from '../Components/Card';

function Destinations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCards, setShowAllCards] = useState(false);
  const initialCardCount = 3; // Default number of cards to show initially
  const totalCount = 15; // Total number of cards available

  const [cardCount, setCardCount] = useState(initialCardCount);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchQuery);
    setSearchQuery('');
  };

  const handleLoadMore = () => {
    setShowAllCards(true);
    setCardCount(totalCount); // Set card count to total count when loading more
  };

  const handleLoadLess = () => {
    setShowAllCards(false);
    setCardCount(initialCardCount); // Reset card count to initial count when loading less
  };

  const [cards, setCards] = useState([]); // State to store fetched cards

  useEffect(() => {

    const sampleData = [
      { id: 1, title: 'Card 1' },
      { id: 2, title: 'Card 2' },
      { id: 3, title: 'Card 3' },
      { id: 4, title: 'Card 4' },

    ];
    setCards(sampleData);
  }, []); // Fetch data only once when component mounts

  return (

    <div className='trans-page-wrappper'>
      <div className='home-image'>
        <img src={Backimgone} alt='' />
        <div className='home-content'>
          <h1>
            <span className="dot">.</span>Destinations
          </h1>
        </div>
      </div>
      <form className="search-container" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter your journey point"
          value={searchQuery}
          onChange={handleChange}

        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className='location-card-container'>
        {[...Array(cardCount)].map((_, index) => (
          <CardLocation key={index} />
        ))}
      </div>
      <div className='load-more-btn-wrapper'>
      {!showAllCards ? (
        <button onClick={handleLoadMore} className="load-button">
          Load More ({totalCount - initialCardCount} more)
        </button>
      ) : (
        <button onClick={handleLoadLess} className="load-button">
          Load Less
        </button>
      )}
      </div>
      <h4 className='sub-title-one'>
        Vehicle Renting
      </h4>
      <div className='own-card-area'>

        <div className='own-cards-area'>
          {cards.map((card) => (
            <Card key={card.id} title={card.title} className="card" />
          ))}
        </div>
      </div>

      <h4 className='sub-title-one'>
        Cab Services
      </h4>
      <div className='own-card-area'>

        <div className='own-cards-area'>
          {cards.map((card) => (
            <Card key={card.id} title={card.title} className="card" />
          ))}
        </div>
      </div>

      <h4 className='sub-title-one'>
        Public Transportation
      </h4>
      <div className='own-card-area'>

        <div className='own-cards-area'>
          {cards.map((card) => (
            <Card key={card.id} title={card.title} className="card" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Destinations;
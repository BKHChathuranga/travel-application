import React, { useEffect, useState } from 'react';
import Backimgone from '../assets/b-img-3.jpg';
import CardLocation from '../Components/CardLoacation';
import Card from '../Components/Card';
import { getAccommodations, getDestinations, getRandomAccommodations, getRecommendations } from '../api/api'; // Assuming there's an API function to fetch accommodations

function Accomadations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCards, setShowAllCards] = useState(false);
  const initialCardCount = 3; 
  const totalCount = 5; 

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
    setCardCount(totalCount); 
  };

  const handleLoadLess = () => {
    setShowAllCards(false);
    setCardCount(initialCardCount); 
  };

  const [accommodations, setAccommodations] = useState([]); // State to store fetched accommodations

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!localStorage.getItem("isUsingRecommendation")) {
        // Fetch transportation
        getRandomAccommodations()
          .then((response) => {
            console.log(response.data)
            setAccommodations(response.data);
          })
          .catch((error) => {
            console.error("Error fetching transportation:", error);
          });
      } else {
        try {
          const destinationsResponse = await getDestinations({
            category: localStorage.getItem("firstAnswer"),
          });
          const recommendationsResponse = await getRecommendations({
            category: localStorage.getItem("thirdAnswer"),
            location: localStorage.getItem("secondAnswer"),
          });
          if (recommendationsResponse.status === 200) {
            setAccommodations(recommendationsResponse.data.accommodations);
            console.log(recommendationsResponse.data.accommodations)
          }
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      }
    };

    fetchRecommendations();
  }, [localStorage.getItem("isUsingRecommendation")]);
 // Fetch data only once when component mounts

  return (
    <div className='trans-page-wrappper'>
      <div className='home-image'>
        <img src={Backimgone} alt='' />
        <div className='home-content'>
          <h1>
            <span className="dot">.</span>Accommodation
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
        Villas
      </h4>
      <div className='own-card-area'>
        <div className='own-cards-area'>
          {accommodations
            ?.filter(accommodation => accommodation.Name?.toLowerCase().includes('villa') || accommodation.name?.toLowerCase().includes('villa'))
            ?.map((accommodation) => (
              <Card key={accommodation.id} data={accommodation} type="accommodation"/>
            ))}
        </div>
      </div>

      <h4 className='sub-title-one'>
        Rest Houses
      </h4>
      <div className='own-card-area'>
        <div className='own-cards-area'>
          {accommodations
            ?.filter(accommodation => accommodation.Name?.toLowerCase().includes('rest') || accommodation.name?.toLowerCase().includes('rest'))
            ?.map((accommodation) => (
              <Card key={accommodation.id} data={accommodation} type="accommodation"/>
            ))}
        </div>
      </div>

      <h4 className='sub-title-one'>
        Other Accommodations
      </h4>
      <div className='own-card-area'>
        <div className='own-cards-area'>
          {accommodations
            ?.filter(accommodation => 
              !(accommodation.Name?.toLowerCase().includes('villa') || 
                accommodation.Name?.toLowerCase().includes('hotel') || 
                accommodation.Name?.toLowerCase().includes('rest house') || accommodation.name?.toLowerCase().includes('villa') || 
                accommodation.name?.toLowerCase().includes('hotel') || 
                accommodation.name?.toLowerCase().includes('rest house')))
            ?.map((accommodation) => (
              <Card key={accommodation.id} data={accommodation} type="accommodation" />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Accomadations;

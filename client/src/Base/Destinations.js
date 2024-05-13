import React, { useEffect, useState } from "react";
import Backimgone from "../assets/b-img-4.jpg";
import CardLocation from "../Components/CardLoacation";
import Card from "../Components/Card";
import {
  getDestinations,
  getRandomDestinations,
  getRecommendations,
} from "../api/api";

function Destinations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllCards, setShowAllCards] = useState(false);
  const initialCardCount = 3; // Default number of cards to show initially
  const totalCount = 21; // Total number of cards available
  const [destinations, setDestinations] = useState([]);
  const [cardCount, setCardCount] = useState(initialCardCount);
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!localStorage.getItem("isUsingRecommendation")) {
        // Fetch transportation
        getRandomDestinations()
          .then((response) => {
            setDestinations(response.data);
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
            setDestinations(recommendationsResponse.data.destinations);
            console.error(recommendationsResponse.data, "destinations");
          }
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      }
    };

    fetchRecommendations();
  }, [localStorage.getItem("isUsingRecommendation")]);

 
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchQuery);
    setSearchQuery("");
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
      { id: 1, title: "Card 1" },
      { id: 2, title: "Card 2" },
      { id: 3, title: "Card 3" },
      { id: 4, title: "Card 4" },
    ];
    setCards(sampleData);
  }, []); // Fetch data only once when component mounts

  return (
    <div className="trans-page-wrappper">
      <div className="home-image">
        <img src={Backimgone} alt="" />
        <div className="home-content">
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
      <div className="location-card-container">
        {destinations?.slice(0, cardCount)?.map((destination, index) => (
          <Card key={index} data={destination} type="destination"/>
        ))}
      </div>
      <div className="load-more-btn-wrapper">
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
    </div>
  );
}

export default Destinations;

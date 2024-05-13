import React, { useEffect, useState } from "react";
import Backimgone from "../assets/b-img-5.jpg";
import Card from "../Components/Card";
import {
  getDestinations,
  getRandomTransportation,
  getRecommendations,
} from "../api/api";

function Transportation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllCards, setShowAllCards] = useState(false);
  const initialCardCount = 3; // Default number of cards to show initially
  const totalCount = 7; // Total number of cards available
  const [transportations, setTransportations] = useState([]);
  const [showMore, setShowMore] = useState({
    renting: false,
    cab: false,
    other: false,
  });

  const [cardCount, setCardCount] = useState(initialCardCount);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!localStorage.getItem("isUsingRecommendation")) {
        // Fetch transportation
        getRandomTransportation()
          .then((response) => {
            setTransportations(response.data);
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
            setTransportations(recommendationsResponse.data.transportation);
            console.log(recommendationsResponse.data.transportation)
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

  return (
    <div className="trans-page-wrappper">
      <div className="home-image">
        <img src={Backimgone} alt="" />
        <div className="home-content">
          <h1>
            <span className="dot">.</span>Transportation
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
        {[...Array(cardCount)].map((_, index) => (
          <Card key={index} data={{}} type="transportation" />
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

      {/* Vehicle Renting */}
      <h4 className="sub-title-one">Vehicle Renting</h4>
      <div className="own-card-area">
        <div className="own-cards-area">
          {transportations
            .filter((transportation) =>
              transportation.name?.toLowerCase().includes("rent") || transportation.Name?.toLowerCase().includes("rent")
            )
            .map((transportation, index) => (
              <Card key={index} data={transportation} type="transportation" />
            ))}
          {transportations.filter((transportation) =>
            transportation.name?.toLowerCase().includes("rent") ||  transportation.Name?.toLowerCase().includes("rent")
          ).length > initialCardCount && !showMore.renting ? (
            <div className="load-more-btn-wrapper">
              <button
                onClick={() =>
                  setShowMore((prevState) => ({ ...prevState, renting: true }))
                }
                className="load-button"
              >
                Load More (
                {transportations.filter((transportation) =>
                  transportation.name?.toLowerCase().includes("rent") || transportation.Name?.toLowerCase().includes("rent")
                ).length - initialCardCount}{" "}
                more)
              </button>
            </div>
          ) : (
            showMore.renting && (
              <button
                onClick={() =>
                  setShowMore((prevState) => ({ ...prevState, renting: false }))
                }
                className="load-button"
              >
                Load Less
              </button>
            )
          )}
        </div>
      </div>

      {/* Cab Services */}
      <h4 className="sub-title-one">Cab Services</h4>
      <div className="own-card-area">
        <div className="own-cards-area">
          {transportations
            .filter((transportation) =>
              transportation.name?.toLowerCase().includes("cab") || transportation.name?.toLowerCase().includes("cabs") || transportation.Name?.toLowerCase().includes("cab") || transportation.Name?.toLowerCase().includes("cabs")
            )
            .map((transportation, index) => (
              <Card key={index} data={transportation} type="transportation" />
            ))}
          {transportations.filter((transportation) =>
            transportation.name?.toLowerCase().includes("cab") || transportation.Name?.toLowerCase().includes("cab")
          ).length > initialCardCount && !showMore.cab ? (
            <div className="load-more-btn-wrapper">
              <button
                onClick={() =>
                  setShowMore((prevState) => ({ ...prevState, cab: true }))
                }
                className="load-button"
              >
                Load More (
                {transportations.filter((transportation) =>
                  transportation.name?.toLowerCase().includes("cab")
                ).length - initialCardCount}{" "}
                more)
              </button>
            </div>
          ) : (
            showMore.cab && (
              <button
                onClick={() =>
                  setShowMore((prevState) => ({ ...prevState, cab: false }))
                }
                className="load-button"
              >
                Load Less
              </button>
            )
          )}
        </div>
      </div>

      {/* Other Transportation */}
      <h4 className="sub-title-one">Other Transportation</h4>
      <div className="own-card-area">
        <div className="own-cards-area">
          {transportations
            .filter(
              (transportation) =>
                !(
                  transportation.name?.toLowerCase().includes("rent") ||
                  transportation.name?.toLowerCase().includes("cab") ||  transportation.Name?.toLowerCase().includes("rent") ||
                  transportation.Name?.toLowerCase().includes("cab")
                )
            )
            .map((transportation, index) => (
              <Card key={index} data={transportation} type="transportation" />
            ))}
          {transportations.filter(
            (transportation) =>
              !(
                transportation.name?.toLowerCase().includes("rent") ||
                transportation.name?.toLowerCase().includes("cab") || transportation.Name?.toLowerCase().includes("rent") ||
                transportation.Name?.toLowerCase().includes("cab")
              )
          ).length > initialCardCount && !showMore.other ? (
            <div className="load-more-btn-wrapper">
              <button
                onClick={() =>
                  setShowMore((prevState) => ({ ...prevState, other: true }))
                }
                className="load-button"
              >
                Load More (
                {transportations.filter(
                  (transportation) =>
                    !(
                      transportation.name?.toLowerCase().includes("rent") ||
                      transportation.name?.toLowerCase().includes("cab") || transportation.Name?.toLowerCase().includes("rent") ||
                      transportation.Name?.toLowerCase().includes("cab")
                    )
                ).length - initialCardCount}{" "}
                more)
              </button>
            </div>
          ) : (
            showMore.other && (
              <button
                onClick={() =>
                  setShowMore((prevState) => ({ ...prevState, other: false }))
                }
                className="load-button"
              >
                Load Less
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Transportation;

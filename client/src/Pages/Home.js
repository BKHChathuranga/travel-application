import React, { useEffect, useState } from "react";
import "../Styles/Style.css";
import Card from "../Components/Card";
import AboutUs from "../Base/AboutUs";
import Destinations from "../Base/Destinations";
import Accomadations from "../Base/Accomadations";
import Gallery from "../Base/Gallery";
import Transportation from "../Base/Transportaion";
import Backimgone from "../assets/b-img-1.jpg";
import Top from "../Components/Top";
import {
  getRandomAccommodations,
  getRandomDestinations,
  getRandomTransportation,
} from "../api/api";

function Home() {
  const [destinations, setDestinations] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [transportations, setTransportations] = useState([]);

  const [visibleCards, setVisibleCards] = useState(3); // State to manage the number of visible cards
  const totalCards = 4; // Total number of cards available

  useEffect(() => {
    // Fetch destinations
    getRandomDestinations()
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
      });

    // Fetch accommodations
    getRandomAccommodations()
      .then((response) => {
        setAccommodations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching accommodations:", error);
      });

    // Fetch transportation
    getRandomTransportation()
      .then((response) => {
        setTransportations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transportation:", error);
      });
  }, []);

  // Transportation page
  const handleViewAllClickTrans = () => {
    window.location.href = "/transportation";
  };

  // Accomadation page
  const handleViewAllClickAcco = () => {
    window.location.href = "/accomadation";
  };

  // destination page
  const handleViewAllClickDest = () => {
    window.location.href = "/destination";
  };

  return (
    <div className="home-wrapper">
      <div className="home-image">
        <img src={Backimgone} alt="" />
        <div className="home-content">
          <h1>
            <span className="dot">.</span>Plan
            <span className="dot">.</span>Explore
            <span className="dot">.</span>Rest
          </h1>
          <button>Get Started</button>
        </div>
      </div>

      <div className="home-body">
        <div className="transportation-wrapper">
          <div className="title-trans">
            <h1>Transportation</h1>
            <div className="card-items-trans">
              {transportations
                .slice(0, visibleCards)
                .map((transportation, index) => (
                  <Card key={index} data={transportation} type="transportation"/>
                ))}
            </div>
            <div className="Button-view-all">
              {visibleCards < transportations.length ? (
                <button
                  className="view-all-trans"
                  onClick={handleViewAllClickTrans}
                >
                  Load More
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="accommodation-wrapper">
          <div className="title-trans">
            <h1>Accommodation</h1>
          </div>
          <div className="card-items-trans">
            {accommodations
              .slice(0, visibleCards)
              .map((accommodation, index) => (
                <Card key={index} data={accommodation} type="accommodation"/>
              ))}
          </div>
          <div className="Button-view-all">
            {visibleCards < accommodations.length ? (
              <button
                className="view-all-trans"
                onClick={handleViewAllClickAcco}
              >
                Load More
              </button>
            ) : null}
          </div>
        </div>
        <div className="destination-wrapper">
          <div className="title-trans">
            <h1>Destinations</h1>
          </div>
          <div className="card-items-trans">
            {destinations.slice(0, visibleCards).map((destination, index) => (
              <Card key={index} data={destination} type="destination"/>
            ))}
          </div>
          <div className="Button-view-all">
            {visibleCards < destinations.length ? (
              <button
                className="view-all-trans"
                onClick={handleViewAllClickDest}
              >
                Load More
              </button>
            ) : null}
          </div>
        </div>
        <div className="about-wrapper">
          <div className="title-trans">
            <h1>About Us</h1>
            <AboutUs />
          </div>
        </div>
        <div className="gallery-wrapper">
          <div className="title-trans">
            <h1>Gallery</h1>
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
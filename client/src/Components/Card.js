import React from "react";
import image1 from "../assets/b-img-2.jpg";
import Car from "../assets/car.png";
import Hotel from "../assets/hotel.png";
import Walking from "../assets/walking.png";

function Card({ data, type }) {
  const capitalizeAddress = (address) => {
    const words = address?.split(" ");

    const capitalizedWords = words?.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords?.join(" ");
  };

  const getImageForDestination = (destination) => {
    try {
      // Get all folder names in the assets directory
      const folders = require.context("../assets", true).keys();

      // Find the folder name containing a word related to the destination
      const matchingFolder = folders.find(folder => folder.toLowerCase().includes(destination.toLowerCase()));

      if (matchingFolder) {
        // Get the last part of the folder path (folder name)
        const folderName = matchingFolder.split('/').slice(-1)[0];

        // Dynamically import the first image in the matching folder
        const images = require.context(`../assets/${folderName}`, false, /\.(png|jpe?g|jfif|svg)$/);
        const firstImage = images.keys().find(image => true);
        
        if (firstImage) {
          return images(firstImage);
        }
      }

      // If no matching folder or image is found, return a default image
      return require("../assets/defaultdestination.jpeg");
    } catch (error) {
      // If any error occurs, return a default image
      return require("../assets/defaultdestination.jpeg");
    }
  };
  return (
    <>
      {type === "transportation" && (
        <div className="card">
          <div className="card-header">
            <img src={image1} />
          </div>
          <div className="title-rating">
            <h2>{data.Name} {data.name}</h2>
            <div className="rating">
              <span className="star">&#9733;</span>
              <p className="rating-number">{(Math.random() * 5).toFixed(1)}</p>
            </div>
          </div>
          <div className="card-middle">
            <p>{data.District}{data.district}</p>
          </div>
          <div className="card-guidlines">
            <ul>
              <li>Reviews: {data.review}</li>
            </ul>
          </div>
          <div className="price-card">{data.price}</div>
        </div>
      )}

      {type === "accommodation" && (
        <div className="card">
          <div className="card-header">
            <img src={image1} />
          </div>
          <div className="title-rating">
            <h2>{data.Name}{data.name}</h2>
            <div className="rating">
              <span className="star">&#9733;</span>
              <p className="rating-number">{data.Grade?.toLowerCase()}{data.grade?.toLowerCase()}</p>
            </div>
          </div>
          <div className="card-middle">
            <p>{data.District}{data.district}</p>
          </div>

          <div className="card-guidlines">
            <ul>
              <li>Address: {capitalizeAddress(data.Address?.toLowerCase())}{capitalizeAddress(data.address?.toLowerCase())}</li>
            </ul>
          </div>
          <div className="price-card">
            ${Math.floor(Math.random() * (200 - 50 + 1)) + 50}
            <span className="label-price">Per Adult</span>
          </div>
        </div>
      )}
      {type === "destination" && (
        <div className="card">
          <div className="card-header">
          <img src={getImageForDestination(data.Destination)} alt="" />
          </div>
          <div className="title-rating">
            <h2>{data.Destination} {data.name}</h2>
            <div className="rating">
              <span className="star">&#9733;</span>
              <p className="rating-number">{data.Rating}{data.rating}</p>
            </div>
          </div>
          <div className="card-middle">
            <p>
              {data["Destination Type"]} {data["destination_type"]} - {data.District}{data.district}
            </p>
          </div>
          <div className="card-body">
            <div className="image-group">
              <img className="icon-card" src={Hotel} />
              <h3>{Math.floor(Math.random() * 10) + 1}</h3>
            </div>
            <div className="image-group">
              <img src={Car} />
              <h3>{Math.floor(Math.random() * 10) + 1}</h3>
            </div>
            <div className="image-group">
              <img src={Walking} />
              <h3>{Math.floor(Math.random() * 10) + 1}</h3>
            </div>
          </div>
          <div className="price-card"></div>
        </div>
      )}
    </>
  );
}

export default Card;

import React, { useState } from "react";
import Loginart from "../assets/Loginart.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getRecommendations } from "../api/api";
import { useAuth } from "../contexts/AuthContext";

function AccomQuection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsUsingRecommendation } = useAuth();
  const answer = location?.state.answer; // Get the selected answer from the previous page
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSelectAnswer = (event) => {
    setSelectedAnswer(event.target.value); // Update the selected answer
  };

  const handleNext = async () => {
    console.log(selectedAnswer,answer)
    try {
      // Send both selected answers to the backend via an API call
      const response = await getRecommendations({
        category: selectedAnswer,
        location: answer,
      });
      if(response.status === 200){
        setIsUsingRecommendation(true);
        navigate('/')
      }
      console.log("Answers sent successfully:", response);
      // Redirect or perform any other action after sending answers
    } catch (error) {
      console.error("Error sending answers:", error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div className="quection-wrapper">
      <div className="qw-1">
        <div className="qw-2">
          <div className="signin10">
            <div className="signin11">
              <div className="signin111">Question Page 03</div>
              <label className="quection" htmlFor="username">
                3.What type of accommodation do you prefer ?
              </label>
              <div className="field">
                <div className="ui radio checkbox quection-check">
                  <input
                    type="radio"
                    name="accommodation"
                    value="Camping or Backpacker Hostels"
                    checked={selectedAnswer === "Camping or Backpacker Hostels"}
                    onChange={handleSelectAnswer}
                  />
                  <label>Camping or Backpacker Hostels</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox quection-check">
                  <input
                    type="radio"
                    name="accommodation"
                    value="Ecolodge"
                    checked={selectedAnswer === "Ecolodge"}
                    onChange={handleSelectAnswer}
                  />
                  <label>Ecolodge</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox quection-check">
                  <input
                    type="radio"
                    name="accommodation"
                    value="Vila"
                    checked={selectedAnswer === "Vila"}
                    onChange={handleSelectAnswer}
                  />
                  <label>Vila</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox quection-check">
                  <input
                    type="radio"
                    name="accommodation"
                    value="5-star Hostels"
                    checked={selectedAnswer === "5-star Hostels"}
                    onChange={handleSelectAnswer}
                  />
                  <label>5-star Hostels</label>
                </div>
              </div>
              <button onClick={handleNext} className="submit-que">
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="signin2">
          <img src={Loginart} alt="Login Art" />
        </div>
      </div>
    </div>
  );
}

export default AccomQuection;

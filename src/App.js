import React, { useState } from "react";
import "./index.css";

const flavors = [
  "Appricot",
  "Banana",
  "Beer",
  "Butter Pecan",
  "BlueBerry",
  "Carrot",
  "Cheese Cake",
  "Chocolate",
  "Coffee",
  "Dulce de Leche",
  "Earl Grey",
  "Eggnog",
  "French Vanilla",
  "Grape",
  "Green Tea",
  "Hokey Pokey",
  "Mango",
  "Maple",
  "Mint Chocolate Chip",
  "Neapolitan",
  "Pistachio",
  "Peanut Butter",
  "Rum Raisin",
  "Rocky Road",
  "Strawberry",
  "Strawberry Cheesecake",
  "Tiger Tail",
  "Tutti Fruitti",
  "Twist",
  "Ube",
  "Vanilla",
];

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [answer, setAnswer] = useState();

  // Handle Submit
  const handleClick = (e) => {
    e.preventDefault();
    console.log(searchInput);
    setAnswer(searchInput);
  };

  // Handle change for search-bar input
  const handleChange = (value) => {
    const userData = value;
    let newOptions = [];

    if (value) {
      newOptions = flavors.filter((flavor) => {
        return flavor
          .toLocaleLowerCase()
          .startsWith(userData.toLocaleLowerCase());
      });
    }
    setSuggestions(newOptions);
  };

  // Handle Autcomplete options based on key input
  const handleKeyDown = (e) => {
    const action = e.keyCode;

    switch (action) {
      case 40:
        // Down arrow (Scroll down)
        if (!selectedOption) {
          setSelectedOption(suggestions[0]);
        } else {
          const index = suggestions.indexOf(selectedOption);
          const increment = index + 1;
          return !suggestions[increment]
            ? null
            : setSelectedOption(suggestions[increment]);
        }
        break;
      case 38:
        // Up arrow (Scroll up)
        if (!selectedOption) {
          return;
        } else {
          const index = suggestions.indexOf(selectedOption);
          const decrimate = index - 1;
          return !suggestions[decrimate]
            ? setSelectedOption("")
            : setSelectedOption(suggestions[decrimate]);
        }
      case 13:
        // Return (Select)
        setSearchInput(selectedOption);
        setSuggestions([]);
        break;
      default:
        return;
    }
  };

  return (
    <div className="App">
      <div className="bg">
        <h1>What is your favorite Ice Cream?</h1>
        <div className="search-container">
          {/* ------- THE SEARCH BAR ------- */}
          <input
            autoComplete="off"
            list=""
            type="text"
            value={searchInput}
            onChange={(e) => {
              handleChange(e.target.value);
              setSearchInput(e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
            placeholder="Enter your favorite ice cream flavor"
          />
          <datalist id="searchTerm">
            {/* Displays autocomplete options */}
            {suggestions.map((suggestion) => (
              <option
                key={suggestion}
                value={suggestion}
                className={suggestion === selectedOption ? "highlight" : null}
                onClick={(e) => {
                  setSearchInput(e.target.value);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </option>
            ))}
          </datalist>

          <button type="button" onClick={(event) => handleClick(event)}>
            Answer
          </button>
        </div>

        {/* Display Answer */}
        {answer ? <p className="answer">Answer: {answer}</p> : null}
      </div>
    </div>
  );
}

export default App;

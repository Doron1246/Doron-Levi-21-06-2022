import React, { useState } from "react";
import "./Autocomplete.css";

export default function Autocomplete({
  value,
  handleSearchChange,
  onSuggestionSelect,
  suggestions = [],
}) {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const handleChange = (e) => {
    handleSearchChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    onSuggestionSelect(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className='main-container'>
      <div className='input-container'>
        <input
          value={value}
          className='autocomplete-input'
          type='text'
          placeholder='Search'
          onChange={handleChange}
        />
        {suggestions.length > 0 && showSuggestions && (
          <div>
            {suggestions.map((suggestion, i) => (
              <div
                key={i}
                className='autocomplete-suggestions-item'
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.LocalizedName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

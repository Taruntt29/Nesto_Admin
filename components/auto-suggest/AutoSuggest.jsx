import React, { useState } from 'react';

const AutoSuggest = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {
    const limit = 5;
    const lang = 'en';
    const apiKey = import.meta.env.VITE_HERE_MAP_API_KEY;

    const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?limit=${limit}&lang=${lang}&q=${searchText}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(response);
      // Extract the suggestions from the response
      const { items } = data;
      const suggestions = items?.map(item => item.title);

      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {suggestions?.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default AutoSuggest;

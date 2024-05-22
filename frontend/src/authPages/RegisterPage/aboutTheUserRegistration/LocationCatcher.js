import axios from 'axios';
import { useState } from 'react';
// import './LocationCatcher.css';

const LocationCatcher = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions', error);
    }
  };

  const handleSelect = (address) => {
    setSelectedAddress(address.display_name);
    setCoordinates({ lat: address.lat, lon: address.lon });
    setSuggestions([]);
  };

  return (
    <div className="LocationCatcher">
      <h1>Address Suggester</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        placeholder="Type an address"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((address) => (
            <li key={address.place_id} onClick={() => handleSelect(address)}>
              {address.display_name}
            </li>
          ))}
        </ul>
      )}
      {selectedAddress && (
        <div>
          <h2>Selected Address</h2>
          <p>{selectedAddress}</p>
        </div>
      )}
      {coordinates && (
        <div>
          <h2>Coordinates</h2>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lon}</p>
        </div>
      )}
    </div>
  );
};

export default LocationCatcher;

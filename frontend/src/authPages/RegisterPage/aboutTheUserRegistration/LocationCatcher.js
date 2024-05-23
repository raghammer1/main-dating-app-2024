import axios from 'axios';
import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const SuggestionsList = styled(List)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  zIndex: 1,
  maxHeight: 200,
  overflowY: 'auto',
}));

const LocationCatcher = ({ coordinates, setCoordinates }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

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
    <Box sx={{ p: 2, position: 'relative', color: 'white' }}>
      <Typography variant="h4" gutterBottom>
        Address Suggester
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Type an address"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
      />
      {suggestions.length > 0 && (
        <Paper elevation={3}>
          <SuggestionsList>
            {suggestions.map((address) => (
              <ListItemButton
                key={address.place_id}
                onClick={() => handleSelect(address)}
              >
                <ListItemText primary={address.display_name} />
              </ListItemButton>
            ))}
          </SuggestionsList>
        </Paper>
      )}
      {selectedAddress && (
        <Box mt={2}>
          <Typography variant="h6">Selected Address</Typography>
          <Typography>{selectedAddress}</Typography>
        </Box>
      )}
      {coordinates && (
        <Box mt={2}>
          <Typography variant="h6">Coordinates</Typography>
          <Typography>Latitude: {coordinates.lat}</Typography>
          <Typography>Longitude: {coordinates.lon}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default LocationCatcher;

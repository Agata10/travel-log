import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { fetchAutocompletePlaces } from '../../services/mapAPI';

const SearchBar = ({ setPosition }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);

  //If user selected place from list, set a new position
  useEffect(() => {
    if (selectedPlace) {
      setPosition({
        lat: selectedPlace?.properties.lat,
        lng: selectedPlace?.properties.lon,
      });
    }
  }, [selectedPlace]);

  //If input has new value, fetch autocomplete API
  useEffect(() => {
    if (inputValue.length > 3) {
      fetchAutocompletePlaces(inputValue, setOptions);
    }
  }, [inputValue]);

  const handleInputChange = async (event, newValue) => {
    setInputValue(newValue);
  };

  const handleSelectedOption = (event, value) => {
    setSelectedPlace(value);
  };

  return (
    <>
      <Autocomplete
        options={options}
        value={selectedPlace}
        getOptionLabel={(option) => option.properties.formatted}
        onChange={handleSelectedOption}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        isOptionEqualToValue={(option, value) =>
          option.properties.city === value.properties.city
        }
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Explore new places..."
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </>
  );
};

export default SearchBar;

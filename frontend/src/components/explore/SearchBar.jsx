import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { fetchAutocompletePlaces } from '../../services/MapAPI';

const SearchBar = ({ setPosition }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);

  //if user selected place, set a new position
  useEffect(() => {
    if (selectedPlace) {
      setPosition({
        lat: selectedPlace?.properties.lat,
        lng: selectedPlace?.properties.lon,
      });
    }
  }, [selectedPlace]);

  //if input has new value, fetch autocomplete API
  useEffect(() => {
    fetchAutocompletePlaces(inputValue, setOptions);
  }, [inputValue]);

  const handleInputChange = async (event, newValue) => {
    setInputValue(newValue);
  };

  const handleSelectedOption = (event, value) => {
    setSelectedPlace(value);
  };

  return (
    <div className="w-10/12 flex justify-center">
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
    </div>
  );
};

export default SearchBar;

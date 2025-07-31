import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

interface Props {
  setSearch: (value: string) => void;
  placeholder?: string;
}

const SearchBox: React.FC<Props> = ({
  setSearch,
  placeholder = 'Buscar...',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      onChange={handleChange}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary" />
          </InputAdornment>
        ),
        sx: {
          borderRadius: '12px',
          backgroundColor: '#fff',
        },
      }}
    />
  );
};

export default SearchBox;

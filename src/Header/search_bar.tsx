import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ onSearch }: { onSearch: (searchQuery: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

 const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    };
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px',
     }}>
      <TextField
        label="Search Jobs"
        variant="outlined"
        style={{ width: '60%',
        backgroundColor: 'white',
        borderRadius: '10px',
       
     }}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={(event: React.KeyboardEvent) => {
          if (event.key === 'Enter') {
            handleSearch();
          }
        }}
      />
    </div>
  );
};

export default SearchBar;

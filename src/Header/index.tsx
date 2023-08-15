import React from 'react'
import Stack from '@mui/material/Stack'
import JobChipsRow from './all_categories'
import SearchBar from './search_bar'


const Header = () => {
  const handleSearch = (searchQuery: any) => {
    // Implement your search logic here
    console.log('Search query:', searchQuery)
    // You can filter the jobs based on the search query and update the displayed jobs accordingly
  }
  return (
    <div
      className='header'
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <div
          className='header__text'
          style={{
            textAlign: 'center',
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'self-start',
            justifyContent: 'stretch'
          }}
        >
          <h1
            style={{
              // fontSize: '4rem',
              fontWeight: '800',
              width: '100%',
              textAlign: 'left',
              paddingTop: '140px'
            }}
          >
            Find the right jobs for you, right now
            <JobChipsRow />
          </h1>
        </div>
        <div className='header__image'>
          <img
            src='/assets/images/header_image.png'
            alt='Header Image'
            style={{
              height: '500px',
              width: '650px',
              objectFit: 'contain',
              marginTop: '118px'
            }}
          />
        </div>
      </Stack>
    </div>
  )
}

export default Header

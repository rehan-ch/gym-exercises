import React, {useEffect, useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import { fetchData, exerciseOptions } from '../utils/fetchData';
const SearchExercises = () => {
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions)
      setBodyParts(['all', ...bodyPartData]);
    }
    fetchExercisesData();
  }, [])

  const handleSearch = async () => {
    if(search){
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions)
      const searchedExercises = exercisesData.filter(
        (exercise) => exercise.name.toLowerCase().include(search)
        || exercise.target.toLowerCase().include(search)
        || exercise.equipment.toLowerCase().include(search)
        || exercise.bodyPart.toLowerCase().include(search)
      );
      setSearch("");
      setExercises(searchedExercises);
    }
  }
  return (
    <Stack alignItems="center" mt="37px" justifyContent= 'center' p="20px">
      <Typography fontWeight={700} sx={{fontSize: {lg: '44px', xs: '30px'}}} mb='50px' textAlign='center' >
        Awesome Exercises You <br />
        Should Know
      </Typography>
      <Box position= 'relative' mb='72px'>
        <TextField sx={{
          input: {
            fontWeight: '700px',
            border: 'none',
            borderRadius: '4px'
          },
          width: {lg: '800px', xs: '350px'},
          backgroundColor: '#fff',
          borderRadius: '40px'
        }}
        height='76px'
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        placeholder='Search Exercises'
        type='text'
         />
         <Button className='search-btn'
            sx={{
              bgcolor: '#FF2625',
              color: '#fff',
              textTransform: 'none',
              width: {lg: '175px', xs: '80px'},
              fontSize: {lg: '20px', xs: '14px'},
              height: '56px',
              position: 'absolute',
              right: '0'
            }}
            onClick= {handleSearch}
          >
            Search
          </Button>
      </Box>
    </Stack>
  )
}

export default SearchExercises
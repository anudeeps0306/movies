import axios from 'axios';

const API_KEY = process.env.customKey;

export const searchMovies = async (query : string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

export const fetchMovies = async (currentPage: any) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${currentPage}`
    );

    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export const getSingleMovie = async (id: any) => {
  try{
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}


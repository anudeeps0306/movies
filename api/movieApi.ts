import axios from 'axios';

const API_KEY = '551ff69fc7ffe6c4365e735d758cd550';

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
    const apiKey = '551ff69fc7ffe6c4365e735d758cd550'; // Replace with your actual API key
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`
    );

    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}


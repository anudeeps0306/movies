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


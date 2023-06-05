import axios from 'axios';

const API_KEY = '551ff69fc7ffe6c4365e735d758cd550';

export async function searchMovies(query, page = 1) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
      
    console.log('Response:', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

'use client';

import React,{useState} from "react";
import { useAppSelector } from '../redux/store';

import Welcome from '../src/welcome';
import SearchBar from "@/src/SearchBar";

import { searchMovies } from '../api/movieApi';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;

}


export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const authInfo = useAppSelector(state => state.auth.authInfo);

  const handleSearch = async () => {
    try {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
      console.log(searchResults);
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
    }
  };

  return (
    <div>
      <Welcome info={authInfo}/>
      <SearchBar/>
      


      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {authInfo && <h1 className="text-3xl font-bold underline">{authInfo.name}</h1>}

      <div>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.release_date}</p>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
'use client';

import React,{useState} from "react";
import { useAppSelector } from '../redux/store';
import Welcome from '../src/welcome';
import SearchBar from "@/src/SearchBar";
import { searchMovies } from '../api/movieApi';
import PopularMovies from "@/src/popularmovies/PopularMovies";

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
      <PopularMovies/>
    </div>
  );
}
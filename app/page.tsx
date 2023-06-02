'use client';

import React from "react";
import { useAppSelector } from '../redux/store';
import Welcome from '../src/welcome';
import SearchBar from "@/src/SearchBar";

export default function Home() {

  const authInfo = useAppSelector(state => state.auth.authInfo);
  return (
    <div>
      <Welcome info={authInfo}/>
      <SearchBar/>
     

    </div>
  );
}

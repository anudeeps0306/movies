'use client';

import React from "react";
import { useAppSelector } from '../redux/store';

export default function Home() {

  const authInfo = useAppSelector(state => state.auth.authInfo);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {authInfo && <h1 className="text-3xl font-bold underline">{authInfo.name}</h1>}
    </div>
  );
}

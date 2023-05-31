"use client";

import Link from 'next/link';
import React,{useState} from 'react';
import { register } from '@/api/authentication';
import { useRouter } from 'next/navigation';

interface Data {
  email: string;
  password: string;
  name: string;
  profilePic: string;
}

export default function Signup() {
  const router = useRouter();
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
    name: "",
    profilePic: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(data.email,data.password,data.name,data.profilePic);
    router.push('/auth/signin');
  };



  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6"   onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => setData({...data, email: e.target.value})}
                required
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="profileName" className="block text-sm font-medium leading-6 text-gray-900">
              Profile Name
            </label>
            <div className="mt-2">
              <input
                id="profileName"
                name="profileName"
                type="text"
                autoComplete="off"
                value={data.name}
                onChange={(e) => setData({...data, name: e.target.value})}
                required
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
              Profile Image
            </label>
            <div className="mt-2">
              <div className="relative">
                <input
                  id="image"
                  name="image"
                  type="file"
                  autoComplete="off"
                  value={data.profilePic}
                  onChange={(e) => setData({...data, profilePic: e.target.value})}
                  required
                  className="block appearance-none w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a2 2 0 00-2 2H5a4 4 0 014-4h2a4 4 0 014 4h-2a2 2 0 00-2-2H9zm1 14a2 2 0 100 4 2 2 0 000-4zM2 7h2a2 2 0 012 2v7h10V9a2 2 0 012-2h2a2 2 0 012 2v9a4 4 0 01-4 4H4a4 4 0 01-4-4V9a2 2 0 012-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Are you a member?{' '}
          <Link href="/auth/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Signin in here
          </Link>
        </p>
      </div>
    </div>
  );
}

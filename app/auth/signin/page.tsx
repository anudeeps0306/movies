"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { login } from "@/api/authentication";
import { useRouter } from 'next/navigation';
import {setAuthInfo, removeAuthInfo} from '../../../redux/features/authSlice'
import { useAppSelector, useAppDispatch } from '../../../redux/store';


interface Data {
  email: string;
  password: string;
}

interface SigninProps {
  onLogin: (data: Data) => void;
}


export default function Signin({ onLogin }: SigninProps) {
  const [data, setData] = useState<Data>({
    email: "",
    password: ""
  });
  const [error , setError] = useState<String>();

  const router = useRouter();

  const dispatch = useAppDispatch();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(data.email, data.password);
      const required_responce = {
        email: response.user.email,
        password: response.user.password,
        name: response.user.name,
        profilePic: response.user.profilePic
      }
      dispatch(setAuthInfo(required_responce));
      console.log(response);
      localStorage.setItem('token', response.token);

      router.push('/');
    } catch (error) {
      setError('Login failed');
    }
  };
   

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link href="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up now
          </Link>
        </p>
        <p>{error}</p>
      </div>
    </div>
  );
}

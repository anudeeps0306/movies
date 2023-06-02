import React from 'react'
import { useAppSelector } from '../redux/store';

export default function welcome(props) {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-red-500">Hello world!</h1>
            {props && <h1 className="text-3xl font-bold text-red-500">{props.info.name}</h1>}
        </div>
    )
}


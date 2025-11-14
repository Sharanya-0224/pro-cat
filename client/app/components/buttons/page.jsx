'use client';
import React, {useState} from "react";

export default function Bton({title,act,color,border}){
    return(
        <button onClick={act} className = {`btn rounded-lg text-indigo-950 text-center border-collapse border-2  p-2 hover:text-fuchsia-300 ${border} ${color} hover:bg-inherit drop-shadow-lg`}>{title}</button>
    );
}
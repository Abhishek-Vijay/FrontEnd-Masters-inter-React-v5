// import-1 when we use use Effect 
// import { useState, useEffect } from "react";

// const localCache = {};

import { QueryStatus, useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

import { Animal } from "./APIResponsesTypes";

export default function useBreedList(animal: Animal){
    // start-1. when we use use Effect  
    // const [ breedList, setBreedList ] = useState([]);
    // const [ status, setStatus ] = useState("unloaded");

    // useEffect(()=>{
    //     if(!animal){
    //         setBreedList([]);
    //     }else if(localCache[animal]){
    //         setBreedList(localCache[animal])
    //     }else{
    //         requestBreedList();
    //     }

    //     async function requestBreedList(){
    //         setBreedList([]);
    //         setStatus("loading");

    //         const res = await fetch(
    //             `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
    //         )
    //         const json = await res.json();
    //         localCache[animal] = json.breeds || [];
    //         setBreedList(localCache[animal]);
    //         setStatus("Loaded");
    //     }
    // }, [animal]);
    // return [breedList, status]
    // end-1. when we use use Effect

    //start-2. when using React Query
    const results = useQuery(["breeds", animal], fetchBreedList);

    // this "?." basically says if it is available then give me next thing.
    // which means results won't be available for first time when "results.loading" is true, so it won't give an error.
    // this "??" means if not available give next as default. here next is an empty array [].
    // This whole syntax is new feature in javascript, ES2021
    return [results?.data?.breeds ?? [], results?.status] as [
        string[], QueryStatus
    ];
    // end-2. when using React Query

    // useQuery is just to get request. for Post requests, useMutation from react-query works just fine.
}

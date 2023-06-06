import { QueryFunction } from '@tanstack/react-query';
import { Animal, PetAPIResponse } from './APIResponsesTypes';

const fetchSearch: QueryFunction<PetAPIResponse,["Search", {
        animal: Animal, 
        location: string, 
        breed: string
    }
]> = async({queryKey}) => {
    const {animal, location, breed} = queryKey[1];
    
    const res = await fetch(
        `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    if(!res.ok){
        throw new Error(`pet search is not ok. animal-${animal}, location-${location}, breed-${breed}`)
    }

    return res.json();
}

export default fetchSearch;
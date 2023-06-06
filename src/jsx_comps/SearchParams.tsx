import { useState, useEffect } from "react";
import { Animal } from "./APIResponsesTypes";
// import Pet from "./Pet";
import PetResults from "./PetResults";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "raptile"];

// let counter = 0;   // stateless (not modify global variables) 
const SearchParams = () =>{
    // counter++    // stateless 
    const  [ location, setLocation ] = useState("");  // below code is same as this one line.
    // const locationHook = useState("");
    // const location = locationHook[0];
    // const setLocation = locationHook[1];
    const [ animal, setAnimal ] = useState("" as Animal);
    const [ breed, setBreed ] = useState("");
    const [ pets, setPets ] = useState([]);
    const BREEDS = useBreedList(animal)[0];

    useEffect(()=>{
        requestPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //will load all the pets on 1st render. If we don't call requestPets() here it won't load all pets on 1st render which might be case most of the times.

    async function requestPets(){
        const res = await fetch(
            `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        )
        const json = await res.json();
        setPets(json.pets);
    }

    // const location = "Seattle, WA";  // if we provide only location, react will not change the input i=even if we try to change since nothing is changing as per react in DOM. it will re-render but won't change any thing
    return (
        <div className="search-params">
            {/* <h2>{counter}</h2> will increase with each render */}

            {/* this is called controlled forms where React is controlling things in form using states. */}
            <h4>Controlled Form</h4>
            <form onSubmit={e=>{  // "e" here is not normal DOM event, it is a synthetic event (dummy event), which are a cross browser wrapper of real DOM events.
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                    <input id="location" value={location} placeholder="Location" onChange={(e)=>setLocation(e.target.value)}/>
                </label>
                <label htmlFor="animal">Animal
                <select id="animal" value={animal} onChange={e => {
                    setAnimal(e.target.value as Animal);
                    setBreed("");
                    }}>
                <option />
                {ANIMALS.map(element =>{
                    return <option key={element}>{element}</option>
                })}
                </select>
                </label>

                <label htmlFor="breed">Breed
                <select id="breed" disabled={BREEDS.length===0} value={breed} onChange={e => setBreed(e.target.value)}>
                <option/>
                {BREEDS.map(element =>{
                    return <option key={element}>{element}</option>
                })}
                </select>
                </label>
                <button>Submit</button>
            </form>
            {/* {
                pets.map(pet=>{
                    return <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id}/>
                })
            } */}
            {/* // same as above */}
            <PetResults pets={pets}/>
        </div>
    )
}

export default SearchParams;
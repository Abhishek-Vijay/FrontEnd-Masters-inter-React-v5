import { useState, useContext, useDeferredValue, useMemo, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import PetResults from "./PetResults";
import useBreedList from "./useBreedList";
import AdoptedPetContext from "./AdoptedPetContext";
import { Animal } from "./APIResponsesTypes";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "raptile"];

// let counter = 0;   // stateless (not modify global variables) 
const SearchParamsUncontrolled = () =>{
    // counter++    // stateless 

    const [requestParams, setRequestParams] = useState({
        location:"",
        animal:"" as Animal,
        breed:""
    });
    const [ animal, setAnimal ] = useState("" as Animal);
    const BREEDS = useBreedList(animal)[0];
    const [adoptedPet] = useContext(AdoptedPetContext);

    const results = useQuery(["Search", requestParams], fetchSearch);

    const pets = results?.data?.pets ?? [];


    // useDefferedValue is used for low priority re-rendering and performance issues, which we don't have in this app.
    const deferredPets = useDeferredValue(pets);
    const renderedPets = useMemo(() => <PetResults pets={deferredPets} />, [deferredPets]);

    // useTransition is used to show an intermediary state and then if it needs to be interrupted, it's also interruptible
    const [isPending, startTransition] = useTransition();

    // const location = "Seattle, WA";  // if we provide only location, react will not change the input i=even if we try to change since nothing is changing as per react in DOM. it will re-render but won't change any thing
    return (
        <div className="my-0 mx-auto w-11/12">
            {/* <h2>{counter}</h2> will increase with each render */}

            {/* this is called controlled forms where React is controlling things in form using states. */}
            <h4>Un-Controlled Form</h4>
            <form className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col items-center justify-center" onSubmit={e=>{  // "e" here is not normal DOM event, it is a synthetic event (dummy event), which are a cross browser wrapper of real DOM events.
                e.preventDefault();
                
                const formData = new FormData(e.currentTarget); // this is a browser API
                const obj = {
                    animal: (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
                    breed: formData.get("breed")?.toString() ?? "",
                    location: formData.get("location")?.toString() ?? ""
                };
                // useTransition
                startTransition(() =>{
                    setRequestParams(obj);
                });

                // without useTransition
                // setRequestParams(obj);
            }}>
                {
                    adoptedPet ? (
                        <div className="pet image-container">
                            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                        </div>
                    ) : null
                }
                <label htmlFor="location">
                    Location
                    {/* also can use className="search-input" */}
                    <input type="text" id="location" name="location" className="mb-5 block w-60" placeholder="Location" />
                </label>
                <label htmlFor="animal">Animal
                <select id="animal" className="mb-5 block w-60" name="animal" value={animal} onChange={e => {
                    setAnimal(e.target.value as Animal);
                    }}>
                <option />
                {ANIMALS.map(element =>{
                    return <option key={element}>{element}</option>
                })}
                </select>
                </label>

                <label htmlFor="breed">Breed
                <select id="breed" className="mb-5 block w-60 disabled:opacity-50" disabled={BREEDS.length===0} name="breed">
                <option/>
                {BREEDS.map(element =>{
                    return <option key={element}>{element}</option>
                })}
                </select>
                </label>

                {/* with useTransition */}
                { isPending ?(
                    <div className="mini loading-pane">
                        <h2 className="loader">🦮</h2>
                    </div>
                ) : (
                    <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500">Submit</button>
                )}

                {/* without useTransition */}
                {/* <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500">Submit</button> */}
            </form>
            {/* {
                pets.map(pet=>{
                    return <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id}/>
                })
            } */}

            {/* // same as above */}
            {/* <PetResults pets={pets}/> */}

            {/* Low-priority re-rendering */}
            {renderedPets}
        </div>
    )
}

export default SearchParamsUncontrolled;
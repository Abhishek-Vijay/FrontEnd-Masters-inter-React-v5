import Pet from "./Pet";
import {Pet as PetType} from './APIResponsesTypes';

const PetResults = ({ pets }: {pets:PetType[]}) =>{
    return(
        // responsive grid layout with tailwind 
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            { !pets.length ? (
                <h1>No Pets Found</h1>
            ):(
                pets.map(pet=>{
                    // return <Pet {...pet} key={pet.id}/>
                    // same as above, just location is consisted of city and state so it looks breaking if using above object destructuring method of props.
                    return (<Pet
                        animal={pet.animal}
                        key={pet.id}
                        name={pet.name}
                        breed={pet.breed}
                        images={pet.images}
                        location={`${pet.city}, ${pet.state}`}
                        id={pet.id}
                    />)
                })
            )
            }
        </div>
    )
}

export default PetResults;
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useState, useContext, lazy } from "react";
// import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Modal = lazy(() => import('./Modal'));

const Details = () =>{
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setAdoptedPet] = useContext(AdoptedPetContext);
    
    // useParams() Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.
    const { id } = useParams();

    if(!id){
        throw new Error('why did you not give me an id.? I wanted an id. I have no id. ')
    }

    const results = useQuery(["details", id], fetchPet);


    if(results.isError){
        return <h2>Oh No !!</h2>
    } // it will try refetch 3 times using "exponential back-off" before returning error state

    if(results.isLoading){
        return(
            <div className="loading-pane">
                <h2 className="loader">🐶</h2>
            </div>
        )
    }

    const pet = results?.data?.pets[0];
    if(!pet){
        throw new Error('no pet found.')
    }
    return(
        <div className="details">
            <Carousel images={pet.images}/>
            <div>
                <h1>{pet.name}</h1>
                <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
                <button onClick={()=>setShowModal(true)}>Adopt {pet.name}</button>
                <p>{pet.description}</p>
                {
                    showModal ?
                    (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {pet.name} ?</h1>
                                <div className="buttons">
                                    <button onClick={()=>{
                                        setAdoptedPet(pet);
                                        navigate('/');
                                    }}>Yes</button>
                                    <button onClick={()=>setShowModal(false)}>No</button>
                                </div>
                            </div>
                        </Modal>
                    ) : null
                }
            </div>
        </div>
    )
}

// this passing the props required otherwise the props will die/disappear if needed to pass to "Details" Component. (not here but in some cases that can be a issue, here we do not require any props in Details.)
function DetailsErrorBoundary(props){
    return(
        <ErrorBoundary>
            <Details {...props}/>
        </ErrorBoundary>
    )
}
export default DetailsErrorBoundary;
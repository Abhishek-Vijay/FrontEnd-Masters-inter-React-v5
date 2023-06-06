import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<[Pet | null, (adoptedPet: Pet) => void]>([
    // dummy Pet value we are passing as initial value since the type is Pet
    {
        id: 1337,
        name: "Fido",
        animal: "dog",
        description: "lorem ipsum",
        breed: "Beagle",
        images: [],
        city: "Seattle",
        state: "WA"
    }, 
    () => {}
]);

export default AdoptedPetContext;
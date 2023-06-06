// this file is a grab bag for all the types from API and we put them in a separate file here to use at multiple places.

export type Animal = "dog" | "cat" | "bird" | "raptile" | "rabbit";

export interface Pet{
    id: number,
    name: string,
    animal: Animal,
    description: string,
    breed: string,
    images: string[],
    city: string,
    state: string
}

export interface PetAPIResponse{
    numberOfResults: number,
    startIndex: number,
    endIndex: number,
    hasNext: boolean,
    pets: Pet[]
}

export interface BreedListAPIResponse{
    animal: Animal,
    breeds: string[]
}
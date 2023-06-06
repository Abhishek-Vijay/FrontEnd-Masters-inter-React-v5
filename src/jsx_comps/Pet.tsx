import { Link } from 'react-router-dom';
import { Animal } from './APIResponsesTypes';
// import ReactDOM from 'react-dom';

interface IProps{
    name: string,
    animal: Animal,
    breed: string,
    images: string[],
    location: string,
    id: number
}

const Pet = (props: IProps) =>{
    const {name, animal, breed, images, location, id} = props;
    let hero = 'https://pets-images.dev-apis.com/pets/none.jpg';
    if(images){
        hero = images[0]
    }
    return (
        // <>
        // <h1>{props.name}</h1>
        // <h2>{props.animal}</h2>
        // <h2>{props.breed}</h2>
        // </>

        // here we are using "Link" not "a" for creating a link because "Link" will not force whole page refresh but "a" does. Link will just change the client side DOM element  
        <Link to={`/details/${id}`} className='relative block'>
            <div className='image-container'>
                <img data-testid='thumbnail' src={hero} alt={name} />
            </div>
            <div className='absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pr-2 pt-2'>
                <h1>{name}</h1>
                <h2>{animal} - {breed} - {location}</h2>
            </div>
        </Link>
    );
}

export default Pet;
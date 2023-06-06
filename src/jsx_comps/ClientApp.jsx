// All the browsery stuff or interaction with DOM will be here because in node we don't have DOM elements/APIs/Functions.
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from '../App';

hydrateRoot(
    document.getElementById('root'),
    <BrowserRouter>
        <App />
    </BrowserRouter>
)


// Everything that is gonna happen on browser not on server side will sit here in this file.
// like if we want to do Google Analytics, we do it here coz it's a part of browser related tasks.
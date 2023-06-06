// below import is Removed for server side rendering  
// import {createRoot} from 'react-dom/client'; 
// new way to get react-dom for rendering. createroot() is a new root API introduced in React 18
// react-dom: ReactDOM.render has been deprecated. Using it will warn and run your app in React 17 mode.
// react-dom: ReactDOM.hydrate has been deprecated. Using it will warn and run your app in React 17 mode.
// react-dom: ReactDOM.unmountComponentAtNode has been deprecated.
// react-dom: ReactDOM.renderSubtreeIntoContainer has been deprecated.
// react-dom/server: ReactDOMServer.renderToNodeStream has been deprecated.

// Instead of:

// import ReactDOM from 'react-dom'
// ReactDom.render(<h1>Your App</h1>, document.getElementById('root'))

// Use:

// import { createRoot } from 'react-dom/client'
// createRoot(document.getElementById('root')).render(<h1>Your App</h1>)

// import Pet from './jsx_comps/Pet'; 
// import SearchParams from './jsx_comps/SearchParams';

// below import "BrowserRouter" is Removed for server side rendering 
import { Link, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// going to split off these routes - Details and SearchParamsUncontrolled
// import SearchParamsUncontrolled from './jsx_comps/SearchParamsUncontrolled';
// import Details from './jsx_comps/Details';
import AdoptedPetContext from './jsx_comps/AdoptedPetContext';
import { useState, lazy, Suspense } from 'react';
import { Pet } from './jsx_comps/APIResponsesTypes';

// lazy loading here -
// this "import" is a built in function in JS for ES6 and similar like "require" used in CommonJS. this is dynamic import, not like static import we do on top.
const Details = lazy(() => import('./jsx_comps/Details'));
const SearchParamsUncontrolled = lazy(() => import('./jsx_comps/SearchParamsUncontrolled'));

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime: Infinity,
            cacheTime: Infinity
        }
    }
})

const App = () =>{
    // here we are not destucturing the useState but providing it as whole to "AdoptedPetContext.Provider"
    const adoptedPetHook = useState(null as Pet | null);
        return(
            <div className='p-0 m-0' style={{ background: 'url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)'}}>
                {/* <BrowserRouter> */}
                    <AdoptedPetContext.Provider value={adoptedPetHook}>
                        <QueryClientProvider client={queryClient}>
                            <Suspense fallback={<div className='loading-pane'><h2 className='loader'>🐶</h2></div>}>
                            <header className='w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500'>
                                <Link className='text-6xl text-blue-600  hover:text-gray-200' to='/'>Adopt Me!</Link>
                            </header>
                            {/* <h1>Adopt Me!</h1> */}
                            {/* we can use below way just to provide hardcoded values */}
                            {/* <Pet name="Luna" animal="Dog" breed="Havanese"/>
                            <Pet name="Pepper" animal="Bird" breed="Cockatiel"/>
                            <Pet name="Doink" animal="Cat" breed="Mixed"/> */} 
                        
                            <Routes>
                                <Route path='/details/:id' element={<Details/>}/>
                                {/* <Route path='/' element={<SearchParams/>}/> */}
                                <Route path='/' element={<SearchParamsUncontrolled/>}/>
                            </Routes>
                            </Suspense>
                        </QueryClientProvider>
                    </AdoptedPetContext.Provider>
                {/* </BrowserRouter> */}
            </div>
        )
}

// Below code is Removed for server side rendering, check ClientApp.jsx for details.
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);


// react-dom.development.js:73 Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17.
// ReactDOM.render(<App/>, document.querySelector('#root'))

export default App;
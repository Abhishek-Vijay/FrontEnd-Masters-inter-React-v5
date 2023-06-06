import { renderToPipeableStream } from 'react-dom/server';
// StaticRouter is the react router that can be run in node. 
import { StaticRouter } from 'react-router-dom/server';
import App from '../App';

export default function render(url, options){
    const stream = renderToPipeableStream(
    <   StaticRouter location={url}>
            <App />
        </StaticRouter>,
        options
    );

    return stream;
}
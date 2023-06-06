import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';
import Pet from '../jsx_comps/Pet';

test("displays a default thumbnail", async() => {
    const pet = render(
        <StaticRouter>
            <Pet/>
        </StaticRouter>
    );

    const petThumbnail =  await pet.findByTestId('thumbnail')
    expect(petThumbnail.src).toContain('none.jpg');

    // Vitest is actually gonna take test suite and run it in parallel, so we need to unmount and clean everything.
    pet.unmount();
})
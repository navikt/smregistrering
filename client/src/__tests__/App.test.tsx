import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render, waitForElementToBeRemoved } from '@testing-library/react';

import App from '../App';

expect.extend(toHaveNoViolations);

test.skip('should have no a11y violations', async () => {
    require('../mock/setup.ts');
    const { getByText } = render(<App />, document.body);

    await waitForElementToBeRemoved(() => getByText(/Vennligst vent mens oppgaven laster/i));
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
});

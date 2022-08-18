import 'next';
import '@testing-library/jest-dom/extend-expect';
import Modal from 'nav-frontend-modal';

Modal.setAppElement(document.createElement('div'));

jest.mock('jose', () => ({
    jwtVerify: jest.fn(),
    createRemoteJWKSet: jest.fn(),
}));

process.env.NEXT_PUBLIC_API_URL = 'http://localhost';
process.env.NEXT_PUBLIC_GOSYS_URL = 'http://localhost/dummy';
process.env.NEXT_PUBLIC_MODIA_URL = 'http://localhost/modia';

process.env.DEBUG_PRINT_LIMIT = 1000000;

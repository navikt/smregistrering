import 'next';
import '@testing-library/jest-dom/extend-expect';
import Modal from 'nav-frontend-modal';

Modal.setAppElement(document.createElement('div'));

process.env.NEXT_PUBBLIC_API_URL = 'http://localhost';

process.env.DEBUG_PRINT_LIMIT = 1000000;

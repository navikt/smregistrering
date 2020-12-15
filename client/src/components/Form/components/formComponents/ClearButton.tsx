import './ClearButton.less';

import React from 'react';

type ClearButtonProps = {
    onChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    buttonText: string;
    iconType: 'Can' | 'CircledCross';
    leftSpacing?: boolean;
};

const ClearButton = ({ onChange, buttonText, iconType, leftSpacing }: ClearButtonProps) => {
    const Can = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.5 3H19.5H16V0.5C16 0.224 15.776 0 15.5 0H7.5C7.224 0 7 0.224 7 0.5V3H3.5H0.5C0.224 3 0 3.224 0 3.5C0 3.776 0.224 4 0.5 4H3V23.5C3 23.776 3.224 24 3.5 24H19.5C19.776 24 20 23.776 20 23.5V4H22.5C22.776 4 23 3.776 23 3.5C23 3.224 22.776 3 22.5 3ZM8 18.5C8 18.776 7.776 19 7.5 19C7.224 19 7 18.776 7 18.5V7.5C7 7.224 7.224 7 7.5 7C7.776 7 8 7.224 8 7.5V18.5ZM8 1H15V3H8V1ZM12 18.5C12 18.776 11.776 19 11.5 19C11.224 19 11 18.776 11 18.5V7.5C11 7.224 11.224 7 11.5 7C11.776 7 12 7.224 12 7.5V18.5ZM16 18.5C16 18.776 15.776 19 15.5 19C15.224 19 15 18.776 15 18.5V7.5C15 7.224 15.224 7 15.5 7C15.776 7 16 7.224 16 7.5V18.5Z"
                fill="#0067C5"
            />
        </svg>
    );

    const CircledCross = () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.58252 0C4.30835 0 0.0100188 4.29 1.88156e-05 9.56417C-0.00498118 12.1242 0.986686 14.5325 2.79335 16.3467C4.60002 18.16 7.00502 19.1617 9.56502 19.1667H9.58335C14.8567 19.1667 19.1559 14.8758 19.1667 9.60083C19.1767 4.3175 14.8859 0.01 9.58252 0ZM13.4067 12.8317C13.5684 12.9942 13.5675 13.2583 13.405 13.4208C13.3234 13.5025 13.2175 13.5425 13.1109 13.5425C13.005 13.5425 12.8975 13.5017 12.8159 13.4208L9.58085 10.1725L6.33419 13.4075C6.25252 13.4892 6.14586 13.5292 6.03919 13.5292C5.93252 13.5292 5.82669 13.4883 5.74502 13.4075C5.58252 13.2442 5.58252 12.98 5.74586 12.8183L8.99335 9.58333L5.75836 6.335C5.59586 6.17167 5.59669 5.90833 5.76002 5.74667C5.92252 5.5825 6.18669 5.58333 6.34919 5.7475L9.58335 8.995L12.83 5.76083C12.9925 5.59833 13.2575 5.59833 13.4192 5.76167C13.5817 5.92417 13.5817 6.18833 13.4184 6.35083L10.1717 9.58583L13.4067 12.8317Z"
                fill="#0067C5"
            />
        </svg>
    );

    return (
        <button type="button" className={leftSpacing ? 'clearbutton__withmargin' : 'clearbutton'} onClick={onChange}>
            {iconType === 'Can' && <Can />}
            {iconType === 'CircledCross' && <CircledCross />}
            <span className="clearbutton__text">{buttonText}</span>
        </button>
    );
};

export default ClearButton;

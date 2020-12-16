import React from 'react'

import './custom-facebook-button.styles.scss';

const CustomFacebookButton = ({ children, type, onClick, buttonStyle, buttonSize }) => (
        <button className={`custom-facebook-button ${buttonStyle}`} onClick={onClick}>
            {children}
        </button>
)

export default CustomFacebookButton

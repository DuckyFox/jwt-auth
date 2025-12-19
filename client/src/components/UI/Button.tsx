'use client'

import React, {ButtonHTMLAttributes} from 'react';

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    const {children, ...otherProps} = props
    return (
        <button {...otherProps}>
            {children}
        </button>
    );
};

export default Button;
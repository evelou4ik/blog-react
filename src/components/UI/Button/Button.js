import React from 'react';


const Button = ({ className, typeButton, children, onClickHandler}) => {
    return (
        <button className={className} type={typeButton} onClick={onClickHandler}>{children}</button>
    );
};

export default Button;
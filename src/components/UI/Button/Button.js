import React from 'react';


const Button = (props) => {
    const { className, typeButton, children, onClickHandler} = props;

    return (
        <button className={className} type={typeButton} onClick={onClickHandler}>{children}</button>
    );
};

export default Button;
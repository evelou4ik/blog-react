import React from 'react';

const Input = ({inputType, inputValue, readOnlyBoolean}) => {
    return (
        <input type={inputType} defaultValue={inputValue} readOnly={readOnlyBoolean}/>
    );
};

export default Input;
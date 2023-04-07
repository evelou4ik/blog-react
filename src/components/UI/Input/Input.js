import React from 'react';

const Input = (props) => {
    const {inputType, inputValue, readOnlyBoolean} = props;

    return (
        <input type={inputType} defaultValue={inputValue} readOnly={readOnlyBoolean}/>
    );
};

export default Input;
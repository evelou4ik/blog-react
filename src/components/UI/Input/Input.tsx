import React from 'react';

interface InputProps {
  inputType: string;
  inputValue: string;
  readOnlyBoolean: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const { inputType, inputValue, readOnlyBoolean } = props;

  return <input type={inputType} defaultValue={inputValue} readOnly={readOnlyBoolean} />;
};

export default Input;

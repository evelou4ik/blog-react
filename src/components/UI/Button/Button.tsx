import React from 'react';

interface ButtonProps {
  className: string;
  typeButton: 'submit' | 'reset' | 'button' | undefined;
  children?: React.ReactNode;
  onClickHandler: <T>() => T;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { className, typeButton, children, onClickHandler } = props;

  return (
    <button className={className} type={typeButton} onClick={onClickHandler}>
      {children}
    </button>
  );
};

export default Button;

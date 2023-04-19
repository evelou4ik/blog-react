import React from 'react';

interface Props {
  className: string;
  typeButton: 'submit' | 'reset' | 'button';
  children?: React.ReactNode;
  onClickHandler?: () => void;
}

const Button: React.FC<Props> = (props) => {
  const { className, typeButton, children, onClickHandler } = props;

  return (
    <button className={className} type={typeButton} onClick={onClickHandler}>
      {children}
    </button>
  );
};

export default Button;

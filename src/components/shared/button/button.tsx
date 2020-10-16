import React from 'react';
import './button.scss';

interface Props {
  id: string;
  label: string;
  type?: 'submit' | 'reset' | 'button';
  style?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<Props> = props => {
  const {id, label, type = 'button', style = 'primary', onClick} = props;
  return (
    <button
      id={id}
      type={type}
      className={`button button--${style}`}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

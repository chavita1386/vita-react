import React from 'react';
import './button.scss';

interface Props {
  id: string;
  label: string;
  type?: 'submit' | 'reset' | 'button';
  variant?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<Props> = props => {
  const {
    id,
    label,
    type = 'button',
    variant: style = 'primary',
    onClick,
  } = props;
  return (
    <button
      id={id}
      type={type}
      className={`button button--${style}`}
      onClick={onClick}>
      {label !== '' ? label : props.children}
    </button>
  );
};

export default Button;

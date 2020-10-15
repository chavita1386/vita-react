import React, {useState} from 'react';
import {InputType} from '../../form/FormTypes';
import './input.scss';

interface Props {
  id: string;
  type: InputType;
  value: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}
const Input: React.FC<Props> = props => {
  const {id, name, type, value, onChange, onBlur} = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(prev => !prev);
  };
  return (
    <React.Fragment>
      <input
        type={showPassword ? 'text' : type}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        value={value}
        placeholder={name}
        className="input"
      />
      {type === InputType.Password && (
        <button onClick={handleShowPassword}>
          {showPassword ? 'Hide password' : 'Show password'}
        </button>
      )}
    </React.Fragment>
  );
};

export default Input;
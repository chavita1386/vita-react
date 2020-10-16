import React, {useState} from 'react';
import {Button} from '..';
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
    <div className={type === InputType.Password ? 'input__password' : 'full'}>
      <input
        id={id}
        type={showPassword ? 'text' : type}
        value={value}
        placeholder={name}
        onChange={onChange}
        onBlur={onBlur}
        className="input"
      />
      {type === InputType.Password && (
        <Button
          id={`button${id.toUpperCase()}`}
          label=""
          variant="link"
          onClick={handleShowPassword}>
          <i className={showPassword ? 'far fa-eye-slash' : 'far fa-eye'}></i>
        </Button>
      )}
    </div>
  );
};

export default Input;

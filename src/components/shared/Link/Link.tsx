import * as React from 'react';
import {NavLink} from 'react-router-dom';
import './Link.scss';

interface Props {
  to: string;
  label: string;
  imageUrl?: string;
}

const Link: React.FunctionComponent<Props> = props => {
  const {to, label, imageUrl = null} = props;
  return (
    <NavLink
      to={to}
      activeClassName="active"
      exact
      className={`link ${imageUrl ? 'link--icon' : ''}`}>
      {imageUrl && (
        <img src={imageUrl} alt={label.toLowerCase()} className="icon" />
      )}
      <span>{label}</span>
    </NavLink>
  );
};

export default Link;

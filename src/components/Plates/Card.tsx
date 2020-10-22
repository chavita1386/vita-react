import * as React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.section`
  border: 1px solid var(--color-gray-3);
  background: #fff;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .card__image {
    border-radius: inherit;
  }

  .card__title {
    font-weiht: 500;
    margin: 0.6rem 0 0.7rem 0;
  }

  .card__description {
    font-size: 0.9rem;
    text-align: center;
    color: var(--color-gray-2);
  }

  .card__price {
    margin: 1.1rem;
  }

  img.card__image {
    width: 100%;
    height: 90px;
    object-fit: cover;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

interface Props {
  image: string;
  name: string;
  description: string;
  price: number;
}
const Card: React.FunctionComponent<Props> = props => {
  const {image, name, description, price} = props;
  return (
    <CardWrapper>
      <img
        className="card__image"
        src={`/assets/pictures/${image}`}
        alt={name}
      />
      <h3 className="card__title">{name}</h3>
      <p className="card__description">{description}</p>
      <span className="card__price">$ {price}</span>
    </CardWrapper>
  );
};

export default Card;

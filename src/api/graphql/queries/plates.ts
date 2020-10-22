import {gql, useQuery} from '@apollo/client';
import {Plate} from '../../../domain';

const platesQueryGQL = gql`
  query plates {
    plates {
      id
      name
      description
      image
      price
    }
  }
`;

export const usePlatesQuery = (): Plate[] | null => {
  const queryResult = useQuery(platesQueryGQL);
  if (queryResult?.data) {
    const plates = queryResult?.data?.plates?.map((plate: any) => {
      const plateParce = {
        id: plate.id,
        name: plate.name,
        description: plate.description,
        image: plate.image,
        price: parseInt(plate.price),
      };
      return plateParce;
    });
    return plates;
  }
  return null;
};

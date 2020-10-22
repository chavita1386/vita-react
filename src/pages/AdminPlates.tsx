import * as React from 'react';
import styled from 'styled-components';
import {usePlatesQuery} from '../api/graphql/queries/plates';
import {Card} from '../components/Plates';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
`;

const AdminPlates = () => {
  const plates = usePlatesQuery();

  React.useEffect(() => {}, [plates]);

  if (!plates) {
    return <span>Loading...</span>;
  }
  return (
    <Wrapper>
      {plates?.map(plate => (
        <Card
          key={plate.id}
          name={plate.name}
          description={plate.description!}
          price={plate.price}
          image={plate.image ? plate.image : ''}
        />
      ))}
    </Wrapper>
  );
};

export default AdminPlates;

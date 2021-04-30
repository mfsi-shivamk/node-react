/* eslint-disable */ 
import { gql, useQuery } from '@apollo/client';

const GET_DOGS = gql`
query GetExchangeRates($currency : String!) {
  dogs:rates(currency: $currency) {
    currency
    rate
  }
}
`;
function DogeCurrency({ currency }) {
  const { loading, error, data } = useQuery(GET_DOGS, {
    variables:{
      currency
    }
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}
function Dogs({ currency }) {
  const onDogSelected = (r)=>DogeCurrency({currency:"USD"})
    const { loading, error, data } = useQuery(GET_DOGS, {/* 
      variables:{
        currency
      } */
    });
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    return (
      <select name="dog" onChange={onDogSelected}>
        {data.dogs.map(dog => (
          <option key={dog.currency} value={dog.currency}>
            {dog.rate}
          </option>
        ))}
        <span> {DogeCurrency} </span>
      </select>
    );
  }
  export default Dogs;
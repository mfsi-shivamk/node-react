import JWT from 'jsonwebtoken';
import 'dotenv/config';
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { getClient } from './utils/getClient';
import {db} from '../src/models';
const client = getClient('');
const JWTSign = function (id, date) {
  return JWT.sign({
    iss: 'yolo',
    sub: id,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 60)
  }, 'NodeJSProject');
};

let  authenticatedClient = getClient(JWTSign(1, new Date()));;
let movieId;
const createMovie = gql`
mutation {
  movie(name: "test name", description: "test actor", actorInfo: "test actor"){
    id
    name
    description
    actorInfo
  }
}
`;


beforeAll(async () => {
    return await db.sequelize.authenticate();
});

describe('Tests that can be performed on the Movie create Mutation', () => {
  it('should not allow an authenticated user create a TODO ', async () => {
      await expect(client.mutate({
        mutation: createMovie
      })).rejects.toThrowError("403");
  });

  it('should create a todo for a authenticated user', async () => {
    const movie = await authenticatedClient.mutate({
      mutation: createMovie
    });
    movieId = movie.data.movie.id
    const exists = await db.movie.count({ where : { id : movieId } })
    expect(exists).toBe(1);
  });

});
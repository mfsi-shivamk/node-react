import JWT from 'jsonwebtoken';
import 'dotenv/config';
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { getClient } from './utils/getClient';
import { db } from '../src/models';
import config from '../src/config';

const client = getClient('');
const JWTSign = function (id, date) {
  return JWT.sign({
    iss: config.app.name,
    sub: id,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 60)
  }, config.app.secret);
};

let authenticatedClient = getClient(JWTSign(1, new Date()));;
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
  jest.setTimeout(30000);

  return await db.sequelize.authenticate();
});

describe('Tests that can be performed on the Movie create Mutation', () => {
  it('should not allow an authenticated user create a TODO ', async () => {
    await expect(client.mutate({
      mutation: createMovie
    })).rejects.toThrowError("403");
  });

  it('should create a movie for a authenticated user', async (done) => {
    const movie = await authenticatedClient.mutate({
      mutation: createMovie
    });
    movieId = movie.data.movie.id
    const exists = await db.movie.count({ where: { id: movieId } })
    db.movie.destroy({ where: { id: movieId } })
    expect(exists).toBe(1);
  });

});
afterAll(async done => {
  db.sequelize.close();
  done();
});
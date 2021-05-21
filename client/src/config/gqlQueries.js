import { gql } from '@apollo/client';

export const queries = {
    createMovies: gql`
        mutation MOVIE_MUTATION(
        $name: String!
        $description: String!,
        $actorInfo: String!
        $price: String!
        $currency: String!
        )   {
            movie(name: $name, description:$description, actorInfo: $actorInfo, price: $price, currency: $currency ) {
              id
              name
              description
              actorInfo
            }
        } `,
    updateMovies : gql`
        mutation UPDATE_MOVIE_MUTATION(
        $movieId: ID!
        $rating: Float!
        )   {
            addRatingToMovie(rating: $rating, movieId:$movieId) {
            id
            movieId
            rating
            }
        }`,
    fetchMovie: gql`
        query MovieFetch($filter: String, $limit: Int, $page: Int) {
          movie(filter: $filter, limit: $limit, page: $page) {
              totalPages
              page
              movie{
              id
              name
              actorInfo
              price
              currency
              description
              upload
              buy
              payment {
                status
              }
              rating {
                    id
                    rating
                  }
              }
            }
          } 
        `,
    subscriptionMovie:  gql`
        subscription {
          movieAdded {
            id
            name
            description
          }
        }
        `,
      updateUser : gql`
      mutation UPDATE_USER_MUTATION(
        $firstName: String!
        $lastName: String!
        $email: String!
        $phone: String!
        ) {
        updateUser(firstName: $firstName, lastName:$lastName, email:$email, phone:$phone) {
          id
          }
      }`,
      updateUserCredentials : gql`
      mutation UPDATE_USER_CREDENTIALS_MUTATION(
        $currentPassword: String!
        $newPassword: String!
        ) {
        updateUserCredentials(currentPassword: $currentPassword, newPassword:$newPassword) {
          id
          }
      }`,
      createCheckoutSession : gql`
      mutation CREATE_CHECKOUT_SESSION(
        $movieId: Int!
      ) {
        checkout(movieId: $movieId){
          id
        }
      }
      `
}
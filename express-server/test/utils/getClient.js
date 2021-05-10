import ApolloClient from 'apollo-boost';

export const getClient = (token) => {
   return new ApolloClient({
    uri: process.env.apolloUrl,
    request: (operation) => {
      if(token) {
        operation.setContext({
          headers: {
            "XSRF-token": token
          }
        })
      }
    },
    onError: (e) => { console.log(e) },
  });
}
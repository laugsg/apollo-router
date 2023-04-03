import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


// Initialize an ApolloGateway instance and pass it
// the supergraph schema as a string
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'accounts', url: 'http://localhost:4000/graphql' },
    //   { name: 'products', url: 'http://localhost:4002' },
      // ...additional subgraphs...
    ],
  }),
});


// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
});


// Note the top-level `await`!
const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);
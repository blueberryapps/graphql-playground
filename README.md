# Node.js and React stack for playing


## How to start?

### Backend
* cd backend
* yarn
* yarn start

and play with es6 node server

* [http://localhost:9000/graphql](http://localhost:9000/graphql) - endpoint of GraphQL server
* [http://localhost:9000/graphql-explorer](http://localhost:9000/graphql-explorer) - [GraphQL Explorer](https://github.com/graphql/graphiql)

### Frontend
classic create-react-app base

* cd frontend
* yarn
* yarn start

## Exercise

1. Backend schema

    * Create Basic schema with Query and resolvers.
    * Then run http://localhost:9000/graphql-explorer
    * [Helpful tutorial](https://dev-blog.apollodata.com/react-graphql-tutorial-part-2-server-99d0528c7928)


 ### Data Model:

 ```
    type Channel {
      id: ID!
      name: String
    }
 ```

2. Connect Client
    * Create componnet ChannelsList and connect it to GraphQL
    * Check [4. block about component](https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b#573b)
    * Use simple query

3. Mutations
    * Server - query + resolver [2. Defining the GraphQL mutation on the server](https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15#f370)
    * Client with optimistic UI [3. Calling the mutation from a React component](https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15#5f5e)
    * Optimistic UI [Speeding up GraphQL Mutations with optimistic UI](https://dev-blog.apollodata.com/tutorial-graphql-mutations-optimistic-ui-and-store-updates-f7b6b66bf0e2)

4. Subscriptions
    * Create subscription for new channel (It's different than tutorial :))
    * [Subscriptions server](https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-server-side-e51c32dc2951)
    * [Subscriptions client](https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-client-side-40e185e4be76)

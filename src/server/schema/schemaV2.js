import { gql } from 'apollo-boost'

const typeDefs = gql`
    type Movie {
        id: ID!
        title: String!
        year: Number!
        runtime: String!
        released: String!
        poster: String!
        plot: String!
        fullplot: String!
        type:Movie!
        imdb: String!
        votes: String!
        countries: [String!]!
        genres: [String!]!
    }

    type Query {
        movie: [Movie]
    }

    schema {
        query: Query
    }
    
`;

export { typeDefs as default }
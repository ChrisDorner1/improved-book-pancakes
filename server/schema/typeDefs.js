const {gql} = require('apollo-server-express')

const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    email: string
    bookNum: Int
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

type Book {
    bookId: String!
    author: [String]
    description: String
    title: String!
    image: String
    link: String
}

input BookInput {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
}
type Query {
    me: User
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeBook(bookId: String!): User
    saveBook(bookData: bookInput!): User
}`

module.exports = {typeDefs}
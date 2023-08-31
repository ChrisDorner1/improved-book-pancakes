import { gql } from "@apollo/client";

export const ADD_USER = gql `
mutation addUser($userhame: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`

export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
        _id
        email
        username
        bookCount
        savedBooks {
            bookId
            author
            description
            title
            image
            link
        }
    }
}`

export const LOGIN_USER = gql `
mutation login($email: String!, $password: String!) {
    login(email: $email: email, password: $password) {
        token
        user{
            _id
            username
        }
    }
}`

export const REMOVE_BOOK = gql `
mutation Mutation($bookId: String!) 
    deleteBook(bookId: $bookId) {
        _id
        email
        username
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
`
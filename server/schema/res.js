const {AuthenticationError} = require('apollo-server-express')

const {User} = require("../models")

const {signToken} = require('../utils/auth')

const res = {
    Query: {
        // me: async (parent, args, context) => {
        //     if (context.user) {
        //         const data = await User.findOne({_id: context.user._id}).select('-__v - password').populate('savedBooks')
        //         console.log(data)
        //         return data
        //     }
        //     throw new AuthenticationError("you must be signed in")
        // },
        Users: async() => {
            const users = await User.find()
            console.log(users)
            return users
        }
    },

    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email}) 
            if (!user) {
                throw new AuthenticationError('WRONG')
            }
            const pass = await user.isCorrectPassword(password)
            if (!pass) {
                throw new AuthenticationError('No')
            }
            const token = signToken(user)
            return (token, user)
        },
        addUser: async (parent, args) => {
            console.log("test", args)
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user }
        },
        addBook: async (parent, {bookData}, context) => {
            if (context.user) {
                const updootUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: bookId} }, //$addToSet ?
                    {new: true}
                )
                return updootUser
            }
            throw new AuthenticationError('log in first')
        },

        deleteBook: async (parent, {bookId},context) => {
            if (context.user) {
                const updootUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: {savedBooks: {bookId}}},
                    {new: true}
                )
                return updootUser
            }
            throw new AuthenticationError("login first")
        }
    }
}

module.exports = res
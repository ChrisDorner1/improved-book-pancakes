const {AuthenticationError} = require('apollo-server-express')

const {User} = require("../models/User")

const {signToken} = require('../utils/auth')

const res = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const data = await User.findOne({_id: context.user._id}).select('-__v - password')
                console.log(data)
                return data
            }
            throw new AuthenticationError("you must be signed in")
        },
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
            console.log("test")
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user }
        },
        addBook: async (parent, {bookData}, context) => {
            if (context.user) {
                const updootUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: bookId} },
                    {new: true}
                )
                return updootUser
            }
            throw new AuthenticationError('log in first')
        }
    }
}

module.exports = res
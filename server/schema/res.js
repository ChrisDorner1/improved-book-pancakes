const {authError} = require('apollo-server-express')

const {User} = require("../models/User")

const {Token} = require("../utils/auth")
const auth = require('../utils/auth')

const res = {
    Query: {
        me: async (parent, args, context) => {
            if (context.User) {
                const data = await User.findOne({_id: context.user._id}).select('-__v - password')
                return data
            }
            throw new authError("you must be signed in")
        }
    },

    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email}) 
            if (!user) {
                throw new authError('WRONG')
            }
            const pass = await user.isCorrectPassword(password)
            if (!pass) {
                throw new authError('No')
            }
            const token = Token(user)
            return (token, user)
        },
        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = Token(user)
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
            throw new authError('log in first')
        }
    }
}

export default res